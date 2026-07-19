import {
  getKommoConfig,
  getLeadFieldMap,
  KOMMO_TRACKING_FIELD_NAMES,
  kommoRequest,
} from '~/server/utils/kommo'

const QUALIFIED_PIPELINES = new Map([
  [9000268, 'Workflow (Consultancy)'],
  [9007500, 'Workflow (Development)'],
])

type KommoWebhookLead = {
  id?: string | number
  pipeline_id?: string | number
  status_id?: string | number
}

type KommoLead = {
  id: number
  pipeline_id: number
  status_id: number
  created_at: number
  custom_fields_values?: Array<{
    field_id: number
    values?: Array<{ value?: string }>
  }>
  _embedded?: { contacts?: Array<{ id: number }> }
}

type KommoContact = {
  name?: string
  custom_fields_values?: Array<{
    field_code?: string
    values?: Array<{ value?: string }>
  }>
}

type RuntimeKommoConfig = ReturnType<typeof getKommoConfig>

const value = (input: unknown) => String(input || '').trim()
const numberValue = (input: unknown) => Number(value(input))

const findWebhookLead = (body: Record<string, any>): KommoWebhookLead | undefined => {
  // Kommo may send webhook bodies as URL-encoded bracket keys instead of a
  // nested object, for example `leads[status][0][id]=123`.
  const flatLeadId = Object.entries(body).find(([key, fieldValue]) =>
    /^(?:lead|leads)\[[^\]]+\]\[\d+\]\[id\]$/.test(key) && value(fieldValue)
  )?.[1]
  if (flatLeadId) return { id: value(flatLeadId) }

  const lead = body.lead || body.leads

  if (!lead || typeof lead !== 'object') return undefined

  for (const webhookEvent of Object.values(lead)) {
    if (Array.isArray(webhookEvent) && webhookEvent[0]?.id) return webhookEvent[0]
    if (webhookEvent && typeof webhookEvent === 'object') {
      const first = Object.values(webhookEvent as Record<string, KommoWebhookLead>)[0]
      if (first?.id) return first
    }
  }

  return lead.id ? lead : undefined
}

const getLeadFieldValue = (lead: KommoLead, fieldId: number | undefined) =>
  fieldId
    ? value(
        lead.custom_fields_values?.find(field => field.field_id === fieldId)
          ?.values?.[0]?.value
      )
    : ''

const getContactValue = (contact: KommoContact | undefined, code: string) =>
  value(
    contact?.custom_fields_values
      ?.find(field => field.field_code === code)
      ?.values?.[0]?.value
  )

const updateLeadField = async (
  config: RuntimeKommoConfig,
  lead: KommoLead,
  fieldId: number
) => {
  await kommoRequest(config, `/api/v4/leads/${lead.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      custom_fields_values: [
        { field_id: fieldId, values: [{ value: new Date().toISOString() }] },
      ],
    }),
  })
}

const ensureLeadField = async (
  config: RuntimeKommoConfig,
  fieldMap: Map<string, number>,
  name: string
) => {
  const existingFieldId = fieldMap.get(name)
  if (existingFieldId) return existingFieldId

  const field = await kommoRequest<{ id?: number }>(config, '/api/v4/leads/custom_fields', {
    method: 'POST',
    body: JSON.stringify({ name, type: 'text', is_api_only: true }),
  })
  if (!field.id) {
    throw createError({ statusCode: 502, statusMessage: `Kommo did not create ${name}` })
  }

  fieldMap.set(name, field.id)
  return field.id
}

const sha256 = async (raw: string) => {
  if (!raw) return undefined
  const bytes = new TextEncoder().encode(raw.trim().toLowerCase())
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

const hasGoogleConfiguration = (config: Record<string, string>) =>
  [
    'googleDataManagerClientId',
    'googleDataManagerClientSecret',
    'googleDataManagerRefreshToken',
    'googleAdsOperatingAccountId',
    'googleAdsConversionActionId',
  ].every(key => value(config[key]))

const getGoogleAccessToken = async (config: Record<string, string>) => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.googleDataManagerClientId,
      client_secret: config.googleDataManagerClientSecret,
      refresh_token: config.googleDataManagerRefreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: `Google OAuth error: ${response.status}`,
    })
  }

  const payload = (await response.json()) as { access_token?: string }
  if (!payload.access_token) {
    throw createError({ statusCode: 502, statusMessage: 'Google OAuth returned no access token' })
  }

  return payload.access_token
}

const sendGoogleQualifiedLead = async (input: {
  lead: KommoLead
  contact?: KommoContact
  tracking: Record<string, string>
}) => {
  const config = useRuntimeConfig().kommo as Record<string, string>

  const identifiers = Object.fromEntries(
    Object.entries({
      gclid: input.tracking.gclid,
      gbraid: input.tracking.gbraid,
      wbraid: input.tracking.wbraid,
    }).filter(([, identifier]) => identifier)
  )
  const email = getContactValue(input.contact, 'EMAIL').toLowerCase()
  const phone = getContactValue(input.contact, 'PHONE').replace(/\D/g, '')
  const userIdentifiers: Array<{ emailAddress?: string; phoneNumber?: string }> = []
  const emailHash = await sha256(email)
  const phoneHash = await sha256(phone)
  if (emailHash) userIdentifiers.push({ emailAddress: emailHash })
  if (phoneHash) userIdentifiers.push({ phoneNumber: phoneHash })

  if (!Object.keys(identifiers).length && !userIdentifiers.length) {
    return false
  }

  const accessToken = await getGoogleAccessToken(config)
  const destination: Record<string, unknown> = {
    operatingAccount: {
      accountType: 'GOOGLE_ADS',
      accountId: String(config.googleAdsOperatingAccountId).replace(/\D/g, ''),
    },
    productDestinationId: config.googleAdsConversionActionId,
  }
  if (config.googleAdsLoginAccountId) {
    Object.assign(destination, {
      loginAccount: {
        accountType: 'GOOGLE_ADS',
        accountId: String(config.googleAdsLoginAccountId).replace(/\D/g, ''),
      },
    })
  }

  const response = await fetch('https://datamanager.googleapis.com/v1/events:ingest', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      destinations: [destination],
      encoding: 'HEX',
      events: [
        {
          transactionId: `kommo-qualified-${input.lead.id}`,
          eventTimestamp: new Date().toISOString(),
          eventSource: 'WEB',
          adIdentifiers: Object.keys(identifiers).length ? identifiers : undefined,
          userData: userIdentifiers.length ? { userIdentifiers } : undefined,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: `Google Data Manager error: ${response.status}`,
    })
  }

  return true
}

const sendMetaQualifiedLead = async (input: {
  lead: KommoLead
  contact?: KommoContact
  tracking: Record<string, string>
}) => {
  const config = useRuntimeConfig().kommo as Record<string, string>
  if (!config.metaPixelId || !config.metaConversionsApiToken) return false

  const email = getContactValue(input.contact, 'EMAIL').toLowerCase()
  const phone = getContactValue(input.contact, 'PHONE').replace(/\D/g, '')
  const response = await fetch(
    `https://graph.facebook.com/v25.0/${config.metaPixelId}/events?access_token=${config.metaConversionsApiToken}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_id: `kommo-qualified-${input.lead.id}`,
            action_source: 'system_generated',
            user_data: {
              em: email ? [await sha256(email)] : undefined,
              ph: phone ? [await sha256(phone)] : undefined,
              fbp: input.tracking.fbp || undefined,
              fbc: input.tracking.fbc || undefined,
            },
            custom_data: {
              lead_type: 'qualified',
              kommo_lead_id: String(input.lead.id),
              pipeline: QUALIFIED_PIPELINES.get(input.lead.pipeline_id),
            },
          },
        ],
      }),
    }
  )

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: `Meta Conversions API error: ${response.status}`,
    })
  }

  return true
}

export default defineEventHandler(async event => {
  const config = getKommoConfig()
  const secret = getQuery(event).key

  if (!config.qualifiedWebhookSecret || secret !== config.qualifiedWebhookSecret) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized webhook' })
  }

  const rawBody = await readRawBody(event, 'utf8')
  const body = rawBody
    ? rawBody.trim().startsWith('{')
      ? (JSON.parse(rawBody) as Record<string, any>)
      : Object.fromEntries(new URLSearchParams(rawBody))
    : {}
  const webhookLead = findWebhookLead(body)
  const leadId = numberValue(webhookLead?.id)
  if (!leadId) {
    throw createError({ statusCode: 400, statusMessage: 'Kommo lead ID is required' })
  }

  const lead = await kommoRequest<KommoLead>(config, `/api/v4/leads/${leadId}?with=contacts`)
  if (!QUALIFIED_PIPELINES.has(lead.pipeline_id)) {
    return { ok: true, ignored: 'pipeline' }
  }

  const fieldMap = await getLeadFieldMap(config)
  const contactId = lead._embedded?.contacts?.[0]?.id
  const contact = contactId
    ? await kommoRequest<KommoContact>(config, `/api/v4/contacts/${contactId}`)
    : undefined
  const tracking = Object.fromEntries(
    Object.entries(KOMMO_TRACKING_FIELD_NAMES)
      .filter(([, fieldName]) => !fieldName.startsWith('qlead_'))
      .map(([key, fieldName]) => [key, getLeadFieldValue(lead, fieldMap.get(fieldName))])
  )

  const destinations: Record<string, 'sent' | 'duplicate' | 'not_configured' | 'not_attributable'> = {}
  const googleFieldId = await ensureLeadField(
    config,
    fieldMap,
    KOMMO_TRACKING_FIELD_NAMES.qualifiedGoogleSentAt
  )
  const googleConfigured = hasGoogleConfiguration(
    useRuntimeConfig().kommo as Record<string, string>
  )
  if (!googleFieldId || !googleConfigured) {
    destinations.google = 'not_configured'
  } else if (getLeadFieldValue(lead, googleFieldId)) {
    destinations.google = 'duplicate'
  } else {
    const googleSent = await sendGoogleQualifiedLead({ lead, contact, tracking })
    destinations.google = googleSent ? 'sent' : 'not_attributable'
    if (googleSent) await updateLeadField(config, lead, googleFieldId)
  }

  const metaFieldId = await ensureLeadField(
    config,
    fieldMap,
    KOMMO_TRACKING_FIELD_NAMES.qualifiedMetaSentAt
  )
  if (getLeadFieldValue(lead, metaFieldId)) {
    destinations.meta = 'duplicate'
  } else {
    const metaSent = await sendMetaQualifiedLead({ lead, contact, tracking })
    destinations.meta = metaSent ? 'sent' : 'not_configured'
    if (metaSent) await updateLeadField(config, lead, metaFieldId)
  }

  return { ok: true, qualified: true, destinations }
})

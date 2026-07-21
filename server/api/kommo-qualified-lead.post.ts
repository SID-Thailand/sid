import {
  getKommoConfig,
  getLeadFieldMap,
  KOMMO_TRACKING_FIELD_NAMES,
  kommoRequest,
} from '~/server/utils/kommo'

export const QLEAD_CHANNELS = ['google', 'meta', 'ga4', 'yandex'] as const

export type QLeadChannel = (typeof QLEAD_CHANNELS)[number]

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

const updateLeadFields = async (
  config: RuntimeKommoConfig,
  lead: KommoLead,
  fields: Array<{ fieldId: number; value: string }>
) => {
  await kommoRequest(config, `/api/v4/leads/${lead.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      custom_fields_values: fields.map(field => ({
        field_id: field.fieldId,
        values: [{ value: field.value }],
      })),
    }),
  })
}

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
    productDestinationId: String(config.googleAdsConversionActionId),
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
    const details = await response.text().catch(() => '')
    console.error('Google Data Manager rejected qualified lead', {
      status: response.status,
      details: details.slice(0, 800),
    })
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

const sendGa4QualifiedLead = async (input: {
  lead: KommoLead
  tracking: Record<string, string>
}) => {
  const config = useRuntimeConfig().kommo as Record<string, string>
  if (!config.ga4MeasurementId || !config.ga4MeasurementProtocolApiSecret) return false
  if (!input.tracking.gclientid) return false

  const query = new URLSearchParams({
    measurement_id: config.ga4MeasurementId,
    api_secret: config.ga4MeasurementProtocolApiSecret,
  })
  const response = await fetch(`https://www.google-analytics.com/mp/collect?${query}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: input.tracking.gclientid,
      events: [
        {
          name: 'qualify_lead',
          params: {
            engagement_time_msec: 1,
            kommo_lead_id: String(input.lead.id),
            pipeline: QUALIFIED_PIPELINES.get(input.lead.pipeline_id) || '',
          },
        },
      ],
    }),
  })

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: `GA4 Measurement Protocol error: ${response.status}`,
    })
  }

  return true
}

const csvValue = (value: string) => `"${value.replaceAll('"', '""')}"`

const sendYandexQualifiedLead = async (input: {
  lead: KommoLead
  tracking: Record<string, string>
}) => {
  const config = useRuntimeConfig().kommo as Record<string, string>
  if (
    !config.yandexMetrikaCounterId ||
    !config.yandexMetrikaOAuthToken ||
    !config.yandexMetrikaQualifiedGoalId
  ) {
    console.warn('Yandex qualified lead is not configured', {
      counter: Boolean(config.yandexMetrikaCounterId),
      token: Boolean(config.yandexMetrikaOAuthToken),
      goal: Boolean(config.yandexMetrikaQualifiedGoalId),
    })
    return false
  }
  if (!input.tracking.ymclientid && !input.tracking.yclid) {
    console.info('Yandex qualified lead has no identifier', { leadId: input.lead.id })
    return false
  }

  const headers = ['Target', 'DateTime', 'ClientId', 'Yclid']
  const record = [
    config.yandexMetrikaQualifiedGoalId,
    String(Math.floor(Date.now() / 1000)),
    input.tracking.ymclientid || '',
    input.tracking.yclid || '',
  ]
  const csv = `${headers.join(',')}\n${record.map(csvValue).join(',')}\n`
  const form = new FormData()
  form.set('file', new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'qualified-lead.csv')

  const response = await fetch(
    `https://api-metrika.yandex.net/management/v1/counter/${config.yandexMetrikaCounterId}/offline_conversions/upload?type=BASIC&comment=Kommo%20qualified%20lead`,
    {
      method: 'POST',
      headers: { Authorization: `OAuth ${config.yandexMetrikaOAuthToken}` },
      body: form,
    }
  )

  if (!response.ok) {
    console.error('Yandex qualified lead upload failed', {
      leadId: input.lead.id,
      status: response.status,
    })
    throw createError({
      statusCode: 502,
      statusMessage: `Yandex Metrika offline conversion error: ${response.status}`,
    })
  }

  return true
}

const QLEAD_STATUS_FIELDS: Record<QLeadChannel, { sentAt: keyof typeof KOMMO_TRACKING_FIELD_NAMES; status: keyof typeof KOMMO_TRACKING_FIELD_NAMES; detail: keyof typeof KOMMO_TRACKING_FIELD_NAMES }> = {
  google: {
    sentAt: 'qualifiedGoogleSentAt',
    status: 'qualifiedGoogleStatus',
    detail: 'qualifiedGoogleDetail',
  },
  meta: {
    sentAt: 'qualifiedMetaSentAt',
    status: 'qualifiedMetaStatus',
    detail: 'qualifiedMetaDetail',
  },
  ga4: {
    sentAt: 'qualifiedGa4SentAt',
    status: 'qualifiedGa4Status',
    detail: 'qualifiedGa4Detail',
  },
  yandex: {
    sentAt: 'qualifiedYandexSentAt',
    status: 'qualifiedYandexStatus',
    detail: 'qualifiedYandexDetail',
  },
}

type DeliveryStatus =
  | 'sent'
  | 'duplicate'
  | 'not_configured'
  | 'not_attributable'
  | 'ignored'

const isQualifiedPipeline = (lead: KommoLead) =>
  QUALIFIED_PIPELINES.has(lead.pipeline_id)

const getChannelConfigurationStatus = (
  channel: QLeadChannel,
  runtimeConfig: Record<string, string>
) => {
  if (channel === 'google') return hasGoogleConfiguration(runtimeConfig)
  if (channel === 'meta') {
    return Boolean(runtimeConfig.metaPixelId && runtimeConfig.metaConversionsApiToken)
  }
  if (channel === 'ga4') {
    return Boolean(runtimeConfig.ga4MeasurementProtocolApiSecret)
  }
  return Boolean(runtimeConfig.yandexMetrikaOAuthToken)
}

const qleadDetail = (message: string) => message.slice(0, 240)

const ensureQleadJournal = async (
  config: RuntimeKommoConfig,
  fieldMap: Map<string, number>,
  channel: QLeadChannel
) => {
  const fields = QLEAD_STATUS_FIELDS[channel]
  const names = KOMMO_TRACKING_FIELD_NAMES
  const [sentAt, status, detail] = await Promise.all([
    ensureLeadField(config, fieldMap, names[fields.sentAt]),
    ensureLeadField(config, fieldMap, names[fields.status]),
    ensureLeadField(config, fieldMap, names[fields.detail]),
  ])
  return { sentAt, status, detail }
}

const updateQleadJournal = async (
  config: RuntimeKommoConfig,
  lead: KommoLead,
  journal: { sentAt: number; status: number; detail: number },
  status: string,
  detail: string,
  sentAt?: string
) => {
  const fields = [
    { fieldId: journal.status, value: status },
    { fieldId: journal.detail, value: qleadDetail(detail) },
  ]
  if (sentAt) fields.push({ fieldId: journal.sentAt, value: sentAt })
  await updateLeadFields(config, lead, fields)
}

export const processQualifiedLeadDelivery = async (
  leadId: number,
  channel: QLeadChannel,
  queueMessageId: string
): Promise<DeliveryStatus> => {
  const config = getKommoConfig()
  const lead = await kommoRequest<KommoLead>(config, `/api/v4/leads/${leadId}?with=contacts`)
  if (!isQualifiedPipeline(lead)) return 'ignored'

  const fieldMap = await getLeadFieldMap(config)
  const journal = await ensureQleadJournal(config, fieldMap, channel)
  if (getLeadFieldValue(lead, journal.sentAt)) {
    return 'duplicate'
  }

  const runtimeConfig = useRuntimeConfig().kommo as Record<string, string>
  if (!getChannelConfigurationStatus(channel, runtimeConfig)) {
    await updateQleadJournal(config, lead, journal, 'not_configured', `queue:${queueMessageId}`)
    return 'not_configured'
  }

  const contactId = lead._embedded?.contacts?.[0]?.id
  const contact = contactId
    ? await kommoRequest<KommoContact>(config, `/api/v4/contacts/${contactId}`)
    : undefined
  const tracking = Object.fromEntries(
    Object.entries(KOMMO_TRACKING_FIELD_NAMES)
      .filter(([, fieldName]) => !fieldName.startsWith('qlead_'))
      .map(([key, fieldName]) => [key, getLeadFieldValue(lead, fieldMap.get(fieldName))])
  )

  await updateQleadJournal(config, lead, journal, 'processing', `queue:${queueMessageId}`)

  try {
    const sent =
      channel === 'google'
        ? await sendGoogleQualifiedLead({ lead, contact, tracking })
        : channel === 'meta'
          ? await sendMetaQualifiedLead({ lead, contact, tracking })
          : channel === 'ga4'
            ? await sendGa4QualifiedLead({ lead, tracking })
            : await sendYandexQualifiedLead({ lead, tracking })

    if (!sent) {
      await updateQleadJournal(
        config,
        lead,
        journal,
        'not_attributable',
        `queue:${queueMessageId}`
      )
      return 'not_attributable'
    }

    const sentAt = new Date().toISOString()
    await updateQleadJournal(config, lead, journal, 'sent', `queue:${queueMessageId}`, sentAt)
    return 'sent'
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await updateQleadJournal(config, lead, journal, 'retrying', message).catch(() => {})
    throw error
  }
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

  const lead = await kommoRequest<KommoLead>(config, `/api/v4/leads/${leadId}`)
  if (!isQualifiedPipeline(lead)) {
    return { ok: true, ignored: 'pipeline' }
  }

  const deliveries = await Promise.allSettled(
    QLEAD_CHANNELS.map(async channel => {
      const status = await processQualifiedLeadDelivery(
        leadId,
        channel,
        `webhook:${leadId}:${channel}`
      )
      return [channel, status] as const
    })
  )

  const results = Object.fromEntries(
    deliveries.map((delivery, index) => {
      const channel = QLEAD_CHANNELS[index]
      return [
        channel,
        delivery.status === 'fulfilled'
          ? delivery.value[1]
          : {
              status: 'failed',
              detail:
                delivery.reason instanceof Error
                  ? delivery.reason.message
                  : String(delivery.reason),
            },
      ]
    })
  )

  return {
    ok: true,
    qualified: true,
    deliveries: results,
  }
})

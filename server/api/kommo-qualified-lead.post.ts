import {
  getKommoConfig,
  getLeadFieldMap,
  KOMMO_TRACKING_FIELD_NAMES,
  kommoRequest,
} from '~/server/utils/kommo'

const QUALIFIED_STAGES = new Map([
  [9000268, { statusId: 70172364, name: 'INCOMING' }],
  [9007500, { statusId: 70239012, name: 'DEVELOPMENT ASSIGNMENT' }],
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

const value = (input: unknown) => String(input || '').trim()
const numberValue = (input: unknown) => Number(value(input))

const findWebhookLead = (body: Record<string, any>): KommoWebhookLead | undefined => {
  const lead = body.lead || body.leads

  if (!lead || typeof lead !== 'object') return undefined

  for (const event of Object.values(lead)) {
    if (Array.isArray(event) && event[0]?.id) return event[0]
    if (event && typeof event === 'object') {
      const first = Object.values(event as Record<string, KommoWebhookLead>)[0]
      if (first?.id) return first
    }
  }

  return lead.id ? lead : undefined
}

const getLeadFieldValue = (
  lead: KommoLead,
  fieldId: number | undefined
) =>
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

const updateQualifiedExportedAt = async (
  config: ReturnType<typeof getKommoConfig>,
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

const sendMetaQualifiedLead = async (input: {
  lead: KommoLead
  contact?: KommoContact
  tracking: Record<string, string>
}) => {
  const config = useRuntimeConfig().kommo as Record<string, string>
  if (!config.metaPixelId || !config.metaConversionsApiToken) return false

  const email = getContactValue(input.contact, 'EMAIL').toLowerCase()
  const phone = getContactValue(input.contact, 'PHONE').replace(/\D/g, '')
  const hash = async (raw: string) => {
    if (!raw) return undefined
    const bytes = new TextEncoder().encode(raw.trim().toLowerCase())
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
  }

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
              em: email ? [await hash(email)] : undefined,
              ph: phone ? [await hash(phone)] : undefined,
              fbp: input.tracking.fbp || undefined,
              fbc: input.tracking.fbc || undefined,
            },
            custom_data: {
              lead_type: 'qualified',
              kommo_lead_id: String(input.lead.id),
              pipeline: QUALIFIED_STAGES.get(input.lead.pipeline_id)?.name,
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

  const body = (await readBody(event)) as Record<string, any>
  const webhookLead = findWebhookLead(body)
  const leadId = numberValue(webhookLead?.id)

  if (!leadId) {
    throw createError({ statusCode: 400, statusMessage: 'Kommo lead ID is required' })
  }

  const lead = await kommoRequest<KommoLead>(config, `/api/v4/leads/${leadId}?with=contacts`)
  const qualifiedStage = QUALIFIED_STAGES.get(lead.pipeline_id)
  if (!qualifiedStage || lead.status_id !== qualifiedStage.statusId) {
    return { ok: true, ignored: 'stage' }
  }

  const fieldMap = await getLeadFieldMap(config)
  const qualifiedExportedFieldId = fieldMap.get(
    KOMMO_TRACKING_FIELD_NAMES.qualifiedExportedAt
  )
  if (!qualifiedExportedFieldId) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Kommo field qlead_exported_at is not configured',
    })
  }
  if (getLeadFieldValue(lead, qualifiedExportedFieldId)) {
    return { ok: true, duplicate: true }
  }

  const contactId = lead._embedded?.contacts?.[0]?.id
  const contact = contactId
    ? await kommoRequest<KommoContact>(config, `/api/v4/contacts/${contactId}`)
    : undefined
  const tracking = Object.fromEntries(
    Object.entries(KOMMO_TRACKING_FIELD_NAMES)
      .filter(([key]) => key !== 'qualifiedExportedAt')
      .map(([key, name]) => [key, getLeadFieldValue(lead, fieldMap.get(name))])
  )

  // The Google Ads import is enabled only after its Data Manager credentials are set.
  // Do not mark the lead as exported before every configured destination succeeds.
  const metaSent = await sendMetaQualifiedLead({ lead, contact, tracking })
  if (!metaSent) {
    return { ok: true, pending: 'meta_not_configured' }
  }

  await updateQualifiedExportedAt(config, lead, qualifiedExportedFieldId)

  return { ok: true, qualified: true }
})

import {
  getKommoConfig,
  getLeadFieldMap,
  KOMMO_TRACKING_FIELD_NAMES,
  kommoRequest,
} from '~/server/utils/kommo'

type LeadRequest = {
  fields: Record<string, string>
  formType: string
  formContext: string
  pageUrl: string
  siteLanguage: string
  trafficSource: Record<string, string | undefined>
}

type CreatedEntity = { id?: number }
type CreatedEntityResponse =
  | CreatedEntity[]
  | (CreatedEntity & { _embedded?: Record<string, CreatedEntity[]> })

const clean = (value: unknown) => String(value || '').trim()
const normalizedPhone = (value: string) => value.replace(/\D/g, '')

const getCreatedEntityId = (
  result: CreatedEntityResponse,
  collection: 'contacts' | 'leads'
) => {
  if (Array.isArray(result)) return result[0]?.id
  return result.id || result._embedded?.[collection]?.[0]?.id
}

const findField = (fields: Record<string, string>, expression: RegExp) =>
  Object.entries(fields).find(([key]) => expression.test(key))?.[1] || ''

const getLeadName = (payload: LeadRequest, name: string, phone: string) => {
  const source = payload.formType || payload.formContext || 'Website form'
  return `${source}: ${name || phone || 'New lead'}`
}

const formatFormData = (fields: Record<string, string>) =>
  Object.entries(fields)
    .filter(([, value]) => clean(value))
    .map(([key, value]) => `${key}: ${clean(value)}`)
    .join('\n')

const formatLeadNote = (payload: LeadRequest, fields: Record<string, string>) => {
  const traffic = payload.trafficSource || {}
  const tracking = Object.entries(traffic)
    .filter(([, value]) => clean(value))
    .map(([key, value]) => `${key}: ${clean(value)}`)
    .join('\n')

  return [
    'Website form submission',
    `Form type: ${payload.formType}`,
    `Form context: ${payload.formContext}`,
    `Language: ${payload.siteLanguage}`,
    `Page URL: ${payload.pageUrl}`,
    '',
    'Form data:',
    formatFormData(fields),
    '',
    'Tracking data:',
    tracking,
  ]
    .filter(Boolean)
    .join('\n')
}

export default defineEventHandler(async event => {
  const payload = (await readBody(event)) as LeadRequest
  const name = clean(findField(payload.fields || {}, /name/i))
  const email = clean(findField(payload.fields || {}, /email/i)).toLowerCase()
  const phone = clean(findField(payload.fields || {}, /(phone|tel)/i))

  if (!name || !email || !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email and phone are required' })
  }

  const config = getKommoConfig()
  const leadFields = await getLeadFieldMap(config)
  const contactSearch = await kommoRequest<{
    _embedded?: { contacts?: Array<{ id: number; custom_fields_values?: Array<{ field_code?: string; values?: Array<{ value?: string }> }> }> }
  }>(config, `/api/v4/contacts?query=${encodeURIComponent(phone)}&limit=25`)
  const phoneDigits = normalizedPhone(phone)
  const existingContact = (contactSearch._embedded?.contacts || []).find(contact =>
    contact.custom_fields_values?.some(field =>
      field.field_code === 'PHONE' &&
      field.values?.some(value => normalizedPhone(clean(value.value)) === phoneDigits)
    )
  )

  const contact = existingContact
    ? { id: existingContact.id }
    : await kommoRequest<CreatedEntityResponse>(config, '/api/v4/contacts', {
        method: 'POST',
        body: JSON.stringify([
          {
            name,
            custom_fields_values: [
              { field_code: 'PHONE', values: [{ value: phone, enum_code: 'MOB' }] },
              { field_code: 'EMAIL', values: [{ value: email, enum_code: 'WORK' }] },
            ],
          },
        ]),
      }).then(result => ({ id: getCreatedEntityId(result, 'contacts') }))

  if (!contact.id) {
    throw createError({ statusCode: 502, statusMessage: 'Kommo did not return a contact ID' })
  }

  const traffic = payload.trafficSource || {}
  const values: Array<[keyof typeof KOMMO_TRACKING_FIELD_NAMES, string]> = [
    ['utmSource', clean(traffic.utm_source)],
    ['utmMedium', clean(traffic.utm_medium)],
    ['utmCampaign', clean(traffic.utm_campaign)],
    ['utmContent', clean(traffic.utm_content)],
    ['utmTerm', clean(traffic.utm_term)],
    ['utmReferrer', clean(traffic.first_referrer)],
    ['referrer', clean(traffic.first_referrer)],
    ['gclid', clean(traffic.gclid)],
    ['fbclid', clean(traffic.fbclid)],
  ]
  const trackingFields = values
    .map(([key, value]) => ({ fieldId: leadFields.get(KOMMO_TRACKING_FIELD_NAMES[key]), value }))
    .filter((field): field is { fieldId: number; value: string } => Boolean(field.fieldId && field.value))

  const lead = await kommoRequest<CreatedEntityResponse>(config, '/api/v4/leads', {
    method: 'POST',
    body: JSON.stringify([
      {
        name: getLeadName(payload, name, phone),
        pipeline_id: Number(config.pipelineId),
        status_id: Number(config.statusId),
        responsible_user_id: Number(config.responsibleUserId),
        _embedded: { contacts: [{ id: contact.id }] },
        custom_fields_values: trackingFields.map(({ fieldId, value }) => ({
          field_id: fieldId,
          values: [{ value }],
        })),
      },
    ]),
  })

  const leadId = getCreatedEntityId(lead, 'leads')
  if (!leadId) {
    throw createError({ statusCode: 502, statusMessage: 'Kommo did not return a lead ID' })
  }

  await kommoRequest(config, '/api/v4/leads/notes', {
    method: 'POST',
    body: JSON.stringify([
      {
        entity_id: leadId,
        note_type: 'common',
        params: { text: formatLeadNote(payload, payload.fields || {}) },
      },
    ]),
  })

  return { ok: true, leadId }
})

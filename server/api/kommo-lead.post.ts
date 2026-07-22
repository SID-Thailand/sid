import {
  getKommoConfig,
  getLeadFieldMap,
  KOMMO_TRACKING_FIELD_NAMES,
  kommoRequest,
} from '~/server/utils/kommo'
import {
  acquireAtomicLock,
  getAtomicValue,
  incrementRateLimit,
  releaseAtomicLock,
  setAtomicValue,
} from '~/server/utils/atomicStore'
import {
  getClientAddress,
  getCompletedLeadId,
  isAllowedLeadOrigin,
  isValidRequestId,
  LEAD_RATE_LIMIT,
  LEAD_RATE_WINDOW_SECONDS,
  MAX_LEAD_BODY_BYTES,
} from '~/server/utils/leadProtection'

type LeadRequest = {
  requestId: string
  website?: string
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


const ensureLeadField = async (
  config: ReturnType<typeof getKommoConfig>,
  fields: Map<string, number>,
  name: string
) => {
  const existingId = fields.get(name)
  if (existingId) return existingId

  const created = await kommoRequest<{ id?: number }>(config, '/api/v4/leads/custom_fields', {
    method: 'POST',
    body: JSON.stringify({ name, type: 'text', is_api_only: true }),
  })
  if (!created.id) {
    throw createError({ statusCode: 502, statusMessage: `Kommo did not create ${name}` })
  }

  fields.set(name, created.id)
  return created.id
}

const createLead = async (payload: LeadRequest) => {
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
    ['gclientid', clean(traffic.gclientid)],
    ['wbraid', clean(traffic.wbraid)],
    ['gbraid', clean(traffic.gbraid)],
    ['fbclid', clean(traffic.fbclid)],
    ['fbp', clean(traffic.fbp)],
    ['fbc', clean(traffic.fbc)],
    ['yclid', clean(traffic.yclid)],
    ['ymclientid', clean(traffic.ymclientid)],
    ['firstLandingPage', clean(traffic.first_landing_page)],
  ]
  const utmFieldKeys = new Set<keyof typeof KOMMO_TRACKING_FIELD_NAMES>([
    'utmSource',
    'utmMedium',
    'utmCampaign',
    'utmContent',
    'utmTerm',
  ])
  for (const [key, value] of values) {
    const includeEmptyValue = utmFieldKeys.has(key)
    if (!value && !includeEmptyValue) continue
    await ensureLeadField(config, leadFields, KOMMO_TRACKING_FIELD_NAMES[key])
  }

  const trackingFields = values
    .map(([key, value]) => ({
      fieldId: leadFields.get(KOMMO_TRACKING_FIELD_NAMES[key]),
      value,
      // Explicitly overwrite any CRM-side template value when this is a
      // direct lead without a UTM parameter.
      includeEmptyValue: utmFieldKeys.has(key),
    }))
    .filter(
      (field): field is { fieldId: number; value: string; includeEmptyValue: boolean } =>
        Boolean(field.fieldId && (field.value || field.includeEmptyValue))
    )

  const leadPayload = {
    name: getLeadName(payload, name, phone),
    pipeline_id: Number(config.pipelineId),
    ...(config.statusId ? { status_id: Number(config.statusId) } : {}),
    responsible_user_id: Number(config.responsibleUserId),
    _embedded: { contacts: [{ id: contact.id }] },
    custom_fields_values: trackingFields.map(({ fieldId, value }) => ({
      field_id: fieldId,
      values: [{ value }],
    })),
  }

  const lead = await kommoRequest<CreatedEntityResponse>(config, '/api/v4/leads', {
    method: 'POST',
    body: JSON.stringify([leadPayload]),
  })

  const leadId = getCreatedEntityId(lead, 'leads')
  if (!leadId) {
    throw createError({ statusCode: 502, statusMessage: 'Kommo did not return a lead ID' })
  }

  try {
    await kommoRequest(
      config,
      '/api/v4/leads/notes',
      {
        method: 'POST',
        body: JSON.stringify([
          {
            entity_id: leadId,
            note_type: 'common',
            params: { text: formatLeadNote(payload, payload.fields || {}) },
          },
        ]),
      },
      3_000
    )
  } catch (error) {
    console.warn('Kommo lead note was not created', error)
  }

  return { ok: true, leadId }
}

export default defineEventHandler(async event => {
  const contentType = getHeader(event, 'content-type') || ''
  const contentLength = Number(getHeader(event, 'content-length') || 0)
  if (!contentType.toLowerCase().startsWith('application/json')) {
    throw createError({ statusCode: 415, statusMessage: 'JSON request required' })
  }
  if (contentLength > MAX_LEAD_BODY_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Request is too large' })
  }

  const forwardedHost =
    getHeader(event, 'x-forwarded-host') || getHeader(event, 'host')
  if (
    !isAllowedLeadOrigin(
      getHeader(event, 'origin'),
      forwardedHost,
      process.env.NODE_ENV !== 'production'
    )
  ) {
    throw createError({ statusCode: 403, statusMessage: 'Untrusted form origin' })
  }

  const rawBody = (await readRawBody(event, 'utf8')) || ''
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_LEAD_BODY_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Request is too large' })
  }

  let payload: LeadRequest
  try {
    payload = JSON.parse(rawBody) as LeadRequest
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid JSON request' })
  }

  const requestId = getHeader(event, 'idempotency-key')
  if (
    !isValidRequestId(requestId) ||
    !isValidRequestId(payload.requestId) ||
    requestId !== payload.requestId
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Valid idempotency key required' })
  }
  if (clean(payload.website)) {
    return { ok: true, filtered: true }
  }

  const address = getClientAddress({
    'x-forwarded-for': getHeader(event, 'x-forwarded-for'),
    'x-real-ip': getHeader(event, 'x-real-ip'),
  })
  const rateKey = `lead-rate:${address.replace(/[^a-z0-9:._-]/gi, '_')}`
  const requestCount = await incrementRateLimit(
    rateKey,
    LEAD_RATE_WINDOW_SECONDS
  )
  if (requestCount > LEAD_RATE_LIMIT) {
    setResponseHeader(event, 'Retry-After', LEAD_RATE_WINDOW_SECONDS)
    throw createError({ statusCode: 429, statusMessage: 'Too many form requests' })
  }

  const stateKey = `lead-form:${requestId}`
  const existingState = await getAtomicValue(stateKey)
  const existingLeadId = getCompletedLeadId(existingState)
  if (existingLeadId) return { ok: true, leadId: existingLeadId, duplicate: true }

  const lockToken = `processing:${crypto.randomUUID()}`
  const lockAcquired = await acquireAtomicLock(stateKey, lockToken, 300)
  if (!lockAcquired) {
    const currentLeadId = getCompletedLeadId(await getAtomicValue(stateKey))
    if (currentLeadId) {
      return { ok: true, leadId: currentLeadId, duplicate: true }
    }
    throw createError({ statusCode: 409, statusMessage: 'Form request is already processing' })
  }

  try {
    const result = await createLead(payload)
    await setAtomicValue(stateKey, `completed:${result.leadId}`, 86_400)
    return result
  } catch (error) {
    await releaseAtomicLock(stateKey, lockToken).catch(() => {})
    throw error
  }
})

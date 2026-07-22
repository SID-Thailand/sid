export const MAX_LEAD_BODY_BYTES = 32_768
export const LEAD_RATE_LIMIT = 8
export const LEAD_RATE_WINDOW_SECONDS = 60

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const isValidRequestId = (value: unknown) =>
  typeof value === 'string' && UUID_RE.test(value)

export const isAllowedLeadOrigin = (
  origin: string | undefined,
  forwardedHost: string | undefined,
  isDevelopment = false
) => {
  if (!origin || !forwardedHost) return false

  try {
    const url = new URL(origin)
    const requestHost = forwardedHost.split(',')[0]?.trim().toLowerCase()
    const secureProtocol = url.protocol === 'https:' || isDevelopment

    return secureProtocol && url.host.toLowerCase() === requestHost
  } catch {
    return false
  }
}

export const getClientAddress = (headers: Record<string, string | undefined>) =>
  headers['x-forwarded-for']?.split(',')[0]?.trim() ||
  headers['x-real-ip']?.trim() ||
  'unknown'

export const isCompletedLeadState = (value: string | undefined) =>
  value?.startsWith('completed:') || false

export const getCompletedLeadId = (value: string | undefined) => {
  if (!isCompletedLeadState(value)) return undefined
  const leadId = Number(value?.slice('completed:'.length))
  return Number.isSafeInteger(leadId) && leadId > 0 ? leadId : undefined
}

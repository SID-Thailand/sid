const TRAFFIC_SOURCE_STORAGE_KEY = 'sid_traffic_source'

const TRAFFIC_SOURCE_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'wbraid',
  'gbraid',
  'fbclid',
  'yclid',
] as const

export type TrafficSource = Partial<
  Record<(typeof TRAFFIC_SOURCE_KEYS)[number], string>
> & {
  first_landing_page?: string
  first_referrer?: string
  gclientid?: string
  fbp?: string
  fbc?: string
}

const getCookie = (name: string) =>
  document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=') || ''

const getGoogleClientId = () => {
  const value = getCookie('_ga')
  const parts = value.split('.')

  return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : ''
}

const readStoredTrafficSource = (): TrafficSource => {
  try {
    const raw = window.localStorage.getItem(TRAFFIC_SOURCE_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const writeStoredTrafficSource = (value: TrafficSource) => {
  try {
    window.localStorage.setItem(TRAFFIC_SOURCE_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Ignore storage errors; current URL data can still be attached to leads.
  }
}

export const captureTrafficSource = (): TrafficSource => {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const stored = readStoredTrafficSource()
  const next: TrafficSource = {
    ...stored,
    first_landing_page: stored.first_landing_page || window.location.href,
    first_referrer: stored.first_referrer || document.referrer || '',
    gclientid: stored.gclientid || getGoogleClientId(),
    fbp: stored.fbp || getCookie('_fbp'),
    fbc: stored.fbc || getCookie('_fbc'),
  }

  let hasNewSource = false

  TRAFFIC_SOURCE_KEYS.forEach(key => {
    const value = params.get(key)
    if (value) {
      next[key] = value
      hasNewSource = true
    }
  })

  if (!next.fbc && next.fbclid) {
    next.fbc = `fb.1.${Date.now()}.${next.fbclid}`
  }

  if (hasNewSource || !stored.first_landing_page) {
    writeStoredTrafficSource(next)
  }

  return next
}

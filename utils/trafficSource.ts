const TRAFFIC_SOURCE_STORAGE_KEY = 'sid_traffic_source'

const TRAFFIC_SOURCE_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'yclid',
] as const

export type TrafficSource = Partial<
  Record<(typeof TRAFFIC_SOURCE_KEYS)[number], string>
> & {
  first_landing_page?: string
  first_referrer?: string
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
  }

  let hasNewSource = false

  TRAFFIC_SOURCE_KEYS.forEach(key => {
    const value = params.get(key)
    if (value) {
      next[key] = value
      hasNewSource = true
    }
  })

  if (hasNewSource || !stored.first_landing_page) {
    writeStoredTrafficSource(next)
  }

  return next
}

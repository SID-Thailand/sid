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
  ymclientid?: string
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
    // Attribution must not leak into a later direct visit. Keep it only while
    // the visitor stays in the current browser session.
    const raw = window.sessionStorage.getItem(TRAFFIC_SOURCE_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const writeStoredTrafficSource = (value: TrafficSource) => {
  try {
    window.sessionStorage.setItem(TRAFFIC_SOURCE_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Ignore storage errors; current URL data can still be attached to leads.
  }
}

const captureYandexClientId = (stored: TrafficSource) => {
  if (stored.ymclientid || typeof window.ym !== 'function') return

  try {
    window.ym(110873210, 'getClientID', (clientId: string) => {
      if (!clientId) return
      writeStoredTrafficSource({ ...readStoredTrafficSource(), ymclientid: clientId })
    })
  } catch {
    // The Metrika counter can be unavailable during an early page load.
  }
}


const waitForYandexClientId = () =>
  new Promise<string>(resolve => {
    const fromCookie = getCookie('_ym_uid')
    if (fromCookie) {
      resolve(fromCookie)
      return
    }

    if (typeof window.ym !== 'function') {
      resolve('')
      return
    }

    let settled = false
    const finish = (value = '') => {
      if (settled) return
      settled = true
      clearTimeout(timeout)
      resolve(value || getCookie('_ym_uid'))
    }

    const timeout = window.setTimeout(() => finish(), 1200)

    try {
      window.ym(110873210, 'getClientID', (clientId: string) => finish(clientId))
    } catch {
      finish()
    }
  })

export const captureTrafficSource = (): TrafficSource => {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const stored = readStoredTrafficSource()
  captureYandexClientId(stored)
  const next: TrafficSource = {
    ...stored,
    first_landing_page: stored.first_landing_page || window.location.href,
    first_referrer: stored.first_referrer || document.referrer || '',
    gclientid: stored.gclientid || getGoogleClientId(),
    fbp: stored.fbp || getCookie('_fbp'),
    fbc: stored.fbc || getCookie('_fbc'),
    // `_ym_uid` is available synchronously, while the Metrika callback may
    // arrive after a visitor submits a form.
    ymclientid: stored.ymclientid || getCookie('_ym_uid'),
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


export const resolveTrafficSource = async (): Promise<TrafficSource> => {
  const current = captureTrafficSource()
  if (current.ymclientid) return current

  const ymclientid = await waitForYandexClientId()
  if (!ymclientid) return current

  const next = { ...current, ymclientid }
  writeStoredTrafficSource(next)
  return next
}

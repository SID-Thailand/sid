type KommoConfig = {
  subdomain: string
  longLivedToken: string
  pipelineId: string
  statusId: string
  responsibleUserId: string
}

type KommoField = {
  id: number
  name: string
}

export const KOMMO_TRACKING_FIELD_NAMES = {
  utmSource: 'utm_source',
  utmMedium: 'utm_medium',
  utmCampaign: 'utm_campaign',
  utmContent: 'utm_content',
  utmTerm: 'utm_term',
  utmReferrer: 'utm_referrer',
  referrer: 'referrer',
  gclid: 'gclid',
  fbclid: 'fbclid',
} as const

export const getKommoConfig = (): KommoConfig => {
  const config = useRuntimeConfig().kommo as KommoConfig
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length) {
    throw createError({
      statusCode: 503,
      statusMessage: `Kommo is not configured: ${missing.join(', ')}`,
    })
  }

  return config
}

export const kommoRequest = async <T>(
  config: KommoConfig,
  path: string,
  options: RequestInit = {},
  timeoutMs = 10_000
) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  let response: Response
  try {
    response = await fetch(`https://${config.subdomain}.kommo.com${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${config.longLivedToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown request error'
    throw createError({
      statusCode: 502,
      statusMessage: `Kommo API request failed: ${message}`,
    })
  } finally {
    clearTimeout(timeout)
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw createError({
      statusCode: 502,
      statusMessage: `Kommo API error: ${response.status} ${body.slice(0, 300)}`,
    })
  }

  if (response.status === 204) {
    return {} as T
  }

  return (await response.json()) as T
}

export const getLeadFieldMap = async (config: KommoConfig) => {
  const map = new Map<string, number>()
  let path: string | undefined = '/api/v4/leads/custom_fields?limit=250'

  while (path) {
    const result = await kommoRequest<{
      _embedded?: { custom_fields?: KommoField[] }
      _links?: { next?: { href?: string } }
    }>(config, path)

    result._embedded?.custom_fields?.forEach(field => map.set(field.name, field.id))
    const nextHref = result._links?.next?.href
    path = nextHref ? new URL(nextHref).pathname + new URL(nextHref).search : undefined
  }

  return map
}

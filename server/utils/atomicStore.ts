type AtomicStoreConfig = {
  dedupeRedisUrl?: string
  dedupeRedisToken?: string
}

type RedisResponse<T> = {
  result?: T
  error?: string
}

const getAtomicStoreConfig = () => {
  const config = useRuntimeConfig().kommo as AtomicStoreConfig
  const url = String(config.dedupeRedisUrl || '').replace(/\/$/, '')
  const token = String(config.dedupeRedisToken || '')

  if (!url || !token) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Atomic delivery store is not configured',
    })
  }

  return { url, token }
}

const redisCommand = async <T>(command: Array<string | number>) => {
  const { url, token } = getAtomicStoreConfig()
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })

  const body = (await response.json().catch(() => ({}))) as RedisResponse<T>
  if (!response.ok || body.error) {
    throw createError({
      statusCode: 503,
      statusMessage: `Atomic delivery store error: ${response.status} ${body.error || ''}`.trim(),
    })
  }

  return body.result
}

export const getAtomicValue = async (key: string) =>
  (await redisCommand<string | null>(['GET', key])) || undefined

export const acquireAtomicLock = async (
  key: string,
  token: string,
  ttlSeconds: number
) =>
  (await redisCommand<string | null>([
    'SET',
    key,
    token,
    'NX',
    'EX',
    ttlSeconds,
  ])) === 'OK'

export const setAtomicValue = async (
  key: string,
  value: string,
  ttlSeconds: number
) => {
  await redisCommand<string>(['SET', key, value, 'EX', ttlSeconds])
}

export const releaseAtomicLock = async (key: string, token: string) => {
  const script =
    "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end"
  await redisCommand<number>(['EVAL', script, 1, key, token])
}

export const incrementRateLimit = async (key: string, ttlSeconds: number) => {
  const script =
    "local count = redis.call('incr', KEYS[1]); if count == 1 then redis.call('expire', KEYS[1], ARGV[1]); end; return count"
  return Number(await redisCommand<number>(['EVAL', script, 1, key, ttlSeconds]))
}

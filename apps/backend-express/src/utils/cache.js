import redis from './redis.js'

export async function getCache(key) {
  const cached = await redis.get(key)
  if (!cached) return null

  try {
    return JSON.parse(cached)
  } catch {
    return null
  }
}

export async function setCache(key, ttl, data) {
  await redis.setex(key, ttl, JSON.stringify(data))
}

export async function getOrSetCache(key, ttl, fetcher) {
  const cached = await getCache(key)
  if (cached) return cached

  const freshData = await fetcher()
  await setCache(key, ttl, freshData)
  return freshData
}

export async function invalidateCache(key) {
  await redis.del(key)
}

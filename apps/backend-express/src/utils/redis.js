import Redis from 'ioredis'

const noop = async () => null

const dummyRedis = {
  get: noop,
  set: noop,
  setex: noop,
  del: noop,
}

let redis

if (process.env.USE_REDIS === 'true') {
  redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  })
  console.log('✅ Redis ENABLED')
} else {
  redis = dummyRedis
  console.log('🔕 Redis DISABLED (local)')
}

export default redis

import jwt from 'jsonwebtoken'
import { useRuntimeConfig } from '#imports'

type AccessPayload = {
  userId: string
  tokenVersion: number
}

export const signAccessToken = (payload: AccessPayload) => {
  const config = useRuntimeConfig()

  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '15m'
  })
}

export const verifyAccessToken = (token: string) => {
  const config = useRuntimeConfig()

  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.verify(token, config.jwtSecret)
}

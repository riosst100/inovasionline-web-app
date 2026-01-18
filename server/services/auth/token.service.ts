import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.JWT_SECRET!
const ACCESS_EXPIRES = '15m'

export const signAccessToken = (payload: {
  userId: string
  role: string
  tokenVersion: number
}) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES
  })
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET)
}

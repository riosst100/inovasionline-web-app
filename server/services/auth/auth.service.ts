import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { signAccessToken } from '../../utils/jwt'
import { prisma } from '../../utils/db'

const REFRESH_EXPIRE_DAYS = 30

const hashToken = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex')

export const registerUser = async (data: {
  email: string
  password: string
  name: string
}) => {
  const exists = await prisma.user.findUnique({
    where: { email: data.email }
  })
  if (exists) {
    throw new Error('Email already registered')
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name
    }
  })
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.isActive) {
    throw new Error('Invalid credentials')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid credentials')
  }

  const accessToken = signAccessToken({
    userId: user.id,
    tokenVersion: user.tokenVersion
  })

  const refreshToken = crypto.randomBytes(40).toString('hex')

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_EXPIRE_DAYS * 86400000)
    }
  })

  return { accessToken, refreshToken }
}

export const refreshAccessToken = async (refreshToken: string) => {
  const stored = await prisma.refreshToken.findFirst({
    where: {
      tokenHash: hashToken(refreshToken),
      revokedAt: null,
      expiresAt: { gt: new Date() }
    },
    include: { user: true }
  })

  if (!stored || !stored.user.isActive) {
    throw new Error('Invalid refresh token')
  }

  // revoke old
  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date(), lastUsedAt: new Date() }
  })

  // create new refresh token (SLIDING)
  const newRefreshToken = crypto.randomBytes(40).toString('hex')

  await prisma.refreshToken.create({
    data: {
      userId: stored.userId,
      tokenHash: hashToken(newRefreshToken),
      expiresAt: new Date(Date.now() + REFRESH_EXPIRE_DAYS * 86400000)
    }
  })

  const accessToken = signAccessToken({
    userId: stored.user.id,
    tokenVersion: stored.user.tokenVersion
  })

  return { accessToken, refreshToken: newRefreshToken }
}

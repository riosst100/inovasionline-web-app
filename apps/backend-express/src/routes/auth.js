import express from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"

import prisma from "../utils/prisma.js"
import { signAccessToken, signRefreshToken } from "../utils/jwt.js"

const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const REFRESH_MAX_AGE = 30 * 24 * 60 * 60 * 1000
const isProd = process.env.NODE_ENV === "production"

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  ...(isProd && { domain: ".inovasionline.com" }),
  path: "/auth/refresh",
  maxAge: REFRESH_MAX_AGE
}

// helper
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex")

/**
 * LOGOUT
 */
router.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken

  if (token) {
    await prisma.refreshToken.updateMany({
      where: {
        tokenHash: hashToken(token),
        revokedAt: null
      },
      data: { revokedAt: new Date() }
    })
  }

  res.clearCookie("refreshToken", cookieOptions)
  res.sendStatus(204)
})

/**
 * REFRESH TOKEN (ROLLING + 1 DEVICE)
 */
router.post("/refresh", async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken
  if (!oldRefreshToken) {
    return res.status(401).json({ message: "No refresh token" })
  }

  try {
    jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET)

    const tokenHash = hashToken(oldRefreshToken)

    const stored = await prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        revokedAt: null
      },
      include: { user: true }
    })

    if (!stored) {
      return res.status(401).json({ message: "Invalid refresh token" })
    }

    // 🔥 1 USER = 1 DEVICE
    await prisma.refreshToken.updateMany({
      where: {
        userId: stored.user.id,
        revokedAt: null
      },
      data: {
        revokedAt: new Date(),
        lastUsedAt: new Date()
      }
    })

    const userPayload = { id: stored.user.id }

    const newAccessToken = signAccessToken(userPayload)
    const newRefreshToken = signRefreshToken(userPayload)

    await prisma.refreshToken.create({
      data: {
        userId: stored.user.id,
        tokenHash: hashToken(newRefreshToken),
        expiresAt: new Date(Date.now() + REFRESH_MAX_AGE)
      }
    })

    res.cookie("refreshToken", newRefreshToken, cookieOptions)
    return res.json({ accessToken: newAccessToken })
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" })
  }
})

/**
 * GOOGLE CALLBACK
 * ❗ redirect flow TETAP
 * ❗ 1 user = 1 device
 */
router.post("/google/callback", async (req, res) => {
  const credential = req.body?.credential
  if (!credential) {
    return res.redirect(`${process.env.FRONTEND_URL}/login`)
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    const email = payload.email

    if (!email) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`)
    }

    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex")
      const hashedPassword = await bcrypt.hash(randomPassword, 12)

      user = await prisma.user.create({
        data: {
          email,
          name: payload.name ?? email,
          password: hashedPassword
        }
      })
    }

    // 🔥 1 USER = 1 DEVICE (revoke semua token lama)
    await prisma.refreshToken.updateMany({
      where: {
        userId: user.id,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    })

    const refreshToken = signRefreshToken({ id: user.id })

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(refreshToken),
        expiresAt: new Date(Date.now() + REFRESH_MAX_AGE)
      }
    })

    res.cookie("refreshToken", refreshToken, cookieOptions)

    return res.redirect(`${process.env.FRONTEND_URL}/login-success`)
  } catch {
    return res.redirect(`${process.env.FRONTEND_URL}/login`)
  }
})

export default router

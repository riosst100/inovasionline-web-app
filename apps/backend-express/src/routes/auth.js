import express from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"

import prisma from "../utils/prisma.js"
import admin from "../utils/firebase.js"
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

const pendingBinds = new Map()

/**
 * SEND PUSH TO USER (by userId, using stored FCM token)
 */
router.post("/push/send", async (req, res) => {

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const tokenJwt = authHeader.replace(/^Bearer\s+/i, "").trim()

  let payload
  try {
    payload = jwt.verify(tokenJwt, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }

  const senderUserId = payload.id

  /**
   * body:
   * {
   *   "userId": "...",   // target user id
   *   "title": "...",
   *   "body": "...",
   *   "data": { ... }   // optional
   * }
   */
  const { userId, title, body, data } = req.body

  if (!userId || !title || !body) {
    return res.status(400).json({
      message: "userId, title, body required"
    })
  }

  try {

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fcmToken: true }
    })

    if (!user || !user.fcmToken) {
      return res.status(404).json({
        message: "User does not have FCM token"
      })
    }

    const message = {
      token: user.fcmToken,
      notification: {
        title,
        body
      },
      data: data
        ? Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, String(v)])
          )
        : undefined,
      android: {
        priority: "high"
      }
    }

    const response = await admin.messaging().send(message)

    return res.json({
      success: true,
      messageId: response
    })

  } catch (err) {

    console.error(err)

    // FCM token invalid / not registered anymore
    if (
      err?.errorInfo?.code === "messaging/registration-token-not-registered" ||
      err?.code === "messaging/registration-token-not-registered"
    ) {
      // optional: bersihkan token di database
      await prisma.user.update({
        where: { id: userId },
        data: { fcmToken: null }
      })

      return res.status(410).json({
        message: "FCM token not valid anymore"
      })
    }

    console.error("FCM ERROR =", err)

    return res.status(500).json({
      message: err?.message || "Failed to send push notification",
      code: err?.code,
      info: err?.errorInfo
    })
  }
})


// REGISTER DEVICE FCM TOKEN
router.post("/push/register-device", async (req, res) => {

  const { token } = req.body

  console.log('REGISTER DEVICE')
  console.log('token: ' + token)

  if (!token) {
    return res.status(400).json({ message: "token required" })
  }

  const code = crypto.randomBytes(16).toString("hex")

  console.log('code: ' + code)

  pendingBinds.set(code, token)

  return res.json({ code })
})

// ATTACH FCM TOKEN TO USER
router.post("/push/attach", async (req, res) => {

  const { code } = req.body

  if (!code) {
    return res.status(400).json({ message: "code required" })
  }

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const tokenJwt = authHeader.replace(/^Bearer\s+/i, "").trim()

  let payload
  try {
    payload = jwt.verify(tokenJwt, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }

  const userId = payload.id

  const token = pendingBinds.get(code)

  if (!token) {
    return res.status(400).json({ message: "invalid / expired code" })
  }

  try {

    await prisma.user.update({
      where: { id: userId },
      data: { fcmToken: token }
    })

    pendingBinds.delete(code)

    return res.json({ success: true })

  } catch (err) {

    if (err.code === "P2002") {
      return res.status(409).json({
        message: "FCM token already used"
      })
    }

    console.error(err)
    return res.status(500).json({ message: "Internal error" })
  }
})

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

router.get("/mobile-bridge", async (req, res) => {

  const token = req.query.token
  if (!token) {
    return res.redirect(`${process.env.FRONTEND_URL}/login`)
  }

  try {

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: { id: payload.id }
    })

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`)
    }

    // 🔥 revoke semua refresh lama (1 device)
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

  } catch (err) {
    console.error(err)
    return res.redirect(`${process.env.FRONTEND_URL}/login`)
  }
})


router.post("/google/native", async (req, res) => {
  const { idToken } = req.body
  if (!idToken) {
    return res.status(400).json({ message: "idToken required" })
  }

  try {

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    const email = payload.email
    const googleId = payload.sub
    const name = payload.name ?? email
    const avatar = payload.picture ?? null

    let user = await prisma.user.findUnique({
      where: { googleId }
    })

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email }
      })
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: "GOOGLE",
          googleId,
          avatar,
          authProvider: "google"
        }
      })
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          avatar,
          authProvider: "google"
        }
      })
    }

    // 🔥 hanya kirim accessToken sementara
    const accessToken = signAccessToken({ id: user.id })

    return res.json({
      accessToken
    })

  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: "Invalid Google token" })
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

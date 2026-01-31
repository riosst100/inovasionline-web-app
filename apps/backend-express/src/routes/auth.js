import express from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import { signAccessToken, signRefreshToken } from "../utils/jwt.js"

const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const REFRESH_MAX_AGE = 30 * 24 * 60 * 60 * 1000
const isProd = process.env.NODE_ENV === "production"

const cookieOptions = {
  httpOnly: true,
  secure: isProd,                     // 🔑 LOCAL = false | PROD = true
  sameSite: isProd ? "none" : "lax",  // 🔑 penting
  ...(isProd && { domain: ".inovasionline.com" }),
  path: "/auth/refresh",
  maxAge: REFRESH_MAX_AGE
}

/**
 * LOGOUT
 */
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", cookieOptions)
  res.sendStatus(204)
})

/**
 * REFRESH TOKEN (ROLLING)
 */
router.post("/refresh", (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken
  if (!oldRefreshToken) {
    return res.status(401).json({ message: "No refresh token" })
  }

  try {
    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.JWT_REFRESH_SECRET
    )

    const user = { id: decoded.id }

    const newAccessToken = signAccessToken(user)
    const newRefreshToken = signRefreshToken(user)

    res.cookie("refreshToken", newRefreshToken, cookieOptions)

    return res.json({ accessToken: newAccessToken })
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" })
  }
})

/**
 * GOOGLE CALLBACK
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
    const refreshToken = signRefreshToken({ id: payload.sub })

    res.cookie("refreshToken", refreshToken, cookieOptions)

    return res.redirect(`${process.env.FRONTEND_URL}/login-success`)
  } catch {
    return res.redirect(`${process.env.FRONTEND_URL}/login`)
  }
})

export default router

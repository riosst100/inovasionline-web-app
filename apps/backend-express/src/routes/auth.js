import express from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import { signAccessToken, signRefreshToken } from "../utils/jwt.js"

const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const isProd = process.env.NODE_ENV === "production"

const cookieOptions = {
  httpOnly: true,
  secure: isProd,        // WAJIB true di TWA (HTTPS)
  sameSite: "none",      // WAJIB untuk TWA
  path: "/"
}

/**
 * LOGOUT
 */
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", cookieOptions)
  return res.sendStatus(204)
})

/**
 * REFRESH ACCESS TOKEN
 */
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" })
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    )

    const user = {
      id: decoded.id
    }

    // FLOW TETAP: cuma generate access token baru
    const accessToken = signAccessToken(user)

    return res.json({ accessToken })
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" })
  }
})

/**
 * GOOGLE LOGIN
 */
router.post("/google", async (req, res) => {
  const { credential } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name
    }

    const accessToken = signAccessToken(user)
    const refreshToken = signRefreshToken({ id: user.id })

    // SIMPAN REFRESH TOKEN DI COOKIE (TWA SAFE)
    res.cookie("refreshToken", refreshToken, cookieOptions)

    return res.json({ accessToken })
  } catch (err) {
    return res.status(401).json({ message: "Invalid Google token" })
  }
})

export default router

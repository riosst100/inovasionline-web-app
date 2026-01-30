import express from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import { signAccessToken, signRefreshToken } from "../utils/jwt.js"

const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    path: "/auth/refresh"
  })

  res.sendStatus(204)
})


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
      // fetch user dari DB kalau perlu
    }

    const accessToken = signAccessToken(user)

    res.json({ accessToken })
  } catch {
    res.status(401).json({ message: "Invalid refresh token" })
  }
})


router.post("/google", async (req, res) => {
  const { credential } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    }

    const accessToken = signAccessToken(user)
    const refreshToken = signRefreshToken({ id: user.id })

    // 🍪 simpan refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true di production (https)
      sameSite: "lax",
      path: "/auth/refresh"
    })

    res.json({ accessToken })
  } catch {
    res.status(401).json({ message: "Invalid Google token" })
  }
})

export default router

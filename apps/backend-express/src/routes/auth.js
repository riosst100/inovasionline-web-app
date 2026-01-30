import express from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"

const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post("/google", async (req, res) => {
  const { credential } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    const user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    }

    const appToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.json({ token: appToken, user })
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "Invalid Google token" })
  }
})

export default router

import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

const router = express.Router()

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.redirect(
      `http://localhost:3000/login-success?token=${token}`
    )
  }
)

export default router

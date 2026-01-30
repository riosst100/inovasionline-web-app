import express from 'express'
import compression from 'compression'
import passport from 'passport'
import cors from 'cors'
import homepageRoutes from './routes/homepage.route.js'
import authRoutes from "./routes/auth.js"
import "./auth/google.js"

const app = express()

app.use(cors({
  origin: [
    process.env.FRONTEND_URL
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

app.use(express.json())
app.use(compression())
app.use(passport.initialize())

app.use('/api', homepageRoutes)
app.use("/auth", authRoutes)
app.get('/health', (_, res) => res.send('OK'))

export default app

import express from 'express'
import compression from 'compression'
import passport from 'passport'
import cors from 'cors'
import homepageRoutes from './routes/homepage.route.js'
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import categoriesRoute from './routes/categories.js'
import sellerRoute from './routes/seller.js'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(passport.initialize())

app.set('trust proxy', 1)

app.use('/api', homepageRoutes)
app.use('/auth', authRoutes)
app.use('/api/categories', categoriesRoute)
app.use('/api/seller', sellerRoute)
app.get('/health', (_, res) => res.send('OK'))

export default app

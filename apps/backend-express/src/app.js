import express from 'express'
import compression from 'compression'
import passport from 'passport'
import cors from 'cors'
import homepageRoutes from './routes/homepage.route.js'
import authRoutes from "./routes/auth.js"
import "./auth/google.js"

const app = express()

app.use(compression())

app.use('/api', cors(), express.json(), homepageRoutes)

app.use(passport.initialize())

app.use("/auth", authRoutes)

app.get('/health', (_, res) => res.send('OK'))

export default app

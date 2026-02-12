import express from 'express'
import compression from 'compression'
import passport from 'passport'
import cors from 'cors'
import homepageRoutes from './routes/homepage.route.js'
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import categoriesRoute from './routes/categories.js'
import sellerRoute from './routes/seller.js'

import admin from 'firebase-admin'
import fs from 'fs'

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL('../serviceAccountKey.json', import.meta.url))
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

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

// ============================
// PUSH NOTIFICATION PART
// ============================

// SIMPEL DEMO (memory only)
let tokens = []

// simpan token
app.post('/register-token', (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ message: 'token required' })
  }

  if (!tokens.includes(token)) {
    tokens.push(token)
  }

  console.log('Registered tokens:', tokens.length)

  res.json({ success: true })
})

// kirim push ke semua token
app.post('/send-notification', async (req, res) => {

  console.log('TOKENS:', tokens)

  const { title, body } = req.body

  const message = {
  data: {
    title: title || 'Notif',
    body: body || 'Halo dari Express'
  }
}


  const results = await Promise.allSettled(
    tokens.map(token =>
      admin.messaging().send({
        ...message,
        token
      })
    )
  )

  results.forEach((r, index) => {
    if (r.status === 'rejected') {
      const err = r.reason

      if (
        err?.errorInfo?.code === 'messaging/registration-token-not-registered'
      ) {
        console.log('Remove invalid token:', tokens[index])
        tokens.splice(index, 1)
      }
    }
  })

  res.json({
    success: true,
    sent: results.filter(r => r.status === 'fulfilled').length,
    failed: results.filter(r => r.status === 'rejected').length
  })
})


export default app

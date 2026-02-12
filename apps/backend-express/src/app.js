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

  console.log('REGISTER FROM DEVICE:', token)

  if (!token) {
    return res.status(400).json({ message: 'token required' })
  }

  if (!tokens.includes(token)) {
    tokens.push(token)
  }

  console.log('Registered tokens:', tokens.length)

  res.json({ success: true })
})


// kirim push (bisa ke 1 device / semua device)
app.post('/send-notification', async (req, res) => {

  const { title, body, token: targetToken } = req.body

  // kalau ada token → kirim ke device itu saja
  const targetTokens = targetToken
    ? tokens.filter(t => t === targetToken)
    : tokens

  console.log('TARGET TOKENS:', targetTokens)

  if (!targetTokens.length) {
    return res.json({
      success: true,
      sent: 0,
      failed: 0,
      message: 'No target token'
    })
  }

  const message = {
    data: {
      title: title || 'Notif',
      body: body || 'Pesan baru'
    }
  }

  const results = await Promise.allSettled(
    targetTokens.map(token =>
      admin.messaging().send({
        ...message,
        token
      })
    )
  )

  // bersihin token mati
  results.forEach((r, index) => {
    if (r.status === 'rejected') {
      const err = r.reason

      if (
        err?.errorInfo?.code === 'messaging/registration-token-not-registered'
      ) {
        const deadToken = targetTokens[index]
        tokens = tokens.filter(t => t !== deadToken)

        console.log('Remove invalid token:', deadToken)
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

import express from 'express'
import cors from 'cors'
import homepageRoutes from './routes/homepage.route.js'

const app = express()

app.use('/api', cors(), express.json(), homepageRoutes)

app.get('/health', (_, res) => res.send('OK'))

export default app

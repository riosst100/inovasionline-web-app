import express from 'express'
import cors from 'cors'
import homepageRoutes from './routes/homepage.route.js'
import compression from 'compression'

const app = express()

app.use(compression())
app.use(cors())
app.use(express.json())

app.use('/api', homepageRoutes)

export default app

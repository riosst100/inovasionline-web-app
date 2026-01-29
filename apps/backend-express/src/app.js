import express from 'express'
import cors from 'cors'
import homepageRoutes from './routes/homepage.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', homepageRoutes)

export default app

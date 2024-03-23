import 'express-async-errors' // import on the top server file
import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import cloudinary from 'cloudinary'

const port = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

app.use(express.static(path.resolve(__dirname, './public')))
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' })
})
app.use('*', (req, res, next) => {
  // res.status(404).json({ msg: 'resource not found' })
  res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.use(errorHandlerMiddleware)

try {
  await mongoose.connect(process.env.MONGO_URI)
  app.listen(port, () => console.log(`server is running on port ${port}`))
} catch (error) {
  console.log(error)
  process.exit(1)
}

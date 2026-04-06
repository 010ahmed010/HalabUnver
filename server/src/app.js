const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const rateLimit = require('express-rate-limit')

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const courseRoutes = require('./routes/course.routes')
const libraryRoutes = require('./routes/library.routes')
const freelanceRoutes = require('./routes/freelance.routes')
const storeRoutes = require('./routes/store.routes')
const transactionRoutes = require('./routes/transaction.routes')
const notificationRoutes = require('./routes/notification.routes')
const adRoutes = require('./routes/ad.routes')
const adminRoutes = require('./routes/admin.routes')
const configRoutes = require('./routes/config.routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(helmet())
app.use(compression())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  'http://localhost:5000',
  'http://localhost:5173',
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    if (allowedOrigins.includes(origin)) return cb(null, true)
    if (origin.includes('.replit.dev') || origin.includes('.repl.co')) return cb(null, true)
    cb(new Error(`CORS: ${origin} not allowed`))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts, please try again later.' },
})
app.use('/api', globalLimiter)
app.use('/api/auth', authLimiter)

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'HalabUnver API is running.', env: process.env.NODE_ENV })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/library', libraryRoutes)
app.use('/api/freelance', freelanceRoutes)
app.use('/api/store', storeRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/ads', adRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/config', configRoutes)

app.use(errorHandler)

module.exports = app

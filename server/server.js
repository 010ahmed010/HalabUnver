require('dotenv').config()
const connectDB = require('./src/config/db')
const app = require('./src/app')

const PORT = process.env.PORT || 8000

const start = async () => {
  await connectDB()
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] HalabUnver API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
  })
}

start()

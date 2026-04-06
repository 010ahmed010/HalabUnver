const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('[DB] MONGODB_URI is not set. Check your .env file.')
    process.exit(1)
  }

  let retries = 5
  while (retries) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
      })
      console.log(`[DB] MongoDB Atlas connected: ${mongoose.connection.host}`)
      return
    } catch (err) {
      retries -= 1
      console.error(`[DB] Connection failed. Retries left: ${retries}. Error: ${err.message}`)
      if (!retries) {
        console.error('[DB] All retries exhausted. Exiting.')
        process.exit(1)
      }
      await new Promise(r => setTimeout(r, 3000))
    }
  }
}

module.exports = connectDB

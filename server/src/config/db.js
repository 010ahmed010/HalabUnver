const mongoose = require('mongoose')

let _memServer = null

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://newcloudstuff_db_user:BjvBgakv7204v0CT@halabunver.ngclrak.mongodb.net/halabUnver?appName=HalabUnver'

  let retries = 5
  while (retries) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
      console.log(`[DB] MongoDB Atlas connected: ${mongoose.connection.host}`)
      await seedDefaultConfig()
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

const seedDefaultConfig = async () => {
  try {
    const SystemConfig = require('../models/SystemConfig')
    const existing = await SystemConfig.findOne({ key: 'global' })
    if (!existing) {
      await SystemConfig.create({
        key: 'global',
        heroHeadline: 'منصتك الأكاديمية',
        heroSubline: 'تعلّم · اكسب · ابنِ مستقبلك',
        searchQuickTags: [
          { label: 'المكتبة', url: '/library' },
          { label: 'الأكاديمية', url: '/academy' },
          { label: 'المستقلون', url: '/freelance' },
          { label: 'المتجر', url: '/store' },
        ],
        subscriptionFee: 5,
        adsConfig: {
          adsActive: true,
          providerMode: 'LOCAL_BANNERS',
          zoneHeader: 'local',
          zoneSidebar: 'local',
          zoneInFeed: 'local',
        },
      })
      console.log('[DB] Default SystemConfig seeded.')
    }
  } catch (err) {
    console.error('[DB] Config seed error:', err.message)
  }
}

module.exports = connectDB

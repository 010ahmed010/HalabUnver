const mongoose = require('mongoose')

const systemConfigSchema = new mongoose.Schema({
  key: { type: String, default: 'global', unique: true },
  heroHeadline: { type: String, default: 'منصتك الأكاديمية' },
  heroSubline: { type: String, default: 'تعلّم · اكسب · ابنِ مستقبلك' },
  searchQuickTags: [{
    label: String,
    url: String,
  }],
  showMotto: { type: Boolean, default: true },

  isExamSeason: { type: Boolean, default: false },
  examSeasonMessage: { type: String, default: '' },
  seasonAdvice: { type: String, default: 'حمّل الملخصات، شاهد المراجعات، ونظّم وقتك.' },
  reviewSessions: [{
    title: { type: String, required: true },
    branch: { type: String, default: 'عامة' },
    duration: { type: String, default: '' },
    type: { type: String, enum: ['LIVE', 'VIDEO', 'PDF'], default: 'VIDEO' },
    url: { type: String, default: '' },
  }],

  isMaintenanceMode: { type: Boolean, default: false },
  maintenanceMessage: { type: String, default: 'الموقع قيد الصيانة — نعود قريباً.' },

  alertBar: {
    isActive: { type: Boolean, default: false },
    text: { type: String, default: '' },
    color: { type: String, enum: ['rose', 'indigo', 'emerald'], default: 'indigo' },
  },

  freePromoActive: { type: Boolean, default: false },
  promoEndDate: { type: Date, default: null },
  subscriptionFee: { type: Number, default: 5 },

  accentColor: { type: String, default: '#6366F1' },
  accentColor2: { type: String, default: '#8B5CF6' },
  glassmorphismIntensity: { type: Number, default: 20, min: 0, max: 40 },

  contactEmail: { type: String, default: 'support@halabunver.sy' },
  contactPhone: { type: String, default: '+963 999 000 111' },
  contactLocation: { type: String, default: 'جامعة حلب — سوريا' },

  socialLinks: {
    whatsapp: { type: String, default: 'https://wa.me/963999000111' },
    whatsappDisplay: { type: String, default: '+963 999 000 111' },
    telegram: { type: String, default: 'https://t.me/HalabUnver' },
    telegramUsername: { type: String, default: '@HalabUnver' },
    facebook: { type: String, default: 'https://facebook.com/HalabUnver' },
  },
  shamCashQrUrl: { type: String, default: '' },
  shamCashPaymentNote: { type: String, default: 'أرسل المبلغ وأرفق رقم المعاملة مع طلبك.' },
  googleMapsUrl: { type: String, default: '' },

  adsConfig: {
    adsActive: { type: Boolean, default: true },
    providerMode: { type: String, enum: ['LOCAL_BANNERS', 'GOOGLE_ADSENSE', 'HYBRID'], default: 'LOCAL_BANNERS' },
    zoneHeader: { type: String, enum: ['local', 'disabled'], default: 'local' },
    zoneSidebar: { type: String, enum: ['local', 'disabled'], default: 'local' },
    zoneInFeed: { type: String, enum: ['local', 'disabled'], default: 'local' },
  },
}, { timestamps: true })

module.exports = mongoose.model('SystemConfig', systemConfigSchema)

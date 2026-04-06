const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },

  accountType: {
    type: String,
    enum: ['student', 'business', 'admin'],
    required: true,
  },
  businessType: {
    type: String,
    enum: ['vendor', 'advertiser', 'freelancer', null],
    default: null,
  },

  faculty: { type: String, default: null },
  year: { type: String, default: null },
  bio: { type: String, default: '', maxlength: 500 },
  avatar: { type: String, default: null },

  isVerified: { type: Boolean, default: false },
  isFreelancer: { type: Boolean, default: false },
  universityIdPhoto: { type: String, default: null },
  verificationStatus: {
    type: String,
    enum: ['none', 'pending', 'approved', 'rejected'],
    default: 'none',
  },

  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  skills: [{ type: String, trim: true }],

  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },

  profileVisibility: {
    showXp: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: false },
    publicProfile: { type: Boolean, default: true },
  },

  status: {
    type: String,
    enum: ['active', 'pending', 'frozen', 'rejected'],
    default: function () {
      return this.accountType === 'business' ? 'pending' : 'active'
    },
  },

  virtualWalletBalance: { type: Number, default: 0 },

  notificationSettings: {
    pushEnabled: { type: Boolean, default: true },
    whatsappEnabled: { type: Boolean, default: false },
    emailFrequency: { type: String, enum: ['instant', 'daily', 'weekly'], default: 'instant' },
  },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.toPublicJSON = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.__v
  return obj
}

userSchema.index({ accountType: 1, status: 1 })
userSchema.index({ email: 1 })

module.exports = mongoose.model('User', userSchema)

const User = require('../models/User')

const XP_REWARDS = {
  register: 100,
  verify_identity: 500,
  library_download: 25,
  complete_lesson: 50,
  complete_course: 200,
  first_order: 100,
  complete_contract: 150,
}

const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 100))

const awardXP = async (userId, action, amount = null) => {
  const xpGain = amount !== null ? amount : (XP_REWARDS[action] || 0)
  if (xpGain === 0) return null

  const user = await User.findById(userId)
  if (!user || user.accountType !== 'student') return null

  user.xp += xpGain
  user.level = calculateLevel(user.xp)
  await user.save()

  return { xp: user.xp, level: user.level, gained: xpGain }
}

module.exports = { awardXP, calculateLevel, XP_REWARDS }

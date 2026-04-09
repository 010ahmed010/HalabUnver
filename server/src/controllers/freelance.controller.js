const User = require('../models/User')
const FreelancerProfile = require('../models/FreelancerProfile')
const FreelancerService = require('../models/FreelancerService')
const ServiceContract = require('../models/ServiceContract')
const Transaction = require('../models/Transaction')
const { sendNotification } = require('../utils/sendNotification')
const logActivity = require('../utils/logActivity')

exports.getProfiles = async (req, res, next) => {
  try {
    const { category, type, sort = '-powerScore', page = 1, limit = 12 } = req.query
    const filter = { isVisible: true }

    let userFilter = {}
    if (type === 'student') userFilter = { accountType: 'student', isFreelancer: true }
    else if (type === 'external') userFilter = { accountType: 'business', businessType: 'freelancer', status: 'active' }
    else userFilter = {
      $or: [
        { accountType: 'student', isFreelancer: true },
        { accountType: 'business', businessType: 'freelancer', status: 'active' },
      ]
    }

    const eligibleUsers = await User.find(userFilter).select('_id')
    const eligibleIds = eligibleUsers.map(u => u._id)
    filter.userId = { $in: eligibleIds }

    const total = await FreelancerProfile.countDocuments(filter)
    const profiles = await FreelancerProfile.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('userId', 'name avatar accountType businessType isVerified faculty year xp level')

    res.json({ success: true, total, page: Number(page), data: profiles })
  } catch (err) { next(err) }
}

exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await FreelancerProfile.findOne({ userId: req.params.id })
      .populate('userId', 'name avatar accountType businessType isVerified faculty year xp level skills')
    if (!profile) return res.status(404).json({ success: false, message: 'الملف غير موجود.' })
    const services = await FreelancerService.find({ freelancerId: req.params.id, isVisible: true })
    res.json({ success: true, data: { profile, services } })
  } catch (err) { next(err) }
}

exports.createOrUpdateProfile = async (req, res, next) => {
  try {
    const { title, bio, skills, disciplines, portfolio, availability } = req.body
    const profile = await FreelancerProfile.findOneAndUpdate(
      { userId: req.user._id },
      { title, bio, skills, disciplines, portfolio, availability },
      { new: true, upsert: true, runValidators: true }
    )
    res.json({ success: true, data: profile })
  } catch (err) { next(err) }
}

exports.getLeaderboard = async (req, res, next) => {
  try {
    const { category, type, sort = '-powerScore', timeline = 'all', page = 1, limit = 100 } = req.query
    const filter = { isVisible: true }

    let userFilter = {
      $or: [
        { accountType: 'student', isFreelancer: true },
        { accountType: 'business', businessType: 'freelancer', status: 'active' },
      ]
    }
    const users = await User.find(userFilter).select('_id')
    filter.userId = { $in: users.map(u => u._id) }

    const profiles = await FreelancerProfile.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('userId', 'name avatar accountType businessType isVerified xp level')

    const ranked = profiles.map((p, idx) => ({ ...p.toObject(), rank: ((page - 1) * limit) + idx + 1 }))
    res.json({ success: true, data: ranked })
  } catch (err) { next(err) }
}

exports.getServices = async (req, res, next) => {
  try {
    const { category, level, minPrice, maxPrice, deliveryDays, sort = '-rating', page = 1, limit = 12, type, own } = req.query

    let filter = {}
    if (own === 'true') {
      filter.freelancerId = req.user?._id
    } else {
      filter.isVisible = true
      if (category) filter.category = category
      if (level) filter.level = level
      if (minPrice || maxPrice) filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
      if (deliveryDays) filter.deliveryDays = { $lte: Number(deliveryDays) }

      if (type) {
        let userFilter = {}
        if (type === 'student') userFilter = { accountType: 'student', isFreelancer: true }
        else if (type === 'external') userFilter = { accountType: 'business', businessType: 'freelancer' }
        const users = await User.find(userFilter).select('_id')
        filter.freelancerId = { $in: users.map(u => u._id) }
      }
    }

    const total = await FreelancerService.countDocuments(filter)
    const services = await FreelancerService.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('freelancerId', 'name avatar accountType businessType isVerified')

    res.json({ success: true, total, page: Number(page), data: services })
  } catch (err) { next(err) }
}

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await FreelancerService.findById(req.params.id).populate('freelancerId', 'name avatar accountType businessType isVerified')
    if (!service || !service.isVisible) return res.status(404).json({ success: false, message: 'الخدمة غير موجودة.' })
    res.json({ success: true, data: service })
  } catch (err) { next(err) }
}

exports.createService = async (req, res, next) => {
  try {
    const service = await FreelancerService.create({ ...req.body, freelancerId: req.user._id })
    res.status(201).json({ success: true, data: service })
  } catch (err) { next(err) }
}

exports.updateService = async (req, res, next) => {
  try {
    const service = await FreelancerService.findOne({ _id: req.params.id, freelancerId: req.user._id })
    if (!service) return res.status(404).json({ success: false, message: 'الخدمة غير موجودة.' })
    Object.assign(service, req.body)
    await service.save()
    res.json({ success: true, data: service })
  } catch (err) { next(err) }
}

exports.deleteService = async (req, res, next) => {
  try {
    const query = req.user.accountType === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, freelancerId: req.user._id }
    const service = await FreelancerService.findOneAndDelete(query)
    if (!service) return res.status(404).json({ success: false, message: 'الخدمة غير موجودة.' })
    res.json({ success: true, message: 'تم حذف الخدمة.' })
  } catch (err) { next(err) }
}

exports.startOnboarding = async (req, res, next) => {
  try {
    if (req.user.accountType !== 'student') return res.status(403).json({ success: false, message: 'هذه الخطوة مخصصة للطلاب فقط.' })
    if (!req.user.isVerified) return res.status(400).json({ success: false, message: 'يجب التحقق من هويتك الجامعية أولاً.' })
    if (req.user.isFreelancer) return res.status(400).json({ success: false, message: 'أنت مسجّل بالفعل كمستقل.' })

    let profile = await FreelancerProfile.findOne({ userId: req.user._id })
    if (!profile) {
      profile = await FreelancerProfile.create({ userId: req.user._id, subscriptionStatus: 'pending_payment' })
    } else {
      profile.subscriptionStatus = 'pending_payment'
      await profile.save()
    }

    res.json({ success: true, message: 'انتقل إلى المحفظة لإتمام الدفع.', data: profile })
  } catch (err) { next(err) }
}

exports.getContracts = async (req, res, next) => {
  try {
    const { status, role } = req.query
    const filter = {}
    if (role === 'client') filter.clientId = req.user._id
    else if (role === 'freelancer') filter.freelancerId = req.user._id
    else filter.$or = [{ clientId: req.user._id }, { freelancerId: req.user._id }]
    if (status) filter.status = status

    const contracts = await ServiceContract.find(filter)
      .populate('clientId', 'name avatar')
      .populate('freelancerId', 'name avatar accountType businessType')
      .populate('serviceId', 'title price')
      .sort('-createdAt')

    res.json({ success: true, data: contracts })
  } catch (err) { next(err) }
}

exports.createContract = async (req, res, next) => {
  try {
    const { freelancerId, serviceId, title, description, amount, deadline, isBid } = req.body
    const contract = await ServiceContract.create({
      clientId: req.user._id,
      freelancerId, serviceId, title, description, amount, deadline, isBid,
      status: 'awaiting_payment',
    })

    await sendNotification({
      recipientId: freelancerId, senderType: 'freelance', category: 'contracts',
      title: 'طلب خدمة جديد 💼',
      body: `وصلك طلب جديد: "${title}". راجع التفاصيل في عقودك.`,
      actionUrl: '/dashboard/contracts',
    })

    res.status(201).json({ success: true, data: contract })
  } catch (err) { next(err) }
}

exports.updateContract = async (req, res, next) => {
  try {
    const contract = await ServiceContract.findById(req.params.id)
    if (!contract) return res.status(404).json({ success: false, message: 'العقد غير موجود.' })

    const isParty = contract.clientId.equals(req.user._id) || contract.freelancerId.equals(req.user._id)
    const isAdmin = req.user.accountType === 'admin'
    if (!isParty && !isAdmin) return res.status(403).json({ success: false, message: 'غير مسموح.' })

    const { status, submittedFiles, clientApproved, adminApproved, disputeReason } = req.body

    if (status) contract.status = status
    if (submittedFiles) contract.submittedFiles.push(...submittedFiles)
    if (clientApproved !== undefined) contract.clientApproved = clientApproved
    if (adminApproved !== undefined) contract.adminApproved = adminApproved
    if (disputeReason) contract.disputeReason = disputeReason

    if (contract.clientApproved && contract.adminApproved && contract.status !== 'completed') {
      contract.status = 'completed'
      contract.escrowReleasedAt = new Date()
      await FreelancerProfile.findOneAndUpdate(
        { userId: contract.freelancerId },
        { $inc: { totalJobs: 1 } }
      )
      await FreelancerService.findByIdAndUpdate(contract.serviceId, { $inc: { totalOrders: 1, ordersInQueue: -1 } })
      await sendNotification({
        recipientId: contract.freelancerId, senderType: 'freelance', category: 'financial',
        title: 'تم الإفراج عن الدفع 💸',
        body: `تم إتمام عقد "${contract.title}" وتحرير المبلغ إلى محفظتك.`,
      })
    }

    await contract.save()
    res.json({ success: true, data: contract })
  } catch (err) { next(err) }
}

exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment, contractId } = req.body
    const service = await FreelancerService.findById(req.params.id)
    if (!service) return res.status(404).json({ success: false, message: 'الخدمة غير موجودة.' })

    const profile = await FreelancerProfile.findOne({ userId: service.freelancerId })
    if (!profile) return res.status(404).json({ success: false, message: 'الملف غير موجود.' })

    profile.reviews.push({ clientId: req.user._id, rating, comment, contractId })
    const totalRating = profile.reviews.reduce((sum, r) => sum + r.rating, 0)
    profile.rating = totalRating / profile.reviews.length
    profile.ratingCount = profile.reviews.length
    profile.powerScore = (profile.rating * 20) + Math.min(profile.totalJobs * 2, 40) + (profile.successRate * 0.4)
    await profile.save()

    service.rating = profile.rating
    service.ratingCount = profile.ratingCount
    await service.save()

    res.json({ success: true, rating: profile.rating })
  } catch (err) { next(err) }
}

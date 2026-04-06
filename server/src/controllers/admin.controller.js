const User = require('../models/User')
const Order = require('../models/Order')
const Transaction = require('../models/Transaction')
const ServiceContract = require('../models/ServiceContract')
const AdCampaign = require('../models/AdCampaign')
const ActivityLog = require('../models/ActivityLog')
const Course = require('../models/Course')
const LibraryDocument = require('../models/LibraryDocument')

exports.getStats = async (req, res, next) => {
  try {
    const [
      totalUsers, activeStudents, activeBusinesses,
      pendingVerifications, pendingBusinessApprovals,
      totalOrders, pendingTransactions,
      totalCourses, totalDocuments,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ accountType: 'student', status: 'active' }),
      User.countDocuments({ accountType: 'business', status: 'active' }),
      User.countDocuments({ accountType: 'student', verificationStatus: 'pending' }),
      User.countDocuments({ accountType: 'business', status: 'pending' }),
      Order.countDocuments(),
      Transaction.countDocuments({ status: 'pending' }),
      Course.countDocuments({ isVisible: true }),
      LibraryDocument.countDocuments({ isVisible: true }),
    ])

    res.json({
      success: true,
      data: {
        totalUsers,
        activeStudents,
        activeBusinesses,
        pendingVerifications,
        pendingBusinessApprovals,
        totalOrders,
        pendingTransactions,
        totalCourses,
        totalDocuments,
      },
    })
  } catch (err) { next(err) }
}

exports.getActivityLog = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query
    const logs = await ActivityLog.find()
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('adminId', 'name')
    const total = await ActivityLog.countDocuments()
    res.json({ success: true, total, data: logs })
  } catch (err) { next(err) }
}

exports.getRevenueStats = async (req, res, next) => {
  try {
    const [storeRevenue, freelanceSubRevenue, adRevenue, escrowTotal, pendingEscrow] = await Promise.all([
      Transaction.aggregate([
        { $match: { type: 'store_order', status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Transaction.aggregate([
        { $match: { type: 'freelance_subscription', status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      AdCampaign.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, campaigns: { $sum: 1 } } },
      ]),
      ServiceContract.aggregate([
        { $match: { status: { $in: ['in_escrow', 'in_progress', 'under_review'] } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      ServiceContract.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ])

    res.json({
      success: true,
      data: {
        storeRevenue: storeRevenue[0]?.total || 0,
        freelanceSubRevenue: freelanceSubRevenue[0]?.total || 0,
        activeAdCampaigns: adRevenue[0]?.campaigns || 0,
        escrowHolding: escrowTotal[0]?.total || 0,
        escrowReleased: pendingEscrow[0]?.total || 0,
      },
    })
  } catch (err) { next(err) }
}

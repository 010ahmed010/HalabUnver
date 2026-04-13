const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Course = require('../models/Course')
const LibraryDocument = require('../models/LibraryDocument')
const Product = require('../models/Product')
const FreelancerProfile = require('../models/FreelancerProfile')

router.get('/', async (req, res, next) => {
  try {
    const [registeredStudents, libraryDocuments, courses, activeFreelancers, storeProducts] = await Promise.all([
      User.countDocuments({ accountType: 'student' }),
      LibraryDocument.countDocuments({ isVisible: true }),
      Course.countDocuments({ isVisible: true }),
      FreelancerProfile.countDocuments({ isVisible: true }),
      Product.countDocuments({ approvalStatus: 'approved', isVisible: true }),
    ])
    res.json({
      success: true,
      data: {
        registeredStudents,
        libraryDocuments,
        courses,
        activeFreelancers,
        storeProducts,
      },
    })
  } catch (err) { next(err) }
})

module.exports = router

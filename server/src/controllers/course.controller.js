const Course = require('../models/Course')
const Lesson = require('../models/Lesson')
const Enrollment = require('../models/Enrollment')
const { awardXP } = require('../utils/xp')
const { sendNotification } = require('../utils/sendNotification')
const logActivity = require('../utils/logActivity')

exports.getCourses = async (req, res, next) => {
  try {
    const { branch, isFree, isUniversity, search, sort = '-createdAt', page = 1, limit = 12 } = req.query
    const filter = { isVisible: true }
    if (branch) filter.branch = branch
    if (isFree !== undefined) filter.isFree = isFree === 'true'
    if (isUniversity !== undefined) filter.isUniversity = isUniversity === 'true'
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ]

    const total = await Course.countDocuments(filter)
    const courses = await Course.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ success: true, total, page: Number(page), data: courses })
  } catch (err) { next(err) }
}

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ success: false, message: 'الدورة غير موجودة.' })
    const lessons = await Lesson.find({ courseId: course._id }).sort('order')

    let enrollment = null
    if (req.user) {
      enrollment = await Enrollment.findOne({ studentId: req.user._id, courseId: course._id })
    }

    res.json({ success: true, data: { course, lessons, enrollment } })
  } catch (err) { next(err) }
}

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body)
    await logActivity({ adminId: req.user._id, action: 'created course', targetType: 'course', targetId: course._id, targetName: course.title })
    res.status(201).json({ success: true, data: course })
  } catch (err) { next(err) }
}

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!course) return res.status(404).json({ success: false, message: 'الدورة غير موجودة.' })
    await logActivity({ adminId: req.user._id, action: 'updated course', targetType: 'course', targetId: course._id, targetName: course.title })
    res.json({ success: true, data: course })
  } catch (err) { next(err) }
}

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).json({ success: false, message: 'الدورة غير موجودة.' })
    await Lesson.deleteMany({ courseId: req.params.id })
    await Enrollment.deleteMany({ courseId: req.params.id })
    await logActivity({ adminId: req.user._id, action: 'deleted course', targetType: 'course', targetId: course._id, targetName: course.title })
    res.json({ success: true, message: 'تم حذف الدورة.' })
  } catch (err) { next(err) }
}

exports.enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course || !course.isVisible) return res.status(404).json({ success: false, message: 'الدورة غير موجودة.' })

    const existing = await Enrollment.findOne({ studentId: req.user._id, courseId: course._id })
    if (existing) return res.status(400).json({ success: false, message: 'أنت مسجّل في هذه الدورة بالفعل.' })

    const enrollment = await Enrollment.create({ studentId: req.user._id, courseId: course._id })
    await Course.findByIdAndUpdate(course._id, { $inc: { enrolledCount: 1 } })

    res.status(201).json({ success: true, data: enrollment })
  } catch (err) { next(err) }
}

exports.getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user._id }).populate('courseId')
    res.json({ success: true, data: enrollments })
  } catch (err) { next(err) }
}

exports.addLesson = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ success: false, message: 'الدورة غير موجودة.' })
    const lesson = await Lesson.create({ ...req.body, courseId: course._id })
    res.status(201).json({ success: true, data: lesson })
  } catch (err) { next(err) }
}

exports.updateLessonProgress = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) return res.status(404).json({ success: false, message: 'الدرس غير موجود.' })

    const enrollment = await Enrollment.findOne({ studentId: req.user._id, courseId: lesson.courseId })
    if (!enrollment) return res.status(403).json({ success: false, message: 'أنت غير مسجّل في هذه الدورة.' })

    const alreadyCompleted = enrollment.completedLessons.includes(lesson._id)
    if (!alreadyCompleted) {
      enrollment.completedLessons.push(lesson._id)
      enrollment.lastLessonId = lesson._id

      const totalLessons = await Lesson.countDocuments({ courseId: lesson.courseId })
      enrollment.progressPercent = Math.round((enrollment.completedLessons.length / totalLessons) * 100)

      let xpResult = await awardXP(req.user._id, 'complete_lesson')

      if (enrollment.progressPercent === 100 && !enrollment.completedAt) {
        enrollment.completedAt = new Date()
        enrollment.certificateIssued = true
        xpResult = await awardXP(req.user._id, 'complete_course')
        await sendNotification({
          recipientId: req.user._id, senderType: 'academy', category: 'academic',
          title: 'أتممت الدورة! 🎓',
          body: `تهانينا على إتمام دورة "${(await Course.findById(lesson.courseId))?.title}". حصلت على +200 XP وشهادة إتمام.`,
        })
      }

      await enrollment.save()
      return res.json({ success: true, progressPercent: enrollment.progressPercent, xp: xpResult })
    }

    enrollment.lastLessonId = lesson._id
    enrollment.notes = req.body.notes ? { ...enrollment.notes, [lesson._id]: req.body.notes } : enrollment.notes
    await enrollment.save()

    res.json({ success: true, progressPercent: enrollment.progressPercent })
  } catch (err) { next(err) }
}

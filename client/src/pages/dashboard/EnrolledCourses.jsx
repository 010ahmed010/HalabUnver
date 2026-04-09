import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'

export default function EnrolledCourses() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('الكل')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/courses/my-enrollments')
      .then(data => setEnrollments(data.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = enrollments.filter(e => {
    if (filter === 'نشطة') return e.progress < 100
    if (filter === 'مكتملة') return e.progress >= 100
    return true
  })

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <span className="section-label">التعلّم</span>
          <h2 className="text-xl font-black text-[#F1F5F9]">دوراتي المسجّلة</h2>
        </div>
        <Link to="/academy" className="text-xs text-[#6366F1] hover:underline font-medium">+ استكشف دورات</Link>
      </div>

      <div className="flex gap-2">
        {['الكل', 'نشطة', 'مكتملة'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === f ? 'gradient-bg text-white' : 'bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/30'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-2xl p-6 text-center text-[#F43F5E] text-sm">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-10 text-center">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-[#F1F5F9] font-bold mb-1">لا توجد دورات {filter !== 'الكل' ? filter : ''} بعد</p>
          <p className="text-[#4A5D78] text-sm mb-4">سجّل في دورة من الأكاديمية وابدأ رحلتك</p>
          <Link to="/academy" className="gradient-bg text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity inline-block">
            استعرض الأكاديمية
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(enrollment => {
            const course = enrollment.courseId || {}
            const progress = enrollment.progress || 0
            return (
              <div key={enrollment._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 hover:border-[#6366F1]/20 transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <Link to={`/academy/course/${course._id || course}`} className="text-[#F1F5F9] font-bold hover:text-[#818CF8] transition-colors">
                      {course.title || 'دورة'}
                    </Link>
                    <p className="text-xs text-[#4A5D78] mt-0.5">{course.instructor || ''}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                    progress >= 100
                      ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
                      : 'bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/20'
                  }`}>
                    {progress >= 100 ? 'مكتمل' : 'نشط'}
                  </span>
                </div>
                <div className="mb-1.5">
                  <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                    <span>التقدم</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 bg-[#162032] rounded-full overflow-hidden">
                    <div
                      className="h-2 gradient-bg rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/academy/course/${course._id || course}`}
                    className="text-xs px-3 py-1.5 gradient-bg text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    {progress > 0 ? 'تابع التعلّم' : 'ابدأ الدورة'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

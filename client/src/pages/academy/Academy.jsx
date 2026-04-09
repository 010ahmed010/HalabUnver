import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

const LEVEL_COLORS = {
  beginner: { label: 'مبتدئ', color: '#10B981' },
  intermediate: { label: 'متوسط', color: '#F59E0B' },
  advanced: { label: 'متقدم', color: '#F43F5E' },
}

function CourseCard({ course }) {
  const lvl = LEVEL_COLORS[course.level] || LEVEL_COLORS.beginner
  return (
    <Link
      to={`/academy/course/${course._id}`}
      className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden hover:border-[#6366F1]/30 hover:-translate-y-0.5 transition-all group flex flex-col"
    >
      <div className="h-36 bg-gradient-to-br from-[#162032] to-[#0F1828] flex items-center justify-center relative overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl opacity-20">📚</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1828] to-transparent opacity-60" />
        {course.isFree && (
          <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 px-2 py-0.5 rounded-full">
            مجاني
          </span>
        )}
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${lvl.color}20`, color: lvl.color, border: `1px solid ${lvl.color}30` }}>
          {lvl.label}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[#F1F5F9] font-bold text-sm leading-snug group-hover:text-[#818CF8] transition-colors line-clamp-2">{course.title}</h3>
        <p className="text-xs text-[#4A5D78] mt-1.5">{course.instructor}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-[#4A5D78]">
          <span>⭐ {course.rating?.toFixed(1) || '—'}</span>
          <span>·</span>
          <span>👤 {course.studentsCount || 0}</span>
          {course.hours > 0 && <><span>·</span><span>⏱ {course.hours}h</span></>}
        </div>
        <div className="mt-auto pt-3 border-t border-[#1E2D45] flex items-center justify-between">
          <span className="text-sm font-black gradient-text">
            {course.isFree ? 'مجاني' : course.price ? `${course.price.toLocaleString()} SYP` : '—'}
          </span>
          <span className="text-[10px] text-[#4A5D78] border border-[#1E2D45] px-2 py-0.5 rounded-full">
            {course.source === 'upload' ? '↗ خارجي' : '🎓 أكاديمية'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Academy() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [isFreeOnly, setIsFreeOnly] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    let url = `/courses?page=${page}&limit=12`
    if (selectedLevel) url += `&level=${selectedLevel}`
    if (isFreeOnly) url += `&isFree=true`
    if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`

    api.get(url)
      .then(data => {
        setCourses(data.data || [])
        setTotal(data.total || 0)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page, selectedLevel, isFreeOnly, search])

  const LEVELS = ['', 'beginner', 'intermediate', 'advanced']
  const LEVEL_LABELS = { '': 'كل المستويات', beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <span className="section-label">التعلّم</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F1F5F9] mb-2">الأكاديمية 📚</h1>
          <p className="text-[#4A5D78] text-sm">دورات تعليمية لطلاب جامعة حلب — مجانية ومدفوعة</p>
        </div>

        {/* Search + Filters */}
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="ابحث في الدورات..."
            className="flex-1 min-w-48 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
          />
          <select
            value={selectedLevel}
            onChange={e => { setSelectedLevel(e.target.value); setPage(1) }}
            className="bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
          >
            {LEVELS.map(l => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
          </select>
          <label className="flex items-center gap-2 cursor-pointer px-4 py-2.5 bg-[#162032] border border-[#1E2D45] rounded-xl hover:border-[#10B981]/30 transition-colors">
            <input type="checkbox" checked={isFreeOnly} onChange={e => { setIsFreeOnly(e.target.checked); setPage(1) }} className="accent-[#10B981]" />
            <span className="text-sm text-[#94A3B8]">مجاني فقط</span>
          </label>
          <span className="text-xs text-[#4A5D78]">{total} دورة</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-2xl p-8 text-center text-[#F43F5E]">{error}</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-[#F1F5F9] font-bold text-lg mb-2">لا توجد دورات بعد</p>
            <p className="text-[#4A5D78] text-sm">كن أول من يضيف دورة للمنصة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
        )}

        {total > 12 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">السابق</button>
            <span className="text-sm text-[#4A5D78]">صفحة {page} من {Math.ceil(total / 12)}</span>
            <button disabled={page >= Math.ceil(total / 12)} onClick={() => setPage(p => p + 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">التالي</button>
          </div>
        )}

        {user?.businessPermissions?.canUploadCourses && (
          <div className="mt-8 bg-[#6366F1]/8 border border-[#6366F1]/20 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#F1F5F9] font-bold">📤 أنت مدرب معتمد على المنصة</p>
              <p className="text-[#4A5D78] text-sm">يمكنك رفع دوراتك وإتاحتها للطلاب</p>
            </div>
            <Link to="/business" className="gradient-bg text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
              رفع دورة جديدة
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

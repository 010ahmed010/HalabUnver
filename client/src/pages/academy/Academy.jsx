import { useState } from 'react'
import { Link } from 'react-router-dom'

const BRANCHES = ['الكل', 'برمجة وتطوير', 'شبكات', 'أمن سيبراني', 'ذكاء اصطناعي', 'تصميم', 'هندسة معمارية', 'ميكانيك']

const COURSES = [
  { id: 'mern-001', title: 'MERN Stack الشاملة', instructor: 'أحمد الجاسم', hours: 42, rating: 4.9, students: 312, price: 'مجاني للمسجلين', branch: 'برمجة وتطوير', native: true, level: 'متقدم', levelColor: '#F43F5E' },
  { id: 'net-002', title: 'شبكات الحاسوب — من الصفر', instructor: 'محمد حسن', hours: 28, rating: 4.7, students: 189, price: '75,000 SYP', branch: 'شبكات', native: true, level: 'مبتدئ', levelColor: '#10B981' },
  { id: 'sec-003', title: 'أساسيات الأمن السيبراني وCTF', instructor: 'سامر خالد', hours: 18, rating: 4.8, students: 97, price: '50,000 SYP', branch: 'أمن سيبراني', native: false, level: 'متوسط', levelColor: '#F59E0B' },
  { id: 'ai-004', title: 'Python للذكاء الاصطناعي', instructor: 'رنا أحمد', hours: 35, rating: 4.6, students: 244, price: '90,000 SYP', branch: 'ذكاء اصطناعي', native: false, level: 'متوسط', levelColor: '#F59E0B' },
  { id: 'ui-005', title: 'تصميم واجهات المستخدم — UI/UX', instructor: 'لينا مصطفى', hours: 22, rating: 4.9, students: 156, price: '60,000 SYP', branch: 'تصميم', native: false, level: 'مبتدئ', levelColor: '#10B981' },
  { id: 'arch-006', title: 'AutoCAD للمبتدئين', instructor: 'كريم إبراهيم', hours: 16, rating: 4.5, students: 203, price: '40,000 SYP', branch: 'هندسة معمارية', native: true, level: 'مبتدئ', levelColor: '#10B981' },
]

export default function Academy() {
  const [activeBranch, setActiveBranch] = useState('الكل')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({ free: false, native: false, level: '' })

  const filtered = COURSES.filter(c => {
    if (activeBranch !== 'الكل' && c.branch !== activeBranch) return false
    if (filters.free && c.price !== 'مجاني للمسجلين') return false
    if (filters.native && !c.native) return false
    if (filters.level && c.level !== filters.level) return false
    return true
  })

  return (
    <div className="pt-16 min-h-screen">

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <span className="section-label">الأكاديمية</span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9]">أكاديمية حلب</h1>
        <p className="text-sm text-[#94A3B8] mt-1">دورات أكاديمية مكثفة مصمّمة لسد الفجوة بين الجامعة ومتطلبات السوق</p>
      </div>

      {/* Branch filter bar */}
      <div className="border-b border-[#1E2D45] bg-[#070C18] sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {BRANCHES.map(b => (
              <button
                key={b}
                onClick={() => setActiveBranch(b)}
                className={`shrink-0 px-3.5 py-1.5 text-xs sm:text-sm rounded-full transition-all ${
                  activeBranch === b
                    ? 'gradient-bg text-white font-semibold shadow-md shadow-[#6366F1]/20'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] border border-[#1E2D45] hover:border-[#6366F1]/30'
                }`}
              >
                {b}
              </button>
            ))}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`shrink-0 mr-auto px-3 py-1.5 text-xs rounded-lg border transition-all ${
                filterOpen
                  ? 'border-[#6366F1]/40 text-[#6366F1] bg-[#6366F1]/10'
                  : 'border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/40 hover:text-[#6366F1]'
              }`}
            >
              ⚙ فلترة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex gap-6">

          {/* Filter Sidebar */}
          {filterOpen && (
            <aside className="hidden md:block w-52 shrink-0">
              <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 sticky top-32">
                <p className="text-xs font-semibold text-[#F1F5F9] mb-4">خيارات الفلتر</p>
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-[#94A3B8] hover:text-[#F1F5F9]">
                    <input type="checkbox" checked={filters.free} onChange={e => setFilters({...filters, free: e.target.checked})} className="accent-[#6366F1] rounded" />
                    <span className="text-xs">دورات مجانية فقط</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#94A3B8] hover:text-[#F1F5F9]">
                    <input type="checkbox" checked={filters.native} onChange={e => setFilters({...filters, native: e.target.checked})} className="accent-[#6366F1] rounded" />
                    <span className="text-xs">جامعية أصيلة فقط</span>
                  </label>
                  <div className="pt-2 border-t border-[#1E2D45]">
                    <p className="text-xs font-medium text-[#94A3B8] mb-2">المستوى</p>
                    {['مبتدئ', 'متوسط', 'متقدم'].map(l => (
                      <label key={l} className="flex items-center gap-2 cursor-pointer text-[#94A3B8] hover:text-[#F1F5F9] mb-2 text-xs">
                        <input type="radio" name="level" value={l} checked={filters.level === l} onChange={e => setFilters({...filters, level: e.target.value})} className="accent-[#6366F1]" />
                        {l}
                      </label>
                    ))}
                    {filters.level && <button onClick={() => setFilters({...filters, level: ''})} className="text-xs text-[#6366F1] hover:underline">إلغاء الفلتر</button>}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Course Grid */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#94A3B8]">
                <span className="text-[#F1F5F9] font-semibold">{filtered.length}</span> دورة — {activeBranch}
              </p>
              <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer"
                className="px-3 sm:px-4 py-2 text-xs rounded-lg border border-[#14B8A6]/30 text-[#14B8A6] hover:bg-[#14B8A6]/10 transition-all">
                🗺 خريطة التعلم ←
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(course => (
                <Link
                  key={course.id}
                  to={`/academy/course/${course.id}`}
                  className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] hover:border-[#6366F1]/30 hover:shadow-lg transition-all block group overflow-hidden"
                >
                  <div className="aspect-video bg-[#162032] relative flex items-center justify-center">
                    <span className="text-3xl">🎓</span>
                    {course.native && (
                      <span className="absolute top-3 right-3 text-[10px] font-semibold rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-0.5">
                        جامعي أصيل
                      </span>
                    )}
                    <span
                      className="absolute bottom-3 left-3 text-[10px] font-semibold rounded-full px-2 py-0.5"
                      style={{ color: course.levelColor, background: course.levelColor + '18' }}
                    >
                      {course.level}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#F1F5F9] mb-1 group-hover:text-[#6366F1] transition-colors leading-snug">{course.title}</h3>
                    <p className="text-xs text-[#4A5D78] mb-3">{course.instructor} · {course.hours} ساعة</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-[#F59E0B]">
                        ★ {course.rating}
                        <span className="text-[#4A5D78] mr-1">({course.students})</span>
                      </div>
                      <span className="text-xs font-semibold text-[#6366F1]">{course.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-12 text-center">
                <p className="text-[#94A3B8] text-sm">لا توجد دورات تطابق الفلتر المحدد</p>
                <button onClick={() => { setActiveBranch('الكل'); setFilters({ free: false, native: false, level: '' }) }} className="mt-4 text-xs text-[#6366F1] hover:underline">
                  إعادة تعيين الفلتر
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

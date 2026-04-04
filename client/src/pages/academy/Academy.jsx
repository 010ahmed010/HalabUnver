import { useState } from 'react'
import { Link } from 'react-router-dom'

const BRANCHES = ['الكل', 'برمجة وتطوير', 'شبكات', 'أمن سيبراني', 'ذكاء اصطناعي', 'تصميم', 'هندسة معمارية', 'ميكانيك']

const COURSES = [
  { id: 'mern-001', title: 'MERN Stack الشاملة', instructor: 'أحمد الجاسم', hours: 42, rating: 4.9, students: 312, price: 'مجاني للمسجلين', branch: 'برمجة وتطوير', native: true, level: 'متقدم' },
  { id: 'net-002', title: 'شبكات الحاسوب — من الصفر', instructor: 'محمد حسن', hours: 28, rating: 4.7, students: 189, price: '75,000 SYP', branch: 'شبكات', native: true, level: 'مبتدئ' },
  { id: 'sec-003', title: 'أساسيات الأمن السيبراني وCTF', instructor: 'سامر خالد', hours: 18, rating: 4.8, students: 97, price: '50,000 SYP', branch: 'أمن سيبراني', native: false, level: 'متوسط' },
  { id: 'ai-004', title: 'Python للذكاء الاصطناعي', instructor: 'رنا أحمد', hours: 35, rating: 4.6, students: 244, price: '90,000 SYP', branch: 'ذكاء اصطناعي', native: false, level: 'متوسط' },
  { id: 'ui-005', title: 'تصميم واجهات المستخدم — UI/UX', instructor: 'لينا مصطفى', hours: 22, rating: 4.9, students: 156, price: '60,000 SYP', branch: 'تصميم', native: false, level: 'مبتدئ' },
  { id: 'arch-006', title: 'AutoCAD للمبتدئين', instructor: 'كريم إبراهيم', hours: 16, rating: 4.5, students: 203, price: '40,000 SYP', branch: 'هندسة معمارية', native: true, level: 'مبتدئ' },
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

      {/* Sub-header branches */}
      <div className="border-b border-[#2A2A2A] bg-[#0E0E0E] sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {BRANCHES.map(b => (
              <button
                key={b}
                onClick={() => setActiveBranch(b)}
                className={`shrink-0 px-4 py-1.5 text-sm transition-colors ${
                  activeBranch === b
                    ? 'bg-[#BB86FC] text-[#121212] font-bold'
                    : 'text-[#888] hover:text-[#E0E0E0] border border-[#2A2A2A]'
                }`}
              >
                {b}
              </button>
            ))}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="shrink-0 mr-auto px-3 py-1.5 text-xs border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC] transition-colors"
            >
              ⚙ فلترة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">

          {/* Filter Sidebar */}
          {filterOpen && (
            <aside className="w-56 shrink-0">
              <div className="border border-[#2A2A2A] p-4 sticky top-32">
                <p className="text-xs font-mono text-[#888] mb-3">[ FILTERS ]</p>
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-[#888] hover:text-[#E0E0E0]">
                    <input type="checkbox" checked={filters.free} onChange={e => setFilters({...filters, free: e.target.checked})} className="accent-[#BB86FC]" />
                    دورات مجانية فقط
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#888] hover:text-[#E0E0E0]">
                    <input type="checkbox" checked={filters.native} onChange={e => setFilters({...filters, native: e.target.checked})} className="accent-[#BB86FC]" />
                    جامعية أصيلة فقط
                  </label>
                  <div>
                    <p className="text-xs text-[#555] mb-1 font-mono">المستوى</p>
                    {['مبتدئ', 'متوسط', 'متقدم'].map(l => (
                      <label key={l} className="flex items-center gap-2 cursor-pointer text-[#888] hover:text-[#E0E0E0] mb-1">
                        <input type="radio" name="level" value={l} checked={filters.level === l} onChange={e => setFilters({...filters, level: e.target.value})} className="accent-[#BB86FC]" />
                        {l}
                      </label>
                    ))}
                    {filters.level && <button onClick={() => setFilters({...filters, level: ''})} className="text-xs text-[#BB86FC] mt-1">إلغاء</button>}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Course Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-mono text-[#888]">
                [ {filtered.length} دورة ] — {activeBranch}
              </p>
              <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer"
                className="px-4 py-1.5 text-xs border border-[#03DAC6]/40 text-[#03DAC6] hover:bg-[#03DAC6]/10 transition-colors">
                🗺 خريطة التعلم (roadmap.sh) ←
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filtered.map(course => (
                <Link key={course.id} to={`/academy/course/${course.id}`} className="bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#BB86FC]/50 transition-colors block group">
                  <div className="aspect-video bg-[#252525] relative flex items-center justify-center">
                    <span className="text-4xl">🎓</span>
                    {course.native && (
                      <span className="absolute top-2 right-2 text-[10px] font-mono border border-[#FFD700]/60 px-1.5 py-0.5 text-[#FFD700]">
                        جامعي أصيل
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono border border-[#2A2A2A] px-1.5 py-0.5 text-[#888]">
                      {course.level}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#E0E0E0] mb-1 group-hover:text-[#BB86FC] transition-colors">{course.title}</h3>
                    <p className="text-xs text-[#555] mb-3">{course.instructor} · {course.hours}h</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-[#FFD700]">
                        ★ {course.rating}
                        <span className="text-[#555] mr-1">({course.students})</span>
                      </div>
                      <span className="text-xs font-mono text-[#BB86FC]">{course.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

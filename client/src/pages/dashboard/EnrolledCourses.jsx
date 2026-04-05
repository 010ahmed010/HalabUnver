import { useState } from 'react'
import { Link } from 'react-router-dom'

const COURSES = [
  { id: 'mern-001', title: 'MERN Stack Mastery', instructor: 'أحمد الجاسم', progress: 45, totalLessons: 8, doneLessons: 3, status: 'active', currentLesson: 'الدرس 4: Express Middleware', timeLeft: '3h 12m',
    lessons: [
      { title: 'مقدمة — ما هو MERN؟', done: true },
      { title: 'إعداد بيئة التطوير', done: true },
      { title: 'أول مشروع Express', done: true },
      { title: 'MongoDB — المخططات', done: false, active: true },
    ]
  },
  { id: 'arch-006', title: 'AutoCAD للمبتدئين', instructor: 'كريم إبراهيم', progress: 100, totalLessons: 12, doneLessons: 12, status: 'completed', currentLesson: 'مكتمل', timeLeft: '0' },
  { id: 'sec-003', title: 'أساسيات الأمن السيبراني', instructor: 'سامر خالد', progress: 20, totalLessons: 10, doneLessons: 2, status: 'active', currentLesson: 'الدرس 3: Basic CTF', timeLeft: '14h 30m' },
]

const SKILLS = ['⚛️ React', '🌿 MongoDB', '🎨 AutoCAD', '🛡️ Security']

export default function EnrolledCourses() {
  const [filter, setFilter] = useState('الكل')
  const [expanded, setExpanded] = useState(null)

  const lastCourse = COURSES.find(c => c.status === 'active')
  const filtered = COURSES.filter(c =>
    filter === 'الكل' ||
    (filter === 'نشطة' && c.status === 'active') ||
    (filter === 'مكتملة' && c.status === 'completed')
  )

  return (
    <div className="space-y-4 animate-fade-up">
      <div>
        <span className="section-label">التعلم</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">دوراتي المسجّلة</h2>
      </div>

      {/* Continue watching */}
      {lastCourse && (
        <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-2xl border border-[#6366F1]/20 p-5">
          <p className="text-xs font-semibold text-[#6366F1] mb-3">متابعة من حيث توقفت</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-12 bg-[#162032] rounded-xl flex items-center justify-center text-xl shrink-0">🎓</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#F1F5F9]">{lastCourse.title}</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">{lastCourse.currentLesson}</p>
              <p className="text-xs text-[#6366F1] mt-1 font-medium">⏱ {lastCourse.timeLeft} متبق</p>
            </div>
            <Link
              to={`/academy/course/${lastCourse.id}`}
              className="px-4 py-2.5 gradient-bg text-white font-bold text-xs rounded-xl hover:opacity-90 transition-opacity shrink-0"
            >
              ▶ متابعة
            </Link>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-[#94A3B8] mb-1.5">
              <span>{lastCourse.progress}% مكتمل</span>
              <span>{lastCourse.doneLessons} / {lastCourse.totalLessons}</span>
            </div>
            <div className="h-2 bg-[#162032] rounded-full overflow-hidden">
              <div className="h-2 gradient-bg rounded-full" style={{ width: `${lastCourse.progress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2">
        {['الكل', 'نشطة', 'مكتملة'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm rounded-full transition-all ${
              filter === f
                ? 'gradient-bg text-white font-semibold'
                : 'border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/40 hover:text-[#6366F1]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Course list */}
      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden hover:border-[#6366F1]/20 transition-all">
            <div className="flex items-center gap-4 p-5">
              <div className="w-14 h-10 bg-[#162032] rounded-xl flex items-center justify-center text-xl shrink-0">🎓</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#F1F5F9] truncate">{c.title}</p>
                <p className="text-xs text-[#4A5D78] mt-0.5">{c.instructor}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-1.5 bg-[#162032] rounded-full overflow-hidden">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${c.progress}%`, background: c.progress === 100 ? '#10B981' : '#6366F1' }}
                    />
                  </div>
                  <span className="text-xs text-[#94A3B8] shrink-0">{c.progress}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {c.status === 'completed'
                  ? <span className="text-xs text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-2.5 py-1">📜 شهادة جاهزة</span>
                  : <span className="text-xs text-[#4A5D78] bg-[#162032] border border-[#1E2D45] rounded-full px-2.5 py-1">🔒 قيد التعلم</span>
                }
                {c.lessons && (
                  <button
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                    className="text-xs text-[#4A5D78] hover:text-[#6366F1] w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#162032] transition-all"
                  >
                    {expanded === c.id ? '▲' : '▼'}
                  </button>
                )}
              </div>
            </div>

            {expanded === c.id && c.lessons && (
              <div className="border-t border-[#1E2D45] bg-[#070C18]/30 animate-fade-up">
                {c.lessons.map((l, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-5 py-2.5 text-xs border-b border-[#1E2D45] last:border-0 ${
                      l.active ? 'text-[#6366F1]' : l.done ? 'text-[#4A5D78]' : 'text-[#94A3B8]'
                    }`}
                  >
                    <span>{l.done ? '✅' : l.active ? '▶' : '○'}</span>
                    <span>{l.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5">
        <p className="text-xs font-semibold text-[#F1F5F9] mb-3">المهارات المكتسبة</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {SKILLS.map(s => (
            <span key={s} className="border border-[#6366F1]/30 bg-[#6366F1]/8 px-3 py-1.5 text-xs text-[#6366F1] rounded-lg font-medium">{s}</span>
          ))}
        </div>
        <div className="text-xs text-[#94A3B8] flex justify-between pt-3 border-t border-[#1E2D45]">
          <span>XP المكتسبة من التعلم</span>
          <span className="font-bold text-[#10B981] font-mono">+1,400 XP</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link to="/academy" className="flex-1 py-3 text-center text-sm rounded-xl border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all">
          🎓 اكتشف دورات جديدة
        </Link>
        <button className="px-5 py-3 rounded-xl border border-[#10B981]/30 text-[#10B981] text-sm hover:bg-[#10B981]/10 transition-all">
          📜 شهاداتي
        </button>
      </div>
    </div>
  )
}

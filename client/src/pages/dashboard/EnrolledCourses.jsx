import { useState } from 'react'
import { Link } from 'react-router-dom'

const COURSES = [
  {
    id: 'mern-001', title: 'MERN Stack Mastery', progress: 45, totalLessons: 8, doneLessons: 3,
    status: 'active', timeLeft: '3h 12m', currentLesson: 'Lesson 4: Express Middleware',
    lessons: [
      { title: 'مقدمة — ما هو MERN؟', done: true },
      { title: 'إعداد بيئة التطوير', done: true },
      { title: 'أول مشروع Express', done: true },
      { title: 'MongoDB — المخططات', done: false, active: true },
    ]
  },
  { id: 'arch-006', title: 'AutoCAD للمبتدئين', progress: 100, totalLessons: 12, doneLessons: 12, status: 'completed', timeLeft: '0', currentLesson: '' },
  { id: 'sec-003', title: 'أساسيات الأمن السيبراني', progress: 20, totalLessons: 10, doneLessons: 2, status: 'active', timeLeft: '14h 30m', currentLesson: 'Lesson 3: Basic CTF' },
]

const SKILL_ORBS = ['⚛️ React', '🌿 MongoDB', '🎨 AutoCAD', '🛡️ Security']

export default function EnrolledCourses() {
  const [filter, setFilter] = useState('الكل')
  const [expanded, setExpanded] = useState(null)

  const lastCourse = COURSES.find(c => c.status === 'active')
  const filtered = COURSES.filter(c => filter === 'الكل' || (filter === 'نشطة' && c.status === 'active') || (filter === 'مكتملة' && c.status === 'completed'))

  return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="text-xl font-black text-[#E0E0E0]">📚 دوراتي</h2>

      {/* Continue watching hero */}
      {lastCourse && (
        <div className="bg-[#1E1E1E] border border-[#BB86FC]/30 p-6">
          <p className="text-xs font-mono text-[#888] mb-2">[ CONTINUE_WATCHING ]</p>
          <div className="flex items-center gap-4">
            <div className="w-24 h-16 bg-[#252525] flex items-center justify-center text-2xl shrink-0">🎓</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#E0E0E0]">{lastCourse.title}</p>
              <p className="text-xs text-[#888]">{lastCourse.currentLesson}</p>
              <p className="text-xs font-mono text-[#BB86FC] mt-1">⏱ {lastCourse.timeLeft} remaining</p>
            </div>
            <Link to={`/academy/course/${lastCourse.id}`}
              className="px-5 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors shrink-0">
              ▶️ متابعة التعلم
            </Link>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
              <span>{lastCourse.progress}% مكتمل</span>
              <span>{lastCourse.doneLessons} / {lastCourse.totalLessons} دروس</span>
            </div>
            <div className="h-2 bg-[#2A2A2A]">
              <div className="h-2 bg-[#BB86FC]" style={{ width: `${lastCourse.progress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2">
        {['الكل', 'نشطة', 'مكتملة'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-xs transition-colors ${filter === f ? 'bg-[#BB86FC] text-[#121212] font-bold' : 'border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC]'}`}>
            {f === 'نشطة' ? '🟢 ' : f === 'مكتملة' ? '✅ ' : ''}{f}
          </button>
        ))}
      </div>

      {/* Course list */}
      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-[#1E1E1E] border border-[#2A2A2A] overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <div className="w-16 h-12 bg-[#252525] flex items-center justify-center text-xl shrink-0 relative">
                🎓
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BB86FC]" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#E0E0E0] truncate">{c.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 h-1.5 bg-[#2A2A2A]">
                    <div className={`h-1.5 ${c.progress === 100 ? 'bg-[#4CAF50]' : 'bg-[#BB86FC]'}`} style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="text-xs font-mono text-[#888] shrink-0">{c.progress}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {c.status === 'completed'
                  ? <span className="text-xs border border-[#4CAF50]/40 text-[#4CAF50] px-2 py-0.5">📜 شهادة جاهزة</span>
                  : <span className="text-xs border border-[#2A2A2A] text-[#555] px-2 py-0.5">🔒 الشهادة مقفلة</span>
                }
                <button onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  className="text-xs text-[#888] hover:text-[#BB86FC] transition-colors">
                  {expanded === c.id ? '▲' : '▼'}
                </button>
              </div>
            </div>

            {expanded === c.id && c.lessons && (
              <div className="border-t border-[#2A2A2A] bg-[#121212]/50">
                {c.lessons.map((l, i) => (
                  <div key={i} className={`flex items-center gap-3 px-5 py-2.5 text-xs border-b border-[#2A2A2A] last:border-0 ${l.active ? 'text-[#BB86FC]' : l.done ? 'text-[#555]' : 'text-[#888]'}`}>
                    <span>{l.done ? '✅' : l.active ? '▶️' : '⚪'}</span>
                    <span>{l.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Skill orbs */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-5">
        <p className="text-xs font-mono text-[#888] mb-3">[ SKILL_ACQUISITION ] — المهارات المكتسبة</p>
        <div className="flex flex-wrap gap-2">
          {SKILL_ORBS.map(s => (
            <span key={s} className="border border-[#BB86FC]/40 px-3 py-1.5 text-xs text-[#BB86FC]">{s}</span>
          ))}
        </div>
        <p className="text-xs font-mono text-[#888] mt-3">Total Learning XP: <span className="text-[#4CAF50]">+1,400 XP</span></p>
        <p className="text-xs text-[#555] mt-1">دورتان إضافيتان للوصول لمستوى "Professional"</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link to="/academy" className="flex-1 py-2.5 border border-[#2A2A2A] text-[#888] text-sm text-center hover:border-[#BB86FC] transition-colors">
          🎓 ابحث عن دورات جديدة
        </Link>
        <button className="px-5 py-2.5 border border-[#4CAF50]/40 text-[#4CAF50] text-sm hover:bg-[#4CAF50]/10 transition-colors">
          📜 شهاداتي
        </button>
      </div>
    </div>
  )
}

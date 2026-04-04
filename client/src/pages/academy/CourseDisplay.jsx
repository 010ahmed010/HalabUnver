import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const LESSONS = [
  { id: 1, title: 'مقدمة — ما هو MERN Stack؟', duration: '12:30', done: true },
  { id: 2, title: 'إعداد بيئة التطوير', duration: '18:45', done: true },
  { id: 3, title: 'إنشاء أول مشروع Express', duration: '24:00', done: false, active: true },
  { id: 4, title: 'MongoDB — المخططات والنماذج', duration: '31:20', done: false },
  { id: 5, title: 'React Hooks — useState وuseEffect', duration: '28:15', done: false },
  { id: 6, title: 'بناء REST API كاملة', duration: '45:00', done: false },
  { id: 7, title: 'Authentication مع JWT', duration: '38:10', done: false },
  { id: 8, title: 'نشر المشروع على الخادم', duration: '22:00', done: false },
]

export default function CourseDisplay() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('qa')
  const [liked, setLiked] = useState(null)

  return (
    <div className="pt-16 min-h-screen">
      <div className="grid grid-cols-12 h-[calc(100vh-64px)] overflow-hidden">

        {/* Player — 9 columns */}
        <div className="col-span-12 md:col-span-9 flex flex-col bg-black relative">
          {/* Video area */}
          <div className="relative flex-1 bg-[#0A0A0A] flex items-center justify-center group">
            <div className="text-center">
              <div className="w-20 h-20 border-2 border-[#BB86FC]/40 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:border-[#BB86FC] transition-colors">
                <span className="text-3xl text-[#BB86FC]">▶</span>
              </div>
              <p className="text-[#888] text-sm">الدرس 3: إنشاء أول مشروع Express</p>
            </div>

            {/* Overlay info */}
            <div className="absolute top-4 right-4 border border-[#2A2A2A] bg-black/60 backdrop-blur-sm px-3 py-2 text-xs font-mono text-[#888]">
              <span className="text-[#BB86FC]">LESSON_03</span> · 24:00 · <span className="text-[#4CAF50]">IN_PROGRESS</span>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-0 right-0 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setLiked(true)} className={`text-xs px-2 py-1 border transition-colors ${liked === true ? 'border-[#4CAF50] text-[#4CAF50]' : 'border-[#2A2A2A] text-[#555] hover:text-[#E0E0E0]'}`}>
                  👍 مفيد
                </button>
                <button onClick={() => setLiked(false)} className={`text-xs px-2 py-1 border transition-colors ${liked === false ? 'border-[#EF4444] text-[#EF4444]' : 'border-[#2A2A2A] text-[#555] hover:text-[#E0E0E0]'}`}>
                  👎
                </button>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} className="text-[#FFD700] text-sm hover:scale-110 transition-transform">★</button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-[#2A2A2A]">
            <div className="h-1 bg-[#BB86FC] w-1/3" />
          </div>

          {/* Tabs below player */}
          <div className="bg-[#121212] border-t border-[#2A2A2A]">
            <div className="flex border-b border-[#2A2A2A]">
              {[
                { key: 'qa', label: 'أسئلة وأجوبة' },
                { key: 'resources', label: 'الموارد' },
                { key: 'notes', label: 'ملاحظاتي' },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-5 py-3 text-sm transition-colors ${
                    activeTab === t.key
                      ? 'border-b-2 border-[#BB86FC] text-[#BB86FC]'
                      : 'text-[#888] hover:text-[#E0E0E0]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-4 max-h-40 overflow-y-auto">
              {activeTab === 'qa' && (
                <div>
                  <div className="text-xs text-[#888] mb-3">اطرح سؤالك — سيُجاب عليه من المجتمع والمدرّب</div>
                  <input placeholder="اكتب سؤالك هنا..." className="w-full bg-[#1E1E1E] border border-[#2A2A2A] text-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#BB86FC]" />
                </div>
              )}
              {activeTab === 'resources' && (
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-xs text-[#888] hover:text-[#BB86FC] transition-colors">
                    <span className="text-[#03DAC6]">📄</span> ملاحظات الدرس 3 — Express Middleware.pdf
                  </a>
                  <a href="#" className="flex items-center gap-2 text-xs text-[#888] hover:text-[#BB86FC] transition-colors">
                    <span className="text-[#03DAC6]">💾</span> Source Code — Lesson 3.zip
                  </a>
                </div>
              )}
              {activeTab === 'notes' && (
                <textarea placeholder="دوّن ملاحظاتك هنا..." className="w-full h-24 bg-transparent border border-[#2A2A2A] text-[#E0E0E0] placeholder-[#555] px-3 py-2 text-xs outline-none resize-none focus:border-[#BB86FC]" />
              )}
            </div>
          </div>
        </div>

        {/* Curriculum Sidebar — 3 columns */}
        <div className="hidden md:flex col-span-3 flex-col border-r border-[#2A2A2A] bg-[#121212]/50 overflow-y-auto">
          <div className="p-4 border-b border-[#2A2A2A]">
            <div className="flex flex-wrap gap-3 text-xs font-mono text-[#888]">
              <span>📊 متقدم</span>
              <span>⏳ 42h</span>
              <span>🌍 عربي</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-[#888] mb-1">
                <span>التقدم</span>
                <span>2 / 8</span>
              </div>
              <div className="h-1.5 bg-[#2A2A2A]">
                <div className="h-1.5 bg-[#BB86FC]" style={{ width: '25%' }} />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs font-mono text-[#888] px-4 pt-3 pb-2">[ CURRICULUM ]</p>
            {LESSONS.map(l => (
              <button
                key={l.id}
                className={`w-full text-right px-4 py-3 text-xs border-b border-[#2A2A2A] transition-colors flex items-center justify-between gap-2 ${
                  l.active
                    ? 'border-r-2 border-[#BB86FC] bg-[#BB86FC]/5 text-[#BB86FC]'
                    : l.done
                    ? 'text-[#555]'
                    : 'text-[#888] hover:text-[#E0E0E0] hover:bg-[#1E1E1E]/50'
                }`}
              >
                <span className="flex-1 text-right">{l.title}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px]">{l.duration}</span>
                  {l.done && <span className="text-[#4CAF50]">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

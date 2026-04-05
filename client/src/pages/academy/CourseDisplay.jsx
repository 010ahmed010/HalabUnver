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
        <div className="col-span-12 md:col-span-9 flex flex-col bg-[#070C18]">
          {/* Video area */}
          <div className="relative flex-1 bg-[#0A0F1E] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl border border-[#6366F1]/30 bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-[#6366F1]/20 hover:border-[#6366F1]/60 transition-all">
                <span className="text-3xl text-[#6366F1]">▶</span>
              </div>
              <p className="text-[#94A3B8] text-sm">الدرس 3: إنشاء أول مشروع Express</p>
            </div>

            <div className="absolute top-4 right-4 bg-[#0F1828]/80 backdrop-blur-sm rounded-xl border border-[#1E2D45] px-3 py-2 text-xs font-mono text-[#94A3B8]">
              <span className="text-[#6366F1] font-semibold">LESSON 03</span> · 24:00 · <span className="text-[#10B981]">جارٍ</span>
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked(true)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${liked === true ? 'border-[#10B981]/50 text-[#10B981] bg-[#10B981]/10' : 'border-[#1E2D45] text-[#4A5D78] hover:text-[#F1F5F9] hover:border-[#1E2D45]'}`}
                >
                  👍 مفيد
                </button>
                <button
                  onClick={() => setLiked(false)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${liked === false ? 'border-[#F43F5E]/50 text-[#F43F5E] bg-[#F43F5E]/10' : 'border-[#1E2D45] text-[#4A5D78] hover:text-[#F1F5F9]'}`}
                >
                  👎
                </button>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} className="text-[#F59E0B] text-sm hover:scale-110 transition-transform">★</button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-[#1E2D45]">
            <div className="h-1 gradient-bg w-1/3" />
          </div>

          {/* Tabs below player */}
          <div className="bg-[#0F1828] border-t border-[#1E2D45]">
            <div className="flex border-b border-[#1E2D45]">
              {[
                { key: 'qa', label: 'أسئلة وأجوبة' },
                { key: 'resources', label: 'الموارد' },
                { key: 'notes', label: 'ملاحظاتي' },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-5 py-3 text-sm transition-all ${
                    activeTab === t.key
                      ? 'border-b-2 border-[#6366F1] text-[#6366F1] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-4 max-h-40 overflow-y-auto">
              {activeTab === 'qa' && (
                <div>
                  <div className="text-xs text-[#94A3B8] mb-3">اطرح سؤالك — سيُجاب عليه من المجتمع والمدرّب</div>
                  <input
                    placeholder="اكتب سؤالك هنا..."
                    className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-3 py-2.5 text-xs outline-none focus:border-[#6366F1]/60 rounded-xl transition-colors"
                  />
                </div>
              )}
              {activeTab === 'resources' && (
                <div className="space-y-2">
                  {[
                    { icon: '📄', name: 'ملاحظات الدرس 3 — Express Middleware.pdf' },
                    { icon: '💾', name: 'Source Code — Lesson 3.zip' },
                  ].map(r => (
                    <a key={r.name} href="#" className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#6366F1] transition-colors">
                      <span className="text-[#14B8A6]">{r.icon}</span> {r.name}
                    </a>
                  ))}
                </div>
              )}
              {activeTab === 'notes' && (
                <textarea
                  placeholder="دوّن ملاحظاتك هنا..."
                  className="w-full h-24 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-3 py-2 text-xs outline-none resize-none focus:border-[#6366F1]/60 rounded-xl transition-colors"
                />
              )}
            </div>
          </div>
        </div>

        {/* Curriculum Sidebar — 3 columns */}
        <div className="hidden md:flex col-span-3 flex-col border-r border-[#1E2D45] bg-[#0F1828] overflow-y-auto">
          <div className="p-4 border-b border-[#1E2D45]">
            <div className="flex flex-wrap gap-2 text-xs text-[#94A3B8] mb-3">
              <span className="bg-[#162032] rounded-full px-2.5 py-1">📊 متقدم</span>
              <span className="bg-[#162032] rounded-full px-2.5 py-1">⏳ 42h</span>
              <span className="bg-[#162032] rounded-full px-2.5 py-1">🌍 عربي</span>
            </div>
            <div>
              <div className="flex justify-between text-xs text-[#94A3B8] mb-1.5">
                <span>التقدم</span>
                <span>2 / 8</span>
              </div>
              <div className="h-2 bg-[#162032] rounded-full overflow-hidden">
                <div className="h-2 gradient-bg rounded-full w-1/4" />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-[#F1F5F9] px-4 pt-4 pb-2">المنهج</p>
            {LESSONS.map(l => (
              <button
                key={l.id}
                className={`w-full text-right px-4 py-3 text-xs border-b border-[#1E2D45] transition-all flex items-center justify-between gap-2 ${
                  l.active
                    ? 'border-r-2 border-[#6366F1] bg-[#6366F1]/8 text-[#6366F1]'
                    : l.done
                    ? 'text-[#4A5D78]'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]/50'
                }`}
              >
                <span className="flex-1 text-right">{l.title}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-mono">{l.duration}</span>
                  {l.done && <span className="text-[#10B981] text-xs">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

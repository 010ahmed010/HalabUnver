import { useState } from 'react'
import { Link } from 'react-router-dom'

const TOP3 = [
  { rank: 1, name: 'أحمد الجاسم', discipline: 'Full-Stack Dev', jobs: 24, rating: 4.98, score: 98 },
  { rank: 2, name: 'ليلى عمر', discipline: 'UI/UX Design', jobs: 18, rating: 4.95, score: 94 },
  { rank: 3, name: 'كريم إبراهيم', discipline: 'AutoCAD Engineer', jobs: 31, rating: 4.91, score: 91 },
]

const POWER_LIST = [
  { rank: 4, name: 'سامر خالد', discipline: 'AI / Python', score: 87, rate: '98%', verified: true },
  { rank: 5, name: 'رنا أحمد', discipline: 'Data Analysis', score: 84, rate: '95%', verified: true },
  { rank: 6, name: 'علي محمد', discipline: 'Linux / DevOps', score: 81, rate: '100%', verified: true },
  { rank: 7, name: 'نور إبراهيم', discipline: 'Translation', score: 78, rate: '97%', verified: false },
  { rank: 8, name: 'محمد العلي', discipline: 'Architecture', score: 75, rate: '93%', verified: true },
  { rank: 9, name: 'هدى سليمان', discipline: 'Digital Marketing', score: 72, rate: '91%', verified: true },
  { rank: 10, name: 'طارق حسن', discipline: 'Video / Animation', score: 68, rate: '89%', verified: false },
]

const CATEGORIES = ['الكل', '💻 برمجة', '🏗️ هندسة', '🎨 تصميم', '🤖 AI', '📝 كتابة']
const SORTS = ['الأكثر ربحاً', 'الأكثر موثوقية', 'الأعلى تقييماً']
const TIMELINE = ['هذا الشهر', 'كل الأوقات']

export default function Leaderboard() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [activeSort, setActiveSort] = useState('الأعلى تقييماً')
  const [activeTimeline, setActiveTimeline] = useState('كل الأوقات')

  const podiumColors = {
    1: { border: '#FFD700', bg: 'bg-[#FFD700]/10', badge: '👑 Elitist' },
    2: { border: '#C0C0C0', bg: 'bg-[#C0C0C0]/10', badge: '🥈 Silver' },
    3: { border: '#CD7F32', bg: 'bg-[#CD7F32]/10', badge: '🥉 Bronze' },
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-mono text-[#888]">[ TOP_TALENT_LEADERBOARD ] — قاعة المتميزين</span>
          <h1 className="text-3xl font-black text-[#E0E0E0] mt-1">🏆 لوحة المتميزين</h1>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex gap-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 text-xs transition-colors ${activeCategory === c ? 'bg-[#BB86FC] text-[#121212] font-bold' : 'border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC]'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {SORTS.map(s => (
              <button key={s} onClick={() => setActiveSort(s)}
                className={`px-3 py-1.5 text-xs transition-colors ${activeSort === s ? 'border border-[#BB86FC]/60 text-[#BB86FC]' : 'border border-[#2A2A2A] text-[#888] hover:text-[#E0E0E0]'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-1 mr-auto">
            {TIMELINE.map(t => (
              <button key={t} onClick={() => setActiveTimeline(t)}
                className={`px-3 py-1.5 text-xs transition-colors ${activeTimeline === t ? 'border border-[#03DAC6]/60 text-[#03DAC6]' : 'border border-[#2A2A2A] text-[#888]'}`}>
                📅 {t}
              </button>
            ))}
          </div>
        </div>

        {/* Podium — Top 3 */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[TOP3[1], TOP3[0], TOP3[2]].map(f => {
            const c = podiumColors[f.rank]
            return (
              <div key={f.rank} className={`${c.bg} border p-6 text-center ${f.rank === 1 ? 'md:scale-105' : ''}`}
                style={{ borderColor: c.border + '60' }}>
                <div className="text-xs font-mono mb-1" style={{ color: c.border }}>{c.badge}</div>
                <div className="w-16 h-16 mx-auto border-2 flex items-center justify-center text-2xl mb-3" style={{ borderColor: c.border }}>👤</div>
                <div className="text-3xl font-black mb-1" style={{ color: c.border }}>#{f.rank}</div>
                <h3 className="text-sm font-bold text-[#E0E0E0]">{f.name}</h3>
                <p className="text-xs text-[#888] mb-3">{f.discipline}</p>
                <div className="text-xs font-mono text-[#888]">
                  <div>{f.jobs} مشروع · ★ {f.rating}</div>
                </div>
                <Link to="/freelance/profile/ahmed"
                  className="mt-3 block px-3 py-1.5 text-xs border transition-colors hover:text-[#121212] hover:font-bold"
                  style={{ borderColor: c.border + '60', color: c.border, ':hover': { backgroundColor: c.border } }}>
                  👤 عرض الملف
                </Link>
              </div>
            )
          })}
        </div>

        {/* Sidebar rewards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {/* Power List */}
            <p className="text-xs font-mono text-[#888] mb-3">[ POWER_LIST ] — المراكز 4-100</p>
            <div className="border border-[#2A2A2A]">
              {POWER_LIST.map((f, i) => (
                <div key={f.rank} className={`flex items-center gap-4 px-4 py-3 border-b border-[#2A2A2A] last:border-0 hover:bg-[#BB86FC]/5 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-[#1E1E1E]/30'}`}>
                  <span className="text-sm font-mono text-[#555] w-8 text-center">#{f.rank}</span>
                  <div className="w-8 h-8 border border-[#2A2A2A] flex items-center justify-center text-sm">👤</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#E0E0E0]">{f.name}</span>
                      {f.verified && <span className="text-[10px] text-[#BB86FC]">✅</span>}
                    </div>
                    <span className="text-xs text-[#555]">{f.discipline}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 flex-1">
                    <div className="flex-1 h-1.5 bg-[#2A2A2A]">
                      <div className="h-1.5 bg-[#BB86FC]" style={{ width: `${f.score}%` }} />
                    </div>
                    <span className="text-xs font-mono text-[#888] w-8">{f.score}%</span>
                  </div>
                  <span className="text-xs font-mono text-[#4CAF50] w-12">{f.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hall of Fame */}
          <div className="border border-[#FFD700]/20 bg-[#FFD700]/5 p-5">
            <p className="text-xs font-mono text-[#FFD700] mb-3">[ HALL_OF_FAME ] — مزايا Top 100</p>
            <div className="space-y-3 text-xs text-[#888]">
              <div className="flex items-start gap-2">
                <span className="text-[#FFD700]">✓</span>
                <span>خصم 50% على عمولة المنصة</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FFD700]">✓</span>
                <span>شارة <span className="text-[#BB86FC]">💎 VIP</span> على جميع خدماتك</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FFD700]">✓</span>
                <span>أولوية الظهور في الكتالوج والمتجر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your rank sticky */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#BB86FC]/30 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-sm font-mono text-[#888]">
              ترتيبك الحالي: <span className="text-[#BB86FC]">#156</span> — تحتاج 4 تقييمات 5 نجوم للدخول للـ Top 100!
            </span>
            <button className="px-4 py-1.5 border border-[#BB86FC]/40 text-[#BB86FC] text-xs hover:bg-[#BB86FC]/10 transition-colors">
              📈 Improve My Score
            </button>
          </div>
        </div>
        <div className="h-16" />
      </div>
    </div>
  )
}

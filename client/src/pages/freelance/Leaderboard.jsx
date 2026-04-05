import { useState } from 'react'
import { Link } from 'react-router-dom'

const TOP3 = [
  { rank: 1, name: 'أحمد الجاسم', discipline: 'Full-Stack Dev', jobs: 24, rating: 4.98, score: 98 },
  { rank: 2, name: 'ليلى عمر', discipline: 'UI/UX Design', jobs: 18, rating: 4.92, score: 94 },
  { rank: 3, name: 'كريم إبراهيم', discipline: 'AutoCAD', jobs: 31, rating: 4.87, score: 91 },
]

const BOARD = [
  { rank: 4, name: 'سامر خالد', discipline: 'AI / Python', jobs: 12, rating: 4.9, score: 89, delta: '+2' },
  { rank: 5, name: 'نورة سليمان', discipline: 'Translation', jobs: 20, rating: 4.6, score: 85, delta: '0' },
  { rank: 6, name: 'علي محمد', discipline: 'Video Editing', jobs: 9, rating: 4.8, score: 83, delta: '-1' },
  { rank: 7, name: 'رنا أحمد', discipline: 'Data Analysis', jobs: 7, rating: 4.7, score: 80, delta: '+3' },
  { rank: 8, name: 'وليد حسن', discipline: 'Marketing', jobs: 14, rating: 4.5, score: 78, delta: '0' },
]

const DISCIPLINES = ['الكل', 'برمجة', 'تصميم', 'هندسة', 'ذكاء اصطناعي', 'كتابة']

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' }
const MEDAL_COLORS = { 1: '#F59E0B', 2: '#94A3B8', 3: '#CD7F32' }

export default function Leaderboard() {
  const [discipline, setDiscipline] = useState('الكل')
  const [period, setPeriod] = useState('monthly')

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="section-label">قائمة الشرف</span>
          <h1 className="text-2xl font-black text-[#F1F5F9]">🏆 أفضل المستقلين</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex gap-1 p-1 bg-[#0F1828] border border-[#1E2D45] rounded-xl">
            {['monthly', 'weekly', 'alltime'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                  period === p
                    ? 'gradient-bg text-white font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                {p === 'monthly' ? 'شهرياً' : p === 'weekly' ? 'أسبوعياً' : 'الكل'}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {DISCIPLINES.map(d => (
              <button
                key={d}
                onClick={() => setDiscipline(d)}
                className={`px-3.5 py-1.5 text-xs rounded-full transition-all ${
                  discipline === d
                    ? 'bg-[#F59E0B] text-[#070C18] font-semibold'
                    : 'border border-[#1E2D45] text-[#94A3B8] hover:border-[#F59E0B]/40 hover:text-[#F59E0B]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {TOP3.map(t => (
            <Link
              key={t.rank}
              to="/freelance/profile/ahmed"
              className={`rounded-2xl border p-5 text-center hover:shadow-lg transition-all block ${
                t.rank === 1
                  ? 'border-[#F59E0B]/30 bg-gradient-to-b from-[#F59E0B]/10 to-[#F59E0B]/5 row-start-1 md:row-start-auto'
                  : 'border-[#1E2D45] bg-[#0F1828]'
              }`}
            >
              <div className="text-3xl mb-2">{MEDAL[t.rank]}</div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2"
                style={{ background: MEDAL_COLORS[t.rank] + '18', border: `1px solid ${MEDAL_COLORS[t.rank]}30` }}
              >
                👤
              </div>
              <p className="text-sm font-bold text-[#F1F5F9]">{t.name}</p>
              <p className="text-xs text-[#4A5D78] mt-0.5">{t.discipline}</p>
              <div className="mt-3 text-xs text-[#94A3B8] space-y-1">
                <div>★ {t.rating} · {t.jobs} مشروع</div>
                <div className="font-bold text-2xl" style={{ color: MEDAL_COLORS[t.rank] }}>{t.score}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rest of board */}
        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#1E2D45] grid grid-cols-12 text-xs text-[#4A5D78] font-medium">
            <span className="col-span-1">#</span>
            <span className="col-span-5">المستقل</span>
            <span className="col-span-2">التخصص</span>
            <span className="col-span-1">مشاريع</span>
            <span className="col-span-1">تقييم</span>
            <span className="col-span-1">نقاط</span>
            <span className="col-span-1">التغيير</span>
          </div>
          {BOARD.map(b => (
            <Link
              key={b.rank}
              to="/freelance/profile/ahmed"
              className="px-5 py-4 border-b border-[#1E2D45] last:border-0 grid grid-cols-12 items-center text-sm hover:bg-[#162032] transition-colors"
            >
              <span className="col-span-1 text-[#4A5D78] font-mono font-bold">{b.rank}</span>
              <span className="col-span-5 font-medium text-[#F1F5F9]">{b.name}</span>
              <span className="col-span-2 text-xs text-[#94A3B8]">{b.discipline}</span>
              <span className="col-span-1 text-[#94A3B8]">{b.jobs}</span>
              <span className="col-span-1 text-[#F59E0B] font-medium">{b.rating}</span>
              <span className="col-span-1 font-bold text-[#F1F5F9]">{b.score}</span>
              <span className={`col-span-1 text-xs font-bold ${b.delta.startsWith('+') ? 'text-[#10B981]' : b.delta === '0' ? 'text-[#4A5D78]' : 'text-[#F43F5E]'}`}>
                {b.delta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

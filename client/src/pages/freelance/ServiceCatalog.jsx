import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const SERVICES = [
  { id: 's1', title: 'سأبني لك لوحة تحكم MERN Stack احترافية', freelancer: 'أحمد الجاسم', rating: 5.0, reviews: 12, price: '150,000', level: 'Elite', queue: 3, verified: true, promoted: true },
  { id: 's2', title: 'سأصمم لك واجهة مستخدم UI/UX بتجربة استثنائية', freelancer: 'ليلى عمر', rating: 4.8, reviews: 8, price: '80,000', level: 'Pro', queue: 1, verified: true, promoted: false },
  { id: 's3', title: 'سأجهّز مشروع AutoCAD كاملاً حسب مواصفاتك', freelancer: 'كريم إبراهيم', rating: 4.7, reviews: 15, price: '60,000', level: 'Pro', queue: 2, verified: true, promoted: false },
  { id: 's4', title: 'سأطوّر نموذج AI لتصنيف البيانات', freelancer: 'سامر خالد', rating: 4.9, reviews: 6, price: '200,000', level: 'Elite', queue: 1, verified: true, promoted: true },
  { id: 's5', title: 'سأترجم لك وثائق تقنية بدقة عالية', freelancer: 'نورة سليمان', rating: 4.6, reviews: 20, price: '30,000', level: 'Rising', queue: 0, verified: true, promoted: false },
]

const SORT_OPTIONS = [
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'price_asc', label: 'الأقل سعراً' },
  { value: 'price_desc', label: 'الأعلى سعراً' },
]

const LEVEL_COLORS = {
  Elite: { color: '#F59E0B', bg: '#F59E0B15' },
  Pro: { color: '#6366F1', bg: '#6366F115' },
  Rising: { color: '#14B8A6', bg: '#14B8A615' },
}

export default function ServiceCatalog() {
  const { discipline } = useParams()
  const [sort, setSort] = useState('rating')
  const [verified, setVerified] = useState(false)
  const [promoted, setPromoted] = useState(false)
  const [search, setSearch] = useState('')

  const sorted = [...SERVICES]
    .filter(s => {
      if (verified && !s.verified) return false
      if (promoted && !s.promoted) return false
      if (search && !s.title.includes(search) && !s.freelancer.includes(search)) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      const aPrice = parseInt(a.price.replace(',', ''))
      const bPrice = parseInt(b.price.replace(',', ''))
      return sort === 'price_asc' ? aPrice - bPrice : bPrice - aPrice
    })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="section-label">المستقلون</span>
          <h1 className="text-2xl font-black text-[#F1F5F9]">خدمات {discipline || 'برمجة وتطوير'}</h1>
        </div>

        {/* Search + Sort */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث في الخدمات..."
            className="flex-1 min-w-[200px] bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-2.5 text-sm outline-none focus:border-[#F59E0B]/50 rounded-xl transition-colors"
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] px-4 py-2.5 text-sm outline-none rounded-xl"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#94A3B8] hover:text-[#F1F5F9]">
            <input type="checkbox" checked={verified} onChange={e => setVerified(e.target.checked)} className="accent-[#F59E0B] rounded" />
            موثّقون فقط
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#94A3B8] hover:text-[#F1F5F9]">
            <input type="checkbox" checked={promoted} onChange={e => setPromoted(e.target.checked)} className="accent-[#F59E0B] rounded" />
            مميزون فقط
          </label>
          <span className="mr-auto text-sm text-[#94A3B8]">
            <span className="text-[#F1F5F9] font-semibold">{sorted.length}</span> خدمة
          </span>
        </div>

        <div className="space-y-3">
          {sorted.map(s => {
            const lc = LEVEL_COLORS[s.level] || { color: '#94A3B8', bg: '#94A3B810' }
            return (
              <div
                key={s.id}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 hover:border-[#F59E0B]/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#162032] flex items-center justify-center text-2xl shrink-0">👤</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-sm font-bold text-[#F1F5F9] leading-snug">{s.title}</h3>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-base font-black text-[#F59E0B] font-mono whitespace-nowrap">{s.price} SYP</span>
                        {s.promoted && (
                          <span className="text-[10px] bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] rounded-full px-2 py-0.5">⭐ مميّز</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="text-[#94A3B8]">{s.freelancer}</span>
                      {s.verified && <span className="text-[#6366F1] font-medium">✅ موثّق</span>}
                      <span className="text-[#F59E0B] font-medium">★ {s.rating} ({s.reviews})</span>
                      <span
                        className="rounded-full px-2 py-0.5 font-medium"
                        style={{ color: lc.color, background: lc.bg }}
                      >
                        {s.level}
                      </span>
                      {s.queue > 0 && (
                        <span className="text-[#4A5D78]">⏳ طابور: {s.queue}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-[#1E2D45]">
                  <button className="px-5 py-2.5 bg-[#F59E0B] text-[#070C18] font-bold text-xs rounded-xl hover:bg-[#FBBF24] transition-colors">
                    💬 طلب هذه الخدمة
                  </button>
                  <Link
                    to="/freelance/profile/ahmed"
                    className="px-4 py-2.5 rounded-xl border border-[#1E2D45] text-[#94A3B8] text-xs hover:border-[#F59E0B]/30 hover:text-[#F59E0B] transition-all"
                  >
                    عرض الملف
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

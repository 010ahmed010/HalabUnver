import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const SERVICES = [
  { id: 's1', title: 'سأبني لك لوحة تحكم MERN Stack احترافية', freelancer: 'أحمد الجاسم', rating: 5.0, reviews: 12, price: '150,000', level: 'Elite', queue: 3, verified: true, promoted: true },
  { id: 's2', title: 'تطوير تطبيق React.js مع API Node.js', freelancer: 'كريم سعيد', rating: 4.8, reviews: 8, price: '90,000', level: 'Pro', queue: 1, verified: true, promoted: true },
  { id: 's3', title: 'إصلاح أخطاء برمجية واستشارات تقنية', freelancer: 'ليلى عمر', rating: 4.7, reviews: 21, price: '50,000/hr', level: 'Pro', queue: 0, verified: true, promoted: false },
  { id: 's4', title: 'بناء REST API بـ Express وMongoDB', freelancer: 'سامر محمد', rating: 4.6, reviews: 5, price: '75,000', level: 'Junior', queue: 2, verified: false, promoted: false },
  { id: 's5', title: 'إعداد سيرفر Linux ونشر تطبيقات', freelancer: 'علي حسن', rating: 4.9, reviews: 15, price: '120,000', level: 'Elite', queue: 0, verified: true, promoted: false },
  { id: 's6', title: 'تصميم قاعدة بيانات MongoDB محسّنة', freelancer: 'رنا إبراهيم', rating: 4.5, reviews: 3, price: '40,000', level: 'Junior', queue: 0, verified: false, promoted: false },
]

const LEVELS = ['الكل', '🥇 Elite', '🥈 Pro', '🥉 Junior']
const DELIVERY = ['الكل', '⚡ Fast (24h)', '🕒 Standard', '🗓️ Custom']

export default function ServiceCatalog() {
  const { category } = useParams()
  const [activeLevel, setActiveLevel] = useState('الكل')
  const [activeDelivery, setActiveDelivery] = useState('الكل')
  const [sort, setSort] = useState('rating')
  const [lightbox, setLightbox] = useState(null)

  const filtered = SERVICES.filter(s =>
    activeLevel === 'الكل' || s.level === activeLevel.replace(/^\S+\s/, '')
  ).sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'price') return parseInt(a.price) - parseInt(b.price)
    return 0
  })

  return (
    <div className="pt-16 min-h-screen">
      {/* Category header */}
      <div className="relative py-12 overflow-hidden border-b border-[#2A2A2A]">
        <div className="absolute inset-0 bg-[#BB86FC]/5" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-7xl mx-auto px-4">
          <p className="text-xs font-mono text-[#888] mb-1">
            <Link to="/" className="hover:text-[#BB86FC]">الرئيسية</Link> › 
            <Link to="/freelance" className="hover:text-[#BB86FC]"> مستقلون</Link> › 
            <span className="text-[#E0E0E0]"> برمجة وتطوير</span>
          </p>
          <h1 className="text-3xl font-black text-[#E0E0E0] mt-2">💻 البرمجيات والتطوير</h1>
          <p className="text-sm text-[#888] mt-1">تصفّح خدمات متخصصة من أفضل المطوّرين الطلابيين</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <div className="flex gap-1">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setActiveLevel(l)}
                className={`px-3 py-1.5 text-xs transition-colors ${activeLevel === l ? 'bg-[#BB86FC] text-[#121212] font-bold' : 'border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC]'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {DELIVERY.map(d => (
              <button key={d} onClick={() => setActiveDelivery(d)}
                className={`px-3 py-1.5 text-xs transition-colors ${activeDelivery === d ? 'bg-[#03DAC6]/20 text-[#03DAC6] border border-[#03DAC6]/40' : 'border border-[#2A2A2A] text-[#888] hover:border-[#03DAC6]'}`}>
                {d}
              </button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="mr-auto bg-[#1E1E1E] border border-[#2A2A2A] text-[#888] px-3 py-1.5 text-xs outline-none">
            <option value="rating">الأعلى تقييماً</option>
            <option value="price">أقل سعراً</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map(s => (
            <div key={s.id} className={`bg-[#1E1E1E] border transition-colors cursor-pointer ${s.promoted ? 'border-[#BB86FC]/40' : 'border-[#2A2A2A]'} hover:border-[#BB86FC]/60`}
              onClick={() => setLightbox(s)}>
              {/* Image area */}
              <div className="aspect-video bg-[#252525] relative flex items-center justify-center">
                <span className="text-4xl">💻</span>
                {s.promoted && <span className="absolute top-2 right-2 text-[10px] font-mono border border-[#BB86FC]/60 px-1.5 py-0.5 text-[#BB86FC] bg-[#121212]/80">مميّز</span>}
                <span className="absolute bottom-2 left-2 text-[10px] font-mono border border-[#2A2A2A] px-1.5 py-0.5 text-[#888] bg-[#121212]/80">{s.level}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-[#252525] border border-[#2A2A2A] flex items-center justify-center text-xs">👤</div>
                  <span className="text-xs text-[#888]">{s.freelancer}</span>
                  {s.verified && <span className="text-[10px] text-[#BB86FC]">✅</span>}
                </div>
                <h3 className="text-sm text-[#E0E0E0] mb-3 leading-snug">{s.title}</h3>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#FFD700]">
                    ★ {s.rating}
                    <span className="text-[#555]">({s.reviews})</span>
                    {s.queue > 0 && <span className="text-[#03DAC6]">📦 {s.queue} قيد التنفيذ</span>}
                  </div>
                  <span className="font-mono text-[#BB86FC]">من {s.price} SYP</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 border border-[#2A2A2A] p-6 text-center">
          <p className="text-sm text-[#888] mb-3">تبحث عن شيء غير مدرج هنا؟</p>
          <button className="px-6 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors">
            📝 انشر طلبك الخاص — Post a Custom Task
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-[#121212]/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setLightbox(null)}>
          <div className="bg-[#1E1E1E] border border-[#BB86FC]/40 p-6 max-w-lg w-full animate-fade-up">
            <h3 className="text-[#E0E0E0] font-bold mb-2">{lightbox.title}</h3>
            <p className="text-xs text-[#888] mb-4">{lightbox.freelancer} · ★ {lightbox.rating}</p>
            <div className="border border-[#2A2A2A] p-4 mb-4 text-xs text-[#888] space-y-1">
              <p>✓ 3 مراجعات مجانية</p>
              <p>✓ الكود المصدري كامل</p>
              <p>✓ توثيق شامل</p>
              <p>⏱ مدة التسليم: 5 أيام</p>
            </div>
            <div className="flex gap-3">
              <Link to="/freelance/profile/ahmed" className="flex-1 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm text-center hover:bg-[#a06cdc] transition-colors">
                💳 اطلب الآن
              </Link>
              <button className="flex-1 py-2.5 border border-[#2A2A2A] text-[#888] text-sm hover:border-[#BB86FC] transition-colors">
                💬 استفسار
              </button>
              <button onClick={() => setLightbox(null)} className="px-4 py-2.5 border border-[#2A2A2A] text-[#555] text-sm">✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const CATEGORIES = ['الكل', '📚 مكتبة', '🎓 أكاديمية', '💼 مستقلون', '🛒 متجر']
const TAGS = ['🛠️ هندسة', '⚖️ قانون', '💊 طب', '🏗️ معمار', '💻 برمجة', '🤖 ذكاء اصطناعي']

const RESULTS = [
  { type: 'library', icon: '📄', title: 'مبادئ هندسة البرمجيات', subtitle: 'المكتبة · PDF · 320 صفحة', href: '/library/viewer/doc-001', badge: 'مكتبة', badgeColor: '#14B8A6' },
  { type: 'academy', icon: '🎓', title: 'MERN Stack الشاملة', subtitle: 'أكاديمية · 42 ساعة · أحمد الجاسم', href: '/academy/course/mern-001', badge: 'دورة', badgeColor: '#6366F1' },
  { type: 'freelance', icon: '💼', title: 'سأبني لك موقعاً MERN كاملاً', subtitle: 'مستقل · أحمد الجاسم · ★ 5.0', href: '/freelance/profile/ahmed', badge: 'خدمة', badgeColor: '#F59E0B' },
  { type: 'store', icon: '🛒', title: 'Raspberry Pi 4 — 4GB', subtitle: 'متجر · 155,000 SYP · طلب مسبق', href: '/store', badge: 'منتج', badgeColor: '#F43F5E' },
  { type: 'library', icon: '📝', title: 'ملخص قواعد البيانات — نظري وعملي', subtitle: 'المكتبة · ملخص · 28 صفحة', href: '/library/viewer/doc-002', badge: 'ملخص', badgeColor: '#14B8A6' },
  { type: 'academy', icon: '🎓', title: 'Python للذكاء الاصطناعي', subtitle: 'أكاديمية · 35 ساعة · رنا أحمد', href: '/academy/course/ai-004', badge: 'دورة', badgeColor: '#6366F1' },
]

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [activeTag, setActiveTag] = useState(null)

  const filtered = RESULTS.filter(r => {
    if (activeCategory === '📚 مكتبة' && r.type !== 'library') return false
    if (activeCategory === '🎓 أكاديمية' && r.type !== 'academy') return false
    if (activeCategory === '💼 مستقلون' && r.type !== 'freelance') return false
    if (activeCategory === '🛒 متجر' && r.type !== 'store') return false
    return true
  })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="section-label">نتائج البحث</span>
          <h1 className="text-2xl font-black text-[#F1F5F9]">
            {query ? (
              <>نتائج: <span className="gradient-text">"{query}"</span></>
            ) : 'استكشاف المحتوى'}
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            <span className="text-[#F1F5F9] font-semibold">{filtered.length}</span> نتيجة عبر جميع المنصات
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-4 py-1.5 text-sm rounded-full transition-all ${
                activeCategory === c
                  ? 'gradient-bg text-white font-semibold'
                  : 'border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/40 hover:text-[#6366F1]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Tag filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
              className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
                activeTag === t
                  ? 'bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/40 font-semibold'
                  : 'border border-[#1E2D45] text-[#4A5D78] hover:border-[#6366F1]/30 hover:text-[#94A3B8]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filtered.map((r, i) => (
            <Link
              key={i}
              to={r.href}
              className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 flex items-center gap-4 hover:border-[#6366F1]/30 hover:shadow-lg transition-all block group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: r.badgeColor + '15' }}
              >
                {r.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#6366F1] transition-colors truncate">{r.title}</h3>
                <p className="text-xs text-[#4A5D78] mt-0.5">{r.subtitle}</p>
              </div>
              <span
                className="text-[10px] font-semibold rounded-full px-2.5 py-1 shrink-0"
                style={{ color: r.badgeColor, background: r.badgeColor + '15' }}
              >
                {r.badge}
              </span>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[#94A3B8] mb-5">لم نجد نتائج مطابقة</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Link to="/library" className="px-4 py-2 text-xs rounded-xl border border-[#14B8A6]/30 text-[#14B8A6] hover:bg-[#14B8A6]/10 transition-all">تصفح المكتبة</Link>
              <Link to="/academy" className="px-4 py-2 text-xs rounded-xl border border-[#6366F1]/30 text-[#6366F1] hover:bg-[#6366F1]/10 transition-all">تصفح الأكاديمية</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

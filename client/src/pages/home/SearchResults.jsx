import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const CATEGORIES = ['الكل', '📚 مكتبة', '🎓 أكاديمية', '💼 مستقلون', '🛒 متجر']
const TAGS = ['🛠️ هندسة', '⚖️ قانون', '💊 طب', '🏗️ معمار', '💻 برمجة', '🤖 ذكاء اصطناعي']

const MOCK_RESULTS = [
  { id: 1, type: 'library', title: 'ملخص هندسة البرمجيات — الفصل الدراسي الثاني', meta: 'PDF · 2.4MB · 48 صفحة', tag: '📚 مكتبة', badge: 'جامعي أصيل' },
  { id: 2, type: 'academy', title: 'دورة React.js من الصفر إلى الاحتراف', meta: '42 ساعة · 8 مشاريع · عربي', tag: '🎓 أكاديمية', badge: '' },
  { id: 3, type: 'freelance', title: 'أحمد الجاسم — مطوّر Full-Stack MERN', meta: 'تقييم 4.9 · 24 مشروع مكتمل', tag: '💼 مستقلون', badge: '✅ موثّق' },
  { id: 4, type: 'store', title: 'لوحة رسم Huion H640P', meta: '450,000 SYP · متوفر فوراً', tag: '🛒 متجر', badge: 'خصم طلابي 15%' },
  { id: 5, type: 'library', title: 'أسئلة امتحانات شبكات الحاسوب — 2024/2025', meta: 'PDF · 1.1MB · 12 صفحة', tag: '📚 مكتبة', badge: 'نماذج امتحان' },
  { id: 6, type: 'academy', title: 'أساسيات الأمن السيبراني وCTF', meta: '18 ساعة · مستوى متوسط', tag: '🎓 أكاديمية', badge: '' },
]

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [compareList, setCompareList] = useState([])
  const [localQ, setLocalQ] = useState(q)

  const filtered = MOCK_RESULTS.filter(r =>
    (activeCategory === 'الكل' || r.tag.includes(activeCategory.replace(/^\S+\s/, '')))
  )

  const toggleCompare = (id) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ q: localQ })
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6 border border-[#2A2A2A] p-4 font-mono text-xs text-[#888] flex flex-wrap gap-4 items-center">
          <span className="text-[#BB86FC]">[ QUERY: "{q || 'IDLE'}" ]</span>
          <span>[ STATUS: {q ? `FOUND ${filtered.length} ENTRIES` : 'SYSTEM: IDLE — Waiting for Input...'} ]</span>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            value={localQ}
            onChange={e => setLocalQ(e.target.value)}
            placeholder="ابحث في الأرشيف..."
            className="flex-1 bg-[#1E1E1E] border border-[#2A2A2A] text-[#E0E0E0] placeholder-[#555] px-4 py-2.5 text-sm outline-none focus:border-[#BB86FC] transition-colors"
          />
          <button type="submit" className="px-5 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors">
            بحث
          </button>
        </form>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TAGS.map(t => (
            <button key={t} className="px-3 py-1 text-xs border border-[#2A2A2A] text-[#888] hover:border-[#03DAC6] hover:text-[#03DAC6] transition-colors">
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="border border-[#2A2A2A] p-4 sticky top-20">
              <p className="text-xs font-mono text-[#888] mb-3">[ FILTERS ]</p>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-right px-3 py-2 text-sm transition-colors ${
                      activeCategory === cat
                        ? 'bg-[#BB86FC]/10 text-[#BB86FC] border-r-2 border-[#BB86FC]'
                        : 'text-[#888] hover:text-[#E0E0E0]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="border-t border-[#2A2A2A] mt-4 pt-4 space-y-2 text-xs text-[#888]">
                <p className="font-mono">مستوى الوصول</p>
                {['الكل', 'مجاني', 'طلابي فقط'].map(l => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer hover:text-[#E0E0E0]">
                    <input type="radio" name="level" className="accent-[#BB86FC]" /> {l}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {filtered.length === 0 ? (
              <div className="border border-[#EF4444]/30 p-8 text-center text-[#EF4444] font-mono text-sm">
                CRITICAL ERROR: No matches found in Database Cluster.
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(r => (
                  <div key={r.id} className="bg-[#1E1E1E] border border-[#2A2A2A] p-5 hover:border-[#BB86FC]/40 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs border border-[#2A2A2A] px-2 py-0.5 text-[#888]">{r.tag}</span>
                          {r.badge && <span className="text-xs text-[#FFD700]">{r.badge}</span>}
                        </div>
                        <h3 className="text-[#E0E0E0] font-medium mb-1 hover:text-[#BB86FC] cursor-pointer transition-colors">
                          {r.title}
                        </h3>
                        <p className="text-xs font-mono text-[#555]">{r.meta}</p>
                      </div>
                      <label className="flex items-center gap-1.5 text-xs text-[#888] cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={compareList.includes(r.id)}
                          onChange={() => toggleCompare(r.id)}
                          className="accent-[#BB86FC]"
                        />
                        <span>+ COMP</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Compare bench */}
        {compareList.length >= 2 && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#BB86FC]/40 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <span className="text-sm text-[#E0E0E0] font-mono">
                [ LAB BENCH ] — مقارنة {compareList.length} عناصر
              </span>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#BB86FC] text-[#121212] text-sm font-bold">عرض المقارنة</button>
                <button onClick={() => setCompareList([])} className="px-4 py-2 border border-[#2A2A2A] text-[#888] text-sm">إلغاء</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

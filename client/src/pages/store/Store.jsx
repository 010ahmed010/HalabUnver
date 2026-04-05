import { useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = ['الكل', 'أجهزة', 'معدات هندسية', 'مستلزمات طبية', 'ميرش المنصة']
const PRODUCTS = [
  { id: 'p1', name: 'Huion H640P — لوحة رسم رقمية', originalPrice: '530,000', studentPrice: '450,000', source: 'منصة', availability: 'فوري', discount: '15%', inStock: true },
  { id: 'p2', name: 'ThinkPad X1 Carbon — مُجدّد', originalPrice: '4,200,000', studentPrice: '3,700,000', source: 'وسيط', availability: 'فوري', discount: '12%', inStock: true },
  { id: 'p3', name: 'Raspberry Pi 4 — 4GB', originalPrice: '180,000', studentPrice: '155,000', source: 'منصة', availability: 'مسبق', discount: '14%', inStock: false },
  { id: 'p4', name: 'Arduino Mega 2560', originalPrice: '95,000', studentPrice: '80,000', source: 'منصة', availability: 'فوري', discount: '16%', inStock: true },
  { id: 'p5', name: 'قميص HalabUnver — نسخة 2026', originalPrice: '65,000', studentPrice: '55,000', source: 'منصة', availability: 'فوري', discount: '15%', inStock: true },
  { id: 'p6', name: 'مجموعة أدوات هندسية AutoCAD', originalPrice: '120,000', studentPrice: '100,000', source: 'وسيط', availability: 'مسبق', discount: '17%', inStock: false },
]

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [sourceFilter, setSourceFilter] = useState('الكل')
  const [availFilter, setAvailFilter] = useState('الكل')
  const [reserved, setReserved] = useState(null)

  const filtered = PRODUCTS.filter(p => {
    if (sourceFilter === 'منصة' && p.source !== 'منصة') return false
    if (sourceFilter === 'وسيط' && p.source !== 'وسيط') return false
    if (availFilter === 'فوري' && !p.inStock) return false
    if (availFilter === 'مسبق' && p.inStock) return false
    return true
  })

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <span className="section-label">المتجر</span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9]">متجر حلب</h1>
        <p className="text-sm text-[#94A3B8] mt-1">أجهزة ومعدات هندسية بأسعار طلابية مدعومة</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden md:block w-48 lg:w-52 shrink-0">
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 sticky top-20">
            <p className="text-xs font-semibold text-[#F1F5F9] mb-3">التصنيفات</p>
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`w-full text-right px-3 py-2 text-xs mb-1 rounded-lg transition-all ${
                  activeCategory === c
                    ? 'bg-[#F43F5E]/10 text-[#F43F5E] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]'
                }`}
              >
                {c}
              </button>
            ))}

            <div className="mt-4 pt-4 border-t border-[#1E2D45]">
              <p className="text-xs font-semibold text-[#F1F5F9] mb-2">المصدر</p>
              {['الكل', 'منصة', 'وسيط'].map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer text-xs text-[#94A3B8] hover:text-[#F1F5F9] mb-2">
                  <input type="radio" name="source" value={s} checked={sourceFilter === s} onChange={e => setSourceFilter(e.target.value)} className="accent-[#6366F1]" /> {s}
                </label>
              ))}
              <p className="text-xs font-semibold text-[#F1F5F9] mt-3 mb-2">التوفر</p>
              {['الكل', 'فوري', 'مسبق'].map(a => (
                <label key={a} className="flex items-center gap-2 cursor-pointer text-xs text-[#94A3B8] hover:text-[#F1F5F9] mb-2">
                  <input type="radio" name="avail" value={a} checked={availFilter === a} onChange={e => setAvailFilter(e.target.value)} className="accent-[#6366F1]" /> {a}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 min-w-0">
          <p className="text-sm text-[#94A3B8] mb-5">
            <span className="text-[#F1F5F9] font-semibold">{filtered.length}</span> منتج متاح
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div
                key={p.id}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] hover:border-[#F43F5E]/20 hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#162032] flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold rounded-full bg-[#F43F5E] text-white px-2.5 py-0.5">
                    {p.discount} خصم
                  </span>
                  <span className={`absolute top-3 left-3 text-[10px] font-medium rounded-full px-2.5 py-0.5 ${
                    p.source === 'منصة'
                      ? 'bg-[#14B8A6]/15 text-[#14B8A6] border border-[#14B8A6]/30'
                      : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                  }`}>
                    {p.source === 'منصة' ? '🏠 منصة' : '🤝 وسيط'}
                  </span>
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-[#070C18]/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-sm font-semibold text-[#94A3B8] bg-[#0F1828] rounded-full px-4 py-2 border border-[#1E2D45]">طلب مسبق</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm text-[#F1F5F9] font-semibold mb-2 leading-snug flex-1">{p.name}</h3>
                  <div className="mb-3">
                    <span className="text-xs text-[#4A5D78] line-through block">{p.originalPrice} SYP</span>
                    <span className="text-base font-bold text-[#F1F5F9]">{p.studentPrice} <span className="text-xs text-[#94A3B8] font-normal">SYP</span></span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReserved(p.id)}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                        p.inStock
                          ? 'gradient-bg text-white hover:opacity-90'
                          : 'border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/40'
                      }`}
                    >
                      {p.inStock ? '💳 حجز الآن' : '📦 طلب مسبق'}
                    </button>
                    <Link
                      to={`/store/product/${p.id}`}
                      className="px-3 py-2.5 rounded-xl border border-[#1E2D45] text-[#94A3B8] text-xs hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all"
                    >
                      تفاصيل
                    </Link>
                  </div>
                  {reserved === p.id && (
                    <p className="text-xs text-[#10B981] font-medium mt-2.5 text-center animate-fade-up">
                      ✓ تم الحجز! سيتواصل معك الفريق خلال ساعتين
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-10 sm:p-12 text-center">
              <p className="text-[#94A3B8] text-sm mb-5">لم يتم العثور على منتجات</p>
              <a
                href="https://wa.me/963912345678?text=أريد طلب منتج محدد"
                className="px-5 py-2.5 bg-[#10B981] text-white text-sm font-bold rounded-xl hover:bg-[#0d9f72] transition-colors inline-block"
              >
                📲 اطلب منتجاً عبر WhatsApp
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = ['الكل', '💻 أجهزة', '📐 معدات هندسية', '🏥 مستلزمات طبية', '👕 ميرش المنصة']
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
    if (activeCategory !== 'الكل' && !p.name.toLowerCase().includes(activeCategory.replace(/^\S+\s/, '').toLowerCase())) return true
    if (sourceFilter === '🏠 منصة' && p.source !== 'منصة') return false
    if (sourceFilter === '🤝 وسيط' && p.source !== 'وسيط') return false
    if (availFilter === '⚡ فوري' && !p.inStock) return false
    if (availFilter === '📦 مسبق' && p.inStock) return false
    return true
  })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden md:block w-52 shrink-0">
          <div className="border border-[#2A2A2A] p-4 sticky top-20">
            <p className="text-xs font-mono text-[#888] mb-3">[ CATEGORIES ]</p>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`w-full text-right px-3 py-2 text-xs mb-1 transition-colors ${
                  activeCategory === c ? 'bg-[#BB86FC]/10 text-[#BB86FC] border-r-2 border-[#BB86FC]' : 'text-[#888] hover:text-[#E0E0E0]'
                }`}>{c}
              </button>
            ))}

            <p className="text-xs font-mono text-[#888] mt-4 mb-2">[ FILTER_HUD ]</p>
            <div className="space-y-1 text-xs">
              <p className="text-[#555] font-mono">المصدر</p>
              {['الكل', '🏠 منصة', '🤝 وسيط'].map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer text-[#888] hover:text-[#E0E0E0]">
                  <input type="radio" name="source" value={s} checked={sourceFilter === s} onChange={e => setSourceFilter(e.target.value)} className="accent-[#BB86FC]" /> {s}
                </label>
              ))}
              <p className="text-[#555] font-mono mt-2">التوفر</p>
              {['الكل', '⚡ فوري', '📦 مسبق'].map(a => (
                <label key={a} className="flex items-center gap-2 cursor-pointer text-[#888] hover:text-[#E0E0E0]">
                  <input type="radio" name="avail" value={a} checked={availFilter === a} onChange={e => setAvailFilter(e.target.value)} className="accent-[#BB86FC]" /> {a}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <p className="text-xs font-mono text-[#888] mb-4">[ {filtered.length} منتج ]</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#BB86FC]/40 transition-colors">
                {/* Badges */}
                <div className="relative aspect-square bg-[#252525] flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                  <span className="absolute top-2 right-2 text-[10px] font-mono bg-[#EF4444] text-white px-1.5 py-0.5">
                    % خصم {p.discount}
                  </span>
                  <span className={`absolute top-2 left-2 text-[10px] font-mono px-1.5 py-0.5 border ${
                    p.source === 'منصة' ? 'border-[#03DAC6]/60 text-[#03DAC6]' : 'border-[#FFD700]/60 text-[#FFD700]'
                  }`}>
                    {p.source === 'منصة' ? '🏠 منصة' : '🤝 وسيط'}
                  </span>
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-[#121212]/60 flex items-center justify-center">
                      <span className="text-xs font-mono text-[#888]">طلب مسبق</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm text-[#E0E0E0] font-medium mb-2">{p.name}</h3>
                  <div className="mb-3">
                    <span className="text-xs text-[#555] line-through block">{p.originalPrice} SYP</span>
                    <span className="text-base font-bold text-[#E0E0E0]">{p.studentPrice} SYP</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReserved(p.id)}
                      className={`flex-1 py-2 text-xs font-bold transition-colors ${p.inStock
                        ? 'bg-[#BB86FC] text-[#121212] hover:bg-[#a06cdc]'
                        : 'border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC]'}`}
                    >
                      {p.inStock ? '💳 حجز' : '📦 طلب مسبق'}
                    </button>
                    <Link to={`/store/product/${p.id}`} className="px-3 py-2 border border-[#2A2A2A] text-[#888] text-xs hover:border-[#BB86FC] transition-colors">
                      تفاصيل
                    </Link>
                  </div>
                  {reserved === p.id && (
                    <p className="text-xs text-[#4CAF50] font-mono mt-2 text-center animate-fade-up">
                      ✓ تم الحجز! سيتواصل معك الفريق خلال ساعتين
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="border border-[#2A2A2A] p-12 text-center">
              <p className="text-[#888] text-sm mb-4">لم يتم العثور على منتجات</p>
              <a href="https://wa.me/963912345678?text=أريد طلب منتج محدد"
                className="px-5 py-2.5 bg-[#4CAF50] text-white text-sm font-bold hover:bg-[#43a047] transition-colors inline-block">
                📲 Request Broker — عبر WhatsApp
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

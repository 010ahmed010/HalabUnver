import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import StatusPill from '../../components/shared/StatusPill'

const SPECS = [
  { label: 'المعالج', value: 'Intel Core i7-1165G7 @ 2.80GHz' },
  { label: 'الذاكرة', value: '16GB LPDDR4X' },
  { label: 'التخزين', value: '512GB NVMe SSD' },
  { label: 'الشاشة', value: '14" FHD IPS 400nits' },
  { label: 'البطارية', value: '57Wh · تصل لـ 13 ساعة' },
  { label: 'الوزن', value: '1.13 كغ' },
  { label: 'نظام التشغيل', value: 'Windows 11 Pro' },
  { label: 'حالة المنتج', value: 'مُجدَّد — تحقق Grade A' },
]

const REVIEWS = [
  { name: 'أحمد.م', stars: 5, text: 'جهاز رائع، سريع جداً وخفيف. التوصيل كان دقيقاً.' },
  { name: 'سارة.خ', stars: 4, text: 'الحالة كما وُصفت. البطارية ممتازة لحضور المحاضرات.' },
]

const RELATED = [
  { name: 'Huion H640P — خصم 15%', price: '450,000', icon: '🖊️' },
  { name: 'Raspberry Pi 4 — 4GB', price: '155,000', icon: '🖥️' },
  { name: 'Arduino Mega 2560', price: '80,000', icon: '⚡' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const [reserved, setReserved] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="text-xs text-[#4A5D78] mb-5 flex items-center gap-1.5">
          <Link to="/store" className="hover:text-[#F43F5E] transition-colors">المتجر</Link>
          <span>›</span>
          <span className="text-[#94A3B8]">أجهزة</span>
          <span>›</span>
          <span className="text-[#F1F5F9]">ThinkPad X1 Carbon</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* Images */}
          <div>
            <div className="aspect-video bg-[#0F1828] rounded-2xl border border-[#1E2D45] flex items-center justify-center text-6xl mb-3">
              💻
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 aspect-video rounded-xl border flex items-center justify-center text-2xl transition-all ${
                    activeImg === i
                      ? 'border-[#F43F5E]/50 bg-[#F43F5E]/10'
                      : 'border-[#1E2D45] bg-[#0F1828] hover:border-[#F43F5E]/30'
                  }`}
                >
                  💻
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex gap-2 mb-3">
              <span className="text-xs font-semibold text-[#14B8A6] bg-[#14B8A6]/10 rounded-full px-2.5 py-1 border border-[#14B8A6]/20">🏠 منصة</span>
              <StatusPill status="ready" />
            </div>

            <h1 className="text-2xl font-black text-[#F1F5F9] mb-2">ThinkPad X1 Carbon — مُجدّد</h1>
            <p className="text-sm text-[#94A3B8] mb-4">الجهاز الأمثل للمهندس الجامعي — خفيف، سريع، وبطارية لا تنتهي.</p>

            <div className="mb-5">
              <span className="text-sm text-[#4A5D78] line-through block">4,200,000 SYP (سعر السوق)</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#F1F5F9]">3,700,000 SYP</span>
                <span className="text-sm font-bold rounded-full bg-[#F43F5E] text-white px-2.5 py-0.5">12% خصم</span>
              </div>
              <p className="text-xs text-[#10B981] font-medium mt-1">✓ سعر حصري لطلاب جامعة حلب</p>
            </div>

            {reserved ? (
              <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 p-5 animate-fade-up">
                <p className="text-sm text-[#10B981] font-bold mb-1">✓ تم الحجز بنجاح</p>
                <p className="text-xs text-[#94A3B8]">سيتواصل معك الفريق خلال ساعتين عبر WhatsApp أو Telegram لتأكيد الدفع ومكان الاستلام.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setReserved(true)}
                  className="w-full py-4 gradient-bg text-white font-bold text-base rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-[#6366F1]/20"
                >
                  💳 احجز الجهاز الآن — يُدفع لاحقاً
                </button>
                <div className="flex items-center gap-2 text-xs text-[#4A5D78] justify-center">
                  <span>🛡️</span>
                  <span>الدفع يتم عبر ShamCash · ضمان الاسترداد لمدة 7 أيام</span>
                </div>
              </div>
            )}

            <div className="mt-5 pt-5 border-t border-[#1E2D45] space-y-2.5 text-xs text-[#94A3B8]">
              <div className="flex justify-between"><span>مصدر المنتج</span><span className="text-[#F1F5F9] font-medium">منصة HalabUnver (مباشر)</span></div>
              <div className="flex justify-between"><span>وقت التوصيل</span><span className="text-[#F1F5F9] font-medium">2-5 أيام عمل</span></div>
              <div className="flex justify-between"><span>الضمان</span><span className="text-[#F1F5F9] font-medium">شهر واحد - Grade A</span></div>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden mb-6">
          <div className="px-5 py-3.5 border-b border-[#1E2D45]">
            <p className="text-sm font-semibold text-[#F1F5F9]">المواصفات التقنية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {SPECS.map((s, i) => (
              <div
                key={s.label}
                className={`flex justify-between px-5 py-3 text-sm ${
                  i < SPECS.length - 2 ? 'border-b border-[#1E2D45]' : ''
                } ${i % 2 === 0 ? 'md:border-l border-[#1E2D45]' : ''}`}
              >
                <span className="text-[#4A5D78]">{s.label}</span>
                <span className="text-[#F1F5F9] font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 mb-6">
          <p className="text-sm font-semibold text-[#F1F5F9] mb-4">تقييمات الطلاب</p>
          <div className="space-y-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border-b border-[#1E2D45] pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  {Array(r.stars).fill('★').map((s, j) => (
                    <span key={j} className="text-[#F59E0B] text-sm">{s}</span>
                  ))}
                  <span className="text-xs text-[#4A5D78]">— {r.name}</span>
                </div>
                <p className="text-sm text-[#94A3B8]">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div>
          <p className="text-sm font-semibold text-[#F1F5F9] mb-3">منتجات ذات صلة</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {RELATED.map(r => (
              <Link
                key={r.name}
                to="/store"
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 flex items-center gap-3 hover:border-[#F43F5E]/20 transition-all group"
              >
                <span className="text-3xl">{r.icon}</span>
                <div>
                  <p className="text-xs font-bold text-[#F1F5F9] group-hover:text-[#F43F5E] transition-colors">{r.name}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5 font-mono">{r.price} SYP</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

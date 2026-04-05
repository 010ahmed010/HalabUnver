import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const SPECS = [
  { label: 'المعالج', value: 'Intel Core i7-1165G7 @ 2.80GHz' },
  { label: 'الذاكرة', value: '16 GB LPDDR4X' },
  { label: 'التخزين', value: '512 GB NVMe SSD' },
  { label: 'الشاشة', value: '14" IPS FHD (1920×1080)' },
  { label: 'صحة البطارية', value: '87%' },
  { label: 'الوزن', value: '1.13 kg' },
  { label: 'المنافذ', value: '2× USB-C, 2× USB-A, HDMI' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const [activeThumb, setActiveThumb] = useState(0)
  const [reserved, setReserved] = useState(false)
  const isAdmin = false

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <p className="text-xs font-mono text-[#555] mb-6">
          <Link to="/" className="hover:text-[#BB86FC]">الرئيسية</Link> ›
          <Link to="/store" className="hover:text-[#BB86FC]"> المتجر</Link> ›
          <span className="text-[#888]"> ThinkPad X1 Carbon</span>
        </p>

        {/* Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Gallery — 7 cols */}
          <div className="lg:col-span-7">
            <div className="aspect-video bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center mb-3 overflow-hidden group">
              <span className="text-8xl group-hover:scale-110 transition-transform">💻</span>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setActiveThumb(i)}
                  className={`w-16 h-16 border flex items-center justify-center text-2xl transition-colors ${activeThumb === i ? 'border-[#BB86FC]' : 'border-[#2A2A2A] hover:border-[#BB86FC]/50'}`}>
                  💻
                </button>
              ))}
            </div>
          </div>

          {/* Buy Box — 5 cols */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[#555]">#HS-102</span>
              <span className="text-xs border border-[#4CAF50]/40 text-[#4CAF50] px-2 py-0.5">✅ متوفر حالياً</span>
            </div>
            <h1 className="text-2xl font-black text-[#E0E0E0] mb-2">ThinkPad X1 Carbon — مُجدّد بحالة ممتازة</h1>

            <div className="border border-[#2A2A2A] p-4 mb-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-black text-[#E0E0E0]">3,700,000</span>
                <span className="text-sm text-[#888]">SYP</span>
              </div>
              <span className="text-sm text-[#555] line-through">السعر الأصلي: 4,200,000 SYP</span>
              <div className="mt-2 text-xs font-mono text-[#4CAF50]">
                💰 توفير عبر HalabUnver: <span className="font-bold">500,000 SYP</span>
              </div>
            </div>

            <button
              onClick={() => setReserved(!reserved)}
              className={`w-full py-3.5 font-bold text-base mb-3 transition-colors ${reserved ? 'bg-[#4CAF50] text-white' : 'bg-[#BB86FC] text-[#121212] hover:bg-[#a06cdc]'}`}
            >
              {reserved ? '✓ تم الحجز! سيتواصل معك الفريق' : '💳 حجز وإتمام الدفع'}
            </button>
            {reserved && (
              <p className="text-xs text-center font-mono text-[#888] mb-3">
                قم بتحميل إيصال ShamCash في <Link to="/dashboard/orders" className="text-[#BB86FC] hover:underline">طلباتي</Link>
              </p>
            )}

            {isAdmin && (
              <button className="w-full py-2 border border-[#FFD700]/40 text-[#FFD700] text-xs hover:bg-[#FFD700]/10 transition-colors">
                ✏️ تعديل المنتج — لوحة الإدارة
              </button>
            )}
          </div>
        </div>

        {/* Logistics Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'المصدر', icon: '🤝', text: 'توفير خارجي: يتم تأمين المنتج عبر شركاء المنصة مع فحص فني كامل.' },
            { label: 'الاستلام', icon: '📍', text: 'استلام من مكتب الهندسة المعمارية — الطابق 2، مكتب 402.' },
            { label: 'الضمان', icon: '🛡️', text: '3 أيام استبدال في حال وجود عيب هيكلي أو خلل في الهاردوير.' },
          ].map(b => (
            <div key={b.label} className="border border-[#2A2A2A] p-5">
              <span className="text-2xl block mb-2">{b.icon}</span>
              <p className="text-xs font-mono text-[#888] mb-1">{b.label}</p>
              <p className="text-sm text-[#E0E0E0]">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Technical DNA */}
        <div className="border border-[#2A2A2A] p-6">
          <p className="text-xs font-mono text-[#888] mb-4">[ TECHNICAL_DNA ] — المواصفات الكاملة</p>
          <div className="border border-[#2A2A2A]">
            {SPECS.map((s, i) => (
              <div key={s.label} className={`flex items-center px-4 py-3 border-b border-[#2A2A2A] last:border-0 ${i % 2 === 0 ? '' : 'bg-[#1E1E1E]/50'}`}>
                <span className="text-xs font-mono text-[#888] w-32 shrink-0">{s.label}</span>
                <span className="text-sm text-[#E0E0E0]">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a href="#" className="text-xs text-[#BB86FC] hover:underline">📄 تحميل جدول المواصفات الرسمي (PDF)</a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

const CAPABILITIES = [
  { icon: '📚', title: 'المكتبة الرقمية', desc: 'أرشيف شامل للمصادر الأكاديمية والملفات التخصصية، مؤرشفة بنظام ذكي يسهل عملية البحث.' },
  { icon: '🛒', title: 'المتجر الذكي', desc: 'توفير المعدات والأدوات الهندسية بنظام "صفر مخزون" لضمان الجودة وأنسب سعر للطالب.' },
  { icon: '💼', title: 'منصة المبدعين', desc: 'جسرك إلى سوق العمل الحر؛ نعرض مهاراتك ونربطك بمشاريع حقيقية تمنحك الخبرة والعائد.' },
  { icon: '🎓', title: 'الأكاديمية', desc: 'مسارات تعليمية مكثفة وشهادات تدريبية مصممة لسد الفجوة بين الجامعة ومتطلبات السوق التقني.' },
]

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-mono text-[#888]">[ CONTACT_US ] — تواصل مع المنظومة</span>
          <h1 className="text-4xl font-black text-[#E0E0E0] mt-2">تواصل معنا</h1>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="border border-[#2A2A2A] p-5 hover:border-[#BB86FC]/40 transition-colors">
              <span className="text-2xl block mb-2">{c.icon}</span>
              <h3 className="text-[#E0E0E0] font-bold text-sm mb-2">{c.title}</h3>
              <p className="text-xs text-[#888] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="border border-[#2A2A2A] p-6">
              <p className="text-xs font-mono text-[#888] mb-5">[ INQUIRY_TERMINAL ] — نموذج الاستفسار</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-[#888] block mb-1.5">الاسم الكامل</label>
                  <input
                    placeholder="أدخل اسمك الثلاثي لتوثيق السجل..."
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-transparent border border-[#2A2A2A] text-[#E0E0E0] placeholder-[#555] px-4 py-2.5 text-sm outline-none focus:border-[#03DAC6] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-[#888] block mb-1.5">بريد التواصل</label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-transparent border border-[#2A2A2A] text-[#E0E0E0] placeholder-[#555] px-4 py-2.5 text-sm outline-none focus:border-[#03DAC6] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-[#888] block mb-1.5">نوع الاستفسار</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({...form, type: e.target.value})}
                    className="w-full bg-[#1E1E1E] border border-[#2A2A2A] text-[#E0E0E0] px-4 py-2.5 text-sm outline-none focus:border-[#03DAC6] transition-colors"
                    required
                  >
                    <option value="">اختر نوع الاستفسار...</option>
                    <option value="support">دعم تقني</option>
                    <option value="business">استفسار تجاري</option>
                    <option value="academy">أكاديمية</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#888] block mb-1.5">تفاصيل الطلب</label>
                  <textarea
                    placeholder="اشرح حاجتك بدقة؛ سيقوم النظام بتحويلها للقسم المختص فوراً..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    rows={4}
                    className="w-full bg-transparent border border-[#2A2A2A] text-[#E0E0E0] placeholder-[#555] px-4 py-2.5 text-sm outline-none focus:border-[#03DAC6] transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black font-bold text-sm hover:bg-[#03DAC6] transition-colors"
                >
                  إرسال البيانات — SEND_PROTOCOL
                </button>
                {submitted && (
                  <div className="text-xs font-mono text-[#03DAC6] text-center animate-fade-up">
                    [ SYSTEM: تم استلام البيانات بنجاح — كود التتبع #HV-2026 ]
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Direct channels */}
            <div className="border border-[#2A2A2A] p-5">
              <p className="text-xs font-mono text-[#888] mb-3">[ DIRECT_CHANNELS ]</p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: '📧', label: 'support@halabunver.sy' },
                  { icon: '💬', label: 'Telegram: @HalabUnver' },
                  { icon: '📱', label: 'WhatsApp متاح 9ص–5م' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-2 text-sm text-[#888]">
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System status */}
            <div className="border border-[#4CAF50]/30 bg-[#4CAF50]/5 p-5">
              <p className="text-xs font-mono text-[#888] mb-3">[ SYSTEM_STATUS ]</p>
              <div className="text-xs font-mono text-[#4CAF50] animate-pulse">
                SYSTEM STATUS: OPERATIONAL / 100%
              </div>
              <div className="mt-2 text-xs text-[#555]">جميع الأنظمة تعمل بشكل طبيعي</div>
            </div>

            {/* Map placeholder */}
            <div className="border-r-2 border-[#03DAC6] border border-[#2A2A2A] p-5">
              <p className="text-xs font-mono text-[#888] mb-3">[ GLOBAL_COORDINATES ]</p>
              <div className="aspect-video bg-[#1E1E1E] flex items-center justify-center text-xs text-[#555] font-mono grayscale">
                جامعة حلب — سوريا
                <br />
                [ خريطة الموقع ]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

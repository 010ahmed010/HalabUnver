import { useState } from 'react'

const CAPABILITIES = [
  { icon: '📚', title: 'المكتبة الرقمية', desc: 'أرشيف شامل للمصادر الأكاديمية، مؤرشفة بنظام ذكي يسهل البحث.', color: '#14B8A6' },
  { icon: '🛒', title: 'المتجر الذكي', desc: 'أدوات وأجهزة هندسية بنظام "صفر مخزون" وأنسب سعر للطالب.', color: '#F43F5E' },
  { icon: '💼', title: 'منصة المستقلين', desc: 'جسرك إلى سوق العمل الحر — مشاريع حقيقية تمنحك الخبرة والعائد.', color: '#F59E0B' },
  { icon: '🎓', title: 'الأكاديمية', desc: 'مسارات تعليمية مكثفة وشهادات لسد الفجوة بين الجامعة والسوق.', color: '#6366F1' },
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

        <div className="mb-10">
          <span className="section-label">التواصل</span>
          <h1 className="text-4xl font-black text-[#F1F5F9]">تواصل معنا</h1>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 hover:border-[#6366F1]/30 transition-all"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: c.color + '18' }}>
                {c.icon}
              </div>
              <h3 className="text-[#F1F5F9] font-bold text-sm mb-2">{c.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
              <h3 className="text-base font-bold text-[#F1F5F9] mb-5">نموذج الاستفسار</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#94A3B8] block mb-1.5">الاسم الكامل</label>
                  <input
                    placeholder="أدخل اسمك..."
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-3 text-sm outline-none focus:border-[#6366F1]/60 transition-colors rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#94A3B8] block mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-3 text-sm outline-none focus:border-[#6366F1]/60 transition-colors rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#94A3B8] block mb-1.5">نوع الاستفسار</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({...form, type: e.target.value})}
                    className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] px-4 py-3 text-sm outline-none focus:border-[#6366F1]/60 transition-colors rounded-xl"
                    required
                  >
                    <option value="">اختر نوع الاستفسار...</option>
                    <option value="support">دعم تقني</option>
                    <option value="business">استفسار تجاري</option>
                    <option value="academy">أكاديمية</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#94A3B8] block mb-1.5">تفاصيل الطلب</label>
                  <textarea
                    placeholder="اشرح حاجتك بدقة..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    rows={4}
                    className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-3 text-sm outline-none focus:border-[#6366F1]/60 transition-colors resize-none rounded-xl"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 gradient-bg text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity"
                >
                  إرسال الرسالة
                </button>
                {submitted && (
                  <div className="text-sm text-[#10B981] text-center animate-fade-up bg-[#10B981]/10 rounded-xl py-3 font-medium">
                    ✓ تم إرسال رسالتك بنجاح — سنرد عليك قريباً
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5">
              <h4 className="text-sm font-bold text-[#F1F5F9] mb-4">قنوات التواصل المباشر</h4>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '📧', label: 'support@halabunver.sy' },
                  { icon: '💬', label: 'Telegram: @HalabUnver' },
                  { icon: '📱', label: 'WhatsApp متاح 9ص–5م' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                    <span className="text-base">{c.icon}</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#10B981]/5 rounded-2xl border border-[#10B981]/20 p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-blink-soft" />
                <h4 className="text-sm font-bold text-[#10B981]">حالة النظام</h4>
              </div>
              <p className="text-sm text-[#F1F5F9] font-medium">جميع الأنظمة تعمل بشكل طبيعي</p>
              <p className="text-xs text-[#94A3B8] mt-1">معدل الاستجابة: 100%</p>
            </div>

            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5">
              <h4 className="text-sm font-bold text-[#F1F5F9] mb-3">الموقع</h4>
              <div className="aspect-video bg-[#162032] rounded-xl flex items-center justify-center text-sm text-[#4A5D78]">
                جامعة حلب — سوريا
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

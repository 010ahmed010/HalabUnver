import { useState } from 'react'

const CAPABILITIES = [
  { icon: '📚', title: 'المكتبة الرقمية', desc: 'أرشيف شامل للمصادر الأكاديمية، مؤرشفة بنظام ذكي يسهل البحث.', color: '#14B8A6' },
  { icon: '🛒', title: 'المتجر الذكي', desc: 'أدوات وأجهزة هندسية بنظام "صفر مخزون" وأنسب سعر للطالب.', color: '#F43F5E' },
  { icon: '💼', title: 'منصة المستقلين', desc: 'جسرك إلى سوق العمل الحر — مشاريع حقيقية تمنحك الخبرة والعائد.', color: '#F59E0B' },
  { icon: '🎓', title: 'الأكاديمية', desc: 'مسارات تعليمية مكثفة وشهادات لسد الفجوة بين الجامعة والسوق.', color: '#6366F1' },
]

const CONTACT_CHANNELS = [
  {
    icon: '📧',
    label: 'support@halabunver.sy',
    sub: 'راسلنا بريدياً',
    href: 'mailto:support@halabunver.sy',
    external: false,
    hoverColor: '#6366F1',
  },
  {
    icon: '✈️',
    label: '@HalabUnver',
    sub: 'Telegram — رد فوري',
    href: 'https://t.me/HalabUnver',
    external: true,
    hoverColor: '#229ED9',
  },
  {
    icon: '💬',
    label: '+963 999 000 111',
    sub: 'WhatsApp · 9ص – 5م',
    href: 'https://wa.me/963999000111',
    external: true,
    hoverColor: '#25D366',
  },
]

const MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9634!2d37.1341!3d36.2021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e6a9b6dd587f%3A0x748dd4bb6c73aa07!2sUniversity%20of%20Aleppo!5e0!3m2!1sen!2ssy!4v1700000000000'

const MAP_LINK = 'https://maps.google.com/?q=University+of+Aleppo,Syria'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        <div className="mb-10">
          <span className="section-label">التواصل</span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9]">تواصل معنا</h1>
          <p className="text-sm text-[#94A3B8] mt-1">فريقنا جاهز للمساعدة — نرد خلال ساعات</p>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 sm:p-5 hover:border-[#6366F1]/30 transition-all"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-3" style={{ background: c.color + '18' }}>
                {c.icon}
              </div>
              <h3 className="text-[#F1F5F9] font-bold text-xs sm:text-sm mb-1.5">{c.title}</h3>
              <p className="text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 sm:p-6">
              <h3 className="text-base font-bold text-[#F1F5F9] mb-5">نموذج الاستفسار</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    rows={5}
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

            {/* Contact channels — all clickable */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5">
              <h4 className="text-sm font-bold text-[#F1F5F9] mb-4">قنوات التواصل المباشر</h4>
              <div className="flex flex-col gap-2">
                {CONTACT_CHANNELS.map(c => (
                  <a
                    key={c.href}
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl border border-[#1E2D45] hover:border-[#6366F1]/30 hover:bg-[#162032] transition-all group"
                  >
                    <span className="text-xl shrink-0 w-9 h-9 flex items-center justify-center bg-[#162032] group-hover:bg-[#1E2D45] rounded-lg transition-colors">
                      {c.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[#F1F5F9] text-sm font-medium truncate group-hover:text-[#818CF8] transition-colors">{c.label}</div>
                      <div className="text-[#4A5D78] text-xs">{c.sub}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4A5D78] group-hover:text-[#6366F1] transition-colors mr-auto shrink-0">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* System status */}
            <div className="bg-[#10B981]/5 rounded-2xl border border-[#10B981]/20 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-blink-soft shrink-0" />
                <h4 className="text-sm font-bold text-[#10B981]">حالة النظام</h4>
              </div>
              <p className="text-sm text-[#F1F5F9] font-medium">جميع الأنظمة تعمل بشكل طبيعي</p>
              <p className="text-xs text-[#94A3B8] mt-1">معدل الاستجابة: 100%</p>
            </div>

            {/* Location */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
              <div className="px-5 pt-4 pb-3">
                <h4 className="text-sm font-bold text-[#F1F5F9]">الموقع</h4>
                <p className="text-xs text-[#4A5D78] mt-0.5">جامعة حلب — حلب، سوريا</p>
              </div>

              {/* Desktop: embedded Google Maps iframe */}
              <div className="hidden md:block">
                <iframe
                  title="موقع جامعة حلب"
                  src={MAP_URL}
                  width="100%"
                  height="200"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Mobile: tap-to-open button */}
              <div className="md:hidden px-5 pb-5">
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3.5 bg-[#162032] border border-[#1E2D45] rounded-xl hover:border-[#6366F1]/40 hover:bg-[#6366F1]/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <div className="text-[#F1F5F9] text-sm font-medium group-hover:text-[#818CF8] transition-colors">افتح في خرائط Google</div>
                      <div className="text-[#4A5D78] text-xs">جامعة حلب، سوريا</div>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4A5D78] group-hover:text-[#6366F1] transition-colors shrink-0">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

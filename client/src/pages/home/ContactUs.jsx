import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

const CAPABILITIES = [
  { icon: '📚', title: 'المكتبة الرقمية', desc: 'أرشيف شامل للمصادر الأكاديمية، مؤرشفة بنظام ذكي يسهل البحث.', color: '#14B8A6' },
  { icon: '🛒', title: 'المتجر الذكي', desc: 'أدوات وأجهزة هندسية بنظام "صفر مخزون" وأنسب سعر للطالب.', color: '#F43F5E' },
  { icon: '💼', title: 'منصة المستقلين', desc: 'جسرك إلى سوق العمل الحر — مشاريع حقيقية تمنحك الخبرة والعائد.', color: '#F59E0B' },
  { icon: '🎓', title: 'الأكاديمية', desc: 'مسارات تعليمية مكثفة وشهادات لسد الفجوة بين الجامعة والسوق.', color: '#6366F1' },
]

const DEFAULT_CONTACT = {
  contactEmail: 'support@halabunver.sy',
  contactPhone: '+963 999 000 111',
  contactLocation: 'جامعة حلب — سوريا',
  socialLinks: {
    whatsapp: 'https://wa.me/963999000111',
    whatsappDisplay: '+963 999 000 111',
    telegram: 'https://t.me/HalabUnver',
    telegramUsername: '@HalabUnver',
    facebook: 'https://facebook.com/HalabUnver',
  },
}

const MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9634!2d37.1341!3d36.2021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e6a9b6dd587f%3A0x748dd4bb6c73aa07!2sUniversity%20of%20Aleppo!5e0!3m2!1sen!2ssy!4v1700000000000'

const MAP_LINK = 'https://maps.google.com/?q=University+of+Aleppo,Syria'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [contact, setContact] = useState(DEFAULT_CONTACT)

  useEffect(() => {
    api.get('/config')
      .then(data => { if (data?.data) setContact(data.data) })
      .catch(() => {})
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const social = contact.socialLinks || DEFAULT_CONTACT.socialLinks

  const CONTACT_CHANNELS = [
    contact.contactEmail && {
      iconBg: '#1E3A5F',
      iconColor: '#3B82F6',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      label: contact.contactEmail,
      sub: 'البريد الإلكتروني',
      href: `mailto:${contact.contactEmail}`,
      external: false,
    },
    (social.telegram || social.telegramUsername) && {
      iconBg: '#1A3A4A',
      iconColor: '#229ED9',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      label: social.telegramUsername || '@HalabUnver',
      sub: 'Telegram — رد فوري',
      href: social.telegram || 'https://t.me/HalabUnver',
      external: true,
    },
    (social.whatsapp || contact.contactPhone) && {
      iconBg: '#1A3A2A',
      iconColor: '#25D366',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      ),
      label: social.whatsappDisplay || contact.contactPhone || '+963 999 000 111',
      sub: 'واتساب · 9ص – 5م',
      href: social.whatsapp || `https://wa.me/${(contact.contactPhone || '').replace(/\D/g, '')}`,
      external: true,
    },
    contact.contactPhone && !social.whatsapp && {
      iconBg: '#2A1A3A',
      iconColor: '#A855F7',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      label: contact.contactPhone,
      sub: 'اتصال هاتفي مباشر',
      href: `tel:${contact.contactPhone}`,
      external: false,
    },
  ].filter(Boolean)

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

            {/* Contact channels */}
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
                    <span
                      className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-colors"
                      style={{ background: c.iconBg, color: c.iconColor }}
                    >
                      {c.iconSvg}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[#4A5D78] text-[11px] mb-0.5">{c.sub}</div>
                      <div className="text-[#F1F5F9] text-sm font-medium truncate group-hover:text-[#818CF8] transition-colors">{c.label}</div>
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
                <p className="text-xs text-[#4A5D78] mt-0.5">{contact.contactLocation || DEFAULT_CONTACT.contactLocation}</p>
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
                      <div className="text-[#4A5D78] text-xs">{contact.contactLocation || DEFAULT_CONTACT.contactLocation}</div>
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

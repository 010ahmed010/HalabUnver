import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

const footerLinks = {
  apps: [
    { label: 'الأكاديمية', href: '/academy' },
    { label: 'المكتبة الرقمية', href: '/library' },
    { label: 'سوق المستقلين', href: '/freelance' },
    { label: 'المتجر', href: '/store' },
  ],
  platform: [
    { label: 'عن المنصة', href: '/about' },
    { label: 'تواصل معنا', href: '/contact' },
    { label: 'مركز الامتحانات', href: '/exam-hub' },
    { label: 'أفضل المستقلين', href: '/freelance/leaderboard' },
  ],
}

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

export default function Footer() {
  const [contact, setContact] = useState(DEFAULT_CONTACT)

  useEffect(() => {
    api.get('/config')
      .then(data => {
        if (data?.data) setContact(data.data)
      })
      .catch(() => {})
  }, [])

  const social = contact.socialLinks || DEFAULT_CONTACT.socialLinks
  const SOCIAL = [
    {
      title: 'Telegram',
      href: social.telegram || DEFAULT_CONTACT.socialLinks.telegram,
      bg: '#1A3A4A', color: '#229ED9',
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
    },
    {
      title: 'WhatsApp',
      href: social.whatsapp || DEFAULT_CONTACT.socialLinks.whatsapp,
      bg: '#1A3A2A', color: '#25D366',
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    },
    {
      title: 'Facebook',
      href: social.facebook || DEFAULT_CONTACT.socialLinks.facebook,
      bg: '#1A2A3A', color: '#1877F2',
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
  ]

  return (
    <footer className="bg-[#070C18] border-t border-[#1E2D45] w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Main footer grid */}
        <div className="py-16 sm:py-20 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex flex-col gap-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-[#6366F1]/30">
                <span className="text-white font-black text-base">ح</span>
              </div>
              <span className="text-xl font-bold text-[#F1F5F9]">
                حلب <span className="gradient-text">يونيفر</span>
              </span>
            </Link>
            <p className="text-sm text-[#94A3B8] leading-loose max-w-[260px]">
              المنصة الأكاديمية والتجارية الأولى لطلاب جامعة حلب. تعلّم، اكتسب خبرة، وابنِ مستقبلك.
            </p>
            <p className="text-base gradient-text font-bold italic">"Challenge Every Day."</p>
          </div>

          {/* Apps column */}
          <div>
            <h4 className="text-xs font-bold text-[#F1F5F9] mb-6 uppercase tracking-widest">التطبيقات</h4>
            <ul className="space-y-4">
              {footerLinks.apps.map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-[15px] text-[#94A3B8] hover:text-[#6366F1] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform column */}
          <div>
            <h4 className="text-xs font-bold text-[#F1F5F9] mb-6 uppercase tracking-widest">المنصة</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-[15px] text-[#94A3B8] hover:text-[#6366F1] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs font-bold text-[#F1F5F9] mb-6 uppercase tracking-widest">تواصل معنا</h4>
            <ul className="space-y-3 mb-5">
              {contact.contactEmail && (
                <li key="email">
                  <a
                    href={`mailto:${contact.contactEmail}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-80" style={{ background: '#1E3A5F', color: '#3B82F6' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </span>
                    <span className="text-sm text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors truncate">{contact.contactEmail}</span>
                  </a>
                </li>
              )}
              {(social.whatsapp || contact.contactPhone) && (
                <li key="whatsapp">
                  <a
                    href={social.whatsapp || `https://wa.me/${(contact.contactPhone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-80" style={{ background: '#1A3A2A', color: '#25D366' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                    </span>
                    <span className="text-sm text-[#94A3B8] group-hover:text-[#25D366] transition-colors">{social.whatsappDisplay || contact.contactPhone}</span>
                  </a>
                </li>
              )}
              {contact.contactLocation && (
                <li key="location" className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#2A1A1A', color: '#F43F5E' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  <span className="text-sm text-[#94A3B8]">{contact.contactLocation}</span>
                </li>
              )}
            </ul>
            <div className="flex gap-2">
              {SOCIAL.map(s => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E2D45] py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-blink-soft" />
            <span className="text-sm text-[#10B981] font-medium">جميع الأنظمة تعمل</span>
          </div>
          <span className="text-sm text-[#4A5D78]">© 2026 HalabUnver — جميع الحقوق محفوظة</span>
        </div>
      </div>
    </footer>
  )
}

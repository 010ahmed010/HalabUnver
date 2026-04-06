import { Link } from 'react-router-dom'

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

const SOCIAL = [
  {
    letter: 'T',
    title: 'Telegram',
    href: 'https://t.me/HalabUnver',
    hoverColor: '#229ED9',
  },
  {
    letter: 'W',
    title: 'WhatsApp',
    href: 'https://wa.me/963999000111',
    hoverColor: '#25D366',
  },
  {
    letter: 'F',
    title: 'Facebook',
    href: 'https://facebook.com/HalabUnver',
    hoverColor: '#1877F2',
  },
]

export default function Footer() {
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
            <ul className="space-y-3 text-[15px] text-[#94A3B8] mb-5">
              <li>
                <a
                  href="mailto:support@halabunver.sy"
                  className="hover:text-[#6366F1] transition-colors"
                >
                  support@halabunver.sy
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/963999000111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <span className="text-sm">💬</span>
                  WhatsApp: +963 999 000 111
                </a>
              </li>
              <li className="text-sm">جامعة حلب — سوريا</li>
            </ul>
            <div className="flex gap-3">
              {SOCIAL.map(s => (
                <a
                  key={s.letter}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  className="w-10 h-10 rounded-xl border border-[#1E2D45] flex items-center justify-center text-[#94A3B8] hover:border-[#6366F1]/60 hover:text-[#6366F1] hover:bg-[#6366F1]/10 transition-all text-sm font-bold"
                >
                  {s.letter}
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

import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#070C18] border-t border-[#1E2D45] mt-auto w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-[#6366F1]/30">
                <span className="text-white font-black text-base">ح</span>
              </div>
              <span className="text-xl font-bold text-[#F1F5F9]">
                حلب <span className="gradient-text">يونيفر</span>
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-loose mb-4 max-w-xs">
              المنصة الأكاديمية والتجارية الأولى لطلاب جامعة حلب. تعلّم، اكتسب خبرة، وابنِ مستقبلك.
            </p>
            <p className="text-base gradient-text font-bold italic">"Challenge Every Day."</p>
          </div>

          {/* Apps column */}
          <div>
            <h4 className="text-sm font-bold text-[#F1F5F9] mb-5 uppercase tracking-widest">التطبيقات</h4>
            <ul className="space-y-3.5">
              {[
                { label: 'الأكاديمية', href: '/academy' },
                { label: 'المكتبة الرقمية', href: '/library' },
                { label: 'سوق المستقلين', href: '/freelance' },
                { label: 'المتجر', href: '/store' },
              ].map(l => (
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
            <h4 className="text-sm font-bold text-[#F1F5F9] mb-5 uppercase tracking-widest">المنصة</h4>
            <ul className="space-y-3.5">
              {[
                { label: 'عن المنصة', href: '/about' },
                { label: 'تواصل معنا', href: '/contact' },
                { label: 'مركز الامتحانات', href: '/exam-hub' },
                { label: 'أفضل المستقلين', href: '/freelance/leaderboard' },
              ].map(l => (
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
            <h4 className="text-sm font-bold text-[#F1F5F9] mb-5 uppercase tracking-widest">تواصل معنا</h4>
            <ul className="space-y-3 text-[15px] text-[#94A3B8] mb-6">
              <li>support@halabunver.sy</li>
              <li>جامعة حلب — سوريا</li>
            </ul>
            <div className="flex gap-3">
              {[
                { letter: 'T', title: 'Telegram' },
                { letter: 'W', title: 'WhatsApp' },
                { letter: 'F', title: 'Facebook' },
              ].map(s => (
                <a
                  key={s.letter}
                  href="#"
                  title={s.title}
                  className="w-10 h-10 rounded-xl border border-[#1E2D45] flex items-center justify-center text-[#94A3B8] hover:border-[#6366F1]/60 hover:text-[#6366F1] hover:bg-[#6366F1]/10 transition-all text-sm font-bold"
                >
                  {s.letter}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1E2D45] w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-sm text-[#10B981] font-medium">جميع الأنظمة تعمل</span>
          </div>
          <span className="text-sm text-[#4A5D78]">© 2026 HalabUnver — جميع الحقوق محفوظة</span>
        </div>
      </div>
    </footer>
  )
}

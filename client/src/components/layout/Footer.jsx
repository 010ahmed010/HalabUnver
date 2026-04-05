import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#070C18] border-t border-[#1E2D45] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                <span className="text-white font-black text-sm">ح</span>
              </div>
              <span className="text-xl font-bold text-[#F1F5F9]">حلب <span className="gradient-text">يونيفر</span></span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              المنصة الأكاديمية والتجارية الأولى لطلاب جامعة حلب. تعلّم، اكتسب خبرة، وابنِ مستقبلك.
            </p>
            <p className="text-sm gradient-text font-semibold mt-3">"Challenge Every Day."</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#F1F5F9] mb-4 uppercase tracking-wider">التطبيقات</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'الأكاديمية', href: '/academy' },
                { label: 'المكتبة الرقمية', href: '/library' },
                { label: 'سوق المستقلين', href: '/freelance' },
                { label: 'المتجر', href: '/store' },
              ].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-[#94A3B8] hover:text-[#6366F1] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#F1F5F9] mb-4 uppercase tracking-wider">المنصة</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'عن المنصة', href: '/about' },
                { label: 'تواصل معنا', href: '/contact' },
                { label: 'مركز الامتحانات', href: '/exam-hub' },
                { label: 'أفضل المستقلين', href: '/freelance/leaderboard' },
              ].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-[#94A3B8] hover:text-[#6366F1] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#F1F5F9] mb-4 uppercase tracking-wider">التواصل</h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>support@halabunver.sy</li>
              <li>جامعة حلب — سوريا</li>
            </ul>
            <div className="flex gap-2 mt-4">
              {[
                { label: 'T', title: 'Telegram' },
                { label: 'W', title: 'WhatsApp' },
                { label: 'F', title: 'Facebook' },
              ].map(s => (
                <a key={s.label} href="#" title={s.title} className="w-9 h-9 rounded-xl border border-[#1E2D45] flex items-center justify-center text-[#94A3B8] hover:border-[#6366F1]/50 hover:text-[#6366F1] hover:bg-[#6366F1]/10 transition-all text-xs font-bold">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1E2D45] px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A5D78]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span className="text-[#10B981] font-medium">جميع الأنظمة تعمل</span>
          </div>
          <span>© 2026 HalabUnver — جميع الحقوق محفوظة</span>
        </div>
      </div>
    </footer>
  )
}

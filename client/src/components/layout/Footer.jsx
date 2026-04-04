import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] border-t border-[#2A2A2A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-[#E0E0E0]">حلب <span className="text-[#BB86FC]">يونيفر</span></span>
            </div>
            <p className="text-sm text-[#888] leading-relaxed">
              المنصة الأكاديمية والتجارية الأولى لطلاب جامعة حلب. تعلّم، اكتسب خبرة، وابنِ مستقبلك.
            </p>
            <p className="text-xs font-mono text-[#BB86FC] mt-3 italic">"Challenge Every Day."</p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-[#888] mb-3 uppercase tracking-wider">التطبيقات</h4>
            <ul className="space-y-2">
              {[
                { label: 'الأكاديمية', href: '/academy' },
                { label: 'المكتبة الرقمية', href: '/library' },
                { label: 'سوق المستقلين', href: '/freelance' },
                { label: 'المتجر', href: '/store' },
              ].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-[#888] hover:text-[#BB86FC] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-[#888] mb-3 uppercase tracking-wider">المنصة</h4>
            <ul className="space-y-2">
              {[
                { label: 'عن المنصة', href: '/about' },
                { label: 'تواصل معنا', href: '/contact' },
                { label: 'مركز الامتحانات', href: '/exam-hub' },
                { label: 'أفضل المستقلين', href: '/freelance/leaderboard' },
              ].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-[#888] hover:text-[#BB86FC] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-[#888] mb-3 uppercase tracking-wider">التواصل</h4>
            <ul className="space-y-2 text-sm text-[#888]">
              <li>support@halabunver.sy</li>
              <li>جامعة حلب — سوريا</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {['telegram', 'whatsapp', 'facebook'].map(s => (
                <a key={s} href="#" className="w-8 h-8 border border-[#2A2A2A] flex items-center justify-center text-[#888] hover:border-[#BB86FC] hover:text-[#BB86FC] transition-colors text-xs">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2A2A2A] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#555]">
          <div className="flex gap-4">
            <span className="text-[#4CAF50]">[ SYSTEM: STABLE ]</span>
            <span>[ VERSION: 2026.1 ]</span>
            <span>[ AMJ - Ahmed Al-Jassem ]</span>
          </div>
          <span>© 2026 HalabUnver. جميع الحقوق محفوظة.</span>
        </div>
      </div>
    </footer>
  )
}

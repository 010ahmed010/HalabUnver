import { Outlet, Link, useLocation } from 'react-router-dom'

const SIDEBAR_LINKS = [
  { href: '/dashboard', label: '👤 الملف الأكاديمي', exact: true },
  { href: '/dashboard/learning', label: '📚 دوراتي' },
  { href: '/dashboard/wallet', label: '💳 المحفظة' },
  { href: '/dashboard/orders', label: '🛒 طلباتي' },
  { href: '/dashboard/inbox', label: '📥 الرسائل', badge: 3 },
]

export default function DashboardLayout() {
  const { pathname } = useLocation()
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="border border-[#2A2A2A] sticky top-20">
            <div className="p-4 border-b border-[#2A2A2A]">
              <div className="w-12 h-12 border-2 border-[#BB86FC] flex items-center justify-center text-xl mb-2">👤</div>
              <p className="text-sm font-bold text-[#E0E0E0]">أحمد الجاسم</p>
              <p className="text-xs text-[#888]">السنة 4 · معلوماتية</p>
              <div className="mt-2">
                <div className="flex justify-between text-[10px] font-mono text-[#888] mb-1">
                  <span>Level 4</span><span>1,600 XP</span>
                </div>
                <div className="h-1 bg-[#2A2A2A]">
                  <div className="h-1 bg-[#BB86FC]" style={{ width: '64%' }} />
                </div>
              </div>
            </div>
            <nav className="p-2">
              {SIDEBAR_LINKS.map(l => {
                const active = l.exact ? pathname === l.href : pathname.startsWith(l.href) && l.href !== '/dashboard'
                  || (l.exact && pathname === '/dashboard')
                return (
                  <Link key={l.href} to={l.href}
                    className={`flex items-center justify-between px-3 py-2.5 text-sm mb-1 transition-colors ${
                      (l.exact ? pathname === l.href : pathname === l.href)
                        ? 'bg-[#BB86FC]/10 text-[#BB86FC] border-r-2 border-[#BB86FC]'
                        : 'text-[#888] hover:text-[#E0E0E0] hover:bg-[#1E1E1E]'
                    }`}>
                    <span>{l.label}</span>
                    {l.badge && <span className="text-[10px] bg-[#EF4444] text-white px-1.5 py-0.5 rounded-full">{l.badge}</span>}
                  </Link>
                )
              })}
            </nav>
            <div className="p-3 border-t border-[#2A2A2A]">
              <Link to="/freelance/onboarding" className="block w-full text-center px-3 py-2 text-xs border border-[#BB86FC]/40 text-[#BB86FC] hover:bg-[#BB86FC]/10 transition-colors">
                💼 انضم كمستقل
              </Link>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

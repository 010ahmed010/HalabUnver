import { Outlet, Link, useLocation } from 'react-router-dom'

const SIDEBAR_LINKS = [
  { href: '/dashboard', label: 'الملف الأكاديمي', icon: '👤', exact: true },
  { href: '/dashboard/learning', label: 'دوراتي', icon: '📚' },
  { href: '/dashboard/wallet', label: 'المحفظة', icon: '💳' },
  { href: '/dashboard/orders', label: 'طلباتي', icon: '🛒' },
  { href: '/dashboard/inbox', label: 'الرسائل', icon: '📥', badge: 3 },
]

export default function DashboardLayout() {
  const { pathname } = useLocation()

  const isActive = (link) => link.exact ? pathname === link.href : pathname === link.href

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex gap-5 sm:gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 lg:w-60 shrink-0">
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] sticky top-20 overflow-hidden">
            {/* Profile header */}
            <div className="p-5 border-b border-[#1E2D45] bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl gradient-bg flex items-center justify-center text-xl sm:text-2xl mb-3 shadow-lg shadow-[#6366F1]/20">👤</div>
              <p className="text-sm font-bold text-[#F1F5F9]">أحمد الجاسم</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">السنة 4 · معلوماتية</p>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-[#94A3B8] mb-1.5">
                  <span className="font-medium text-[#6366F1]">Level 4</span>
                  <span>1,600 XP</span>
                </div>
                <div className="h-1.5 bg-[#162032] rounded-full overflow-hidden">
                  <div className="h-1.5 gradient-bg rounded-full w-[64%]" />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-3">
              {SIDEBAR_LINKS.map(l => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm mb-1 transition-all ${
                    isActive(l)
                      ? 'bg-[#6366F1]/15 text-[#6366F1] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>{l.icon}</span>
                    <span>{l.label}</span>
                  </span>
                  {l.badge && (
                    <span className="text-[10px] bg-[#F43F5E] text-white px-1.5 py-0.5 rounded-full font-bold">
                      {l.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="p-3 pt-0">
              <Link
                to="/freelance/onboarding"
                className="block w-full text-center px-3 py-2.5 text-xs rounded-xl border border-[#6366F1]/30 text-[#6366F1] hover:bg-[#6366F1]/10 transition-all font-medium"
              >
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

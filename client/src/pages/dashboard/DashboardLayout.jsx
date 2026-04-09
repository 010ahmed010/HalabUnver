import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const SIDEBAR_LINKS = [
  { href: '/dashboard', label: 'الملف الأكاديمي', icon: '👤', exact: true },
  { href: '/dashboard/learning', label: 'دوراتي', icon: '📚' },
  { href: '/dashboard/wallet', label: 'المحفظة', icon: '💳' },
  { href: '/dashboard/orders', label: 'طلباتي', icon: '🛒' },
  { href: '/dashboard/inbox', label: 'الرسائل', icon: '📥' },
]

function xpToLevel(xp) {
  return Math.floor(xp / 500) + 1
}

function xpProgress(xp) {
  const remainder = xp % 500
  return Math.round((remainder / 500) * 100)
}

export default function DashboardLayout() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const isActive = (link) => link.exact ? pathname === link.href : pathname === link.href

  const level = xpToLevel(user?.xp || 0)
  const progress = xpProgress(user?.xp || 0)
  const nextLevelXp = level * 500
  const currentLevelXp = user?.xp || 0

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex gap-5 sm:gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 lg:w-60 shrink-0">
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] sticky top-20 overflow-hidden">
            {/* Profile header */}
            <div className="p-5 border-b border-[#1E2D45] bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl gradient-bg flex items-center justify-center text-xl sm:text-2xl mb-3 shadow-lg shadow-[#6366F1]/20">
                {user?.avatar
                  ? <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-2xl" />
                  : '👤'
                }
              </div>
              <p className="text-sm font-bold text-[#F1F5F9]">{user?.name || '—'}</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                {user?.year ? `${user.year} · ` : ''}{user?.faculty || ''}
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-[#94A3B8] mb-1.5">
                  <span className="font-medium text-[#6366F1]">Level {level}</span>
                  <span>{currentLevelXp} XP</span>
                </div>
                <div className="h-1.5 bg-[#162032] rounded-full overflow-hidden">
                  <div className="h-1.5 gradient-bg rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-[10px] text-[#4A5D78] mt-1">{nextLevelXp - currentLevelXp} XP للمستوى التالي</div>
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
                </Link>
              ))}
            </nav>

            <div className="p-3 pt-0 flex flex-col gap-2">
              {!user?.isFreelancer && (
                <Link
                  to="/freelance/onboarding"
                  className="block w-full text-center px-3 py-2.5 text-xs rounded-xl border border-[#6366F1]/30 text-[#6366F1] hover:bg-[#6366F1]/10 transition-all font-medium"
                >
                  💼 انضم كمستقل
                </Link>
              )}
              <button
                onClick={logout}
                className="w-full text-center px-3 py-2 text-xs rounded-xl text-[#4A5D78] hover:text-[#F43F5E] hover:bg-[#F43F5E]/5 transition-all"
              >
                تسجيل خروج
              </button>
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

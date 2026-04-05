import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'الأكاديمية', href: '/academy', icon: '🎓' },
  { label: 'المكتبة', href: '/library', icon: '📚' },
  { label: 'المستقلون', href: '/freelance', icon: '💼' },
  { label: 'المتجر', href: '/store', icon: '🛒' },
  { label: 'لوحة التحكم', href: '/dashboard', icon: '⚙️' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setSearchOpen(false); setMobileOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070C18]/95 backdrop-blur-xl border-b border-[#1E2D45] shadow-2xl shadow-black/40'
            : 'bg-[#070C18]/70 backdrop-blur-md border-b border-[#1E2D45]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-[#6366F1]/30 group-hover:shadow-[#6366F1]/50 transition-shadow">
              <span className="text-white font-black text-base">ح</span>
            </div>
            <span className="text-[#F1F5F9] font-bold text-lg tracking-tight">
              حلب <span className="gradient-text">يونيفر</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-[14px] rounded-xl transition-all duration-200 font-medium group ${
                    isActive
                      ? 'bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/25'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-sm leading-none">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-4 h-0.5 rounded-full gradient-bg" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl text-[#94A3B8] hover:text-[#6366F1] hover:bg-[#6366F1]/8 border border-transparent hover:border-[#6366F1]/20 transition-all"
              aria-label="بحث"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* News badge */}
            <Link
              to="/exam-hub"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/20 hover:bg-[#F43F5E]/20 hover:border-[#F43F5E]/40 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] animate-blink-soft shrink-0" />
              <span className="hidden md:inline">الأخبار</span>
            </Link>

            {/* Login */}
            <Link
              to="/dashboard"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-[#CBD5E1] border border-[#1E2D45] rounded-xl hover:border-[#6366F1]/50 hover:text-[#F1F5F9] hover:bg-[#6366F1]/5 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              دخول
            </Link>

            {/* CTA */}
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-[14px] font-bold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#6366F1]/25"
            >
              انضم مجاناً
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2.5 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 border border-transparent hover:border-[#1E2D45] transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="القائمة"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen
                  ? <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
                  : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 top-[72px] bg-[#070C18]/80 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="lg:hidden relative z-50 bg-[#070C18]/98 backdrop-blur-xl border-t border-[#1E2D45] px-5 py-5 flex flex-col gap-1.5 shadow-2xl">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 py-3.5 px-5 rounded-2xl text-[15px] font-medium transition-all ${
                      isActive
                        ? 'bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/25'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    {link.label}
                    {isActive && (
                      <span className="mr-auto w-2 h-2 rounded-full bg-[#6366F1] shrink-0" />
                    )}
                  </Link>
                )
              })}
              <div className="mt-3 pt-4 border-t border-[#1E2D45] flex gap-3">
                <Link
                  to="/dashboard"
                  className="flex-1 text-center py-3 text-[14px] font-medium text-[#CBD5E1] border border-[#1E2D45] rounded-2xl hover:border-[#6366F1]/40 hover:text-[#F1F5F9] hover:bg-[#6366F1]/5 transition-all"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/dashboard"
                  className="flex-1 text-center py-3 text-[14px] font-bold gradient-bg text-white rounded-2xl hover:opacity-90 transition-opacity"
                >
                  انضم مجاناً
                </Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#070C18]/92 backdrop-blur-md flex items-start justify-center pt-24 sm:pt-32 px-4"
          onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        >
          <div className="w-full max-w-2xl animate-fade-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ابحث في المكتبة، الأكاديمية، المتجر..."
                className="w-full bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-6 py-4 text-base outline-none focus:border-[#6366F1] transition-colors rounded-2xl"
              />
              <button type="submit" className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6366F1] hover:text-[#8B5CF6] transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>
            <div className="mt-4 flex gap-2 flex-wrap">
              {['المكتبة', 'الأكاديمية', 'المستقلون', 'المتجر'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 text-sm rounded-full border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/50 hover:text-[#6366F1] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#4A5D78] mt-4 text-center">اضغط ESC أو انقر خارج النافذة للإغلاق</p>
          </div>
        </div>
      )}
    </>
  )
}

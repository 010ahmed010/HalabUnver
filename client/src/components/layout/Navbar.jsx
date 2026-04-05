import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'الأكاديمية', href: '/academy' },
  { label: 'المكتبة', href: '/library' },
  { label: 'المستقلون', href: '/freelance' },
  { label: 'المتجر', href: '/store' },
  { label: 'لوحة التحكم', href: '/dashboard' },
]

export default function Navbar() {
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
      <nav className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-[#1E2D45]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
              <span className="text-white font-black text-sm">ح</span>
            </div>
            <span className="text-[#F1F5F9] font-bold text-lg tracking-tight">
              حلب <span className="gradient-text">يونيفر</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3.5 py-1.5 text-sm rounded-lg transition-all ${
                  pathname.startsWith(link.href)
                    ? 'bg-[#6366F1]/10 text-[#6366F1] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E2D45]/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-[#94A3B8] hover:text-[#6366F1] hover:bg-[#1E2D45]/60 transition-all"
              aria-label="بحث"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <Link
              to="/exam-hub"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/20 hover:bg-[#F43F5E]/20 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] animate-blink-soft" />
              الأخبار والإعلانات
            </Link>

            <Link to="/dashboard" className="hidden sm:block px-3.5 py-1.5 text-sm text-[#94A3B8] border border-[#1E2D45] rounded-lg hover:border-[#6366F1]/40 hover:text-[#F1F5F9] transition-all">
              تسجيل الدخول
            </Link>
            <Link to="/dashboard" className="px-3.5 py-1.5 text-sm font-semibold gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity">
              انضم مجاناً
            </Link>

            <button
              className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:bg-[#1E2D45]/60 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen
                  ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass border-t border-[#1E2D45] px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`py-2.5 px-3 rounded-lg text-sm transition-all ${
                  pathname.startsWith(link.href)
                    ? 'bg-[#6366F1]/10 text-[#6366F1] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#070C18]/80 backdrop-blur-md flex items-start justify-center pt-24 px-4"
          onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        >
          <div className="w-full max-w-2xl animate-fade-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ابحث في المكتبة، الأكاديمية، المتجر..."
                className="w-full bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-5 py-4 text-base outline-none focus:border-[#6366F1] transition-colors rounded-2xl"
              />
              <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6366F1]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>
            <div className="mt-3 flex gap-2 flex-wrap">
              {['المكتبة', 'الأكاديمية', 'المستقلون', 'المتجر'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 text-xs rounded-full border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/50 hover:text-[#6366F1] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

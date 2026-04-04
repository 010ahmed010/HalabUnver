import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
      <nav className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#2A2A2A]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-[#E0E0E0] font-bold text-xl tracking-tight">
              حلب <span className="text-[#BB86FC]">يونيفر</span>
            </span>
            <span className="text-[10px] font-mono text-[#888] border border-[#2A2A2A] px-1.5 py-0.5">v2026</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-1.5 text-sm text-[#E0E0E0] hover:text-[#BB86FC] transition-colors rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#888] hover:text-[#BB86FC] transition-colors"
              aria-label="بحث"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <Link
              to="/exam-hub"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-[#EF4444]/40 text-[#EF4444] rounded hover:bg-[#EF4444]/10 transition-all animate-blink-red"
            >
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-blink-red" />
              الأخبار والإعلانات
            </Link>

            <Link to="/dashboard" className="hidden sm:block px-3 py-1.5 text-sm text-[#E0E0E0] border border-[#2A2A2A] rounded hover:border-[#BB86FC] transition-colors">
              تسجيل الدخول
            </Link>
            <Link to="/dashboard" className="px-3 py-1.5 text-sm font-semibold bg-[#BB86FC] text-[#121212] rounded hover:bg-[#a06cdc] transition-colors">
              انضم مجاناً
            </Link>

            <button
              className="md:hidden p-2 text-[#888]"
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
          <div className="md:hidden bg-[#1E1E1E] border-t border-[#2A2A2A] px-4 py-3 flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-[#E0E0E0] hover:text-[#BB86FC] transition-colors text-sm border-b border-[#2A2A2A]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#121212]/90 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        >
          <div className="w-full max-w-2xl animate-fade-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ابحث في المكتبة، الأكاديمية، المتجر، المستقلين..."
                className="w-full bg-[#1E1E1E] border border-[#BB86FC]/40 text-[#E0E0E0] placeholder-[#888] px-5 py-4 text-base outline-none focus:border-[#BB86FC] transition-colors"
              />
              <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BB86FC]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>
            <div className="mt-2 flex gap-2 flex-wrap">
              {['📚 المكتبة', '🎓 الأكاديمية', '💼 المستقلون', '🛒 المتجر'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag.replace(/^\S+\s/, ''))}
                  className="px-3 py-1 text-xs border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC] hover:text-[#BB86FC] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={() => navigate('/search')}
                className="text-xs text-[#888] hover:text-[#BB86FC] transition-colors"
              >
                عرض أرشيف البحث الكامل ←
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

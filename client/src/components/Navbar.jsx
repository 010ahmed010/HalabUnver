import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'الأكاديمية', href: '#academy' },
  { label: 'المكتبة', href: '#library' },
  { label: 'المستقلون', href: '#freelance' },
  { label: 'المتجر', href: '#store' },
  { label: 'لوحة التحكم', href: '#dashboard' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <span className="logo-halab">حلب</span>
          <span className="logo-unver">يونيفر</span>
          <span className="logo-badge">v2026</span>
        </a>

        <div className="navbar-links">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="navbar-link">
              {l.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="btn-nav-news">
            <span className="news-dot"></span>
            الأخبار والإعلانات
          </button>
          <button className="btn-nav-login">تسجيل الدخول</button>
          <button className="btn-nav-register">انضم مجاناً</button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mobile-actions">
            <button className="btn-nav-login">تسجيل الدخول</button>
            <button className="btn-nav-register">انضم مجاناً</button>
          </div>
        </div>
      )}
    </nav>
  )
}

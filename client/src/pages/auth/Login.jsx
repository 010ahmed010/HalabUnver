import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const getRedirect = (user) => {
    if (from && from !== '/auth/login') return from
    if (user.accountType === 'admin') return '/admin'
    if (user.accountType === 'business') return '/business'
    return '/dashboard'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور')
      return
    }
    setError('')
    setLoading(true)
    const result = await login({ email, password })
    setLoading(false)
    if (result.success) {
      navigate(getRedirect(result.user), { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#070C18] flex items-center justify-center px-4 py-16 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#6366F1]/8 blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/40">

          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-[#6366F1]/30">
                <span className="text-white font-black text-lg">ح</span>
              </div>
              <span className="text-[#F1F5F9] font-bold text-xl">
                حلب <span className="gradient-text">يونيفر</span>
              </span>
            </Link>
            <h1 className="text-2xl font-black text-[#F1F5F9] mb-2">مرحباً بعودتك</h1>
            <p className="text-[#4A5D78] text-sm">سجّل دخولك للوصول إلى منظومتك الأكاديمية</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94A3B8] text-sm font-medium">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="user@aleppo.edu.sy"
                className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors"
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94A3B8] text-sm font-medium">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5D78] hover:text-[#94A3B8] transition-colors text-xs"
                >
                  {showPw ? 'إخفاء' : 'إظهار'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-xl px-4 py-3 text-[#F43F5E] text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-[15px]"
            >
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2">
            <p className="text-center text-[#4A5D78] text-sm">
              ليس لديك حساب؟{' '}
              <Link to="/auth/register" className="text-[#818CF8] hover:text-[#6366F1] transition-colors font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
            <p className="text-center">
              <Link to="/auth/forgot-password" className="text-[#4A5D78] hover:text-[#94A3B8] transition-colors text-xs">
                نسيت كلمة المرور؟
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

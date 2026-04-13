import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const FACULTIES = [
  'هندسة معلوماتية', 'هندسة مدنية', 'هندسة معمارية', 'هندسة كهربائية',
  'طب بشري', 'صيدلة', 'طب أسنان', 'علوم', 'حقوق', 'اقتصاد', 'آداب', 'تربية',
]

const YEARS = ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة', 'دراسات عليا']

const BUSINESS_TYPES = [
  { key: 'vendor', icon: '🛒', label: 'بائع منتجات', desc: 'عرض وبيع منتجاتك في متجر حلب يونيفر', color: '#14B8A6' },
  { key: 'advertiser', icon: '📢', label: 'معلن محلي', desc: 'عرض إعلانات نشاطك التجاري على المنصة', color: '#F59E0B' },
  { key: 'freelancer', icon: '💼', label: 'مستقل خارجي', desc: 'تقديم خدماتك المهنية في سوق المستقلين', color: '#F43F5E' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [form, setForm] = useState({ name: '', username: '', email: '', faculty: '', year: '', businessName: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const validateStep2 = () => {
    const e = {}
    const displayName = accountType === 'business' ? form.businessName : form.name
    if (!displayName?.trim()) e.name = 'الاسم مطلوب'
    if (!form.username.trim()) e.username = 'اسم المستخدم مطلوب'
    else if (form.username.length < 3) e.username = 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) e.username = 'أحرف إنجليزية وأرقام وشرطة سفلية فقط'
    if (!form.email.trim()) e.email = 'البريد مطلوب'
    if (accountType === 'student' && !form.faculty) e.faculty = 'الكلية مطلوبة'
    if (!form.password) e.password = 'كلمة المرور مطلوبة'
    else if (form.password.length < 6) e.password = 'كلمة المرور قصيرة جداً'
    if (form.password !== form.confirm) e.confirm = 'كلمتا المرور غير متطابقتان'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleTypeSelect = (type) => {
    setAccountType(type)
    setBusinessType('')
    setStep(2)
  }

  const handleBusinessTypeSelect = (type) => {
    setBusinessType(type)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    if (accountType === 'business' && !businessType) {
      setErrors(p => ({ ...p, businessType: 'يرجى اختيار نوع النشاط التجاري' }))
      return
    }
    setLoading(true)
    setServerError('')
    const name = accountType === 'business' ? (form.businessName || form.name) : form.name
    const result = await register({
      name,
      username: form.username.toLowerCase(),
      email: form.email,
      password: form.password,
      accountType,
      businessType: accountType === 'business' ? businessType : undefined,
      faculty: accountType === 'student' ? form.faculty : undefined,
      year: accountType === 'student' ? form.year : undefined,
    })
    setLoading(false)
    if (result.success) {
      setDone(true)
      setTimeout(() => {
        navigate(accountType === 'student' ? '/dashboard' : '/business', { replace: true })
      }, 2000)
    } else {
      setServerError(result.error)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#070C18] flex items-center justify-center px-4">
        <div className="text-center animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
          <h2 className="text-2xl font-black text-[#F1F5F9] mb-2">
            {accountType === 'student' ? 'مرحباً في منظومتك الأكاديمية!' : 'تم استلام طلبك!'}
          </h2>
          <p className="text-[#4A5D78] text-sm">
            {accountType === 'student' ? 'جاري التحويل إلى لوحة التحكم...' : 'سيتم مراجعة حسابك وإخطارك عند التفعيل'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070C18] flex items-center justify-center px-4 py-16 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/8 blur-[100px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-fade-up">
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
            <h1 className="text-2xl font-black text-[#F1F5F9] mb-2">إنشاء حساب جديد</h1>
            <p className="text-[#4A5D78] text-sm">
              {step === 1 ? 'اختر نوع حسابك للبدء' : 'أدخل بياناتك لإنشاء الحساب'}
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-all ${s <= step ? 'gradient-bg' : 'bg-[#1E2D45]'}`} />
            ))}
          </div>

          {/* Step 1: Account Type */}
          {step === 1 && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleTypeSelect('student')}
                className="flex items-center gap-4 p-4 bg-[#162032] border border-[#1E2D45] rounded-2xl hover:border-[#6366F1]/50 hover:bg-[#6366F1]/5 transition-all text-right"
              >
                <div className="w-12 h-12 rounded-xl bg-[#6366F1]/15 flex items-center justify-center text-2xl shrink-0">🎓</div>
                <div>
                  <div className="text-[#F1F5F9] font-bold">حساب طالب</div>
                  <div className="text-[#4A5D78] text-xs mt-0.5">للطلاب في جامعة حلب — وصول كامل للمنصة</div>
                </div>
              </button>

              <button
                onClick={() => handleTypeSelect('business')}
                className="flex items-center gap-4 p-4 bg-[#162032] border border-[#1E2D45] rounded-2xl hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/5 transition-all text-right"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 flex items-center justify-center text-2xl shrink-0">💼</div>
                <div>
                  <div className="text-[#F1F5F9] font-bold">حساب أعمال</div>
                  <div className="text-[#4A5D78] text-xs mt-0.5">للبائعين والمعلنين والمستقلين الخارجيين</div>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Back */}
              <button
                type="button"
                onClick={() => { setStep(1); setAccountType(''); setBusinessType('') }}
                className="text-[#4A5D78] hover:text-[#94A3B8] text-sm flex items-center gap-1.5 mb-1 transition-colors"
              >
                ← العودة
              </button>

              {/* Business type selection */}
              {accountType === 'business' && (
                <div className="flex flex-col gap-2">
                  <label className="text-[#94A3B8] text-sm font-medium">نوع النشاط التجاري</label>
                  <div className="grid grid-cols-1 gap-2">
                    {BUSINESS_TYPES.map(bt => (
                      <button
                        key={bt.key}
                        type="button"
                        onClick={() => handleBusinessTypeSelect(bt.key)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-right ${
                          businessType === bt.key
                            ? 'border-[#6366F1]/60 bg-[#6366F1]/8'
                            : 'border-[#1E2D45] bg-[#162032] hover:border-[#6366F1]/30'
                        }`}
                      >
                        <span className="text-xl">{bt.icon}</span>
                        <div>
                          <div className="text-[#F1F5F9] text-sm font-semibold">{bt.label}</div>
                          <div className="text-[#4A5D78] text-xs">{bt.desc}</div>
                        </div>
                        {businessType === bt.key && <span className="mr-auto text-[#6366F1] text-sm">✓</span>}
                      </button>
                    ))}
                  </div>
                  {errors.businessType && <span className="text-[#F43F5E] text-xs">{errors.businessType}</span>}
                </div>
              )}

              {accountType === 'student' ? (
                <Field label="الاسم الكامل" error={errors.name}>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="أحمد محمد" className={inp(errors.name)} />
                </Field>
              ) : (
                <Field label="اسم النشاط التجاري" error={errors.name}>
                  <input value={form.businessName} onChange={e => set('businessName', e.target.value)} placeholder="اسم المتجر أو الشركة" className={inp(errors.name)} />
                </Field>
              )}

              <Field label="اسم المستخدم (username)" error={errors.username}>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A5D78] text-sm select-none">@</span>
                  <input
                    value={form.username}
                    onChange={e => set('username', e.target.value.replace(/\s/g, ''))}
                    placeholder="ahmed123"
                    className={`${inp(errors.username)} pr-8`}
                    autoComplete="username"
                    dir="ltr"
                  />
                </div>
              </Field>

              <Field label="البريد الإلكتروني" error={errors.email}>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="user@example.com" className={inp(errors.email)} autoComplete="email" />
              </Field>

              {accountType === 'student' && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="الكلية" error={errors.faculty}>
                    <select value={form.faculty} onChange={e => set('faculty', e.target.value)} className={inp(errors.faculty)}>
                      <option value="">اختر كليتك</option>
                      {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </Field>
                  <Field label="السنة الدراسية">
                    <select value={form.year} onChange={e => set('year', e.target.value)} className={inp()}>
                      <option value="">اختر السنة</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </Field>
                </div>
              )}

              <Field label="كلمة المرور" error={errors.password}>
                <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="6 أحرف على الأقل" className={inp(errors.password)} autoComplete="new-password" />
              </Field>
              <Field label="تأكيد كلمة المرور" error={errors.confirm}>
                <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="أعد كتابة كلمة المرور" className={inp(errors.confirm)} autoComplete="new-password" />
              </Field>

              {accountType === 'business' && (
                <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl px-4 py-3 text-[#F59E0B] text-xs">
                  سيتم مراجعة حسابك من قِبل الإدارة قبل التفعيل — ستصلك إشعار عند الموافقة
                </div>
              )}

              {serverError && (
                <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-xl px-4 py-3 text-[#F43F5E] text-sm text-center">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-[15px]"
              >
                {loading ? 'جاري الإنشاء...' : accountType === 'student' ? 'إنشاء حسابي الطلابي' : 'إرسال طلب حساب الأعمال'}
              </button>
            </form>
          )}

          <p className="text-center text-[#4A5D78] text-sm mt-6">
            لديك حساب بالفعل؟{' '}
            <Link to="/auth/login" className="text-[#818CF8] hover:text-[#6366F1] transition-colors font-medium">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#94A3B8] text-sm font-medium">{label}</label>
      {children}
      {error && <span className="text-[#F43F5E] text-xs">{error}</span>}
    </div>
  )
}

function inp(error) {
  return `w-full bg-[#162032] border ${error ? 'border-[#F43F5E]/50' : 'border-[#1E2D45]'} text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors`
}

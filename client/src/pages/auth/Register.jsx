import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const FACULTIES = [
  'هندسة معلوماتية', 'هندسة مدنية', 'هندسة معمارية', 'هندسة كهربائية',
  'طب بشري', 'صيدلة', 'طب أسنان', 'علوم', 'حقوق', 'اقتصاد', 'آداب', 'تربية',
]

const YEARS = ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة', 'دراسات عليا']

const BUSINESS_TYPES = [
  {
    key: 'vendor',
    icon: '🛒',
    label: 'بائع منتجات',
    desc: 'عرض وبيع منتجاتك في متجر حلب يونيفر',
    color: '#14B8A6',
  },
  {
    key: 'advertiser',
    icon: '📢',
    label: 'معلن محلي',
    desc: 'عرض إعلانات نشاطك التجاري على المنصة',
    color: '#F59E0B',
  },
  {
    key: 'freelancer',
    icon: '💼',
    label: 'مستقل خارجي',
    desc: 'تقديم خدماتك المهنية في سوق المستقلين',
    color: '#F43F5E',
  },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [form, setForm] = useState({ name: '', email: '', faculty: '', year: '', businessName: '', contact: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const validateStep2 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'الاسم مطلوب'
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
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const result = register({
      name: accountType === 'business' ? form.businessName || form.name : form.name,
      email: form.email,
      accountType,
      businessType: accountType === 'business' ? businessType : null,
      faculty: form.faculty,
      year: form.year,
    })
    setLoading(false)
    if (result.success) {
      setDone(true)
      setTimeout(() => {
        navigate(accountType === 'student' ? '/dashboard' : accountType === 'business' ? '/business' : '/')
      }, 2000)
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
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-[#6366F1]/30">
                <span className="text-white font-black">ح</span>
              </div>
              <span className="text-[#F1F5F9] font-bold text-lg">حلب <span className="gradient-text">يونيفر</span></span>
            </Link>

            <div className="flex items-center justify-center gap-2 mb-5">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s ? 'gradient-bg text-white' : 'bg-[#162032] border border-[#1E2D45] text-[#4A5D78]'
                  }`}>{s}</div>
                  {s < 2 && <div className={`w-12 h-0.5 rounded-full transition-all ${step > s ? 'bg-[#6366F1]' : 'bg-[#1E2D45]'}`} />}
                </div>
              ))}
            </div>

            <h1 className="text-2xl font-black text-[#F1F5F9] mb-1">
              {step === 1 ? 'أنت من؟' : 'أكمل بياناتك'}
            </h1>
            <p className="text-[#4A5D78] text-sm">
              {step === 1 ? 'اختر نوع حسابك للمتابعة' : 'بضع خطوات وأنت جاهز'}
            </p>
          </div>

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleTypeSelect('student')}
                className="flex items-start gap-4 p-5 bg-[#162032] border border-[#1E2D45] rounded-2xl hover:border-[#6366F1]/50 hover:bg-[#6366F1]/5 transition-all text-right group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#6366F1]/15 flex items-center justify-center text-2xl shrink-0 group-hover:bg-[#6366F1]/25 transition-colors">🎓</div>
                <div>
                  <div className="text-[#F1F5F9] font-bold mb-1 group-hover:text-[#818CF8] transition-colors">طالب جامعي</div>
                  <div className="text-[#4A5D78] text-sm leading-relaxed">طالب في جامعة حلب — استهلك المحتوى، تعلّم، تسوّق، وانضم لسوق المستقلين</div>
                </div>
              </button>

              <button
                onClick={() => setStep('business-type')}
                className="flex items-start gap-4 p-5 bg-[#162032] border border-[#1E2D45] rounded-2xl hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/5 transition-all text-right group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-2xl shrink-0 group-hover:bg-[#F59E0B]/20 transition-colors">💼</div>
                <div>
                  <div className="text-[#F1F5F9] font-bold mb-1 group-hover:text-[#F59E0B] transition-colors">حساب أعمال</div>
                  <div className="text-[#4A5D78] text-sm leading-relaxed">بائع منتجات، معلن محلي، أو مستقل خارجي — وصّل نشاطك التجاري بطلاب جامعة حلب</div>
                </div>
              </button>

              <p className="text-center text-[#4A5D78] text-xs mt-2">
                لديك حساب؟{' '}
                <Link to="/auth/login" className="text-[#818CF8] hover:text-[#6366F1] transition-colors">
                  سجّل دخولك
                </Link>
              </p>
            </div>
          )}

          {step === 'business-type' && (
            <div className="flex flex-col gap-3">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[#4A5D78] hover:text-[#94A3B8] transition-colors text-sm mb-2">
                <span>→</span> رجوع
              </button>
              <p className="text-[#94A3B8] text-sm font-medium mb-1">اختر نوع نشاطك التجاري:</p>
              {BUSINESS_TYPES.map(bt => (
                <button
                  key={bt.key}
                  onClick={() => { setBusinessType(bt.key); handleTypeSelect('business') }}
                  className="flex items-center gap-4 p-4 bg-[#162032] border border-[#1E2D45] rounded-2xl hover:border-[#6366F1]/40 transition-all text-right group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1E2D45] flex items-center justify-center text-xl shrink-0">{bt.icon}</div>
                  <div className="flex-1">
                    <div className="text-[#F1F5F9] font-semibold text-sm">{bt.label}</div>
                    <div className="text-[#4A5D78] text-xs mt-0.5">{bt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-[#4A5D78] hover:text-[#94A3B8] transition-colors text-sm -mt-2 mb-1">
                <span>→</span> رجوع
              </button>

              {accountType === 'student' ? (
                <>
                  <Field label="الاسم الكامل" error={errors.name}>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="أدخل اسمك الثلاثي" className={input(errors.name)} />
                  </Field>
                  <Field label="البريد الإلكتروني الجامعي" error={errors.email}>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@aleppo.edu.sy" className={input(errors.email)} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="الكلية" error={errors.faculty}>
                      <select value={form.faculty} onChange={e => set('faculty', e.target.value)} className={input(errors.faculty)}>
                        <option value="">اختر الكلية</option>
                        {FACULTIES.map(f => <option key={f}>{f}</option>)}
                      </select>
                    </Field>
                    <Field label="السنة الدراسية">
                      <select value={form.year} onChange={e => set('year', e.target.value)} className={input()}>
                        <option value="">اختر السنة</option>
                        {YEARS.map(y => <option key={y}>{y}</option>)}
                      </select>
                    </Field>
                  </div>
                </>
              ) : (
                <>
                  <Field label="اسم النشاط التجاري" error={errors.name}>
                    <input value={form.businessName || form.name} onChange={e => set('businessName', e.target.value)} placeholder="اسم المتجر أو الشركة" className={input(errors.name)} />
                  </Field>
                  <Field label="بريد التواصل" error={errors.email}>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="contact@business.sy" className={input(errors.email)} />
                  </Field>
                </>
              )}

              <Field label="كلمة المرور" error={errors.password}>
                <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="6 أحرف على الأقل" className={input(errors.password)} />
              </Field>
              <Field label="تأكيد كلمة المرور" error={errors.confirm}>
                <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="أعد كتابة كلمة المرور" className={input(errors.confirm)} />
              </Field>

              {accountType === 'business' && (
                <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl px-4 py-3 text-[#F59E0B] text-xs">
                  سيتم مراجعة حسابك من قِبل الإدارة قبل التفعيل — ستصلك إشعار عند الموافقة
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

function input(error) {
  return `w-full bg-[#162032] border ${error ? 'border-[#F43F5E]/50' : 'border-[#1E2D45]'} text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors`
}

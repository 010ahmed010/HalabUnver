import { useState } from 'react'
import { Link } from 'react-router-dom'

const STEPS = [
  { key: 'terms', label: 'الشروط والأحكام' },
  { key: 'profile', label: 'معلوماتك الأساسية' },
  { key: 'skills', label: 'مهاراتك ومجالك' },
  { key: 'payment', label: 'إعداد الدفع' },
]

const SUBSCRIPTION_FEATURES = [
  'إنشاء ملف مستقل موثّق',
  'نشر خدماتك في الكتالوج',
  'الوصول لنظام الوساطة الآمن (Escrow)',
  'شارة "Verified Student"',
  'قبول المدفوعات عبر ShamCash',
]

export default function FreelanceOnboarding() {
  const [step, setStep] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({ name: '', bio: '', major: '', skills: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center animate-fade-up px-4">
          <div className="w-24 h-24 gradient-bg rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-[#6366F1]/20">✅</div>
          <h2 className="text-2xl font-black text-[#F1F5F9] mb-2">أهلاً بك في HalabWork!</h2>
          <p className="text-[#94A3B8] text-sm mb-4">طلبك قيد المراجعة. سيتم تفعيل حسابك خلال 24–48 ساعة.</p>
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 text-right mb-6 text-sm space-y-2 text-[#94A3B8]">
            <p>🎓 <span className="text-[#F1F5F9] font-medium">المرحلة التالية:</span> قم بزيارة لوحة التحكم</p>
            <p>📋 <span className="text-[#F1F5F9] font-medium">أضف</span> خدماتك الأولى في الكتالوج</p>
            <p>💬 <span className="text-[#F1F5F9] font-medium">ابدأ</span> باستقبال الطلبات من العملاء</p>
          </div>
          <Link to="/dashboard" className="px-8 py-3.5 gradient-bg text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity inline-block">
            الذهاب للوحة التحكم
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <span className="section-label">انضم كمستقل</span>
          <h1 className="text-2xl font-black text-[#F1F5F9] mb-1">سجّل كمستقل</h1>
          <p className="text-sm text-[#94A3B8]">$5/شهر · <span className="text-[#10B981] font-medium">دخول مجاني الأسبوع الأول</span></p>
        </div>

        {/* Progress steps */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className={`flex items-center gap-2 shrink-0 ${i < STEPS.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? 'bg-[#10B981] text-white'
                    : i === step
                    ? 'gradient-bg text-white'
                    : 'bg-[#162032] text-[#4A5D78] border border-[#1E2D45]'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs ${i === step ? 'text-[#F1F5F9] font-semibold' : 'text-[#4A5D78]'}`}>{s.label}</span>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-[#1E2D45]" />}
            </div>
          ))}
        </div>

        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">

          {/* Step 0: Terms */}
          {step === 0 && (
            <div>
              <h3 className="text-base font-bold text-[#F1F5F9] mb-3">الشروط والأحكام</h3>
              <div className="h-48 overflow-y-auto bg-[#162032] rounded-xl border border-[#1E2D45] p-4 mb-4 text-xs text-[#94A3B8] leading-relaxed space-y-2">
                <p><strong className="text-[#F1F5F9]">1. الأهلية:</strong> يجب أن تكون طالباً مسجلاً في جامعة حلب أو أحد معاهدها.</p>
                <p><strong className="text-[#F1F5F9]">2. الاشتراك:</strong> الرسوم $5 شهرياً، قابلة للإلغاء في أي وقت.</p>
                <p><strong className="text-[#F1F5F9]">3. الوساطة:</strong> تحتفظ المنصة بـ 10% من قيمة كل صفقة مقابل خدمة الحماية.</p>
                <p><strong className="text-[#F1F5F9]">4. المحتوى:</strong> يلتزم المستقل بتقديم عمل أصيل وعدم الغش الأكاديمي.</p>
                <p><strong className="text-[#F1F5F9]">5. التقييم:</strong> يحق للعميل تقييم الخدمة بعد إتمام التسليم.</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="accent-[#6366F1] w-4 h-4 rounded" />
                <span className="text-sm text-[#94A3B8]">أوافق على الشروط والأحكام وسياسة الخصوصية</span>
              </label>
            </div>
          )}

          {/* Step 1: Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#F1F5F9]">معلوماتك الأساسية</h3>
              {[
                { key: 'name', label: 'الاسم الكامل', placeholder: 'أحمد الجاسم' },
                { key: 'bio', label: 'نبذة مختصرة', placeholder: 'مطوّر Full-Stack شغوف بـ React وNode.js...' },
                { key: 'major', label: 'تخصصك الجامعي', placeholder: 'هندسة معلوماتية — السنة الرابعة' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-[#94A3B8] block mb-1.5">{f.label}</label>
                  <input
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})}
                    className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-2.5 text-sm outline-none focus:border-[#6366F1]/60 rounded-xl transition-colors"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#F1F5F9]">مهاراتك ومجالك</h3>
              <div>
                <label className="text-xs font-medium text-[#94A3B8] block mb-1.5">مهاراتك الرئيسية</label>
                <input
                  placeholder="React.js, Node.js, MongoDB..."
                  value={form.skills}
                  onChange={e => setForm({...form, skills: e.target.value})}
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-2.5 text-sm outline-none focus:border-[#6366F1]/60 rounded-xl transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#94A3B8] block mb-2">التخصصات المتاحة</label>
                <div className="flex flex-wrap gap-2">
                  {['برمجة وتطوير', 'تصميم', 'هندسة', 'ذكاء اصطناعي', 'كتابة', 'تسويق'].map(d => (
                    <button key={d} className="px-3 py-1.5 text-xs border border-[#1E2D45] rounded-full text-[#94A3B8] hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all">
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h3 className="text-base font-bold text-[#F1F5F9] mb-4">إعداد طريقة الدفع</h3>
              <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#FBBF24]/5 rounded-xl border border-[#F59E0B]/20 p-5 mb-4">
                <p className="text-sm font-bold text-[#F1F5F9] mb-3">ما تحصل عليه مقابل $5/شهر:</p>
                <ul className="space-y-2">
                  {SUBSCRIPTION_FEATURES.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <span className="text-[#10B981] shrink-0">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4 text-center">
                <p className="text-xs text-[#94A3B8] mb-3">سيتم الدفع الأول عبر ShamCash بعد تفعيل الحساب</p>
                <div className="w-20 h-20 mx-auto border-2 border-[#6366F1]/30 rounded-xl flex items-center justify-center text-xs text-[#4A5D78] mb-2">QR CODE</div>
                <p className="text-xs text-[#4A5D78]">ShamCash · +963 9XX XXXXXXX</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-5 py-3 rounded-xl border border-[#1E2D45] text-[#94A3B8] text-sm hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all"
            >
              ← السابق
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={step === 0 && !agreed}
            className={`flex-1 py-3 font-bold text-sm rounded-xl transition-all ${
              step === 0 && !agreed
                ? 'bg-[#162032] text-[#4A5D78] border border-[#1E2D45] cursor-not-allowed'
                : 'gradient-bg text-white hover:opacity-90'
            }`}
          >
            {step === STEPS.length - 1 ? '✅ إرسال الطلب' : 'التالي →'}
          </button>
        </div>
      </div>
    </div>
  )
}

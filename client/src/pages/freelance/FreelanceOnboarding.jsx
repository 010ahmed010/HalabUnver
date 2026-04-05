import { useState } from 'react'
import { Link } from 'react-router-dom'

const STEPS = [
  { key: 'terms', label: 'شروط الخدمة' },
  { key: 'skills', label: 'محاذاة المهارات' },
  { key: 'payment', label: 'رسوم الوصول' },
]

const USER_SKILLS = ['MERN Stack', 'Pentesting', 'Linux', 'Python']

export default function FreelanceOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [confirmedSkills, setConfirmedSkills] = useState([...USER_SKILLS])

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Banner */}
      <div className="relative py-12 border-b border-[#2A2A2A] grid-bg overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 border border-[#BB86FC]/30 px-3 py-1 mb-4 text-xs font-mono text-[#888]">
            👤 المستخدم الحالي: <span className="text-[#BB86FC]">أحمد الجاسم</span>
          </div>
          <h1 className="text-3xl font-black text-[#E0E0E0]">Scale Your Skills.</h1>
          <p className="text-[#BB86FC] text-xl font-bold mt-1">Challenge Every Day.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center flex-1">
              <div className={`flex items-center gap-2 px-4 py-2 text-xs font-mono w-full justify-center border transition-colors ${
                i === currentStep ? 'border-[#BB86FC] text-[#BB86FC] bg-[#BB86FC]/10' :
                i < currentStep ? 'border-[#4CAF50] text-[#4CAF50]' :
                'border-[#2A2A2A] text-[#555]'
              }`}>
                {i < currentStep ? '✓' : `0${i + 1}`} {s.label}
              </div>
              {i < STEPS.length - 1 && <div className="w-px h-8 bg-[#2A2A2A]" />}
            </div>
          ))}
        </div>

        {/* Step 1 — Terms */}
        {currentStep === 0 && (
          <div className="space-y-4 animate-fade-up">
            <p className="text-xs font-mono text-[#888] mb-3">[ STEP_1 ] — شروط الخدمة</p>
            <div className="border border-[#2A2A2A] p-5 h-56 overflow-y-auto text-xs text-[#888] leading-loose font-mono">
              <p className="text-[#E0E0E0] font-bold mb-3">اتفاقية المستقلين — HalabUnver Professional Code</p>
              <p>1. العمولة: 5% من قيمة كل صفقة تذهب للمنصة كـ"Resilience Tax".</p>
              <p>2. الدفع: يُحتجز المبلغ في محفظة المنصة (Escrow) حتى موافقة العميل والإدارة.</p>
              <p>3. الالتزام: يجب تسليم العمل في الموعد المتفق عليه وبالجودة المحددة.</p>
              <p>4. الأخلاقيات: يُحظر قبول مشاريع خارج المنصة من عملاء تعرّفت عليهم عبرها.</p>
              <p>5. التوثيق: يجب أن يكون حسابك موثّقاً بهوية طلابية صالحة.</p>
              <p>6. الاشتراك: رسوم شهرية $5 USD لتفعيل خاصية نشر الخدمات وتلقّي العروض.</p>
              <p className="mt-4 text-[#555]">[ للمزيد اقرأ سياسة الاستخدام الكاملة على halabunver.sy/terms ]</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="accent-[#BB86FC] w-4 h-4" />
              <span className="text-sm text-[#E0E0E0]">✅ أوافق على HalabUnver Professional Code</span>
            </label>
            <button disabled={!agreed} onClick={() => setCurrentStep(1)}
              className={`w-full py-3 font-bold text-sm transition-colors ${agreed ? 'bg-[#BB86FC] text-[#121212] hover:bg-[#a06cdc]' : 'bg-[#2A2A2A] text-[#555] cursor-not-allowed'}`}>
              التالي — خطوة 2
            </button>
          </div>
        )}

        {/* Step 2 — Skills */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-up">
            <p className="text-xs font-mono text-[#888] mb-3">[ STEP_2 ] — تأكيد مهاراتك</p>
            <p className="text-sm text-[#888]">تمّ استيراد مهاراتك من ملفك الشخصي. تأكّد أو عدّل:</p>
            <div className="flex flex-wrap gap-2">
              {USER_SKILLS.map(s => (
                <button key={s}
                  onClick={() => setConfirmedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                  className={`px-4 py-2 text-sm border transition-colors ${confirmedSkills.includes(s) ? 'border-[#BB86FC] text-[#BB86FC] bg-[#BB86FC]/10' : 'border-[#2A2A2A] text-[#555]'}`}>
                  {confirmedSkills.includes(s) ? '✓' : '+'} {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#555] font-mono">المهارات المؤكدة: [{confirmedSkills.join(', ')}]</p>
            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(0)} className="px-4 py-2.5 border border-[#2A2A2A] text-[#888] text-sm hover:border-[#BB86FC]">السابق</button>
              <button onClick={() => setCurrentStep(2)} className="flex-1 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors">التالي — خطوة 3</button>
            </div>
          </div>
        )}

        {/* Step 3 — Payment */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-up">
            <p className="text-xs font-mono text-[#888] mb-3">[ STEP_3 ] — رسوم الوصول للمنصة</p>
            <div className="border border-[#BB86FC]/30 bg-[#BB86FC]/5 p-6 text-center">
              <p className="text-4xl font-black text-[#E0E0E0] mb-1">$5</p>
              <p className="text-xs text-[#888] font-mono">شهرياً · يُحوَّل للسعر بالليرة السورية وفق سعر الإدارة</p>
            </div>
            <Link to="/dashboard/wallet" className="block w-full py-3 bg-[#BB86FC] text-[#121212] font-bold text-sm text-center hover:bg-[#a06cdc] transition-colors">
              💳 دفع رسوم الاشتراك — الانتقال للمحفظة
            </Link>
            <div className="border border-[#2A2A2A] p-4">
              <p className="text-xs font-mono text-[#888] mb-2">[ ESCROW_EDUCATION ]</p>
              <p className="text-xs text-[#888] leading-relaxed">
                عند قبول طلب، يُحتجز المبلغ في محفظة المنصة. بعد تسليم العمل وموافقة العميل، تُحوَّل الأموال لمحفظتك.
              </p>
              <button className="text-xs text-[#BB86FC] mt-2 hover:underline">📖 اقرأ قواعد الوساطة</button>
            </div>
            <div className="border border-[#2A2A2A] p-3">
              <p className="text-xs font-mono text-[#888] mb-2">معاينة ملفك العام:</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center">👤</div>
                <div>
                  <p className="text-sm text-[#E0E0E0]">أحمد الجاسم</p>
                  <p className="text-xs text-[#555]">سيظهر هكذا في لوحة المتميزين</p>
                </div>
                <Link to="/freelance/profile/ahmed" className="text-xs text-[#BB86FC] mr-auto hover:underline">✏️ تعديل الملف</Link>
              </div>
            </div>
          </div>
        )}

        {/* Sticky status */}
        <div className="mt-8 border border-[#EF4444]/30 bg-[#EF4444]/5 px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-mono text-[#EF4444]">🔴 Restricted Access — ادفع لفتح الوصول</span>
          <span className="text-xs text-[#555]">Powered by ShamCash</span>
        </div>
      </div>
    </div>
  )
}

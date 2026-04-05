import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const STATS = [
  { value: '1,240+', label: 'طالب مسجّل', icon: '👥' },
  { value: '380+', label: 'مصدر في المكتبة', icon: '📚' },
  { value: '64+', label: 'دورة أكاديمية', icon: '🎓' },
  { value: '97+', label: 'مستقل نشط', icon: '💼' },
  { value: '210+', label: 'منتج في المتجر', icon: '🛒' },
]

const PILLARS = [
  {
    key: 'academy',
    icon: '🎓',
    title: 'أكاديمية حلب',
    en: 'ACADEMY',
    desc: 'دورات أكاديمية مكثفة وشهادات تدريبية مصمّمة لسد الفجوة بين الجامعة ومتطلبات السوق التقني.',
    stats: '64 دورة · 1,200+ طالب',
    href: '/academy',
    cls: 'text-[#BB86FC]',
  },
  {
    key: 'library',
    icon: '📚',
    title: 'مكتبة حلب',
    en: 'LIBRARY',
    desc: 'أرشيف شامل للمصادر الأكاديمية والملفات التخصصية مؤرشفة بنظام ذكي يسهّل عملية البحث.',
    stats: '380+ ملف · 12 فرع',
    href: '/library',
    cls: 'text-[#03DAC6]',
  },
  {
    key: 'freelance',
    icon: '💼',
    title: 'سوق المستقلين',
    en: 'FREELANCE',
    desc: 'جسرك إلى سوق العمل الحر. نعرض مهاراتك ونربطك بمشاريع حقيقية تمنحك الخبرة والعائد.',
    stats: '97 مستقل · 12 مجال',
    href: '/freelance',
    cls: 'text-[#FFD700]',
  },
  {
    key: 'store',
    icon: '🛒',
    title: 'متجر حلب',
    en: 'STORE',
    desc: 'توفير المعدات والأدوات الهندسية بنظام "صفر مخزون" لضمان الجودة وأنسب سعر للطالب.',
    stats: '210+ منتج · خصم طلابي',
    href: '/store',
    cls: 'text-[#CF6679]',
  },
]

const NEWS = [
  { date: '2026-04-03', title: 'إضافة 14 ملخصاً جديداً لكلية الهندسة المعلوماتية', tag: '📚 مكتبة' },
  { date: '2026-04-01', title: 'بدء التسجيل في دورة MERN Stack الشاملة للمستوى المتقدم', tag: '🎓 أكاديمية' },
  { date: '2026-03-28', title: 'إطلاق نظام المستقلين الجديد مع بروتوكول الضمان المحسّن', tag: '💼 مستقلون' },
  { date: '2026-03-25', title: 'وصول شحنة أجهزة Huion وRaspberry Pi — متوفرة الآن في المتجر', tag: '🛒 متجر' },
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const num = parseInt(target.replace(/\D/g, ''))

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = Math.ceil(num / 60)
        const interval = setInterval(() => {
          start += step
          if (start >= num) { setCount(num); clearInterval(interval) }
          else setCount(start)
        }, 20)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [num])

  return <span ref={ref}>{count.toLocaleString('ar')}{target.includes('+') ? '+' : ''}</span>
}

export default function HomePage() {
  return (
    <div className="pt-16">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#BB86FC]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#03DAC6]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 border border-[#BB86FC]/30 px-4 py-1.5 mb-8 text-xs font-mono text-[#BB86FC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BB86FC] animate-pulse" />
            المنصة الأكاديمية الأولى في حلب · إصدار 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-[#E0E0E0] leading-tight mb-6">
            كل يوم
            <br />
            <span className="text-[#BB86FC]">تحدٍّ جديد.</span>
            <br />
            كل خطوة نحو
            <br />
            <span className="text-[#BB86FC]">مستقبلك.</span>
          </h1>

          <p className="text-lg text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed">
            منظومة أكاديمية وتجارية متكاملة لطلاب جامعة حلب —
            <br />
            تعلّم، اكتسب خبرة، تسوّق، وابنِ مستقبلك من مكان واحد.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-[#BB86FC] text-[#121212] font-bold text-base hover:bg-[#a06cdc] transition-colors"
            >
              ابدأ مجاناً — انضم الآن
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 border border-[#2A2A2A] text-[#E0E0E0] font-medium text-base hover:border-[#BB86FC] transition-colors"
            >
              اعرف أكثر عن المنصة
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[#555]">
            <span className="text-[#4CAF50]">✓ تسجيل مجاني</span>
            <span className="text-[#4CAF50]">✓ محتوى أكاديمي حقيقي</span>
            <span className="text-[#4CAF50]">✓ دفع آمن عبر ShamCash</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#555] text-xs font-mono">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#BB86FC]" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ECOSYSTEM ANALYTICS */}
      <section className="py-16 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[#888]">[ ECOSYSTEM_ANALYTICS ] — بيانات المنصة المباشرة</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#1E1E1E] border border-[#2A2A2A] p-5 text-center hover:border-[#BB86FC]/40 transition-colors">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-black text-[#E0E0E0] mb-1">
                  <AnimatedCounter target={s.value} />
                </div>
                <div className="text-xs text-[#888]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS — 4 Apps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#888]">[ PILLARS ] — منصات المنظومة الأربع</span>
            <h2 className="text-3xl font-black text-[#E0E0E0] mt-2">كل ما تحتاجه، في مكان واحد</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <Link
                key={p.key}
                to={p.href}
                className="group bg-[#1E1E1E] border border-[#2A2A2A] p-8 hover:border-[#BB86FC]/50 transition-all block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono text-[#555] block mb-1">{p.en}</span>
                    <h3 className="text-xl font-bold text-[#E0E0E0] group-hover:text-[#BB86FC] transition-colors">
                      {p.icon} {p.title}
                    </h3>
                  </div>
                  <span className="text-[#555] group-hover:text-[#BB86FC] transition-colors text-xl">←</span>
                </div>
                <p className="text-sm text-[#888] leading-relaxed mb-4">{p.desc}</p>
                <div className={`text-xs font-mono border-t border-[#2A2A2A] pt-3 mt-3 ${p.cls}`}>
                  {p.stats}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS SECTION */}
      <section className="py-16 bg-[#0E0E0E] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <span className="text-xs font-mono text-[#888]">[ OFFERS ] — عروض المنصة</span>
            <h2 className="text-2xl font-black text-[#E0E0E0] mt-2">أبرز ما هو متاح الآن</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-[#1E1E1E] border border-[#BB86FC]/30 p-8">
              <span className="text-xs font-mono text-[#BB86FC] mb-2 block">🎓 ACADEMY FEATURED</span>
              <h3 className="text-xl font-bold text-[#E0E0E0] mb-2">دورة MERN Stack الشاملة</h3>
              <p className="text-sm text-[#888] mb-4">من الصفر إلى مطوّر Full-Stack محترف — 42 ساعة، 8 مشاريع حقيقية.</p>
              <div className="flex items-center gap-4">
                <Link to="/academy/course/mern-001" className="px-5 py-2 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors">
                  ابدأ الدورة
                </Link>
                <span className="text-xs font-mono text-[#4CAF50]">✓ متوفرة مجاناً للمسجّلين</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#1E1E1E] border border-[#03DAC6]/20 p-5">
                <span className="text-xs font-mono text-[#03DAC6] mb-1 block">🛒 STORE OFFER</span>
                <p className="text-sm text-[#E0E0E0] font-medium">Huion H640P — خصم طلابي 15%</p>
                <Link to="/store" className="text-xs text-[#888] hover:text-[#03DAC6] mt-2 block transition-colors">عرض في المتجر ←</Link>
              </div>
              <div className="bg-[#1E1E1E] border border-[#FFD700]/20 p-5">
                <span className="text-xs font-mono text-[#FFD700] mb-1 block">💼 FREELANCE</span>
                <p className="text-sm text-[#E0E0E0] font-medium">انضم كمستقل — دخول مجاني لفترة محدودة</p>
                <Link to="/freelance/onboarding" className="text-xs text-[#888] hover:text-[#FFD700] mt-2 block transition-colors">سجّل الآن ←</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-[#888]">[ NEWS ] — آخر الأخبار</span>
              <h2 className="text-2xl font-black text-[#E0E0E0] mt-1">آخر تحديثات المنصة</h2>
            </div>
            <Link to="/exam-hub" className="text-xs font-mono text-[#BB86FC] hover:underline">
              عرض الكل ←
            </Link>
          </div>
          <div className="space-y-3">
            {NEWS.map((n, i) => (
              <div key={i} className="bg-[#1E1E1E] border border-[#2A2A2A] px-6 py-4 flex items-center justify-between gap-4 hover:border-[#BB86FC]/40 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[#555] shrink-0 ltr">{n.date}</span>
                  <span className="text-sm text-[#E0E0E0]">{n.title}</span>
                </div>
                <span className="text-xs border border-[#2A2A2A] px-2 py-0.5 text-[#888] shrink-0">{n.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XP GAMIFICATION */}
      <section className="py-16 bg-[#0E0E0E] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono text-[#888]">[ GAMIFICATION ] — نظام نقاط الخبرة</span>
              <h2 className="text-3xl font-black text-[#E0E0E0] mt-2 mb-4">كل إنجاز = نقاط XP</h2>
              <p className="text-[#888] text-sm leading-relaxed mb-6">
                كل فعل تقوم به على المنصة يُكسبك نقاط خبرة تُحدّد مستواك وتفتح لك مزايا جديدة.
                المعادلة: <span className="font-mono text-[#BB86FC]">Level = √(XP ÷ 100)</span>
              </p>
              <div className="space-y-3">
                {[
                  { action: 'التسجيل في المنصة', xp: '+100 XP', cls: 'text-[#4CAF50]' },
                  { action: 'توثيق الهوية الجامعية', xp: '+500 XP', cls: 'text-[#BB86FC]' },
                  { action: 'تحميل ملف من المكتبة', xp: '+25 XP', cls: 'text-[#03DAC6]' },
                  { action: 'إتمام دورة أكاديمية', xp: '+250 XP', cls: 'text-[#FFD700]' },
                  { action: 'أول طلب من المتجر', xp: '+100 XP', cls: 'text-[#CF6679]' },
                ].map((item) => (
                  <div key={item.action} className="flex items-center justify-between border border-[#2A2A2A] px-4 py-3">
                    <span className="text-sm text-[#E0E0E0]">{item.action}</span>
                    <span className={`text-sm font-mono font-bold ${item.cls}`}>{item.xp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full border-2 border-[#BB86FC] flex items-center justify-center mx-auto mb-3 text-3xl">🎓</div>
                <p className="text-[#E0E0E0] font-bold">أحمد الجاسم</p>
                <p className="text-xs text-[#888]">4th Year · Informatics Engineering</p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
                  <span>Level 4 — Academic Researcher</span>
                  <span>1,600 / 2,500 XP</span>
                </div>
                <div className="h-2 bg-[#2A2A2A]">
                  <div className="h-2 bg-[#BB86FC] transition-all w-[64%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                {[
                  { label: 'تحميلات المكتبة', val: '42' },
                  { label: 'دورات مكتملة', val: '3' },
                  { label: 'طلبات المتجر', val: '1' },
                  { label: 'خدمات نشطة', val: '2' },
                ].map(s => (
                  <div key={s.label} className="border border-[#2A2A2A] p-3">
                    <div className="text-lg font-bold text-[#BB86FC]">{s.val}</div>
                    <div className="text-[#888] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-[#E0E0E0] mb-4">مستعد للانضمام؟</h2>
          <p className="text-[#888] mb-8">انضم إلى أكثر من 1,200 طالب يبنون مستقبلهم عبر HalabUnver.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard" className="px-8 py-3 bg-[#BB86FC] text-[#121212] font-bold hover:bg-[#a06cdc] transition-colors">
              ابدأ مجاناً
            </Link>
            <Link to="/contact" className="px-8 py-3 border border-[#2A2A2A] text-[#E0E0E0] hover:border-[#BB86FC] transition-colors">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

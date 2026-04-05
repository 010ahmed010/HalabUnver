import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const STATS = [
  { value: '1,240+', label: 'طالب مسجّل', icon: '👥', color: '#6366F1' },
  { value: '380+', label: 'مصدر في المكتبة', icon: '📚', color: '#14B8A6' },
  { value: '64+', label: 'دورة أكاديمية', icon: '🎓', color: '#8B5CF6' },
  { value: '97+', label: 'مستقل نشط', icon: '💼', color: '#F59E0B' },
  { value: '210+', label: 'منتج في المتجر', icon: '🛒', color: '#F43F5E' },
]

const PILLARS = [
  {
    key: 'academy',
    icon: '🎓',
    title: 'أكاديمية حلب',
    desc: 'دورات أكاديمية مكثفة وشهادات تدريبية مصمّمة لسد الفجوة بين الجامعة ومتطلبات السوق التقني.',
    stats: '64 دورة · 1,200+ طالب',
    href: '/academy',
    accent: '#6366F1',
    bg: '#6366F108',
  },
  {
    key: 'library',
    icon: '📚',
    title: 'مكتبة حلب',
    desc: 'أرشيف شامل للمصادر الأكاديمية والملفات التخصصية مؤرشفة بنظام ذكي يسهّل عملية البحث.',
    stats: '380+ ملف · 12 فرع',
    href: '/library',
    accent: '#14B8A6',
    bg: '#14B8A608',
  },
  {
    key: 'freelance',
    icon: '💼',
    title: 'سوق المستقلين',
    desc: 'جسرك إلى سوق العمل الحر. نعرض مهاراتك ونربطك بمشاريع حقيقية تمنحك الخبرة والعائد.',
    stats: '97 مستقل · 12 مجال',
    href: '/freelance',
    accent: '#F59E0B',
    bg: '#F59E0B08',
  },
  {
    key: 'store',
    icon: '🛒',
    title: 'متجر حلب',
    desc: 'توفير المعدات والأدوات الهندسية بنظام "صفر مخزون" لضمان الجودة وأنسب سعر للطالب.',
    stats: '210+ منتج · خصم طلابي',
    href: '/store',
    accent: '#F43F5E',
    bg: '#F43F5E08',
  },
]

const NEWS = [
  { date: '3 أبريل', title: 'إضافة 14 ملخصاً جديداً لكلية الهندسة المعلوماتية', tag: 'مكتبة', color: '#14B8A6' },
  { date: '1 أبريل', title: 'بدء التسجيل في دورة MERN Stack الشاملة للمستوى المتقدم', tag: 'أكاديمية', color: '#6366F1' },
  { date: '28 مارس', title: 'إطلاق نظام المستقلين الجديد مع بروتوكول الضمان المحسّن', tag: 'مستقلون', color: '#F59E0B' },
  { date: '25 مارس', title: 'وصول شحنة أجهزة Huion وRaspberry Pi — متوفرة الآن في المتجر', tag: 'متجر', color: '#F43F5E' },
]

function AnimatedCounter({ target }) {
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#8B5CF6]/8 rounded-full blur-[80px]" />
          <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] bg-[#14B8A6]/6 rounded-full blur-[60px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-4 py-2 mb-8 text-xs font-medium text-[#8B5CF6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-blink-soft" />
            المنصة الأكاديمية الأولى في حلب · إصدار 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-[#F1F5F9] leading-tight mb-6">
            كل يوم
            <br />
            <span className="gradient-text">تحدٍّ جديد.</span>
            <br />
            كل خطوة نحو
            <br />
            <span className="gradient-text">مستقبلك.</span>
          </h1>

          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
            منظومة أكاديمية وتجارية متكاملة لطلاب جامعة حلب —
            <br />
            تعلّم، اكتسب خبرة، تسوّق، وابنِ مستقبلك من مكان واحد.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 gradient-bg text-white font-bold text-base rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#6366F1]/20"
            >
              ابدأ مجاناً — انضم الآن
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 border border-[#1E2D45] text-[#F1F5F9] font-medium text-base rounded-xl hover:border-[#6366F1]/40 hover:bg-[#6366F1]/5 transition-all"
            >
              اعرف أكثر عن المنصة
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#94A3B8]">
            <span className="flex items-center gap-1.5"><span className="text-[#10B981]">✓</span> تسجيل مجاني</span>
            <span className="flex items-center gap-1.5"><span className="text-[#10B981]">✓</span> محتوى أكاديمي حقيقي</span>
            <span className="flex items-center gap-1.5"><span className="text-[#10B981]">✓</span> دفع آمن عبر ShamCash</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#4A5D78] text-xs">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#6366F1]" />
          <span className="tracking-widest">SCROLL</span>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-[#1E2D45] bg-[#0F1828]/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 text-center hover:border-[#6366F1]/30 transition-all group"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-[#F1F5F9] mb-1" style={{ color: s.color }}>
                  <AnimatedCounter target={s.value} />
                </div>
                <div className="text-xs text-[#94A3B8]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <span className="section-label">منصات المنظومة</span>
            <h2 className="text-3xl font-black text-[#F1F5F9]">كل ما تحتاجه، في مكان واحد</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <Link
                key={p.key}
                to={p.href}
                className="group rounded-2xl border border-[#1E2D45] p-8 hover:border-[#6366F1]/30 hover:shadow-lg transition-all block"
                style={{ background: p.bg }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ background: p.accent + '18' }}>
                      {p.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#F1F5F9] group-hover:text-[#6366F1] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <span className="text-[#1E2D45] group-hover:text-[#6366F1] transition-colors text-2xl mt-2">←</span>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex items-center gap-2 text-xs font-medium pt-3 border-t border-[#1E2D45]" style={{ color: p.accent }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
                  {p.stats}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED OFFERS */}
      <section className="py-16 bg-[#0F1828]/60 border-y border-[#1E2D45]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <span className="section-label">عروض المنصة</span>
            <h2 className="text-2xl font-black text-[#F1F5F9]">أبرز ما هو متاح الآن</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-2xl border border-[#6366F1]/20 p-8">
              <span className="inline-block text-xs font-semibold text-[#6366F1] bg-[#6366F1]/10 rounded-full px-3 py-1 mb-3">🎓 دورة مميزة</span>
              <h3 className="text-xl font-bold text-[#F1F5F9] mb-2">دورة MERN Stack الشاملة</h3>
              <p className="text-sm text-[#94A3B8] mb-5">من الصفر إلى مطوّر Full-Stack محترف — 42 ساعة، 8 مشاريع حقيقية.</p>
              <div className="flex items-center gap-4">
                <Link to="/academy/course/mern-001" className="px-5 py-2.5 gradient-bg text-white font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">
                  ابدأ الدورة
                </Link>
                <span className="text-xs text-[#10B981] font-medium">✓ متوفرة مجاناً للمسجّلين</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#0F1828] rounded-2xl border border-[#14B8A6]/20 p-5 hover:border-[#14B8A6]/40 transition-all">
                <span className="text-xs font-semibold text-[#14B8A6] block mb-2">🛒 عرض المتجر</span>
                <p className="text-sm text-[#F1F5F9] font-medium mb-2">Huion H640P — خصم طلابي 15%</p>
                <Link to="/store" className="text-xs text-[#94A3B8] hover:text-[#14B8A6] transition-colors">عرض في المتجر ←</Link>
              </div>
              <div className="bg-[#0F1828] rounded-2xl border border-[#F59E0B]/20 p-5 hover:border-[#F59E0B]/40 transition-all">
                <span className="text-xs font-semibold text-[#F59E0B] block mb-2">💼 المستقلون</span>
                <p className="text-sm text-[#F1F5F9] font-medium mb-2">انضم كمستقل — دخول مجاني لفترة محدودة</p>
                <Link to="/freelance/onboarding" className="text-xs text-[#94A3B8] hover:text-[#F59E0B] transition-colors">سجّل الآن ←</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="section-label">آخر الأخبار</span>
              <h2 className="text-2xl font-black text-[#F1F5F9]">آخر تحديثات المنصة</h2>
            </div>
            <Link to="/exam-hub" className="text-sm text-[#6366F1] hover:underline">عرض الكل ←</Link>
          </div>
          <div className="space-y-3">
            {NEWS.map((n, i) => (
              <div key={i} className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] px-6 py-4 flex items-center justify-between gap-4 hover:border-[#6366F1]/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#4A5D78] shrink-0">{n.date}</span>
                  <span className="text-sm text-[#F1F5F9]">{n.title}</span>
                </div>
                <span
                  className="text-xs font-medium rounded-full px-3 py-1 shrink-0"
                  style={{ color: n.color, background: n.color + '15' }}
                >
                  {n.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XP GAMIFICATION */}
      <section className="py-16 bg-[#0F1828]/60 border-y border-[#1E2D45]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">نظام نقاط الخبرة</span>
              <h2 className="text-3xl font-black text-[#F1F5F9] mb-4">كل إنجاز = نقاط XP</h2>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                كل فعل تقوم به على المنصة يُكسبك نقاط خبرة تُحدّد مستواك وتفتح لك مزايا جديدة.
                المعادلة: <span className="font-mono text-[#6366F1]">Level = √(XP ÷ 100)</span>
              </p>
              <div className="space-y-2.5">
                {[
                  { action: 'التسجيل في المنصة', xp: '+100 XP', color: '#10B981' },
                  { action: 'توثيق الهوية الجامعية', xp: '+500 XP', color: '#6366F1' },
                  { action: 'تحميل ملف من المكتبة', xp: '+25 XP', color: '#14B8A6' },
                  { action: 'إتمام دورة أكاديمية', xp: '+250 XP', color: '#F59E0B' },
                  { action: 'أول طلب من المتجر', xp: '+100 XP', color: '#F43F5E' },
                ].map((item) => (
                  <div key={item.action} className="flex items-center justify-between bg-[#0F1828] rounded-xl border border-[#1E2D45] px-4 py-3 hover:border-[#6366F1]/20 transition-all">
                    <span className="text-sm text-[#F1F5F9]">{item.action}</span>
                    <span className="text-sm font-bold font-mono" style={{ color: item.color }}>{item.xp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-3 text-3xl shadow-lg shadow-[#6366F1]/20">🎓</div>
                <p className="text-[#F1F5F9] font-bold">أحمد الجاسم</p>
                <p className="text-xs text-[#94A3B8]">السنة الرابعة · هندسة معلوماتية</p>
              </div>
              <div className="mb-5">
                <div className="flex justify-between text-xs text-[#94A3B8] mb-2">
                  <span className="font-medium text-[#F1F5F9]">Level 4 — Academic Researcher</span>
                  <span>1,600 / 2,500 XP</span>
                </div>
                <div className="h-2.5 bg-[#162032] rounded-full overflow-hidden">
                  <div className="h-2.5 gradient-bg rounded-full transition-all w-[64%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                {[
                  { label: 'تحميلات المكتبة', val: '42' },
                  { label: 'دورات مكتملة', val: '3' },
                  { label: 'طلبات المتجر', val: '1' },
                  { label: 'خدمات نشطة', val: '2' },
                ].map(s => (
                  <div key={s.label} className="bg-[#162032] rounded-xl p-3 border border-[#1E2D45]">
                    <div className="text-lg font-bold gradient-text">{s.val}</div>
                    <div className="text-[#94A3B8] text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-3xl border border-[#6366F1]/20 p-12">
            <h2 className="text-4xl font-black text-[#F1F5F9] mb-4">مستعد للانضمام؟</h2>
            <p className="text-[#94A3B8] mb-8">انضم إلى أكثر من 1,200 طالب يبنون مستقبلهم عبر HalabUnver.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/dashboard" className="px-8 py-3.5 gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#6366F1]/20">
                ابدأ مجاناً
              </Link>
              <Link to="/contact" className="px-8 py-3.5 border border-[#1E2D45] text-[#F1F5F9] rounded-xl hover:border-[#6366F1]/40 hover:bg-[#6366F1]/5 transition-all">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

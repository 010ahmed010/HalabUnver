import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { api } from '../../lib/api'

const STATS = [
  { value: '1,240+', label: 'طالب مسجّل', icon: '👥', color: '#6366F1' },
  { value: '380+', label: 'مصدر في المكتبة', icon: '📚', color: '#14B8A6' },
  { value: '64+', label: 'دورة أكاديمية', icon: '🎓', color: '#8B5CF6' },
  { value: '97+', label: 'مستقل نشط', icon: '💼', color: '#F59E0B' },
  { value: '210+', label: 'منتج في المتجر', icon: '🛒', color: '#F43F5E' },
]

const PILLARS = [
  {
    key: 'academy', icon: '🎓', title: 'أكاديمية حلب',
    desc: 'دورات أكاديمية مكثفة وشهادات تدريبية مصمّمة لسد الفجوة بين الجامعة ومتطلبات السوق التقني.',
    stats: '64 دورة · 1,200+ طالب', href: '/academy', accent: '#6366F1', bg: '#6366F108',
  },
  {
    key: 'library', icon: '📚', title: 'مكتبة حلب',
    desc: 'أرشيف شامل للمصادر الأكاديمية والملفات التخصصية مؤرشفة بنظام ذكي يسهّل عملية البحث.',
    stats: '380+ ملف · 12 فرع', href: '/library', accent: '#14B8A6', bg: '#14B8A608',
  },
  {
    key: 'freelance', icon: '💼', title: 'سوق المستقلين',
    desc: 'جسرك إلى سوق العمل الحر. نعرض مهاراتك ونربطك بمشاريع حقيقية تمنحك الخبرة والعائد.',
    stats: '97 مستقل · 12 مجال', href: '/freelance', accent: '#F59E0B', bg: '#F59E0B08',
  },
  {
    key: 'store', icon: '🛒', title: 'متجر حلب',
    desc: 'توفير المعدات والأدوات الهندسية بنظام "صفر مخزون" لضمان الجودة وأنسب سعر للطالب.',
    stats: '210+ منتج · خصم طلابي', href: '/store', accent: '#F43F5E', bg: '#F43F5E08',
  },
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
  const [news, setNews] = useState([])

  useEffect(() => {
    api.get('/announcements?limit=4')
      .then(d => setNews(d.data || []))
      .catch(() => setNews([]))
  }, [])

  return (
    <div className="pt-20">

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden dot-bg">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-[#8B5CF6]/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-[#14B8A6]/6 rounded-full blur-[80px]" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center py-24 sm:py-32">
          <div className="inline-flex items-center gap-2.5 bg-[#6366F1]/10 border border-[#6366F1]/25 rounded-full px-5 py-2.5 mb-10 text-sm font-semibold text-[#8B5CF6]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-blink-soft shrink-0" />
            المنصة الأكاديمية الأولى في حلب · إصدار 2026
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F1F5F9] leading-[1.15] mb-8 tracking-tight">
            منصتك الأكاديمية
            <br />
            <span className="gradient-text">تعلّم · اكسب · ابنِ مستقبلك</span>
          </h1>

          <div className="mx-auto mb-12 text-[#94A3B8]" style={{ maxWidth: '580px', direction: 'rtl' }}>
            <p className="text-base sm:text-lg md:text-xl" style={{ lineHeight: '2.1' }}>
              منظومة متكاملة لطلاب جامعة حلب
            </p>
            <p className="text-base sm:text-lg md:text-xl" style={{ lineHeight: '2.1' }}>
              أكاديمية · مكتبة رقمية · سوق مستقلين · متجر ذكي
            </p>
            <p className="text-sm sm:text-base font-medium text-[#6366F1]/80 mt-2" style={{ lineHeight: '1.8' }}>
              كل ما تحتاجه في مكان واحد.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              to="/dashboard"
              className="px-8 sm:px-10 py-4 gradient-bg text-white font-bold text-base sm:text-lg rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-[#6366F1]/30"
            >
              ابدأ مجاناً — انضم الآن
            </Link>
            <Link
              to="/about"
              className="px-8 sm:px-10 py-4 border border-[#1E2D45] text-[#F1F5F9] font-medium text-base sm:text-lg rounded-2xl hover:border-[#6366F1]/50 hover:bg-[#6366F1]/5 transition-all"
            >
              اعرف أكثر عن المنصة
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-sm sm:text-base text-[#94A3B8]">
            <span className="flex items-center gap-2"><span className="text-[#10B981] font-bold text-lg">✓</span> تسجيل مجاني</span>
            <span className="flex items-center gap-2"><span className="text-[#10B981] font-bold text-lg">✓</span> محتوى أكاديمي حقيقي</span>
            <span className="flex items-center gap-2"><span className="text-[#10B981] font-bold text-lg">✓</span> دفع آمن عبر ShamCash</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#4A5D78] text-xs">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#6366F1]" />
          <span className="tracking-[0.2em] text-[11px] font-medium">SCROLL</span>
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="py-20 sm:py-28 border-y border-[#1E2D45] bg-[#0F1828]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">بالأرقام</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F1F5F9] mt-2">
              ثقة الآلاف من طلاب حلب
            </h2>
            <p className="text-[#94A3B8] mt-3 text-sm sm:text-base max-w-md mx-auto">
              أرقام حقيقية تعكس نمو المنصة وتفاعل مجتمعنا الطلابي
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 sm:gap-7">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 sm:p-7 text-center hover:border-[#6366F1]/30 hover:shadow-lg hover:shadow-black/20 transition-all"
              >
                <div className="text-2xl sm:text-3xl mb-3">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-black mb-1.5" style={{ color: s.color }}>
                  <AnimatedCounter target={s.value} />
                </div>
                <div className="text-xs sm:text-sm text-[#94A3B8] leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── PILLARS ─────────────── */}
      <section className="py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14 sm:mb-20">
            <span className="section-label">منصات المنظومة</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F1F5F9] mt-2">
              كل ما تحتاجه، في مكان واحد
            </h2>
            <p className="text-[#94A3B8] mt-4 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              أربع منصات متكاملة تغطي كل جانب من جوانب رحلتك الأكاديمية والمهنية
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {PILLARS.map((p) => (
              <Link
                key={p.key}
                to={p.href}
                className="group rounded-3xl border border-[#1E2D45] p-8 sm:p-10 hover:border-[#6366F1]/30 hover:shadow-2xl hover:shadow-black/20 transition-all block"
                style={{ background: p.bg }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4" style={{ background: p.accent + '20' }}>
                      {p.icon}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-[#F1F5F9] group-hover:text-[#6366F1] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <span className="text-[#1E2D45] group-hover:text-[#6366F1] transition-colors text-2xl mt-1">←</span>
                </div>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-loose mb-6">{p.desc}</p>
                <div className="flex items-center gap-2 text-sm font-semibold pt-5 border-t border-[#1E2D45]" style={{ color: p.accent }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.accent }} />
                  {p.stats}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FEATURED OFFERS ─────────────── */}
      <section className="py-24 sm:py-32 bg-[#0F1828]/60 border-y border-[#1E2D45]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14 sm:mb-18">
            <span className="section-label">عروض المنصة</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F1F5F9] mt-2">
              أبرز ما هو متاح الآن
            </h2>
            <p className="text-[#94A3B8] mt-4 text-sm sm:text-base max-w-md mx-auto">
              أحدث الدورات والمنتجات والفرص المتاحة لطلاب المنصة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="md:col-span-2 bg-gradient-to-br from-[#6366F1]/12 to-[#8B5CF6]/6 rounded-3xl border border-[#6366F1]/25 p-8 sm:p-10">
              <span className="inline-block text-sm font-semibold text-[#6366F1] bg-[#6366F1]/10 rounded-full px-4 py-1.5 mb-5">🎓 دورة مميزة</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F1F5F9] mb-3">دورة MERN Stack الشاملة</h3>
              <p className="text-sm sm:text-base text-[#94A3B8] mb-8 leading-loose">
                من الصفر إلى مطوّر Full-Stack محترف — 42 ساعة، 8 مشاريع حقيقية، شهادة معتمدة.
              </p>
              <div className="flex items-center gap-5 flex-wrap">
                <Link to="/academy/course/mern-001" className="px-6 py-3 gradient-bg text-white font-bold text-sm sm:text-base rounded-xl hover:opacity-90 transition-opacity">
                  ابدأ الدورة
                </Link>
                <span className="text-sm text-[#10B981] font-medium flex items-center gap-2">
                  <span className="text-base">✓</span> متوفرة مجاناً للمسجّلين
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-[#0F1828] rounded-2xl border border-[#14B8A6]/20 p-6 hover:border-[#14B8A6]/40 transition-all flex-1">
                <span className="text-sm font-semibold text-[#14B8A6] block mb-3">🛒 عرض المتجر</span>
                <p className="text-base text-[#F1F5F9] font-semibold mb-1">Huion H640P</p>
                <p className="text-sm text-[#94A3B8] mb-4">خصم طلابي 15% — متوفر فوراً</p>
                <Link to="/store" className="text-sm text-[#14B8A6] hover:underline">عرض في المتجر ←</Link>
              </div>
              <div className="bg-[#0F1828] rounded-2xl border border-[#F59E0B]/20 p-6 hover:border-[#F59E0B]/40 transition-all flex-1">
                <span className="text-sm font-semibold text-[#F59E0B] block mb-3">💼 المستقلون</span>
                <p className="text-base text-[#F1F5F9] font-semibold mb-1">انضم كمستقل</p>
                <p className="text-sm text-[#94A3B8] mb-4">دخول مجاني لفترة محدودة</p>
                <Link to="/freelance/onboarding" className="text-sm text-[#F59E0B] hover:underline">سجّل الآن ←</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── NEWS ─────────────── */}
      <section className="py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14 sm:mb-18">
            <span className="section-label">آخر الأخبار</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F1F5F9] mt-2">
              آخر تحديثات المنصة
            </h2>
            <p className="text-[#94A3B8] mt-4 text-sm sm:text-base">
              ابقَ على اطّلاع بكل جديد يحدث على المنصة
            </p>
          </div>
          <div className="space-y-4 mb-8">
            {news.length === 0 ? (
              <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] px-6 py-8 text-center text-[#4A5D78] text-sm">
                لا توجد أخبار أو إعلانات بعد
              </div>
            ) : news.map((n) => (
              <div
                key={n._id}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] px-6 sm:px-8 py-5 flex items-center justify-between gap-5 hover:border-[#6366F1]/30 transition-all"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="text-sm text-[#4A5D78] shrink-0 font-medium">{n.date}</span>
                  <span className="text-sm sm:text-base text-[#F1F5F9] truncate">{n.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {n.urgent && (
                    <span className="text-xs bg-[#F43F5E]/15 text-[#F43F5E] rounded-full px-3 py-1 font-medium">عاجل</span>
                  )}
                  <span
                    className="text-xs font-semibold rounded-full px-3.5 py-1.5"
                    style={{ color: n.color, background: n.color + '18' }}
                  >
                    {n.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/exam-hub" className="inline-flex items-center gap-2 text-sm sm:text-base text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors">
              عرض جميع الأخبار ←
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── XP GAMIFICATION ─────────────── */}
      <section className="py-24 sm:py-32 bg-[#0F1828]/60 border-y border-[#1E2D45]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14 sm:mb-20">
            <span className="section-label">نظام نقاط الخبرة</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F1F5F9] mt-2">كل إنجاز = نقاط XP</h2>
            <p className="text-[#94A3B8] mt-4 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              كل فعل تقوم به على المنصة يُكسبك نقاط خبرة تُحدّد مستواك وتفتح لك مزايا جديدة.
              المعادلة: <span className="font-mono text-[#6366F1] font-semibold">Level = √(XP ÷ 100)</span>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="space-y-3">
                {[
                  { action: 'التسجيل في المنصة', xp: '+100 XP', color: '#10B981' },
                  { action: 'توثيق الهوية الجامعية', xp: '+500 XP', color: '#6366F1' },
                  { action: 'تحميل ملف من المكتبة', xp: '+25 XP', color: '#14B8A6' },
                  { action: 'إتمام دورة أكاديمية', xp: '+250 XP', color: '#F59E0B' },
                  { action: 'أول طلب من المتجر', xp: '+100 XP', color: '#F43F5E' },
                ].map((item) => (
                  <div key={item.action} className="flex items-center justify-between bg-[#0F1828] rounded-2xl border border-[#1E2D45] px-5 py-4 hover:border-[#6366F1]/20 transition-all">
                    <span className="text-sm sm:text-base text-[#F1F5F9]">{item.action}</span>
                    <span className="text-sm sm:text-base font-bold font-mono shrink-0 mr-3" style={{ color: item.color }}>{item.xp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile preview card */}
            <div className="bg-[#0F1828] rounded-3xl border border-[#1E2D45] p-7 sm:p-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 text-3xl sm:text-4xl shadow-xl shadow-[#6366F1]/20">🎓</div>
                <p className="text-[#F1F5F9] text-lg font-bold">أحمد الجاسم</p>
                <p className="text-sm text-[#94A3B8] mt-1">السنة الرابعة · هندسة معلوماتية</p>
              </div>
              <div className="mb-7">
                <div className="flex justify-between text-sm text-[#94A3B8] mb-3">
                  <span className="font-semibold text-[#F1F5F9]">Level 4 — Academic Researcher</span>
                  <span className="shrink-0 mr-3">1,600 / 2,500 XP</span>
                </div>
                <div className="h-3 bg-[#162032] rounded-full overflow-hidden">
                  <div className="h-3 gradient-bg rounded-full w-[64%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 text-center">
                {[
                  { label: 'تحميلات المكتبة', val: '42' },
                  { label: 'دورات مكتملة', val: '3' },
                  { label: 'طلبات المتجر', val: '1' },
                  { label: 'خدمات نشطة', val: '2' },
                ].map(s => (
                  <div key={s.label} className="bg-[#162032] rounded-2xl p-4 border border-[#1E2D45]">
                    <div className="text-xl sm:text-2xl font-black gradient-text">{s.val}</div>
                    <div className="text-[#94A3B8] text-xs sm:text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="relative py-32 sm:py-44 overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/12 via-[#070C18] to-[#8B5CF6]/10 pointer-events-none" />
        <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#6366F1]/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#8B5CF6]/6 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] bg-[#14B8A6]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-full px-5 py-2.5 mb-8 text-sm font-semibold text-[#8B5CF6]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-blink-soft shrink-0" />
            التسجيل مجاني — انضم الآن
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F1F5F9] mb-6 leading-tight tracking-tight">
            مستعد للانضمام؟
          </h2>
          <p className="text-[#94A3B8] mb-12 text-base sm:text-xl leading-loose max-w-2xl mx-auto">
            انضم إلى أكثر من 1,200 طالب يبنون مستقبلهم عبر HalabUnver.
            منصة أكاديمية متكاملة في حلب.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap mb-16">
            <Link
              to="/dashboard"
              className="px-10 sm:px-14 py-4 sm:py-5 gradient-bg text-white font-bold text-base sm:text-xl rounded-2xl hover:opacity-90 transition-opacity shadow-2xl shadow-[#6366F1]/35"
            >
              ابدأ مجاناً — انضم الآن
            </Link>
            <Link
              to="/contact"
              className="px-10 sm:px-14 py-4 sm:py-5 border border-[#1E2D45] text-[#F1F5F9] text-base sm:text-xl rounded-2xl hover:border-[#6366F1]/50 hover:bg-[#6366F1]/5 transition-all"
            >
              تواصل معنا
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-24 bg-gradient-to-l from-[#6366F1]/40 to-transparent" />
            <span className="text-xs text-[#4A5D78] font-medium tracking-widest uppercase">إحصائيات المنصة</span>
            <div className="h-px w-24 bg-gradient-to-r from-[#6366F1]/40 to-transparent" />
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
            {[
              { val: '1,240+', label: 'طالب مسجّل', color: '#6366F1' },
              { val: '64+', label: 'دورة أكاديمية', color: '#8B5CF6' },
              { val: '380+', label: 'مصدر في المكتبة', color: '#14B8A6' },
            ].map(s => (
              <div key={s.label} className="text-center bg-[#0F1828]/60 rounded-2xl border border-[#1E2D45] p-4 sm:p-6 hover:border-[#6366F1]/30 transition-all">
                <div className="text-xl sm:text-3xl font-black mb-1" style={{ color: s.color }}>{s.val}</div>
                <div className="text-xs sm:text-sm text-[#94A3B8]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

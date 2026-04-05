import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DISCIPLINES = [
  { icon: '💻', label: 'برمجة وتطوير', slug: 'dev', count: 34 },
  { icon: '🏗️', label: 'هندسة وعمارة', slug: 'arch', count: 18 },
  { icon: '🎨', label: 'تصميم', slug: 'design', count: 22 },
  { icon: '✍️', label: 'كتابة وترجمة', slug: 'writing', count: 12 },
  { icon: '🤖', label: 'ذكاء اصطناعي', slug: 'ai', count: 9 },
  { icon: '📈', label: 'تسويق رقمي', slug: 'marketing', count: 7 },
  { icon: '📊', label: 'بيانات', slug: 'data', count: 11 },
  { icon: '🎙️', label: 'صوتيات', slug: 'audio', count: 4 },
  { icon: '🎬', label: 'فيديو وأنيميشن', slug: 'video', count: 8 },
  { icon: '💼', label: 'أعمال', slug: 'business', count: 6 },
  { icon: '📚', label: 'تعليم عن بعد', slug: 'edu', count: 14 },
  { icon: '🏃', label: 'أسلوب حياة', slug: 'lifestyle', count: 3 },
]

const TRUST_PILLARS = [
  { icon: '💎', title: 'أسعار طلابية', desc: 'نتائج عالية الجودة بأسعار تناسب ميزانية الطالب.', color: '#6366F1' },
  { icon: '🧠', title: 'عقول ذكية', desc: 'مواهب جامعية موثّقة بخلفيات علمية ومهنية مثبتة.', color: '#8B5CF6' },
  { icon: '🛡️', title: 'وساطة آمنة', desc: 'أموالك محفوظة بواسطة المنصة حتى تسليم العمل (Escrow).', color: '#14B8A6' },
  { icon: '⚡', title: 'دعم 24/7', desc: 'فريق دعم محلي ملم بالسوق السوري والاحتياجات الأكاديمية.', color: '#F59E0B' },
]

const TOP_TALENT = [
  { name: 'أحمد الجاسم', title: 'Full-Stack MERN Developer', rating: 4.9, jobs: 24, from: '150,000', verified: true },
  { name: 'ليلى عمر', title: 'UI/UX Designer', rating: 4.8, jobs: 18, from: '80,000', verified: true },
  { name: 'كريم إبراهيم', title: 'AutoCAD Engineer', rating: 4.7, jobs: 31, from: '60,000', verified: true },
  { name: 'سامر خالد', title: 'AI / Python Developer', rating: 4.9, jobs: 12, from: '200,000', verified: true },
]

const TRENDING = ['MERN Dev', 'AutoCAD', 'ترجمة', 'Python AI', 'UI Design', 'Data Analysis']

export default function FreelanceHome() {
  const [searchQ, setSearchQ] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/freelance/catalog/dev?q=${encodeURIComponent(searchQ)}`)
  }

  return (
    <div className="pt-16 min-h-screen">

      {/* HERO */}
      <section className="relative py-20 dot-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#F59E0B]/8 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-[#6366F1]/8 rounded-full blur-[60px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-4 py-2 mb-6 text-xs font-medium text-[#F59E0B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-blink-soft" />
            Scale Your Skills. Challenge Every Day.
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#F1F5F9] mb-4">
            سوق <span className="gradient-text-amber">المستقلين</span>
          </h1>
          <p className="text-[#94A3B8] mb-8 text-base">ابحث عن خدمات أو مواهب طلابية متخصصة</p>

          <form onSubmit={handleSearch} className="flex gap-0 max-w-2xl mx-auto mb-6 rounded-2xl overflow-hidden border border-[#1E2D45] focus-within:border-[#F59E0B]/40 transition-colors">
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="ابحث عن خدمة أو مستقل..."
              className="flex-1 bg-[#0F1828] text-[#F1F5F9] placeholder-[#4A5D78] px-5 py-3.5 text-sm outline-none"
            />
            <button type="submit" className="px-6 py-3.5 bg-[#F59E0B] text-[#070C18] font-bold text-sm hover:bg-[#FBBF24] transition-colors shrink-0">
              بحث
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            {TRENDING.map(t => (
              <button
                key={t}
                onClick={() => setSearchQ(t)}
                className="px-3.5 py-1.5 text-xs rounded-full border border-[#1E2D45] text-[#94A3B8] hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="py-16 border-y border-[#1E2D45] bg-[#0F1828]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <span className="section-label">المجالات</span>
            <h2 className="text-2xl font-black text-[#F1F5F9]">تصفح حسب التخصص</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {DISCIPLINES.map(d => (
              <Link
                key={d.slug}
                to={`/freelance/catalog/${d.slug}`}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 text-center hover:border-[#F59E0B]/30 hover:bg-[#F59E0B]/5 transition-all group"
              >
                <span className="text-2xl block mb-2">{d.icon}</span>
                <p className="text-xs text-[#F1F5F9] group-hover:text-[#F59E0B] transition-colors font-medium">{d.label}</p>
                <p className="text-[10px] text-[#4A5D78] mt-0.5">{d.count} خدمة</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY HALAB-WORK */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <span className="section-label">لماذا نختارنا</span>
            <h2 className="text-2xl font-black text-[#F1F5F9]">مزايا سوق HalabWork</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TRUST_PILLARS.map(p => (
              <div
                key={p.title}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6 hover:border-[#F59E0B]/20 transition-all"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: p.color + '18' }}>
                  {p.icon}
                </div>
                <h3 className="text-[#F1F5F9] font-bold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TALENT */}
      <section className="py-16 bg-[#0F1828]/50 border-y border-[#1E2D45]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="section-label">مستقلون مميزون</span>
              <h2 className="text-2xl font-black text-[#F1F5F9]">أفضل المواهب</h2>
            </div>
            <Link to="/freelance/leaderboard" className="px-4 py-2 rounded-xl border border-[#F59E0B]/30 text-[#F59E0B] text-xs hover:bg-[#F59E0B]/10 transition-all">
              🏆 عرض أفضل 100 مستقل →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TOP_TALENT.map(t => (
              <Link
                key={t.name}
                to="/freelance/profile/ahmed"
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 hover:border-[#F59E0B]/30 hover:shadow-lg transition-all block group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#162032] border border-[#1E2D45] flex items-center justify-center text-2xl mb-3">
                  👤
                </div>
                {t.verified && <span className="text-xs text-[#6366F1] font-medium bg-[#6366F1]/10 rounded-full px-2 py-0.5">✅ موثّق</span>}
                <h3 className="text-sm font-bold text-[#F1F5F9] mt-2 mb-0.5 group-hover:text-[#F59E0B] transition-colors">{t.name}</h3>
                <p className="text-xs text-[#4A5D78] mb-3">{t.title}</p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1E2D45]">
                  <span className="text-[#F59E0B] font-medium">★ {t.rating} ({t.jobs})</span>
                  <span className="font-mono text-[#6366F1]">من {t.from} SYP</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#FBBF24]/5 rounded-3xl border border-[#F59E0B]/20 p-10">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-4 py-1.5 mb-5 text-xs text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-blink-soft" />
              دخول مجاني لفترة محدودة
            </div>
            <h2 className="text-3xl font-black text-[#F1F5F9] mb-2">انضم كمستقل</h2>
            <p className="text-[#F59E0B] text-xl font-bold mb-3">$5 / شهر</p>
            <p className="text-[#94A3B8] text-sm mb-6">
              حوّل مهاراتك الأكاديمية إلى مهنة. الوصول لمشاريع حصرية وبناء محفظة أعمالك.
            </p>
            <Link
              to="/freelance/onboarding"
              className="px-8 py-3.5 bg-[#F59E0B] text-[#070C18] font-bold text-sm rounded-xl hover:bg-[#FBBF24] transition-colors inline-block"
            >
              سجّل كمستقل الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

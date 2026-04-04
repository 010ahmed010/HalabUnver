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
  { icon: '💎', title: 'أسعار طلابية', desc: 'نتائج عالية الجودة بأسعار تناسب ميزانية الطالب (Peer-to-Peer pricing).' },
  { icon: '🧠', title: 'عقول ذكية', desc: 'مواهب جامعية موثّقة بخلفيات علمية ومهنية مثبتة.' },
  { icon: '🛡️', title: 'وساطة آمنة', desc: 'أموالك محفوظة بواسطة المنصة حتى تسليم العمل (Escrow).' },
  { icon: '⚡', title: 'دعم 24/7', desc: 'فريق دعم محلي ملم بالسوق السوري والاحتياجات الأكاديمية.' },
]

const TOP_TALENT = [
  { name: 'أحمد الجاسم', title: 'Full-Stack MERN Developer', rating: 4.9, jobs: 24, from: '150,000', verified: true },
  { name: 'ليلى عمر', title: 'UI/UX Designer', rating: 4.8, jobs: 18, from: '80,000', verified: true },
  { name: 'كريم إبراهيم', title: 'AutoCAD Engineer', rating: 4.7, jobs: 31, from: '60,000', verified: true },
  { name: 'سامر خالد', title: 'AI / Python Developer', rating: 4.9, jobs: 12, from: '200,000', verified: true },
]

const TRENDING = ['💻 MERN Dev', '📐 AutoCAD', '✍️ ترجمة', '🤖 Python AI', '🎨 UI Design', '📊 Data Analysis']

export default function FreelanceHome() {
  const [searchQ, setSearchQ] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/freelance/catalog/dev?q=${encodeURIComponent(searchQ)}`)
  }

  return (
    <div className="pt-16 min-h-screen">

      {/* HERO TERMINAL */}
      <section className="relative py-20 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#BB86FC]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-[#03DAC6]/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 border border-[#BB86FC]/30 px-4 py-1.5 mb-6 text-xs font-mono text-[#BB86FC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BB86FC] animate-pulse" />
            Scale Your Skills. Challenge Every Day.
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#E0E0E0] mb-4">
            سوق <span className="text-[#BB86FC]">المستقلين</span>
          </h1>
          <p className="text-[#888] mb-8 text-base">ابحث عن خدمات أو مواهب طلابية متخصصة</p>

          <form onSubmit={handleSearch} className="flex gap-0 max-w-2xl mx-auto mb-6">
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Find services or talented student freelancers..."
              className="flex-1 bg-[#1E1E1E] border border-[#2A2A2A] text-[#E0E0E0] placeholder-[#555] px-5 py-3.5 text-sm outline-none focus:border-[#BB86FC] transition-colors"
            />
            <button type="submit" className="px-6 py-3.5 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors shrink-0">
              بحث
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            {TRENDING.map(t => (
              <button
                key={t}
                onClick={() => setSearchQ(t.replace(/^\S+\s/, ''))}
                className="px-3 py-1.5 text-xs border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC] hover:text-[#BB86FC] transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINES BENTO */}
      <section className="py-16 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#888]">[ DISCIPLINES ] — المجالات المتاحة</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {DISCIPLINES.map(d => (
              <Link
                key={d.slug}
                to={`/freelance/catalog/${d.slug}`}
                className="bg-[#1E1E1E] border border-[#2A2A2A] p-4 text-center hover:border-[#BB86FC]/50 hover:bg-[#BB86FC]/5 transition-all group"
              >
                <span className="text-2xl block mb-2">{d.icon}</span>
                <p className="text-xs text-[#E0E0E0] group-hover:text-[#BB86FC] transition-colors font-medium">{d.label}</p>
                <p className="text-[10px] font-mono text-[#555] mt-0.5">{d.count} خدمة</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY HALAB-WORK */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#888]">[ VALUE_PROPOSITION ] — لماذا HalabWork؟</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TRUST_PILLARS.map(p => (
              <div key={p.title} className="bg-[#1E1E1E] border border-[#2A2A2A] p-6 hover:border-[#BB86FC]/40 transition-colors">
                <span className="text-2xl block mb-3">{p.icon}</span>
                <h3 className="text-[#E0E0E0] font-bold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TALENT */}
      <section className="py-16 bg-[#0E0E0E] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-[#888]">[ FEATURED_TALENT ] — مستقلون مميزون</span>
              <h2 className="text-2xl font-black text-[#E0E0E0] mt-1">خدمات مميزة</h2>
            </div>
            <Link to="/freelance/leaderboard" className="px-4 py-2 border border-[#FFD700]/40 text-[#FFD700] text-xs hover:bg-[#FFD700]/10 transition-colors">
              🏆 عرض أفضل 100 مستقل →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TOP_TALENT.map(t => (
              <Link key={t.name} to="/freelance/profile/ahmed" className="bg-[#1E1E1E] border border-[#2A2A2A] p-5 hover:border-[#BB86FC]/50 transition-colors block group">
                <div className="w-14 h-14 bg-[#252525] border border-[#2A2A2A] flex items-center justify-center text-xl mb-3">
                  👤
                </div>
                {t.verified && <span className="text-xs text-[#BB86FC]">✅ موثّق</span>}
                <h3 className="text-sm font-bold text-[#E0E0E0] mt-1 group-hover:text-[#BB86FC] transition-colors">{t.name}</h3>
                <p className="text-xs text-[#555] mb-3">{t.title}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#FFD700]">★ {t.rating} ({t.jobs})</span>
                  <span className="font-mono text-[#BB86FC]">من {t.from} SYP</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-xs font-mono text-[#888]">[ JOIN_THE_ELITE ] — انضم كمستقل</span>
          <div className="mt-6 border border-[#BB86FC]/30 p-8 animate-pulse-glow">
            <div className="inline-flex items-center gap-2 border border-[#4CAF50]/40 px-4 py-1.5 mb-4 text-xs font-mono text-[#4CAF50]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
              ⚡ دخول مجاني لفترة محدودة
            </div>
            <h2 className="text-3xl font-black text-[#E0E0E0] mb-3">$5 / شهر</h2>
            <p className="text-[#888] text-sm mb-6">
              حوّل مهاراتك الأكاديمية إلى مهنة. الوصول لمشاريع حصرية وبناء محفظة أعمالك.
            </p>
            <Link to="/freelance/onboarding" className="px-8 py-3 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors inline-block">
              سجّل كمستقل الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

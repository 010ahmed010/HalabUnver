import { Link } from 'react-router-dom'

const SKILLS = ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Linux Admin', 'Python', 'Docker', 'Git']
const PORTFOLIO = [
  { title: 'لوحة تحكم HalabUnver', desc: 'منصة أكاديمية وتجارية متكاملة لطلاب جامعة حلب.', review: 'عمل استثنائي، سلّم قبل الموعد.' },
  { title: 'تطبيق إدارة المخزون', desc: 'نظام إدارة مخزون كامل مع REST API.', review: 'دقيق جداً في التفاصيل.' },
  { title: 'منصة تعليمية React', desc: 'منصة لرفع الكورسات وتتبع التقدم.', review: 'تواصل ممتاز وسرعة في التنفيذ.' },
]
const SERVICES_LIST = [
  { title: '🌐 بناء Single Page Application', price: '500,000 SYP' },
  { title: '🛠️ إصلاح أخطاء واستشارات', price: '50,000 SYP/hr' },
  { title: '📱 تطبيق React Native بسيط', price: '300,000 SYP' },
]
const REVIEWS = [
  { stars: 5, text: 'جودة استثنائية، سلّم قبل الموعد المحدد.', user: 'User #129' },
  { stars: 5, text: 'مطوّر محترف وملتزم، أنصح به بشدة.', user: 'User #204' },
  { stars: 4, text: 'عمل رائع، تواصل جيد طوال المشروع.', user: 'User #87' },
]

export default function FreelanceProfile() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Identity Header */}
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 border-2 border-[#BB86FC] flex items-center justify-center text-3xl shrink-0">👤</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-[#BB86FC] border border-[#BB86FC]/40 px-2 py-0.5">✅ موثّق</span>
                    <span className="text-[10px] font-mono text-[#FFD700] border border-[#FFD700]/40 px-2 py-0.5">⭐ TOP RATED</span>
                  </div>
                  <h1 className="text-2xl font-black text-[#E0E0E0]">أحمد الجاسم</h1>
                  <p className="text-sm text-[#888]">Full-Stack Developer (MERN)</p>
                  <p className="text-xs text-[#555] italic mt-1">"Building the future of Syrian Web Apps"</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono">
                    <span className="text-[#FFD700]">⭐ 4.9</span>
                    <span className="text-[#888]">💼 24 مشروع</span>
                    <span className="text-[#888]">⚡ وقت استجابة 2h</span>
                    <span className="text-[#BB86FC]">🎓 Level: Pro</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
              <p className="text-xs font-mono text-[#888] mb-3">[ TECHNICAL_DNA ]</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map(s => (
                  <span key={s} className="border border-[#2A2A2A] px-3 py-1 text-xs font-mono text-[#E0E0E0] hover:border-[#BB86FC] hover:text-[#BB86FC] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs font-mono text-[#888] mt-4 mb-2">[ CERTIFICATIONS ]</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs border border-[#FFD700]/40 px-2 py-0.5 text-[#FFD700]">🎓 MERN Certified</span>
                <span className="text-xs border border-[#BB86FC]/40 px-2 py-0.5 text-[#BB86FC]">✅ Student ID Verified</span>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
              <p className="text-xs font-mono text-[#888] mb-3">[ WORK_PORTFOLIO ]</p>
              <div className="grid grid-cols-3 gap-3">
                {PORTFOLIO.map(p => (
                  <div key={p.title} className="group cursor-pointer">
                    <div className="aspect-video bg-[#252525] border border-[#2A2A2A] group-hover:border-[#BB86FC]/50 transition-colors flex items-center justify-center mb-2">
                      <span className="text-2xl">🖥️</span>
                    </div>
                    <p className="text-xs text-[#E0E0E0] font-medium">{p.title}</p>
                    <p className="text-[10px] text-[#555] mt-1">"{p.review}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Services list */}
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
              <p className="text-xs font-mono text-[#888] mb-3">[ SERVICE_CATALOG ] — ما أقدّمه</p>
              <div className="space-y-3">
                {SERVICES_LIST.map(s => (
                  <div key={s.title} className="flex items-center justify-between border border-[#2A2A2A] px-4 py-3 hover:border-[#BB86FC]/40 transition-colors">
                    <span className="text-sm text-[#E0E0E0]">{s.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#BB86FC]">{s.price}</span>
                      <button className="px-3 py-1 bg-[#BB86FC] text-[#121212] text-xs font-bold hover:bg-[#a06cdc] transition-colors">اطلب</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
              <p className="text-xs font-mono text-[#888] mb-3">[ RATINGS & FEEDBACK ]</p>
              <div className="space-y-3">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="border-b border-[#2A2A2A] pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-1 mb-1">
                      {Array(r.stars).fill('★').map((s, j) => <span key={j} className="text-[#FFD700] text-xs">{s}</span>)}
                    </div>
                    <p className="text-sm text-[#888]">"{r.text}"</p>
                    <p className="text-[10px] font-mono text-[#555] mt-1">— {r.user}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hire Me Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                <span className="text-xs text-[#4CAF50] font-mono">متاح للعمل الآن</span>
              </div>
              <button className="w-full py-3 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors mb-3">
                💬 تواصل للعمل — Hire Me
              </button>
              <div className="text-xs text-center text-[#555] border border-[#2A2A2A] px-3 py-2 font-mono">
                🛡️ الدفع مضمون عبر نظام الوساطة
              </div>
              <div className="mt-4 pt-4 border-t border-[#2A2A2A] space-y-2 text-xs text-[#888]">
                <div className="flex justify-between"><span>آخر نشاط</span><span className="text-[#E0E0E0]">منذ ساعة</span></div>
                <div className="flex justify-between"><span>نسبة الإنجاز</span><span className="text-[#4CAF50]">96%</span></div>
                <div className="flex justify-between"><span>وقت التسليم</span><span className="text-[#E0E0E0]">عادةً 3-5 أيام</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

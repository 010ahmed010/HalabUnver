import { Link } from 'react-router-dom'

const SKILLS = ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Linux Admin', 'Python', 'Docker', 'Git']
const PORTFOLIO = [
  { title: 'لوحة تحكم HalabUnver', desc: 'منصة أكاديمية وتجارية متكاملة.', review: 'عمل استثنائي، سلّم قبل الموعد.' },
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
          <div className="lg:col-span-2 space-y-5">

            {/* Identity Header */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-[#6366F1]/20">👤</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-[#6366F1] bg-[#6366F1]/10 rounded-full px-2.5 py-0.5">✅ موثّق</span>
                    <span className="text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/10 rounded-full px-2.5 py-0.5">⭐ TOP RATED</span>
                  </div>
                  <h1 className="text-2xl font-black text-[#F1F5F9]">أحمد الجاسم</h1>
                  <p className="text-sm text-[#94A3B8]">Full-Stack Developer (MERN)</p>
                  <p className="text-xs text-[#4A5D78] italic mt-1">"Building the future of Syrian Web Apps"</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs">
                    <span className="text-[#F59E0B] font-medium">⭐ 4.9</span>
                    <span className="text-[#94A3B8]">💼 24 مشروع</span>
                    <span className="text-[#94A3B8]">⚡ وقت استجابة 2h</span>
                    <span className="text-[#6366F1] font-medium">🎓 Level: Pro</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
              <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">المهارات التقنية</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {SKILLS.map(s => (
                  <span key={s} className="bg-[#162032] rounded-lg px-3 py-1.5 text-xs font-mono text-[#F1F5F9] border border-[#1E2D45] hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all cursor-default">
                    {s}
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">الشهادات</h3>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs border border-[#F59E0B]/30 bg-[#F59E0B]/8 rounded-full px-3 py-1 text-[#F59E0B]">🎓 MERN Certified</span>
                <span className="text-xs border border-[#6366F1]/30 bg-[#6366F1]/8 rounded-full px-3 py-1 text-[#6366F1]">✅ Student ID Verified</span>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
              <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">معرض الأعمال</h3>
              <div className="grid grid-cols-3 gap-3">
                {PORTFOLIO.map(p => (
                  <div key={p.title} className="group cursor-pointer">
                    <div className="aspect-video bg-[#162032] rounded-xl border border-[#1E2D45] group-hover:border-[#6366F1]/30 transition-all flex items-center justify-center mb-2">
                      <span className="text-2xl">🖥️</span>
                    </div>
                    <p className="text-xs text-[#F1F5F9] font-medium">{p.title}</p>
                    <p className="text-[10px] text-[#4A5D78] mt-1">"{p.review}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
              <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">الخدمات المتاحة</h3>
              <div className="space-y-3">
                {SERVICES_LIST.map(s => (
                  <div key={s.title} className="flex items-center justify-between bg-[#162032] rounded-xl border border-[#1E2D45] px-4 py-3 hover:border-[#6366F1]/30 transition-all">
                    <span className="text-sm text-[#F1F5F9]">{s.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#6366F1]">{s.price}</span>
                      <button className="px-3 py-1.5 gradient-bg text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">اطلب</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
              <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">التقييمات والمراجعات</h3>
              <div className="space-y-4">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="border-b border-[#1E2D45] pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array(r.stars).fill('★').map((s, j) => <span key={j} className="text-[#F59E0B] text-sm">{s}</span>)}
                    </div>
                    <p className="text-sm text-[#94A3B8]">"{r.text}"</p>
                    <p className="text-[10px] text-[#4A5D78] mt-1.5">— {r.user}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hire Me Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-xs text-[#10B981] font-medium">متاح للعمل الآن</span>
              </div>
              <button className="w-full py-3.5 gradient-bg text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity mb-3">
                💬 تواصل للعمل — Hire Me
              </button>
              <div className="text-xs text-center text-[#94A3B8] bg-[#162032] rounded-xl px-3 py-2.5">
                🛡️ الدفع مضمون عبر نظام الوساطة
              </div>
              <div className="mt-5 pt-4 border-t border-[#1E2D45] space-y-2.5 text-xs text-[#94A3B8]">
                <div className="flex justify-between"><span>آخر نشاط</span><span className="text-[#F1F5F9]">منذ ساعة</span></div>
                <div className="flex justify-between"><span>نسبة الإنجاز</span><span className="text-[#10B981] font-semibold">96%</span></div>
                <div className="flex justify-between"><span>وقت التسليم</span><span className="text-[#F1F5F9]">3-5 أيام</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

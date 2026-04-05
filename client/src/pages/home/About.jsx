const NODES = [
  { id: 'knowledge', label: 'Knowledge Hub', icon: '📚', x: 75, y: 20, desc: 'مكتبة رقمية شاملة تجمع كل المصادر الأكاديمية' },
  { id: 'career', label: 'Career Launchpad', icon: '💼', x: 75, y: 70, desc: 'سوق مستقلين يربطك بمشاريع حقيقية ومدفوعة' },
  { id: 'market', label: 'Marketplace', icon: '🛒', x: 25, y: 70, desc: 'متجر ذكي للأدوات والمعدات بأسعار طلابية' },
  { id: 'growth', label: 'Growth Center', icon: '🎓', x: 25, y: 20, desc: 'أكاديمية بدورات احترافية وشهادات معتمدة' },
]

export default function About() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        <div className="mb-10">
          <span className="section-label">عن المنصة</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F1F5F9]">تجربة أكاديمية بلا حدود</h1>
          <p className="text-sm text-[#94A3B8] mt-2 max-w-xl">المنصة الأكاديمية والتجارية الأولى لطلاب جامعة حلب — منظومة متكاملة تحت سقف واحد.</p>
        </div>

        {/* Ecosystem Map */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-[#94A3B8] mb-4">خريطة المنظومة التفاعلية</h3>
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6 sm:p-8">
            <div className="relative h-64 sm:h-72">
              {NODES.map(node => (
                <div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#1E2D45] bg-[#162032] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#6366F1]/50 hover:bg-[#6366F1]/10 transition-all">
                    <span className="text-xl sm:text-2xl">{node.icon}</span>
                    <span className="text-[8px] font-medium text-[#94A3B8] mt-1 leading-tight px-1">{node.label}</span>
                  </div>
                  <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-[#162032] border border-[#6366F1]/30 p-3 w-44 text-xs text-[#F1F5F9] z-10 rounded-xl animate-fade-up">
                    {node.desc}
                  </div>
                </div>
              ))}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#6366F120" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="#6366F120" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="#6366F120" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="#6366F120" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="#14B8A615" strokeWidth="1" strokeDasharray="2 6" />
                <line x1="75%" y1="25%" x2="25%" y2="75%" stroke="#14B8A615" strokeWidth="1" strokeDasharray="2 6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#0F1828]/90 rounded-xl border border-[#6366F1]/30 px-4 sm:px-5 py-3 text-center">
                  <p className="text-sm font-bold gradient-text">HalabUnver</p>
                  <p className="text-[10px] text-[#4A5D78]">v2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#F1F5F9] mb-4">فلسفة الوصول الحر</h2>
            <p className="text-[#94A3B8] leading-relaxed text-sm mb-4">
              نحن نؤمن بأن الوصول إلى الأدوات المتطورة هو حق لكل طالب طموح. لذلك، نمنح كل مستخدم جديد
              <span className="text-[#6366F1] font-semibold"> "فترة تجربة مجانية" </span>
              لاستكشاف كامل قدرات المنصة، من المكتبة الرقمية إلى أدوات تتبع الأداء.
            </p>
            <p className="text-[#94A3B8] leading-relaxed text-sm">
              رؤيتنا: أن يكون كل طالب في جامعة حلب قادراً على التعلم، الكسب، والبناء — من مكان واحد، بثقة كاملة.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-2xl border border-[#6366F1]/20 p-5 sm:p-6">
            <span className="section-label">ابدأ مجاناً</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#F1F5F9] mb-3">بلا قيود</h3>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              {[
                'الوصول الكامل للمكتبة الرقمية',
                'تصفح جميع الدورات الأكاديمية',
                'عرض خدمات المستقلين',
                'تتبع تقدمك الأكاديمي',
              ].map(i => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-xs shrink-0">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Motto */}
        <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-3xl border border-[#6366F1]/20 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-4">
            "Challenge Every Day."
          </h2>
          <p className="text-[#94A3B8] text-sm max-w-xl mx-auto leading-relaxed">
            تحويل التحدي اليومي إلى واقع تقني ملموس — هذا ما يعنيه HalabUnver لكل طالب في جامعة حلب.
          </p>
          <p className="text-xs text-[#4A5D78] mt-5">Ahmed Al-Jassem | AMJ — المطوّر والمؤسس</p>
        </div>
      </div>
    </div>
  )
}

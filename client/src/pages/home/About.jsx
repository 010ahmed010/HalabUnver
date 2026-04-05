const NODES = [
  { id: 'knowledge', label: 'Knowledge Hub', icon: '📚', x: 75, y: 20, desc: 'مكتبة رقمية شاملة تجمع كل المصادر الأكاديمية' },
  { id: 'career', label: 'Career Launchpad', icon: '💼', x: 75, y: 70, desc: 'سوق مستقلين يربطك بمشاريع حقيقية ومدفوعة' },
  { id: 'market', label: 'Marketplace', icon: '🛒', x: 25, y: 70, desc: 'متجر ذكي للأدوات والمعدات بأسعار طلابية' },
  { id: 'growth', label: 'Growth Center', icon: '🎓', x: 25, y: 20, desc: 'أكاديمية بدورات احترافية وشهادات معتمدة' },
]

export default function About() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="mb-10">
          <span className="text-xs font-mono text-[#888]">[ BIO ] — عن المنصة والفلسفة</span>
          <h1 className="text-4xl font-black text-[#E0E0E0] mt-2">تجربة أكاديمية بلا حدود</h1>
        </div>

        {/* Ecosystem Map */}
        <div className="mb-12">
          <p className="text-xs font-mono text-[#888] mb-4">[ ECOSYSTEM_MAP ] — خريطة المنظومة التفاعلية</p>
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-8">
            <div className="relative h-72">
              {NODES.map(node => (
                <div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="w-20 h-20 border-2 border-[#BB86FC]/40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#BB86FC] hover:bg-[#BB86FC]/10 transition-all">
                    <span className="text-2xl">{node.icon}</span>
                    <span className="text-[8px] font-mono text-[#888] mt-1">{node.label}</span>
                  </div>
                  <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-[#252525] border border-[#BB86FC]/40 p-3 w-48 text-xs text-[#E0E0E0] z-10 backdrop-blur-sm animate-fade-up">
                    {node.desc}
                  </div>
                </div>
              ))}
              {/* Data lines — SVG doesn't support Tailwind pointer-events, use className */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#BB86FC22" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="#BB86FC22" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="#BB86FC22" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="#BB86FC22" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="#03DAC622" strokeWidth="1" strokeDasharray="2 6" />
                <line x1="75%" y1="25%" x2="25%" y2="75%" stroke="#03DAC622" strokeWidth="1" strokeDasharray="2 6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border border-[#BB86FC]/30 px-4 py-2 text-center bg-[#121212]/80">
                  <p className="text-xs font-mono text-[#BB86FC]">HalabUnver</p>
                  <p className="text-[10px] text-[#555]">v2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-black text-[#E0E0E0] mb-4">فلسفة الوصول الحر</h2>
            <p className="text-[#888] leading-relaxed text-sm mb-4">
              نحن نؤمن بأن الوصول إلى الأدوات المتطورة هو حق لكل طالب طموح. لذلك، نمنح كل مستخدم جديد
              <span className="text-[#BB86FC]"> "فترة تجربة مجانية" </span>
              لاستكشاف كامل قدرات المنصة، من المكتبة الرقمية إلى أدوات تتبع الأداء.
            </p>
            <p className="text-[#888] leading-relaxed text-sm">
              رؤيتنا: أن يكون كل طالب في جامعة حلب قادراً على التعلم، الكسب، والبناء — من مكان واحد، بثقة كاملة.
            </p>
          </div>
          <div className="border border-[#BB86FC]/20 bg-[#BB86FC]/5 p-6">
            <p className="text-xs font-mono text-[#BB86FC] mb-3">[ FREE_TRIAL ]</p>
            <h3 className="text-xl font-bold text-[#E0E0E0] mb-2">ابدأ مجاناً — بلا قيود</h3>
            <ul className="space-y-2 text-sm text-[#888] mb-4">
              {[
                'الوصول الكامل للمكتبة الرقمية',
                'تصفح جميع الدورات الأكاديمية',
                'عرض خدمات المستقلين',
                'تتبع تقدمك الأكاديمي',
              ].map(i => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#4CAF50]">✓</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* "Challenge Every Day" */}
        <div className="border border-[#2A2A2A] p-12 text-center">
          <p className="text-xs font-mono text-[#888] mb-4">[ THE PHILOSOPHY ]</p>
          <h2 className="text-4xl font-black text-[#E0E0E0] animate-pulse-glow inline-block px-4 py-2">
            "Challenge Every Day."
          </h2>
          <p className="text-[#888] text-sm mt-4 max-w-xl mx-auto">
            تحويل التحدي اليومي إلى واقع تقني ملموس — هذا ما يعنيه HalabUnver لكل طالب في جامعة حلب.
          </p>
          <p className="text-xs font-mono text-[#555] mt-6">[ Ahmed Al-Jassem | AMJ ] — المطوّر والمؤسس</p>
        </div>
      </div>
    </div>
  )
}

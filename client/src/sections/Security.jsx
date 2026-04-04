import './Security.css'

const protocols = [
  {
    icon: '🔐',
    code: 'A',
    title: 'بروتوكول الاستلام',
    desc: 'لا يمكن للطالب تأكيد استلام طلبه إلا بعد إدخال رمز مكوّن من 4 أرقام يولّده المشرف. يضمن هذا أن الصفقة لم تكتمل إلا بتسليم فعلي.',
    color: '#BB86FC',
    steps: ['طلب الطالب', 'تأكيد المشرف', 'رمز 4 أرقام', '✅ مكتمل'],
  },
  {
    icon: '🛡️',
    code: 'B',
    title: 'بوابة المستقل',
    desc: 'لا يمكن لأي مستخدم الدخول إلى خدمات العمل الحر إلا إذا كان اشتراكه نشطاً وهويته موثّقة. حماية مزدوجة لكل طرفي العقد.',
    color: '#06B6D4',
    steps: ['اشتراك نشط', 'هوية موثّقة', 'الوصول للسوق', '🚀 ابدأ'],
  },
  {
    icon: '💰',
    code: 'C',
    title: 'نظام الضمان',
    desc: 'المدفوعات لا تُحوَّل مباشرة للمستقل. تُودَع في محفظة المنصة وتُحرَّر فقط بعد موافقة الطالب والمشرف معاً. حماية للجميع.',
    color: '#10B981',
    steps: ['دفع العميل', 'محفظة الضمان', 'موافقة الطرفين', '💎 تحرير المبلغ'],
  },
]

export default function Security() {
  return (
    <section className="security">
      <div className="section-header">
        <span className="section-tag">بروتوكولات الأمان</span>
        <h2 className="section-title">ثلاثة دروع.<br /><span className="gradient-text">صفر مخاطر.</span></h2>
        <p className="section-desc">نظام "المصافحة" الأمني يحمي كل معاملة على المنصة من البداية حتى الاكتمال</p>
      </div>

      <div className="security-grid">
        {protocols.map((p) => (
          <div key={p.code} className="security-card" style={{ '--color': p.color }}>
            <div className="security-card-top">
              <span className="security-icon">{p.icon}</span>
              <span className="security-badge">بروتوكول {p.code}</span>
            </div>
            <h3 className="security-title" style={{ color: p.color }}>{p.title}</h3>
            <p className="security-desc">{p.desc}</p>
            <div className="security-flow">
              {p.steps.map((s, i) => (
                <div key={i} className="security-flow-items">
                  <span className="flow-step">{s}</span>
                  {i < p.steps.length - 1 && <span className="flow-arrow">←</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

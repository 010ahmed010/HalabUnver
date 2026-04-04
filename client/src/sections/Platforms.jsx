import './Platforms.css'

const platforms = [
  {
    id: 'academy',
    tag: 'مستوحاة من Udemy & Coursera',
    icon: '🎓',
    title: 'أكاديمية حلب',
    subtitle: 'تعلّم بلا حدود',
    desc: 'مئات الدورات الأكاديمية والتقنية بأيدي أفضل أساتذة جامعة حلب. تتبّع تقدّمك، احصل على شهادات معتمدة، واكسب نقاط الخبرة مع كل دورة تكملها.',
    color: '#BB86FC',
    gradient: 'linear-gradient(135deg, #7c3aed22, #BB86FC11)',
    features: ['دورات مرئية وتفاعلية', 'شهادات معتمدة', 'نظام XP للتقدّم', 'أسئلة وامتحانات'],
    preview: [
      { title: 'أساسيات البرمجة بـ Python', students: '4.2K', rating: '4.9', level: 'مبتدئ' },
      { title: 'تصميم قواعد البيانات', students: '2.8K', rating: '4.8', level: 'متوسط' },
      { title: 'ذكاء اصطناعي تطبيقي', students: '3.1K', rating: '5.0', level: 'متقدم' },
    ]
  },
  {
    id: 'library',
    tag: 'مستوحاة من Academia.edu & Google Scholar',
    icon: '📚',
    title: 'مكتبة حلب',
    subtitle: 'المعرفة في متناول يدك',
    desc: 'أرشيف أكاديمي ضخم يضم آلاف المستندات والكتب والأبحاث. بحث ذكي بالكلمات المفتاحية، قارئ PDF متكامل، وتنظيم حسب التخصص والمادة.',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #0891b222, #06B6D411)',
    features: ['بحث ذكي متقدم', 'قارئ PDF مدمج', 'تنظيم بالتخصص', '+25 XP لكل تنزيل'],
    preview: [
      { title: 'كتاب الجبر الخطي - د. الأحمد', type: 'PDF', size: '12 MB', dept: 'رياضيات' },
      { title: 'فيزياء الكم للمبتدئين', type: 'PDF', size: '8 MB', dept: 'فيزياء' },
      { title: 'أسس الاقتصاد الكلي', type: 'PDF', size: '5 MB', dept: 'اقتصاد' },
    ]
  },
  {
    id: 'freelance',
    tag: 'مستوحاة من Fiverr & Upwork',
    icon: '💼',
    title: 'سوق المستقلين',
    subtitle: 'موهبتك = دخلك',
    desc: 'بوابة العمل الحر الأولى بين الطلاب. اعرض خدماتك، قدّم على المشاريع، واحصل على مدفوعاتك بأمان عبر نظام الضمان. لوحة المتميّزين تُظهر أفضل المواهب.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #05966922, #10B98111)',
    features: ['نظام ضمان للمدفوعات', 'ملف مهني احترافي', 'لوحة المتميّزين', 'اشتراك واحد يفتح الكل'],
    preview: [
      { name: 'أحمد م.', skill: 'تصميم جرافيك', rate: '500 ل.س/ساعة', level: '🥇 خبير' },
      { name: 'سارة ك.', skill: 'برمجة ويب', rate: '800 ل.س/ساعة', level: '🥈 متقدم' },
      { name: 'محمد ع.', skill: 'ترجمة محترفة', rate: '300 ل.س/ساعة', level: '🥉 محترف' },
    ]
  },
  {
    id: 'store',
    tag: 'مستوحاة من Amazon & AliExpress',
    icon: '🛒',
    title: 'متجر حلب',
    subtitle: 'كل ما تحتاجه لدراستك',
    desc: 'متجر إلكتروني متخصص للمستلزمات الجامعية والأدوات التقنية. طلب آمن، استلام من نقاط توزيع قريبة، وبروتوكول "المصافحة" الأمني لضمان سلامة كل صفقة.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #d9770622, #F59E0B11)',
    features: ['أسعار طلابية مخفضة', 'نقاط استلام قريبة', 'بروتوكول أمان المصافحة', '+100 XP لأول طلب'],
    preview: [
      { name: 'كالكيوليتر علمي Casio', price: '45,000 ل.س', status: '📦 متوفر', discount: '10%' },
      { name: 'كتاب تحليل رياضي', price: '12,000 ل.س', status: '📦 متوفر', discount: '15%' },
      { name: 'قلم رسم هندسي', price: '8,000 ل.س', status: '🚚 قريباً', discount: '5%' },
    ]
  },
]

function AcademyPreview({ items }) {
  return (
    <div className="preview-list">
      {items.map((item, i) => (
        <div key={i} className="preview-item preview-item--course">
          <div className="preview-course-icon">📹</div>
          <div className="preview-course-info">
            <span className="preview-course-title">{item.title}</span>
            <span className="preview-course-meta">{item.students} طالب · ⭐ {item.rating} · {item.level}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function LibraryPreview({ items }) {
  return (
    <div className="preview-list">
      {items.map((item, i) => (
        <div key={i} className="preview-item preview-item--doc">
          <div className="preview-doc-icon">📄</div>
          <div className="preview-doc-info">
            <span className="preview-doc-title">{item.title}</span>
            <span className="preview-doc-meta">{item.type} · {item.size} · {item.dept}</span>
          </div>
          <button className="preview-download">⬇</button>
        </div>
      ))}
    </div>
  )
}

function FreelancePreview({ items }) {
  return (
    <div className="preview-list">
      {items.map((item, i) => (
        <div key={i} className="preview-item preview-item--talent">
          <div className="preview-talent-avatar">{item.name[0]}</div>
          <div className="preview-talent-info">
            <span className="preview-talent-name">{item.name} <span className="talent-level">{item.level}</span></span>
            <span className="preview-talent-meta">{item.skill} · {item.rate}</span>
          </div>
          <button className="preview-hire">توظيف</button>
        </div>
      ))}
    </div>
  )
}

function StorePreview({ items }) {
  return (
    <div className="preview-list">
      {items.map((item, i) => (
        <div key={i} className="preview-item preview-item--product">
          <div className="preview-product-icon">🛍️</div>
          <div className="preview-product-info">
            <span className="preview-product-name">{item.name}</span>
            <span className="preview-product-meta">{item.price} · {item.status}</span>
          </div>
          <span className="preview-discount">-{item.discount}</span>
        </div>
      ))}
    </div>
  )
}

const previewComponents = {
  academy: AcademyPreview,
  library: LibraryPreview,
  freelance: FreelancePreview,
  store: StorePreview,
}

export default function Platforms() {
  return (
    <section className="platforms">
      <div className="section-header">
        <span className="section-tag">المنظومة المتكاملة</span>
        <h2 className="section-title">أربعة عوالم،<br /><span className="gradient-text">منصة واحدة.</span></h2>
        <p className="section-desc">كل ما يحتاجه الطالب الجامعي في حلب، مجموعاً في مكان واحد</p>
      </div>

      <div className="platforms-grid">
        {platforms.map((p, idx) => {
          const Preview = previewComponents[p.id]
          return (
            <div
              key={p.id}
              className={`platform-card ${idx % 2 === 0 ? 'platform-card--normal' : 'platform-card--reversed'}`}
              id={p.id}
            >
              <div className="platform-content">
                <div className="platform-tag">{p.tag}</div>
                <div className="platform-icon-wrap" style={{ '--color': p.color }}>
                  <span className="platform-icon">{p.icon}</span>
                </div>
                <h3 className="platform-name" style={{ color: p.color }}>{p.title}</h3>
                <h4 className="platform-subtitle">{p.subtitle}</h4>
                <p className="platform-desc">{p.desc}</p>
                <div className="platform-features">
                  {p.features.map((f) => (
                    <span key={f} className="feature-chip" style={{ '--color': p.color }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                      {f}
                    </span>
                  ))}
                </div>
                <button className="platform-cta" style={{ '--color': p.color }}>
                  اكتشف {p.title} ←
                </button>
              </div>

              <div className="platform-preview" style={{ background: p.gradient }}>
                <div className="preview-header">
                  <span className="preview-dot" style={{ background: p.color }}></span>
                  <span className="preview-title">{p.title}</span>
                </div>
                <Preview items={p.preview} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-orb hero-orb--1"></div>
        <div className="hero-orb hero-orb--2"></div>
        <div className="hero-orb hero-orb--3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          المنصة الأكاديمية الأولى في حلب · إصدار 2026
        </div>

        <h1 className="hero-title">
          <span className="hero-title--line1">كل يوم</span>
          <span className="hero-title--gradient">تحدٍّ جديد.</span>
          <span className="hero-title--line3">كل خطوة نحو</span>
          <span className="hero-title--accent">مستقبلك.</span>
        </h1>

        <p className="hero-desc">
          منظومة أكاديمية وتجارية متكاملة لطلاب جامعة حلب —
          <br />
          تعلّم، اكتسب خبرة، تسوّق، وابنِ مستقبلك من مكان واحد.
        </p>

        <div className="hero-cta">
          <button className="btn-hero-primary">
            <span>ابدأ رحلتك الآن</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="btn-hero-secondary">
            استكشف المنصة
          </button>
        </div>

        <div className="hero-trust">
          <div className="trust-avatars">
            {['ع', 'م', 'س', 'ف', 'ر'].map((c, i) => (
              <div key={i} className="trust-avatar" style={{ '--i': i }}>{c}</div>
            ))}
          </div>
          <p className="trust-text">
            انضم إلى <strong>+100,000</strong> طالب يثقون بنا
          </p>
        </div>
      </div>

      <div className="hero-cards-float">
        <div className="float-card float-card--1">
          <div className="float-card-icon">🎓</div>
          <div>
            <div className="float-card-title">طالب جديد انضم</div>
            <div className="float-card-sub">أكاديمية حلب · منذ ثانية</div>
          </div>
        </div>
        <div className="float-card float-card--2">
          <div className="float-card-icon">💎</div>
          <div>
            <div className="float-card-title">+250 نقطة خبرة</div>
            <div className="float-card-sub">أكمل دورة برمجة</div>
          </div>
        </div>
        <div className="float-card float-card--3">
          <div className="float-card-icon">✅</div>
          <div>
            <div className="float-card-title">طلب تم التحقق منه</div>
            <div className="float-card-sub">متجر حلب · للتو</div>
          </div>
        </div>
      </div>
    </section>
  )
}

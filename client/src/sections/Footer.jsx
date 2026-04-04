import './Footer.css'

const links = {
  'المنصة': ['أكاديمية حلب', 'مكتبة حلب', 'سوق المستقلين', 'متجر حلب'],
  'الطالب': ['إنشاء حساب', 'تسجيل الدخول', 'لوحة المستخدم', 'إعدادات الحساب'],
  'الدعم': ['تواصل معنا', 'الأسئلة الشائعة', 'سياسة الخصوصية', 'شروط الاستخدام'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="footer-inner">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="logo-halab">حلب</span>
            <span className="logo-unver">يونيفر</span>
          </div>
          <p className="footer-tagline">
            "كل نقرة تخدم المجتمع.<br />كل تصميم يعكس الإرادة."
          </p>
          <div className="footer-developer">
            <span className="dev-label">المطوّر</span>
            <span className="dev-name">أحمد الجاسم · AMJ</span>
          </div>
          <div className="footer-status-bar">
            <span className="status-dot"></span>
            <span>النظام: مستقر</span>
            <span className="status-sep">·</span>
            <span>الإصدار: 2026.1</span>
          </div>
        </div>

        <div className="footer-links-grid">
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="footer-link-group">
              <h4 className="footer-group-title">{group}</h4>
              {items.map((item) => (
                <a key={item} href="#" className="footer-link">{item}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 حلب يونيفر · جميع الحقوق محفوظة</span>
        <span className="footer-made">صُنع بـ ❤️ لطلاب جامعة حلب</span>
      </div>
    </footer>
  )
}

import './Gamification.css'

const xpEvents = [
  { icon: '🚀', event: 'إنشاء الحساب', xp: '+100', color: '#BB86FC' },
  { icon: '🪪', event: 'التحقق من الهوية', xp: '+500', color: '#F59E0B' },
  { icon: '📥', event: 'تنزيل من المكتبة', xp: '+25', color: '#06B6D4' },
  { icon: '🎓', event: 'إكمال دورة', xp: '+250', color: '#10B981' },
  { icon: '🛒', event: 'أول طلب في المتجر', xp: '+100', color: '#EF4444' },
]

const levels = [
  { name: 'مبتدئ', min: 0, max: 499, icon: '🌱', color: '#6b7280' },
  { name: 'متعلم', min: 500, max: 1999, icon: '📗', color: '#10B981' },
  { name: 'محترف', min: 2000, max: 4999, icon: '💙', color: '#06B6D4' },
  { name: 'خبير', min: 5000, max: 9999, icon: '💜', color: '#BB86FC' },
  { name: 'أسطورة', min: 10000, max: '∞', icon: '👑', color: '#F59E0B' },
]

export default function Gamification() {
  return (
    <section className="gamification">
      <div className="gamification-inner">
        <div className="section-header">
          <span className="section-tag">نظام النقاط والمستويات</span>
          <h2 className="section-title">كل إنجاز يُكافأ عليه<br /><span className="gradient-text">ارتقِ بمستواك.</span></h2>
          <p className="section-desc">نظام XP مستوحى من ألعاب RPG — كل نشاط على المنصة يمنحك نقاطاً تقربك من المستوى التالي</p>
        </div>

        <div className="gamification-content">
          <div className="xp-events-card">
            <div className="xp-card-header">
              <span>🎯 أحداث الخبرة</span>
            </div>
            {xpEvents.map((e) => (
              <div key={e.event} className="xp-event-row">
                <span className="xp-event-icon">{e.icon}</span>
                <span className="xp-event-name">{e.event}</span>
                <span className="xp-event-badge" style={{ '--color': e.color }}>
                  {e.xp} XP
                </span>
              </div>
            ))}
            <div className="xp-formula-box">
              <span className="formula-label">معادلة المستوى</span>
              <span className="formula-value">المستوى = ∛(مجموع XP ÷ 100)</span>
            </div>
          </div>

          <div className="levels-showcase">
            {levels.map((l, i) => (
              <div key={l.name} className="level-card" style={{ '--color': l.color, '--i': i }}>
                <span className="level-icon">{l.icon}</span>
                <div className="level-info">
                  <span className="level-name" style={{ color: l.color }}>{l.name}</span>
                  <span className="level-range">{l.min.toLocaleString('ar')} — {typeof l.max === 'number' ? l.max.toLocaleString('ar') : l.max} XP</span>
                </div>
                <div className="level-bar">
                  <div className="level-bar-fill" style={{ background: l.color, width: `${20 * (i + 1)}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="profile-demo">
            <div className="demo-header">معاينة الملف الشخصي</div>
            <div className="demo-avatar">
              <div className="demo-avatar-circle">أ</div>
              <div className="demo-crown">👑</div>
            </div>
            <div className="demo-name">أحمد الجاسم</div>
            <div className="demo-level-badge">مستوى 7 · خبير</div>
            <div className="demo-xp-bar">
              <div className="demo-xp-fill" style={{ width: '73%' }}></div>
            </div>
            <div className="demo-xp-text">7,300 / 10,000 XP للمستوى التالي</div>
            <div className="demo-badges">
              <span title="أكمل 10 دورات">🎓</span>
              <span title="مُحقَّق الهوية">🪪</span>
              <span title="أول طلب">🛒</span>
              <span title="مستقل نشط">💼</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import './Stats.css'

const stats = [
  { value: '+100K', label: 'طالب مسجّل', icon: '👨‍🎓', color: '#BB86FC' },
  { value: '+500', label: 'دورة تعليمية', icon: '📖', color: '#06B6D4' },
  { value: '+10K', label: 'وثيقة أكاديمية', icon: '📚', color: '#10B981' },
  { value: '+2K', label: 'مستقل محترف', icon: '💼', color: '#F59E0B' },
  { value: '99%', label: 'رضا الطلاب', icon: '⭐', color: '#EF4444' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-inner">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ '--color': s.color }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

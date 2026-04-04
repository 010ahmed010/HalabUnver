import './App.css'

const pillars = [
  {
    icon: '🎓',
    title: 'Halab Academy',
    desc: 'Courses, tutorials, and certifications for Aleppo University students.',
  },
  {
    icon: '📚',
    title: 'Halab Library',
    desc: 'Academic documents, PDF archive, and a smart document reader.',
  },
  {
    icon: '💼',
    title: 'Halab Freelance',
    desc: 'Student talent marketplace with escrow payments and leaderboards.',
  },
  {
    icon: '🛒',
    title: 'Halab Store',
    desc: 'Academic hardware and supplies with in-person pickup nodes.',
  },
]

const stats = [
  { label: 'Students', value: '100K+' },
  { label: 'Courses', value: '500+' },
  { label: 'Documents', value: '10K+' },
  { label: 'Freelancers', value: '2K+' },
]

const xpEvents = [
  { xp: '+100 XP', event: 'Registration' },
  { xp: '+500 XP', event: 'ID Verification' },
  { xp: '+25 XP', event: 'Library Download' },
  { xp: '+250 XP', event: 'Course Completion' },
  { xp: '+100 XP', event: 'First Store Order' },
]

const statusPills = [
  { label: '🕒 Pending', bg: '#FFD700', color: '#121212' },
  { label: '✅ Verified', bg: '#BB86FC', color: '#121212' },
  { label: '📦 Processing', bg: '#03DAC6', color: '#121212' },
  { label: '🚚 Ready', bg: '#CF6679', color: '#fff' },
  { label: '💎 Success', bg: '#4CAF50', color: '#fff' },
]

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">
          <span className="accent">HALAB</span>UNVER
        </div>
        <div className="nav-links">
          <a href="#pillars">Academy</a>
          <a href="#pillars">Library</a>
          <a href="#pillars">Store</a>
          <a href="#pillars">Talent</a>
        </div>
        <button className="btn-news">📢 الأخبار</button>
      </nav>

      <section className="hero">
        <div className="system-tag">[ SYSTEM: STABLE ] &nbsp; [ VERSION: 2026.1 ]</div>
        <h1>
          <span className="accent">Challenge</span> Every Day.
        </h1>
        <p className="hero-sub">
          The unified academic and commercial ecosystem for Aleppo University —
          empowering students with knowledge, tools, and opportunity.
        </p>
        <div className="hero-cta">
          <button className="btn-primary">Get Started</button>
          <button className="btn-outline">System Design ↗</button>
        </div>
      </section>

      <section className="stats-bar">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="pillars" id="pillars">
        <h2 className="section-title">[ ECOSYSTEM PILLARS ]</h2>
        <div className="pillars-grid">
          {pillars.map((p) => (
            <div key={p.title} className="pillar-card">
              <div className="pillar-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <button className="btn-outline btn-sm">Explore →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="xp-section" id="xp">
        <h2 className="section-title">[ XP &amp; GAMIFICATION SYSTEM ]</h2>
        <div className="xp-grid">
          {xpEvents.map((e) => (
            <div key={e.event} className="xp-item">
              <span className="xp-badge">{e.xp}</span>
              <span>{e.event}</span>
            </div>
          ))}
        </div>
        <p className="xp-formula">
          Level Formula: <code>Level = Floor(√(TotalXP / 100))</code>
        </p>
      </section>

      <section className="status-section" id="status">
        <h2 className="section-title">[ ORDER STATUS PROTOCOL ]</h2>
        <div className="status-grid">
          {statusPills.map((s) => (
            <div
              key={s.label}
              className="status-pill"
              style={{ background: s.bg, color: s.color }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">HalabUnver v1.0.0-Stable</div>
        <div className="footer-meta">
          <span>[ SYSTEM: STABLE ]</span>
          <span>[ VERSION: 2026.1 ]</span>
          <span>[ AMJ Developer ]</span>
        </div>
        <p className="footer-quote">
          "Every click must serve the community. Every design must reflect resilience."
        </p>
      </footer>
    </div>
  )
}

export default App

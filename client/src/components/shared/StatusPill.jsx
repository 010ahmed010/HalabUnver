const STATUS_MAP = {
  pending:    { label: '🕒 Pending',    color: '#FFD700', bg: '#FFD70015' },
  verified:   { label: '✅ Verified',   color: '#BB86FC', bg: '#BB86FC15' },
  processing: { label: '📦 Processing', color: '#03DAC6', bg: '#03DAC615' },
  ready:      { label: '🚚 Ready',      color: '#CF6679', bg: '#CF667915' },
  success:    { label: '💎 Success',    color: '#4CAF50', bg: '#4CAF5015' },
  active:     { label: '🟢 Active',     color: '#4CAF50', bg: '#4CAF5015' },
  expired:    { label: '🔴 Expired',    color: '#EF4444', bg: '#EF444415' },
  restricted: { label: '🔴 Restricted', color: '#EF4444', bg: '#EF444415' },
}

export default function StatusPill({ status, size = 'sm' }) {
  const s = STATUS_MAP[status?.toLowerCase()] || { label: status, color: '#888', bg: '#88888815' }
  const padClass = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'
  return (
    <span
      className={`inline-flex items-center font-mono font-medium ${padClass}`}
      style={{ color: s.color, backgroundColor: s.bg, border: `1px solid ${s.color}44` }}
    >
      {s.label}
    </span>
  )
}

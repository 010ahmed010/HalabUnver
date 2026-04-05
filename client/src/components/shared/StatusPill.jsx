const STATUS_MAP = {
  pending:    { label: '🕒 Pending',    cls: 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/40' },
  verified:   { label: '✅ Verified',   cls: 'text-[#BB86FC] bg-[#BB86FC]/10 border border-[#BB86FC]/40' },
  processing: { label: '📦 Processing', cls: 'text-[#03DAC6] bg-[#03DAC6]/10 border border-[#03DAC6]/40' },
  ready:      { label: '🚚 Ready',      cls: 'text-[#CF6679] bg-[#CF6679]/10 border border-[#CF6679]/40' },
  success:    { label: '💎 Success',    cls: 'text-[#4CAF50] bg-[#4CAF50]/10 border border-[#4CAF50]/40' },
  active:     { label: '🟢 Active',     cls: 'text-[#4CAF50] bg-[#4CAF50]/10 border border-[#4CAF50]/40' },
  expired:    { label: '🔴 Expired',    cls: 'text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/40' },
  restricted: { label: '🔴 Restricted', cls: 'text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/40' },
}

export default function StatusPill({ status, size = 'sm' }) {
  const s = STATUS_MAP[status?.toLowerCase()] || { label: status, cls: 'text-[#888] bg-[#888]/10 border border-[#888]/40' }
  const padClass = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'
  return (
    <span className={`inline-flex items-center font-mono font-medium ${padClass} ${s.cls}`}>
      {s.label}
    </span>
  )
}

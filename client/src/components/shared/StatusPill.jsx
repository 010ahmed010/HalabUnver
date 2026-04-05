const STATUS_MAP = {
  pending:    { label: 'معلّق', cls: 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30' },
  verified:   { label: 'موثّق', cls: 'text-[#6366F1] bg-[#6366F1]/10 border border-[#6366F1]/30' },
  processing: { label: 'قيد التجهيز', cls: 'text-[#14B8A6] bg-[#14B8A6]/10 border border-[#14B8A6]/30' },
  ready:      { label: 'جاهز للتسليم', cls: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/30' },
  success:    { label: 'مكتمل', cls: 'text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30' },
  active:     { label: 'نشط', cls: 'text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30' },
  expired:    { label: 'منتهي', cls: 'text-[#F43F5E] bg-[#F43F5E]/10 border border-[#F43F5E]/30' },
  restricted: { label: 'محظور', cls: 'text-[#F43F5E] bg-[#F43F5E]/10 border border-[#F43F5E]/30' },
  delivered:  { label: 'تم التسليم', cls: 'text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30' },
}

export default function StatusPill({ status, size = 'sm' }) {
  const s = STATUS_MAP[status?.toLowerCase()] || { label: status, cls: 'text-[#94A3B8] bg-[#94A3B8]/10 border border-[#94A3B8]/30' }
  const padClass = size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${padClass} ${s.cls}`}>
      {s.label}
    </span>
  )
}

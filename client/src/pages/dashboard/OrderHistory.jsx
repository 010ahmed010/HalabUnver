import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusPill from '../../components/shared/StatusPill'

const ORDERS = [
  { id: '#HS-702', item: 'Huion H640P — لوحة رسم', status: 'ready', price: '450,000', pickup: 'مبنى الهندسة المعمارية — ط2 — مكتب 402', code: '7842', date: '2026-04-03' },
  { id: '#HS-561', item: 'Arduino Mega 2560', status: 'success', price: '80,000', pickup: '', code: '', date: '2026-03-15' },
  { id: '#HS-490', item: 'قميص HalabUnver 2026', status: 'success', price: '55,000', pickup: '', code: '', date: '2026-02-28' },
]

const PENDING = {
  id: '#HS-703',
  item: 'ThinkPad X1 Carbon — مُجدّد',
  status: 'pending',
  price: '3,700,000',
}

export default function OrderHistory() {
  const [showCode, setShowCode] = useState(null)

  return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="text-xl font-black text-[#E0E0E0]">🛒 طلباتي</h2>

      {/* Pending notifier */}
      <div className="border border-[#FFD700]/40 bg-[#FFD700]/5 p-5">
        <p className="text-xs font-mono text-[#FFD700] mb-2">[ PENDING_ACTION ] — يتطلب إجراء</p>
        <p className="text-sm text-[#E0E0E0] mb-1">الطلب {PENDING.id} يتطلب تحميل إيصال الدفع.</p>
        <p className="text-xs text-[#888] mb-3">العنصر: {PENDING.item}</p>
        <Link to="/dashboard/wallet" className="px-4 py-2 bg-[#FFD700] text-[#121212] font-bold text-xs hover:bg-[#e6c200] transition-colors inline-block">
          📤 تحميل الإيصال
        </Link>
      </div>

      {/* Savings counter */}
      <div className="border border-[#4CAF50]/20 bg-[#4CAF50]/5 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-[#888] mb-0.5">[ SAVINGS_COUNTER ]</p>
          <p className="text-sm text-[#E0E0E0]">وفّرت <span className="text-[#4CAF50] font-bold">155,000 SYP</span> مقارنةً بأسعار السوق</p>
          <p className="text-xs font-mono text-[#555] italic mt-1">"Invest in your tools. Challenge Every Day."</p>
        </div>
        <span className="text-3xl">💎</span>
      </div>

      {/* Order list */}
      <div className="space-y-3">
        {ORDERS.map(o => (
          <div key={o.id} className="bg-[#1E1E1E] border border-[#2A2A2A] p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#252525] border border-[#2A2A2A] flex items-center justify-center text-lg">📦</div>
                <div>
                  <p className="text-sm font-bold text-[#E0E0E0]">{o.item}</p>
                  <p className="text-xs font-mono text-[#555]">{o.id} · {o.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusPill status={o.status} />
                <span className="text-xs font-mono text-[#E0E0E0]">{o.price} SYP</span>
              </div>
            </div>

            {/* Pickup node */}
            {o.status === 'ready' && o.pickup && (
              <div className="border border-[#BB86FC]/20 bg-[#BB86FC]/5 p-4 mt-3">
                <p className="text-xs font-mono text-[#888] mb-2">[ PICKUP_NODE ]</p>
                <p className="text-sm text-[#E0E0E0] mb-1">📍 {o.pickup}</p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-xs text-[#888] mb-1">رمز الاستلام الآمن (4 أرقام)</p>
                    {showCode === o.id ? (
                      <span className="text-2xl font-black font-mono text-[#BB86FC] tracking-[0.3em]">{o.code}</span>
                    ) : (
                      <span className="text-2xl font-black font-mono text-[#555] tracking-[0.3em]">••••</span>
                    )}
                  </div>
                  <button onClick={() => setShowCode(showCode === o.id ? null : o.id)}
                    className="px-3 py-1.5 border border-[#BB86FC]/40 text-[#BB86FC] text-xs hover:bg-[#BB86FC]/10 transition-colors">
                    {showCode === o.id ? '🔒 إخفاء' : '👁️ عرض الرمز'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-3">
              {o.status === 'success' && (
                <button className="text-xs border border-[#2A2A2A] px-3 py-1.5 text-[#888] hover:border-[#BB86FC] transition-colors">🔄 إعادة الطلب</button>
              )}
              <button className="text-xs border border-[#EF4444]/30 px-3 py-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">⚠️ مشكلة في الطلب؟</button>
              <button className="text-xs border border-[#2A2A2A] px-3 py-1.5 text-[#888] hover:border-[#BB86FC] transition-colors">📄 تحميل الفاتورة</button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/store" className="block w-full py-2.5 border border-[#2A2A2A] text-[#888] text-sm text-center hover:border-[#BB86FC] transition-colors">
        🛒 العودة للمتجر
      </Link>
    </div>
  )
}

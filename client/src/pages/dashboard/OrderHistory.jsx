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
  price: '3,700,000',
}

export default function OrderHistory() {
  const [showCode, setShowCode] = useState(null)

  return (
    <div className="space-y-4 animate-fade-up">
      <div>
        <span className="section-label">المتجر</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">طلباتي</h2>
      </div>

      {/* Pending action */}
      <div className="bg-[#F59E0B]/5 rounded-2xl border border-[#F59E0B]/30 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-blink-soft" />
          <p className="text-xs font-semibold text-[#F59E0B]">يتطلب إجراء</p>
        </div>
        <p className="text-sm text-[#F1F5F9] mb-0.5">الطلب {PENDING.id} يتطلب تحميل إيصال الدفع.</p>
        <p className="text-xs text-[#94A3B8] mb-3">المنتج: {PENDING.item}</p>
        <Link to="/dashboard/wallet" className="inline-block px-4 py-2 bg-[#F59E0B] text-[#070C18] font-bold text-xs rounded-lg hover:bg-[#FBBF24] transition-colors">
          📤 تحميل الإيصال
        </Link>
      </div>

      {/* Savings */}
      <div className="bg-[#10B981]/5 rounded-2xl border border-[#10B981]/20 px-5 py-3.5 flex items-center justify-between">
        <div>
          <p className="text-sm text-[#F1F5F9]">وفّرت <span className="text-[#10B981] font-bold">155,000 SYP</span> مقارنةً بأسعار السوق</p>
          <p className="text-xs text-[#4A5D78] italic mt-0.5">"Invest in your tools. Challenge Every Day."</p>
        </div>
        <span className="text-3xl">💎</span>
      </div>

      {/* Order list */}
      <div className="space-y-3">
        {ORDERS.map(o => (
          <div key={o.id} className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 hover:border-[#6366F1]/20 transition-all">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#162032] rounded-xl border border-[#1E2D45] flex items-center justify-center text-xl">📦</div>
                <div>
                  <p className="text-sm font-bold text-[#F1F5F9]">{o.item}</p>
                  <p className="text-xs text-[#4A5D78] mt-0.5">{o.id} · {o.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <StatusPill status={o.status} />
                <span className="text-xs font-semibold text-[#F1F5F9] font-mono">{o.price} SYP</span>
              </div>
            </div>

            {/* Pickup info */}
            {o.status === 'ready' && o.pickup && (
              <div className="rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/5 p-4 mt-3">
                <p className="text-xs font-semibold text-[#6366F1] mb-2">تفاصيل الاستلام</p>
                <p className="text-sm text-[#F1F5F9] mb-3">📍 {o.pickup}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#94A3B8] mb-1">رمز الاستلام الآمن (4 أرقام)</p>
                    {showCode === o.id ? (
                      <span className="text-2xl font-black font-mono gradient-text tracking-[0.3em]">{o.code}</span>
                    ) : (
                      <span className="text-2xl font-black font-mono text-[#1E2D45] tracking-[0.3em]">••••</span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowCode(showCode === o.id ? null : o.id)}
                    className="px-3 py-1.5 rounded-lg border border-[#6366F1]/30 text-[#6366F1] text-xs hover:bg-[#6366F1]/10 transition-all"
                  >
                    {showCode === o.id ? '🔒 إخفاء' : '👁 عرض الرمز'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-3 pt-3 border-t border-[#1E2D45]">
              {o.status === 'success' && (
                <button className="px-3 py-1.5 text-xs rounded-lg border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all">🔄 إعادة الطلب</button>
              )}
              <button className="px-3 py-1.5 text-xs rounded-lg border border-[#F43F5E]/30 text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-all">⚠ مشكلة</button>
              <button className="px-3 py-1.5 text-xs rounded-lg border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all">📄 الفاتورة</button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/store" className="block w-full py-3 rounded-xl border border-[#1E2D45] text-[#94A3B8] text-sm text-center hover:border-[#F43F5E]/40 hover:text-[#F43F5E] transition-all">
        🛒 العودة للمتجر
      </Link>
    </div>
  )
}

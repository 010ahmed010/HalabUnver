import { useState } from 'react'
import StatusPill from '../../components/shared/StatusPill'

const TRANSACTIONS = [
  { date: '2026-04-03', ref: '#TX-9901', purpose: '🛒 متجر', status: 'verified', amount: '450,000' },
  { date: '2026-04-01', ref: '#TX-9845', purpose: '💼 اشتراك', status: 'verified', amount: '35,000' },
  { date: '2026-03-28', ref: '#TX-9701', purpose: '🎓 أكاديمية', status: 'pending', amount: '90,000' },
  { date: '2026-03-20', ref: '#TX-9560', purpose: '🛒 متجر', status: 'success', amount: '155,000' },
]

export default function WalletOverview() {
  const [showForm, setShowForm] = useState(false)
  const [txRef, setTxRef] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setShowForm(false)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div>
        <span className="section-label">الإدارة المالية</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">المحفظة المالية</h2>
      </div>

      {/* Cash flow cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'إجمالي المصروف', val: '695,000 SYP', icon: '💸', color: '#F43F5E' },
          { label: 'أرباح العمل الحر', val: '320,000 SYP', icon: '💰', color: '#10B981' },
          { label: 'قيد التحقق', val: '90,000 SYP', icon: '⏳', color: '#F59E0B' },
        ].map(c => (
          <div key={c.label} className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 hover:border-[#6366F1]/20 transition-all">
            <span className="text-2xl block mb-2">{c.icon}</span>
            <p className="text-xl font-black text-[#F1F5F9]" style={{ color: c.color }}>{c.val}</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Savings badge */}
      <div className="bg-[#10B981]/5 rounded-2xl border border-[#10B981]/20 px-5 py-3.5 flex items-center gap-3">
        <span className="text-[#10B981] text-xl">💎</span>
        <p className="text-sm text-[#F1F5F9]">وفّرت <span className="text-[#10B981] font-bold">45,000 SYP</span> عبر خصومات طلاب HalabUnver</p>
      </div>

      {/* Virtual Wallet */}
      <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-2xl border border-[#6366F1]/20 p-5">
        <p className="text-xs font-semibold text-[#6366F1] mb-2">رصيد المنصة</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-black gradient-text">25,000 SYP</p>
            <p className="text-xs text-[#94A3B8] mt-1">رصيد قابل للاستخدام في المتجر</p>
          </div>
          <span className="text-4xl">💰</span>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5">
        <p className="text-xs font-semibold text-[#F1F5F9] mb-3">اشتراك المستقلين</p>
        <div className="flex items-center justify-between">
          <div>
            <StatusPill status="active" />
            <p className="text-xs text-[#94A3B8] mt-2">14 يوم متبق · التجديد: 17 أبريل 2026</p>
          </div>
          <button className="px-4 py-2.5 gradient-bg text-white font-bold text-xs rounded-xl hover:opacity-90 transition-opacity">
            💳 تجديد الاشتراك
          </button>
        </div>
      </div>

      {/* Transaction log */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#1E2D45]">
          <p className="text-sm font-semibold text-[#F1F5F9]">سجل المعاملات — ShamCash</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1E2D45]">
                {['التاريخ', 'المرجع', 'الغرض', 'الحالة', 'المبلغ'].map(h => (
                  <th key={h} className="px-4 py-3 text-right text-[#4A5D78] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, i) => (
                <tr key={i} className="border-b border-[#1E2D45] last:border-0 hover:bg-[#162032]/50 transition-colors">
                  <td className="px-4 py-3 text-[#94A3B8]">{t.date}</td>
                  <td className="px-4 py-3 text-[#6366F1] font-mono">{t.ref}</td>
                  <td className="px-4 py-3 text-[#94A3B8]">{t.purpose}</td>
                  <td className="px-4 py-3"><StatusPill status={t.status} /></td>
                  <td className="px-4 py-3 text-[#F1F5F9] font-semibold">{t.amount} SYP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ShamCash instructions */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5">
        <p className="text-xs font-semibold text-[#F1F5F9] mb-3">طريقة الدفع عبر ShamCash</p>
        <div className="flex gap-5 items-start">
          <div className="w-24 h-24 border-2 border-[#6366F1]/30 rounded-xl flex items-center justify-center text-xs text-[#4A5D78] shrink-0 bg-[#162032]">QR CODE</div>
          <div className="space-y-2 text-xs text-[#94A3B8]">
            <p><span className="text-[#F1F5F9] font-bold">1.</span> افتح ShamCash وامسح رمز QR</p>
            <p><span className="text-[#F1F5F9] font-bold">2.</span> ادفع المبلغ المطلوب</p>
            <p><span className="text-[#F1F5F9] font-bold">3.</span> انسخ رقم المعاملة والصقه في نموذج الإبلاغ</p>
            <p className="text-[#4A5D78] italic">"Transparent payments for a resilient ecosystem."</p>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="rounded-xl border border-[#10B981]/40 bg-[#10B981]/10 px-4 py-3 text-sm text-[#10B981] font-medium text-center animate-fade-up">
          ✓ تم استلام الإيصال — سيتم التحقق خلال 24 ساعة
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-[#0F1828] rounded-2xl border border-[#6366F1]/20 p-5 space-y-3 animate-fade-up">
          <p className="text-xs font-semibold text-[#F1F5F9]">إبلاغ عن دفعة ShamCash</p>
          <input
            value={txRef}
            onChange={e => setTxRef(e.target.value)}
            placeholder="أدخل رقم معاملة ShamCash..."
            className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-2.5 text-sm outline-none focus:border-[#6366F1]/60 font-mono rounded-xl transition-colors"
            required
          />
          <div className="flex gap-3">
            <button type="submit" className="flex-1 py-2.5 gradient-bg text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">إرسال</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-[#1E2D45] text-[#94A3B8] text-sm rounded-xl hover:border-[#6366F1]/40 transition-all">إلغاء</button>
          </div>
        </form>
      ) : (
        <div className="flex gap-3">
          <button onClick={() => setShowForm(true)} className="flex-1 py-3 gradient-bg text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
            📤 إبلاغ عن دفعة جديدة
          </button>
          <button className="px-5 py-3 rounded-xl border border-[#1E2D45] text-[#94A3B8] text-sm hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all">
            📄 كشف الحساب
          </button>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import StatusPill from '../../components/shared/StatusPill'

const TRANSACTIONS = [
  { date: '2026-04-03', ref: '#TX-9901', purpose: '🛒 Store', status: 'verified', amount: '450,000' },
  { date: '2026-04-01', ref: '#TX-9845', purpose: '💼 Sub', status: 'verified', amount: '35,000' },
  { date: '2026-03-28', ref: '#TX-9701', purpose: '🎓 Academy', status: 'pending', amount: '90,000' },
  { date: '2026-03-20', ref: '#TX-9560', purpose: '🛒 Store', status: 'success', amount: '155,000' },
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
      <h2 className="text-xl font-black text-[#E0E0E0]">💳 المحفظة المالية</h2>

      {/* Cash flow summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'إجمالي المصروف', val: '695,000 SYP', icon: '💸', color: 'border-[#EF4444]/30' },
          { label: 'أرباح العمل الحر', val: '320,000 SYP', icon: '💰', color: 'border-[#4CAF50]/30' },
          { label: 'قيد التحقق', val: '90,000 SYP', icon: '⏳', color: 'border-[#FFD700]/30' },
        ].map(c => (
          <div key={c.label} className={`bg-[#1E1E1E] border ${c.color} p-5`}>
            <span className="text-2xl block mb-2">{c.icon}</span>
            <p className="text-xl font-black text-[#E0E0E0]">{c.val}</p>
            <p className="text-xs text-[#888] mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Savings badge */}
      <div className="border border-[#4CAF50]/20 bg-[#4CAF50]/5 px-5 py-3 flex items-center gap-3">
        <span className="text-[#4CAF50] text-lg">💎</span>
        <p className="text-sm text-[#E0E0E0]">وفّرت <span className="text-[#4CAF50] font-bold">45,000 SYP</span> عبر خصومات الطلاب في HalabUnver</p>
      </div>

      {/* Virtual Wallet */}
      <div className="bg-[#1E1E1E] border border-[#BB86FC]/30 p-5">
        <p className="text-xs font-mono text-[#888] mb-1">[ VIRTUAL_WALLET ] — رصيد المنصة</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-[#BB86FC]">25,000 SYP</p>
            <p className="text-xs text-[#888]">رصيد قابل للاستخدام في المتجر</p>
          </div>
          <span className="text-3xl">💰</span>
        </div>
      </div>

      {/* Subscription tracker */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-5">
        <p className="text-xs font-mono text-[#888] mb-3">[ SUBSCRIPTION_TRACKER ] — اشتراك المستقلين</p>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StatusPill status="active" />
            </div>
            <p className="text-xs text-[#888]">14 يوم متبق · التجديد: 17 أبريل 2026</p>
          </div>
          <button className="px-4 py-2 bg-[#BB86FC] text-[#121212] font-bold text-xs hover:bg-[#a06cdc] transition-colors">
            💳 تجديد الآن
          </button>
        </div>
      </div>

      {/* ShamCash Receipt Log */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A]">
        <div className="px-5 py-3 border-b border-[#2A2A2A]">
          <p className="text-xs font-mono text-[#888]">[ SHAMCASH_RECEIPT_LOG ] — سجل المعاملات</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                {['التاريخ', 'رقم المرجع', 'الغرض', 'الحالة', 'المبلغ'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-right text-[#555] font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, i) => (
                <tr key={i} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A]/30 transition-colors">
                  <td className="px-4 py-2.5 text-[#888]">{t.date}</td>
                  <td className="px-4 py-2.5 text-[#BB86FC]">{t.ref}</td>
                  <td className="px-4 py-2.5 text-[#888]">{t.purpose}</td>
                  <td className="px-4 py-2.5"><StatusPill status={t.status} /></td>
                  <td className="px-4 py-2.5 text-[#E0E0E0] font-bold">{t.amount} SYP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment QR */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-5">
        <p className="text-xs font-mono text-[#888] mb-3">[ PAYMENT_INSTRUCTIONS ] — طريقة الدفع عبر ShamCash</p>
        <div className="flex gap-5 items-start">
          <div className="w-24 h-24 border-2 border-[#BB86FC]/40 flex items-center justify-center text-xs text-[#555] font-mono shrink-0">QR CODE</div>
          <div className="space-y-2 text-xs text-[#888]">
            <p><span className="text-[#E0E0E0] font-bold">1.</span> افتح ShamCash وامسح رمز QR</p>
            <p><span className="text-[#E0E0E0] font-bold">2.</span> ادفع المبلغ المطلوب</p>
            <p><span className="text-[#E0E0E0] font-bold">3.</span> انسخ رقم المعاملة والصقه في نموذج الإبلاغ</p>
            <p className="text-[#555] italic">"Transparent payments for a resilient ecosystem. Challenge Every Day."</p>
          </div>
        </div>
      </div>

      {/* Submit receipt */}
      {submitted && (
        <div className="border border-[#4CAF50]/40 bg-[#4CAF50]/10 px-4 py-3 text-sm text-[#4CAF50] font-mono text-center animate-fade-up">
          ✓ تم استلام الإيصال بنجاح — سيتم التحقق خلال 24 ساعة
        </div>
      )}
      {showForm ? (
        <form onSubmit={handleSubmit} className="border border-[#BB86FC]/30 p-5 space-y-3 animate-fade-up">
          <p className="text-xs font-mono text-[#888]">[ SUBMIT_RECEIPT ] — إبلاغ عن دفعة</p>
          <input value={txRef} onChange={e => setTxRef(e.target.value)} placeholder="أدخل رقم معاملة ShamCash..."
            className="w-full bg-[#1E1E1E] border border-[#2A2A2A] text-[#E0E0E0] px-4 py-2.5 text-sm outline-none focus:border-[#BB86FC] font-mono" required />
          <div className="flex gap-3">
            <button type="submit" className="flex-1 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm">إرسال الإيصال</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-[#2A2A2A] text-[#888] text-sm">إلغاء</button>
          </div>
        </form>
      ) : (
        <div className="flex gap-3">
          <button onClick={() => setShowForm(true)} className="flex-1 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors">
            📤 إبلاغ عن دفعة جديدة
          </button>
          <button className="px-5 py-2.5 border border-[#2A2A2A] text-[#888] text-sm hover:border-[#BB86FC] transition-colors">
            📄 تحميل كشف الحساب
          </button>
        </div>
      )}
    </div>
  )
}

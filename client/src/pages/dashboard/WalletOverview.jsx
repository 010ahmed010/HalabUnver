import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'

const STATUS_STYLE = {
  confirmed: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  rejected: 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20',
}
const STATUS_LABELS = { confirmed: 'مؤكد', pending: 'معلّق', rejected: 'مرفوض' }

export default function WalletOverview() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [txRef, setTxRef] = useState('')
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/transactions')
      .then(data => setTransactions(data.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleTopup = async (e) => {
    e.preventDefault()
    if (!txRef.trim() || !amount) return
    setSubmitting(true)
    try {
      await api.post('/transactions', { type: 'topup', txId: txRef, purpose: 'wallet_topup', amount: Number(amount) })
      setMsg('تم إرسال طلب الشحن — سيتم التحقق من قِبل الإدارة')
      setShowForm(false)
      setTxRef('')
      setAmount('')
      const data = await api.get('/transactions')
      setTransactions(data.data || [])
    } catch (err) {
      setMsg(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div>
        <span className="section-label">الإدارة المالية</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">المحفظة المالية</h2>
      </div>

      {/* Balance card */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
        <p className="text-xs text-[#4A5D78] mb-2">الرصيد الحالي</p>
        <p className="text-4xl font-black gradient-text mb-1">
          {(user?.virtualWalletBalance || 0).toLocaleString()} <span className="text-lg text-[#94A3B8] font-normal">SYP</span>
        </p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="gradient-bg text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            + شحن المحفظة
          </button>
        </div>
      </div>

      {/* Topup form */}
      {showForm && (
        <div className="bg-[#0F1828] border border-[#6366F1]/20 rounded-2xl p-5">
          <p className="text-sm font-bold text-[#F1F5F9] mb-3">طلب شحن عبر ShamCash</p>
          <form onSubmit={handleTopup} className="flex flex-col gap-3">
            <input
              value={txRef}
              onChange={e => setTxRef(e.target.value)}
              placeholder="رقم معاملة ShamCash..."
              className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
            />
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="المبلغ (SYP)..."
              className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
            />
            <button type="submit" disabled={submitting} className="gradient-bg text-white font-bold py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 text-sm">
              {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </form>
          {msg && <p className="text-xs text-[#10B981] mt-2">{msg}</p>}
        </div>
      )}

      {/* Transactions */}
      <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#1E2D45]">
          <p className="text-sm font-semibold text-[#F1F5F9]">سجل المعاملات</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="p-6 text-center text-[#F43F5E] text-sm">{error}</div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-3xl mb-2">💳</p>
            <p className="text-[#4A5D78] text-sm">لا توجد معاملات بعد</p>
          </div>
        ) : (
          transactions.map(tx => (
            <div key={tx._id} className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E2D45] last:border-0 gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#F1F5F9] font-medium">{tx.type === 'topup' ? 'شحن محفظة' : tx.type === 'store_order' ? 'طلب متجر' : tx.type}</p>
                <p className="text-xs text-[#4A5D78] mt-0.5 font-mono">{tx.txId || tx._id?.slice(-8)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold text-[#F1F5F9] font-mono">{tx.amount?.toLocaleString()} SYP</span>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[tx.status] || STATUS_STYLE.pending}`}>
                  {STATUS_LABELS[tx.status] || tx.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

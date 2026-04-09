import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

const STATUS_STYLE = {
  pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  processing: 'bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/20',
  shipped: 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20',
  delivered: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  cancelled: 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20',
}

const STATUS_LABELS = {
  pending: 'معلّق',
  processing: 'قيد المعالجة',
  shipped: 'بالطريق',
  delivered: 'تم التسليم',
  cancelled: 'ملغي',
}

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/store/orders')
      .then(data => setOrders(data.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4 animate-fade-up">
      <div>
        <span className="section-label">المتجر</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">طلباتي</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-2xl p-6 text-center text-[#F43F5E] text-sm">{error}</div>
      ) : orders.length === 0 ? (
        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-10 text-center">
          <p className="text-4xl mb-3">🛒</p>
          <p className="text-[#F1F5F9] font-bold mb-1">لا توجد طلبات بعد</p>
          <p className="text-[#4A5D78] text-sm">تصفح المتجر وأضف منتجات إلى سلتك</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map(order => {
            const product = order.productId || {}
            return (
              <div key={order._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 hover:border-[#6366F1]/20 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[#F1F5F9] font-bold">{product.name || 'منتج'}</p>
                    <p className="text-xs text-[#4A5D78] mt-0.5 font-mono">#{order.orderId || order._id?.slice(-8)}</p>
                    <p className="text-sm font-bold gradient-text mt-2">{order.amount?.toLocaleString()} SYP</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[order.status] || STATUS_STYLE.pending}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>
                {order.notes && (
                  <p className="text-xs text-[#4A5D78] mt-2 border-t border-[#1E2D45] pt-2">{order.notes}</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

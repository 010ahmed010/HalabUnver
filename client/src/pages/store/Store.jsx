import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

function ProductCard({ product }) {
  return (
    <Link
      to={`/store/product/${product._id}`}
      className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden hover:border-[#6366F1]/30 hover:-translate-y-0.5 transition-all group flex flex-col"
    >
      <div className="h-40 bg-gradient-to-br from-[#162032] to-[#0F1828] flex items-center justify-center relative overflow-hidden">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span className="text-5xl opacity-20">📦</span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-bold">نفذت الكمية</span>
          </div>
        )}
        {product.source === 'vendor' && (
          <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-0.5 rounded-full">
            بائع مستقل
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[#F1F5F9] font-bold text-sm leading-snug group-hover:text-[#818CF8] transition-colors line-clamp-2">{product.name}</h3>
        {product.vendorId?.name && <p className="text-xs text-[#4A5D78] mt-1">{product.vendorId.name}</p>}
        <div className="flex items-center gap-3 mt-2 text-xs text-[#4A5D78]">
          {product.rating > 0 && <span>⭐ {product.rating?.toFixed(1)}</span>}
          {product.stock > 0 && <span className="text-[#10B981]">✓ متوفر</span>}
        </div>
        <div className="mt-auto pt-3 border-t border-[#1E2D45]">
          <span className="text-lg font-black gradient-text">{product.price?.toLocaleString()} SYP</span>
        </div>
      </div>
    </Link>
  )
}

export default function Store() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setLoading(true)
    let url = `/store/products?page=${page}&limit=12`
    if (category) url += `&category=${encodeURIComponent(category)}`
    if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`

    api.get(url)
      .then(data => {
        setProducts(data.data || [])
        setTotal(data.total || 0)
        if (data.categories?.length && !categories.length) setCategories(data.categories)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page, category, search])

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <span className="section-label">التسوق</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F1F5F9] mb-2">المتجر 🛒</h1>
          <p className="text-[#4A5D78] text-sm">منتجات تقنية وهندسية بأسعار خاصة للطلاب</p>
        </div>

        {/* Search + Filters */}
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="ابحث في المنتجات..."
            className="flex-1 min-w-48 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
          />
          {categories.length > 0 && (
            <select
              value={category}
              onChange={e => { setCategory(e.target.value); setPage(1) }}
              className="bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
            >
              <option value="">كل الفئات</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          <span className="text-xs text-[#4A5D78]">{total} منتج</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-2xl p-8 text-center text-[#F43F5E]">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-[#F1F5F9] font-bold text-lg mb-2">لا توجد منتجات بعد</p>
            <p className="text-[#4A5D78] text-sm">المتجر قيد الإعداد — قريباً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}

        {total > 12 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">السابق</button>
            <span className="text-sm text-[#4A5D78]">صفحة {page} من {Math.ceil(total / 12)}</span>
            <button disabled={page >= Math.ceil(total / 12)} onClick={() => setPage(p => p + 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B4] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">التالي</button>
          </div>
        )}

        {user?.businessPermissions?.canSellProducts && (
          <div className="mt-8 bg-[#14B8A6]/8 border border-[#14B8A6]/20 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#F1F5F9] font-bold">🛒 أنت بائع معتمد على المنصة</p>
              <p className="text-[#4A5D78] text-sm">يمكنك إضافة منتجاتك وبيعها للطلاب</p>
            </div>
            <a href="/business" className="gradient-bg text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity inline-block">
              إضافة منتج
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

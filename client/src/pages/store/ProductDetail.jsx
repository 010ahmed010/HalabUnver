import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

function Spinner() {
  return <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin mx-auto" />
}

function StarRating({ value, max = 5 }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-sm ${i < Math.round(value) ? 'text-[#F59E0B]' : 'text-[#2A3A52]'}`}>★</span>
      ))}
    </span>
  )
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <span className="flex gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`text-2xl transition-colors ${i <= (hovered || value) ? 'text-[#F59E0B]' : 'text-[#2A3A52]'}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
        >★</span>
      ))}
    </span>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const { user } = useAuth()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)

  const [contactsModal, setContactsModal] = useState(false)
  const [contacts, setContacts] = useState(null)
  const [contactsLoading, setContactsLoading] = useState(false)

  const [myRating, setMyRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [ratingLoading, setRatingLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/store/products/${id}`)
      .then(data => {
        setProduct(data.data?.product || data.data)
        setRelated(data.data?.related || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const openContacts = async () => {
    setContactsModal(true)
    if (contacts) return
    setContactsLoading(true)
    try {
      const data = await api.get(`/store/products/${id}/vendor-contacts`)
      setContacts(data.data)
    } catch {
      setContacts({ error: true })
    } finally {
      setContactsLoading(false)
    }
  }

  const submitRating = async () => {
    if (!myRating || ratingLoading) return
    setRatingLoading(true)
    try {
      await api.post(`/store/products/${id}/rate-vendor`, { rating: myRating })
      setRatingSubmitted(true)
    } catch {}
    finally { setRatingLoading(false) }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">😕</p>
        <p className="text-[#94A3B8]">المنتج غير موجود</p>
        <Link to="/store" className="text-[#6366F1] text-sm hover:underline">العودة للمتجر</Link>
      </div>
    )
  }

  const images = product.images?.filter(u => u) || []
  const currentImg = images[activeImg]
  const currencyLabel = product.currency === 'SYP' ? 'SYP' : '$'
  const avgRating = product.ratingCount > 0 ? (product.ratingTotal / product.ratingCount) : 0
  const vendorAvg = product.vendorId?.vendorRating?.count > 0
    ? (product.vendorId.vendorRating.total / product.vendorId.vendorRating.count)
    : null

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="text-xs text-[#4A5D78] mb-5 flex items-center gap-1.5 flex-wrap">
          <Link to="/store" className="hover:text-[#F43F5E] transition-colors">المتجر</Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{product.category}</span>
          <span>›</span>
          <span className="text-[#F1F5F9]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          <div>
            <div className="aspect-video bg-[#0F1828] rounded-2xl border border-[#1E2D45] flex items-center justify-center overflow-hidden mb-3">
              {currentImg
                ? <img src={currentImg} alt={product.name} className="w-full h-full object-contain" />
                : <span className="text-6xl">📦</span>
              }
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 aspect-video rounded-xl border flex items-center justify-center overflow-hidden transition-all ${
                      activeImg === i ? 'border-[#F43F5E]/50 bg-[#F43F5E]/10' : 'border-[#1E2D45] bg-[#0F1828] hover:border-[#F43F5E]/30'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="text-xs font-semibold text-[#14B8A6] bg-[#14B8A6]/10 rounded-full px-2.5 py-1 border border-[#14B8A6]/20">
                {product.source === 'vendor' ? '🏪 بائع' : '🏠 منصة'}
              </span>
              {product.condition && (
                <span className="text-xs font-semibold text-[#F59E0B] bg-[#F59E0B]/10 rounded-full px-2.5 py-1 border border-[#F59E0B]/20">
                  {product.condition}
                </span>
              )}
              {product.approvalStatus === 'approved' && (
                <span className="text-xs text-[#10B981] bg-[#10B981]/10 rounded-full px-2.5 py-1 border border-[#10B981]/20">✓ مُعتمد</span>
              )}
            </div>

            <h1 className="text-2xl font-black text-[#F1F5F9] mb-1">{product.name}</h1>
            {product.subtitle && <p className="text-sm text-[#94A3B8] mb-4">{product.subtitle}</p>}
            {product.description && !product.subtitle && <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2">{product.description}</p>}

            {avgRating > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <StarRating value={avgRating} />
                <span className="text-xs text-[#4A5D78]">{avgRating.toFixed(1)} ({product.ratingCount} تقييم)</span>
              </div>
            )}

            <div className="mb-5">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-[#4A5D78] line-through block">
                  {product.originalPrice.toLocaleString()} {currencyLabel} (سعر السوق)
                </span>
              )}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#F1F5F9]">
                  {product.price?.toLocaleString()} {currencyLabel}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm font-bold rounded-full bg-[#F43F5E] text-white px-2.5 py-0.5">{product.discount}% خصم</span>
                )}
              </div>
              <p className="text-xs text-[#10B981] font-medium mt-1">✓ سعر حصري لطلاب جامعة حلب</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={openContacts}
                className="w-full py-4 gradient-bg text-white font-bold text-base rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-[#6366F1]/20"
              >
                💬 تواصل مع البائع — احجز الآن
              </button>
              <div className="flex items-center gap-2 text-xs text-[#4A5D78] justify-center">
                <span>🛡️</span>
                <span>الدفع يتم عبر ShamCash · ضمان الاسترداد لمدة 7 أيام</span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-[#1E2D45] space-y-2.5 text-xs text-[#94A3B8]">
              <div className="flex justify-between">
                <span>مصدر المنتج</span>
                <span className="text-[#F1F5F9] font-medium">
                  {product.source === 'vendor' ? product.vendorId?.name || 'بائع خارجي' : 'منصة HalabUnver'}
                </span>
              </div>
              {product.deliveryTimeline && (
                <div className="flex justify-between">
                  <span>وقت التوصيل</span>
                  <span className="text-[#F1F5F9] font-medium">{product.deliveryTimeline}</span>
                </div>
              )}
              {product.warrantyNote && (
                <div className="flex justify-between">
                  <span>الضمان</span>
                  <span className="text-[#F1F5F9] font-medium">{product.warrantyNote}</span>
                </div>
              )}
              {product.pickupLocation && (
                <div className="flex justify-between">
                  <span>مكان الاستلام</span>
                  <span className="text-[#F1F5F9] font-medium">{product.pickupLocation}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {product.specs && product.specs.length > 0 && (
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden mb-6">
            <div className="px-5 py-3.5 border-b border-[#1E2D45]">
              <p className="text-sm font-semibold text-[#F1F5F9]">المواصفات التقنية</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {product.specs.map((s, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-5 py-3 text-sm border-b border-[#1E2D45] ${i % 2 === 0 ? 'md:border-l border-[#1E2D45]' : ''} ${i >= product.specs.length - 2 ? 'border-b-0' : ''}`}
                >
                  <span className="text-[#4A5D78]">{s.key}</span>
                  <span className="text-[#F1F5F9] font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.description && (
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 mb-6">
            <p className="text-sm font-semibold text-[#F1F5F9] mb-3">وصف المنتج</p>
            <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>
        )}

        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 mb-6">
          <p className="text-sm font-semibold text-[#F1F5F9] mb-4">⭐ تقييم البائع</p>
          {vendorAvg !== null ? (
            <div className="flex items-center gap-3 mb-3">
              <StarRating value={vendorAvg} />
              <span className="text-sm text-[#F59E0B] font-bold">{vendorAvg.toFixed(1)}</span>
              <span className="text-xs text-[#4A5D78]">({product.vendorId?.vendorRating?.count} تقييم)</span>
            </div>
          ) : (
            <p className="text-xs text-[#4A5D78] mb-3">لا توجد تقييمات بعد — كن أول من يقيّم</p>
          )}

          {user && !ratingSubmitted && (
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#1E2D45]">
              <p className="text-xs text-[#94A3B8]">قيّم هذا البائع:</p>
              <div className="flex items-center gap-3">
                <StarPicker value={myRating} onChange={setMyRating} />
                {myRating > 0 && (
                  <button
                    onClick={submitRating}
                    disabled={ratingLoading}
                    className="text-xs px-3 py-1.5 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {ratingLoading ? '...' : 'إرسال التقييم'}
                  </button>
                )}
              </div>
            </div>
          )}
          {ratingSubmitted && <p className="text-xs text-[#10B981] mt-2">✅ شكراً على تقييمك!</p>}
          {!user && <p className="text-xs text-[#4A5D78] mt-2">سجّل دخولك لتقييم البائع</p>}
        </div>

        {related.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-[#F1F5F9] mb-3">منتجات ذات صلة</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {related.map(r => (
                <Link
                  key={r._id}
                  to={`/store/products/${r._id}`}
                  className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 flex items-center gap-3 hover:border-[#F43F5E]/20 transition-all group"
                >
                  {r.images?.[0]
                    ? <img src={r.images[0]} alt={r.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    : <span className="text-2xl shrink-0">📦</span>
                  }
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#F1F5F9] group-hover:text-[#F43F5E] transition-colors truncate">{r.name}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5 font-mono">{r.price?.toLocaleString()} {r.currency === 'SYP' ? 'SYP' : '$'}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {contactsModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4" onClick={() => setContactsModal(false)}>
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-[#F1F5F9] font-bold mb-1">📞 تواصل مع البائع</h3>
            <p className="text-xs text-[#4A5D78] mb-4">تواصل مباشرةً مع البائع لإتمام الحجز والدفع</p>

            {contactsLoading ? (
              <div className="py-6 flex justify-center"><Spinner /></div>
            ) : contacts?.error ? (
              <p className="text-sm text-[#F43F5E] text-center py-4">لم يتوفر معلومات تواصل لهذا البائع بعد</p>
            ) : (
              <div className="flex flex-col gap-3">
                {contacts?.vendorName && (
                  <div className="bg-[#162032] rounded-xl px-4 py-3">
                    <p className="text-xs text-[#4A5D78]">البائع</p>
                    <p className="text-[#F1F5F9] font-bold text-sm mt-0.5">{contacts.vendorName}</p>
                  </div>
                )}
                {[
                  { key: 'whatsapp', icon: '📱', label: 'واتساب', href: (v) => `https://wa.me/${v.replace(/\D/g, '')}` },
                  { key: 'phone', icon: '📞', label: 'الهاتف', href: (v) => `tel:${v}` },
                  { key: 'telegram', icon: '✈️', label: 'تيليغرام', href: (v) => v.startsWith('@') ? `https://t.me/${v.slice(1)}` : `https://t.me/${v}` },
                  { key: 'other', icon: '🔗', label: 'تواصل آخر', href: null },
                ].filter(f => contacts?.contacts?.[f.key]).map(f => {
                  const val = contacts.contacts[f.key]
                  const href = f.href ? f.href(val) : null
                  return (
                    <div key={f.key} className="bg-[#162032] rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#4A5D78]">{f.icon} {f.label}</p>
                        <p className="text-[#F1F5F9] text-sm mt-0.5 font-mono">{val}</p>
                      </div>
                      {href && (
                        <a href={href} target="_blank" rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          فتح
                        </a>
                      )}
                    </div>
                  )
                })}
                {contacts?.contacts && Object.values(contacts.contacts).every(v => !v) && (
                  <p className="text-sm text-[#4A5D78] text-center py-4">لم يُضف البائع معلومات تواصل بعد</p>
                )}
              </div>
            )}

            <button onClick={() => setContactsModal(false)} className="w-full mt-4 py-2.5 border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm hover:border-[#6366F1]/30 transition-all">
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

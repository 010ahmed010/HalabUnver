import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'

const SHAMCASH_ID = '5f496120d855e48bca1ea14348463267'

function Spinner() {
  return <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin mx-auto" />
}

function LockedService({ label, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center text-3xl mx-auto mb-4">🔒</div>
      <h3 className="text-[#F1F5F9] font-bold text-lg mb-2">{label}</h3>
      <p className="text-[#4A5D78] text-sm mb-1">{desc}</p>
      <p className="text-[#F59E0B] text-xs">الخدمة مقفلة — تواصل مع الإدارة لتفعيلها</p>
    </div>
  )
}

const TYPE_CONFIG = {
  vendor: { label: 'بائع منتجات', color: '#14B8A6', icon: '🛒', tabs: ['overview', 'products', 'orders', 'revenue'] },
  advertiser: { label: 'معلن محلي', color: '#F59E0B', icon: '📢', tabs: ['overview', 'campaigns', 'create'] },
  freelancer: { label: 'مستقل خارجي', color: '#F43F5E', icon: '💼', tabs: ['overview', 'services', 'contracts'] },
}

const TAB_LABELS = {
  overview: { icon: '📊', label: 'نظرة عامة' },
  products: { icon: '📦', label: 'منتجاتي' },
  orders: { icon: '🛒', label: 'الطلبات' },
  revenue: { icon: '💰', label: 'الإيرادات' },
  campaigns: { icon: '📢', label: 'الحملات' },
  create: { icon: '➕', label: 'حملة جديدة' },
  services: { icon: '💼', label: 'خدماتي' },
  contracts: { icon: '📋', label: 'العقود' },
}

export default function BusinessDashboard() {
  const { user, logout, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')

  const config = TYPE_CONFIG[user?.businessType] || TYPE_CONFIG.vendor
  const activeTabs = config.tabs

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Pending approval state
  const isPending = user?.status === 'pending'
  const isFrozen = user?.status === 'frozen'

  return (
    <div className="min-h-screen bg-[#070C18] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#0F1828] border-l border-[#1E2D45] sticky top-0 h-screen">
        <div className="p-6 border-b border-[#1E2D45]">
          <Link to="/" className="flex items-center gap-2.5 group mb-4">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-black text-sm">ح</span>
            </div>
            <span className="text-[#F1F5F9] font-bold">حلب <span className="gradient-text">يونيفر</span></span>
          </Link>
          <div className="bg-[#162032] rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{config.icon}</span>
              <div>
                <div className="text-[#F1F5F9] font-semibold text-sm leading-tight">{user?.name}</div>
                <div className="text-xs mt-0.5" style={{ color: config.color }}>{config.label}</div>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full border inline-block ${
              user?.status === 'active' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' :
              user?.status === 'frozen' ? 'bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/20' :
              'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
            }`}>
              {user?.status === 'active' ? '🟢 نشط' : user?.status === 'frozen' ? '❄️ مجمّد' : '🕒 قيد المراجعة'}
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {activeTabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-right w-full ${
                tab === t
                  ? 'bg-[#6366F1]/15 text-[#6366F1] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]'
              }`}
            >
              <span>{TAB_LABELS[t]?.icon}</span>
              <span>{TAB_LABELS[t]?.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1E2D45]">
          <button
            onClick={handleLogout}
            className="w-full text-center px-3 py-2 text-xs rounded-xl text-[#4A5D78] hover:text-[#F43F5E] hover:bg-[#F43F5E]/5 transition-all"
          >
            تسجيل خروج
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Mobile tabs */}
        <div className="flex gap-2 p-4 lg:hidden flex-wrap border-b border-[#1E2D45] bg-[#0F1828]">
          {activeTabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                tab === t ? 'gradient-bg text-white' : 'bg-[#162032] border border-[#1E2D45] text-[#94A3B8]'
              }`}
            >
              {TAB_LABELS[t]?.icon} {TAB_LABELS[t]?.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {/* Status banners */}
          {isPending && (
            <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/25 rounded-2xl p-5 mb-6">
              <p className="text-[#F59E0B] font-bold">⏳ حسابك قيد المراجعة</p>
              <p className="text-[#94A3B8] text-sm mt-1">ستصلك إشعار عبر الرسائل فور قبول حسابك من قِبل الإدارة</p>
            </div>
          )}
          {isFrozen && (
            <div className="bg-[#6366F1]/8 border border-[#6366F1]/25 rounded-2xl p-5 mb-6">
              <p className="text-[#818CF8] font-bold">❄️ حسابك مجمّد مؤقتاً</p>
              <p className="text-[#94A3B8] text-sm mt-1">تواصل مع الإدارة لمعرفة السبب والحل</p>
            </div>
          )}

          {/* Content */}
          {tab === 'overview' && <OverviewTab user={user} config={config} />}
          {tab === 'products' && <ProductsTab user={user} />}
          {tab === 'orders' && <VendorOrdersTab />}
          {tab === 'revenue' && <RevenueTab />}
          {tab === 'campaigns' && <CampaignsTab user={user} />}
          {tab === 'create' && <CreateCampaignTab />}
          {tab === 'services' && <ServicesTab user={user} />}
          {tab === 'contracts' && <ContractsTab />}
        </div>
      </main>
    </div>
  )
}

function OverviewTab({ user, config }) {
  const { refreshUser } = useAuth()
  const isVendor = user?.businessType === 'vendor'
  const credit = user?.vendorCredit ?? 0

  const [copied, setCopied] = useState(false)
  const [depositForm, setDepositForm] = useState({ amount: '', note: '' })
  const [depositOpen, setDepositOpen] = useState(false)
  const [depositLoading, setDepositLoading] = useState(false)
  const [depositMsg, setDepositMsg] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(SHAMCASH_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDepositRequest = async (e) => {
    e.preventDefault()
    setDepositLoading(true)
    setDepositMsg('')
    try {
      const res = await api.post('/users/me/deposit-request', {
        amount: Number(depositForm.amount) || 0,
        note: depositForm.note,
      })
      setDepositMsg(res.message)
      setDepositForm({ amount: '', note: '' })
      setTimeout(() => { setDepositOpen(false); setDepositMsg('') }, 3000)
      await refreshUser()
    } catch (err) {
      setDepositMsg(err.message)
    } finally {
      setDepositLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <span className="section-label">لوحة الأعمال</span>
        <h1 className="text-2xl font-black text-[#F1F5F9]">{config.icon} نظرة عامة</h1>
      </div>

      {/* Credit Section (vendors only) */}
      {isVendor && (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6">
          <p className="text-sm font-semibold text-[#F1F5F9] mb-4">💳 رصيد النشر</p>
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Credit balance */}
            <div className="flex-1 bg-[#162032] rounded-xl p-4 flex flex-col gap-2">
              <p className="text-xs text-[#4A5D78]">رصيدك الحالي</p>
              <p className={`text-3xl font-black ${credit > 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
                {credit.toFixed(2)}<span className="text-base text-[#94A3B8] font-normal ml-1">$</span>
              </p>
              <p className="text-[10px] text-[#4A5D78]">1$ = قدرة نشر 100$ من قيمة المنتجات</p>
              {credit <= 0 && (
                <div className="bg-[#F43F5E]/8 border border-[#F43F5E]/20 rounded-lg px-3 py-2 text-[#F43F5E] text-xs mt-1">
                  ⚠️ رصيدك صفر — لا يمكنك نشر منتجات جديدة
                </div>
              )}
              <button
                onClick={() => setDepositOpen(true)}
                className="mt-2 w-full text-center text-xs font-bold px-4 py-2 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity"
              >
                💰 طلب شحن رصيد
              </button>
            </div>

            {/* Shamcash QR */}
            <div className="flex flex-col items-center gap-3 bg-[#162032] rounded-xl p-4">
              <p className="text-xs text-[#94A3B8] font-semibold">ادفع عبر شام كاش</p>
              <img src="/shamcashQR.jpeg" alt="Shamcash QR" className="w-28 h-28 rounded-lg object-cover border border-[#1E2D45]" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#4A5D78] font-mono">{SHAMCASH_ID.slice(0, 12)}…</span>
                <button
                  onClick={handleCopy}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/20 hover:bg-[#6366F1]/25 transition-all font-medium"
                >
                  {copied ? '✓ تم النسخ' : 'نسخ ID'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6">
        <p className="text-sm font-semibold text-[#F1F5F9] mb-4">الخدمات المتاحة</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'canSellProducts', icon: '🛒', label: 'بيع المنتجات', desc: 'عرض وبيع منتجاتك في المتجر' },
            { key: 'canRunAds', icon: '📢', label: 'الإعلانات', desc: 'إطلاق حملات إعلانية على المنصة' },
            { key: 'canOfferFreelance', icon: '💼', label: 'الخدمات المستقلة', desc: 'تقديم خدماتك في سوق المستقلين' },
            { key: 'canUploadCourses', icon: '📚', label: 'الدورات', desc: 'رفع دورات تعليمية للأكاديمية' },
            { key: 'canUploadLibraryDocs', icon: '📄', label: 'المكتبة', desc: 'إضافة وثائق ومحاضرات' },
          ].map(svc => {
            const enabled = user?.businessPermissions?.[svc.key]
            return (
              <div key={svc.key} className={`flex items-center gap-3 p-4 rounded-xl border ${enabled ? 'border-[#10B981]/20 bg-[#10B981]/5' : 'border-[#1E2D45] bg-[#162032]/50 opacity-60'}`}>
                <span className="text-xl">{svc.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-[#F1F5F9]">{svc.label}</p>
                  <p className="text-xs text-[#4A5D78]">{enabled ? svc.desc : '🔒 غير مفعّل — انتظر موافقة الإدارة'}</p>
                </div>
                {enabled && <span className="mr-auto text-[#10B981] text-sm">✓</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Deposit Request Modal */}
      {depositOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-[#F1F5F9] font-bold mb-1">💰 طلب شحن رصيد</h3>
            <p className="text-[#4A5D78] text-xs mb-4">أرسل طلبك للإدارة — سيتم التواصل معك لإتمام عملية الدفع</p>
            <form onSubmit={handleDepositRequest} className="flex flex-col gap-3">
              <input
                type="number"
                min="1"
                step="0.01"
                value={depositForm.amount}
                onChange={e => setDepositForm(p => ({ ...p, amount: e.target.value }))}
                placeholder="المبلغ المطلوب ($)"
                required
                className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
              />
              <textarea
                value={depositForm.note}
                onChange={e => setDepositForm(p => ({ ...p, note: e.target.value }))}
                placeholder="ملاحظة إضافية (اختياري)..."
                rows={2}
                className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors resize-none"
              />
              <div className="bg-[#6366F1]/8 border border-[#6366F1]/20 rounded-xl px-3 py-2 text-[#818CF8] text-xs">
                ادفع عبر شام كاش للـ ID: <span className="font-mono select-all">{SHAMCASH_ID}</span>
              </div>
              {depositMsg && <p className={`text-xs text-center ${depositMsg.includes('تم') ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>{depositMsg}</p>}
              <div className="flex gap-3 mt-2">
                <button type="submit" disabled={depositLoading} className="flex-1 gradient-bg text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                  {depositLoading ? 'جاري الإرسال...' : '📤 إرسال الطلب'}
                </button>
                <button type="button" onClick={() => setDepositOpen(false)} className="px-4 py-2.5 border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ProductsTab({ user }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', imageUrl: '', stock: 1 })
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const canSell = user?.businessPermissions?.canSellProducts
  const credit = user?.vendorCredit ?? 0
  const priceNum = Number(form.price) || 0
  const requiredCredit = priceNum > 0 ? priceNum / 100 : 0
  const creditSufficient = credit >= requiredCredit && credit > 0

  const fetchProducts = useCallback(async () => {
    try {
      const data = await api.get('/store/products?own=true')
      setProducts(data.data || [])
    } catch {}
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!creditSufficient) {
      setMsg(credit <= 0
        ? 'رصيدك صفر — لا يمكنك إضافة منتجات.'
        : `رصيدك (${credit.toFixed(2)}$) غير كافٍ. مطلوب ${requiredCredit.toFixed(2)}$ لهذا السعر.`)
      setMsgType('error')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/store/products', {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        images: form.imageUrl ? [form.imageUrl] : [],
        stock: Number(form.stock),
      })
      setMsg('تم إرسال المنتج للمراجعة')
      setMsgType('success')
      setShowForm(false)
      setForm({ name: '', description: '', price: '', category: '', imageUrl: '', stock: 1 })
      await fetchProducts()
    } catch (err) {
      setMsg(err.message)
      setMsgType('error')
    } finally {
      setSubmitting(false)
    }
  }

  if (!canSell) return <LockedService label="بيع المنتجات" desc="لم يتم تفعيل خدمة بيع المنتجات لحسابك بعد" />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-[#F1F5F9]">📦 منتجاتي</h2>
          <p className="text-xs text-[#4A5D78] mt-0.5">رصيد النشر: <span className={credit > 0 ? 'text-[#10B981] font-bold' : 'text-[#F43F5E] font-bold'}>{credit.toFixed(2)}$</span></p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setMsg('') }}
          disabled={credit <= 0 && !showForm}
          className="gradient-bg text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          title={credit <= 0 ? 'رصيدك صفر — اشحن رصيدك أولاً' : ''}
        >
          {showForm ? 'إلغاء' : '+ إضافة منتج'}
        </button>
      </div>

      {credit <= 0 && !showForm && (
        <div className="bg-[#F43F5E]/8 border border-[#F43F5E]/20 rounded-2xl p-4 text-center">
          <p className="text-[#F43F5E] text-sm font-bold">💳 رصيدك صفر</p>
          <p className="text-[#4A5D78] text-xs mt-1">اذهب إلى <strong className="text-[#94A3B8]">نظرة عامة</strong> واطلب شحن الرصيد من الإدارة</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0F1828] border border-[#6366F1]/20 rounded-2xl p-5 flex flex-col gap-3">
          <p className="text-sm font-bold text-[#F1F5F9]">منتج جديد</p>
          <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="اسم المنتج" required className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="وصف المنتج..." rows={3} className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors resize-none" />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <input type="number" value={form.price} onChange={e => setForm(p => ({...p, price: e.target.value}))} placeholder="السعر ($)" required min="1" className={`bg-[#162032] border ${!creditSufficient && priceNum > 0 ? 'border-[#F43F5E]/50' : 'border-[#1E2D45]'} text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors`} />
              {priceNum > 0 && (
                <p className={`text-[10px] px-1 ${creditSufficient ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
                  {creditSufficient
                    ? `✓ رصيد كافٍ (${credit.toFixed(2)}$ ≥ ${requiredCredit.toFixed(2)}$)`
                    : `✗ مطلوب ${requiredCredit.toFixed(2)}$ — لديك ${credit.toFixed(2)}$`}
                </p>
              )}
            </div>
            <input type="number" value={form.stock} onChange={e => setForm(p => ({...p, stock: e.target.value}))} placeholder="الكمية" required className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          </div>
          <input value={form.imageUrl} onChange={e => setForm(p => ({...p, imageUrl: e.target.value}))} placeholder="رابط صورة المنتج (URL)..." className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} required className="bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors">
            <option value="">اختر الفئة</option>
            <option value="إلكترونيات">إلكترونيات</option>
            <option value="أدوات هندسية">أدوات هندسية</option>
            <option value="قرطاسية">قرطاسية</option>
            <option value="ملابس المنصة">ملابس المنصة</option>
            <option value="أخرى">أخرى</option>
          </select>
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl px-4 py-2.5 text-[#F59E0B] text-xs">
            سيتم مراجعة المنتج من قِبل الإدارة قبل النشر — وسيُخصم الرصيد عند الموافقة
          </div>
          {msg && <p className={`text-xs ${msgType === 'error' ? 'text-[#F43F5E]' : 'text-[#10B981]'}`}>{msg}</p>}
          <button type="submit" disabled={submitting || !creditSufficient} className="gradient-bg text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm">
            {submitting ? 'جاري الإرسال...' : '📤 إرسال للمراجعة'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spinner /></div>
      ) : products.length === 0 ? (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-10 text-center">
          <p className="text-3xl mb-3">📦</p>
          <p className="text-[#4A5D78] text-sm">لا توجد منتجات بعد — أضف منتجك الأول</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map(p => (
            <div key={p._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 flex items-center gap-4">
              {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-[#F1F5F9] font-semibold">{p.name}</p>
                <p className="text-sm gradient-text font-bold mt-0.5">{p.price?.toLocaleString()} SYP</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${
                p.approvalStatus === 'approved' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' :
                p.approvalStatus === 'rejected' ? 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20' :
                'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
              }`}>
                {p.approvalStatus === 'approved' ? 'منشور' : p.approvalStatus === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function VendorOrdersTab() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/store/orders')
      .then(data => setOrders(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-[#F1F5F9]">🛒 طلبات منتجاتي</h2>
      {loading ? <div className="py-12 flex justify-center"><Spinner /></div> : orders.length === 0 ? (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-8 text-center">
          <p className="text-[#4A5D78] text-sm">لا توجد طلبات بعد</p>
        </div>
      ) : orders.map(o => (
        <div key={o._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[#F1F5F9] font-semibold">{o.productId?.name || 'منتج'}</p>
              <p className="text-xs text-[#4A5D78] mt-0.5">{o.customerId?.name} · #{o.orderId || o._id?.slice(-8)}</p>
              <p className="text-sm font-bold gradient-text mt-1">{o.amount?.toLocaleString()} SYP</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full border ${
              o.status === 'delivered' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' :
              'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
            }`}>
              {o.status === 'delivered' ? 'تم التسليم' : o.status === 'pending' ? 'معلّق' : o.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function RevenueTab() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-5xl mb-4">💰</p>
      <h3 className="text-[#F1F5F9] font-bold text-lg mb-2">الإيرادات</h3>
      <p className="text-[#4A5D78] text-sm">تقرير الإيرادات قيد التطوير — متصل بالنظام المالي</p>
    </div>
  )
}

function CampaignsTab({ user }) {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  const canRunAds = user?.businessPermissions?.canRunAds

  useEffect(() => {
    if (!canRunAds) { setLoading(false); return }
    api.get('/ads')
      .then(data => setCampaigns(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [canRunAds])

  if (!canRunAds) return <LockedService label="الحملات الإعلانية" desc="لم يتم تفعيل خدمة الإعلانات لحسابك بعد" />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-[#F1F5F9]">📢 حملاتي الإعلانية</h2>
      {loading ? <div className="py-12 flex justify-center"><Spinner /></div> : campaigns.length === 0 ? (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-8 text-center">
          <p className="text-[#4A5D78] text-sm">لا توجد حملات بعد — أنشئ حملتك الأولى</p>
        </div>
      ) : campaigns.map(c => (
        <div key={c._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
          <p className="text-[#F1F5F9] font-semibold">{c.title}</p>
          <p className="text-xs text-[#4A5D78] mt-1">{c.zone} · {c.status}</p>
        </div>
      ))}
    </div>
  )
}

function CreateCampaignTab() {
  const { user } = useAuth()
  const canRunAds = user?.businessPermissions?.canRunAds
  const [form, setForm] = useState({ title: '', targetUrl: '', imageUrl: '', zone: 'header', startDate: '', endDate: '' })
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')

  if (!canRunAds) return <LockedService label="إنشاء حملة إعلانية" desc="لم يتم تفعيل خدمة الإعلانات لحسابك بعد" />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/ads', {
        title: form.title,
        targetUrl: form.targetUrl,
        imageUrl: form.imageUrl,
        zone: form.zone,
        startDate: form.startDate,
        endDate: form.endDate,
        advertiserId: user._id,
      })
      setMsg('تم إرسال الحملة للمراجعة بنجاح')
      setForm({ title: '', targetUrl: '', imageUrl: '', zone: 'header', startDate: '', endDate: '' })
    } catch (err) {
      setMsg(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-5 max-w-lg">
      <h2 className="text-xl font-black text-[#F1F5F9]">➕ حملة جديدة</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="عنوان الحملة" required className="bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors" />
        <input value={form.imageUrl} onChange={e => setForm(p => ({...p, imageUrl: e.target.value}))} placeholder="رابط صورة الإعلان (URL)..." className="bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors" />
        <input value={form.targetUrl} onChange={e => setForm(p => ({...p, targetUrl: e.target.value}))} placeholder="الرابط الهدف..." className="bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors" />
        <select value={form.zone} onChange={e => setForm(p => ({...p, zone: e.target.value}))} className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors">
          <option value="header">الشريط العلوي</option>
          <option value="sidebar">الشريط الجانبي</option>
          <option value="feed">داخل المحتوى</option>
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input type="date" value={form.startDate} onChange={e => setForm(p => ({...p, startDate: e.target.value}))} className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          <input type="date" value={form.endDate} onChange={e => setForm(p => ({...p, endDate: e.target.value}))} className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors" />
        </div>
        <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl px-4 py-3 text-[#F59E0B] text-xs">
          ستُراجَع حملتك من قِبل الإدارة قبل النشر — عادةً خلال 24 ساعة
        </div>
        {msg && <p className="text-sm text-[#10B981]">{msg}</p>}
        <button type="submit" disabled={submitting} className="gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm">
          {submitting ? 'جاري الإرسال...' : '📤 إرسال للمراجعة'}
        </button>
      </form>
    </div>
  )
}

function ServicesTab({ user }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', price: '', deliveryDays: 3 })
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')

  const canFreelance = user?.businessPermissions?.canOfferFreelance

  const fetchServices = useCallback(async () => {
    try {
      const data = await api.get('/freelance/services?own=true')
      setServices(data.data || [])
    } catch {} finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (canFreelance) fetchServices()
    else setLoading(false)
  }, [canFreelance, fetchServices])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/freelance/services', {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        deliveryDays: Number(form.deliveryDays),
      })
      setMsg('تم إضافة الخدمة بنجاح')
      setShowForm(false)
      setForm({ title: '', description: '', price: '', deliveryDays: 3 })
      await fetchServices()
    } catch (err) {
      setMsg(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!canFreelance) return <LockedService label="خدمات المستقل" desc="لم يتم تفعيل خدمة المستقلين لحسابك بعد" />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#F1F5F9]">💼 خدماتي</h2>
        <button onClick={() => setShowForm(!showForm)} className="gradient-bg text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
          {showForm ? 'إلغاء' : '+ إضافة خدمة'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0F1828] border border-[#6366F1]/20 rounded-2xl p-5 flex flex-col gap-3">
          <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="عنوان الخدمة" required className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="وصف الخدمة..." rows={3} className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors resize-none" />
          <div className="grid grid-cols-2 gap-3">
            <input type="number" value={form.price} onChange={e => setForm(p => ({...p, price: e.target.value}))} placeholder="السعر (SYP)" required className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            <input type="number" value={form.deliveryDays} onChange={e => setForm(p => ({...p, deliveryDays: e.target.value}))} placeholder="أيام التسليم" className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          </div>
          {msg && <p className="text-xs text-[#10B981]">{msg}</p>}
          <button type="submit" disabled={submitting} className="gradient-bg text-white font-bold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 text-sm">
            {submitting ? 'جاري الإضافة...' : '+ إضافة الخدمة'}
          </button>
        </form>
      )}

      {loading ? <div className="py-12 flex justify-center"><Spinner /></div> : services.length === 0 ? (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-8 text-center">
          <p className="text-[#4A5D78] text-sm">لا توجد خدمات بعد — أضف خدمتك الأولى</p>
        </div>
      ) : services.map(s => (
        <div key={s._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[#F1F5F9] font-semibold">{s.title}</p>
            <div className="flex items-center gap-4 text-xs mt-1.5">
              <span className="gradient-text font-bold">{s.price?.toLocaleString()} SYP</span>
              <span className="text-[#4A5D78]">📦 {s.totalOrders || 0} طلب</span>
              {s.rating > 0 && <span className="text-[#4A5D78]">⭐ {s.rating?.toFixed(1)}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ContractsTab() {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/freelance/contracts')
      .then(data => setContracts(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-[#F1F5F9]">📋 العقود</h2>
      {loading ? <div className="py-12 flex justify-center"><Spinner /></div> : contracts.length === 0 ? (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-8 text-center">
          <p className="text-[#4A5D78] text-sm">لا توجد عقود بعد</p>
        </div>
      ) : contracts.map(c => (
        <div key={c._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
          <p className="text-[#F1F5F9] font-semibold">{c.title}</p>
          <p className="text-sm gradient-text font-bold mt-1">{c.amount?.toLocaleString()} SYP</p>
          <p className="text-xs text-[#4A5D78] mt-1">{c.status}</p>
        </div>
      ))}
    </div>
  )
}

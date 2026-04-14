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

  const isPending = user?.status === 'pending'
  const isFrozen = user?.status === 'frozen'

  return (
    <div className="min-h-screen bg-[#070C18] flex">
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

      <main className="flex-1 min-w-0 overflow-auto">
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
          {isPending && (
            <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/25 rounded-2xl p-5 mb-6">
              <p className="text-[#F59E0B] font-bold">⏳ حسابك قيد المراجعة</p>
              <p className="text-[#94A3B8] text-sm mt-1">ستصلك إشعار عبر الرسائل فور قبول حسابك</p>
            </div>
          )}
          {isFrozen && (
            <div className="bg-[#6366F1]/8 border border-[#6366F1]/25 rounded-2xl p-5 mb-6">
              <p className="text-[#818CF8] font-bold">❄️ حسابك مجمّد مؤقتاً</p>
              <p className="text-[#94A3B8] text-sm mt-1">تواصل مع الإدارة لمعرفة السبب والحل</p>
            </div>
          )}

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
  const [qrOpen, setQrOpen] = useState(false)
  const [depositForm, setDepositForm] = useState({ amount: '', note: '' })
  const [depositOpen, setDepositOpen] = useState(false)
  const [depositLoading, setDepositLoading] = useState(false)
  const [depositMsg, setDepositMsg] = useState('')

  const [contacts, setContacts] = useState({
    whatsapp: user?.vendorContacts?.whatsapp || '',
    phone: user?.vendorContacts?.phone || '',
    telegram: user?.vendorContacts?.telegram || '',
    other: user?.vendorContacts?.other || '',
  })
  const [contactsSaving, setContactsSaving] = useState(false)
  const [contactsMsg, setContactsMsg] = useState('')

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

  const handleSaveContacts = async () => {
    setContactsSaving(true)
    setContactsMsg('')
    try {
      await api.patch('/users/me/vendor-contacts', contacts)
      setContactsMsg('✅ تم حفظ معلومات التواصل')
      await refreshUser()
      setTimeout(() => setContactsMsg(''), 3000)
    } catch (err) {
      setContactsMsg(err.message)
    } finally {
      setContactsSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <span className="section-label">لوحة الأعمال</span>
        <h1 className="text-2xl font-black text-[#F1F5F9]">{config.icon} نظرة عامة</h1>
      </div>

      {isVendor && (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6">
          <p className="text-sm font-semibold text-[#F1F5F9] mb-4">💳 رصيد النشر</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1 bg-[#162032] rounded-xl p-4 flex flex-col gap-2">
              <p className="text-xs text-[#4A5D78]">رصيدك الحالي</p>
              <p className={`text-3xl font-black ${credit > 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
                {credit.toFixed(2)}<span className="text-base text-[#94A3B8] font-normal ml-1">$</span>
              </p>
              <p className="text-[10px] text-[#4A5D78]">1$ = قدرة نشر منتجات بقيمة 100$ لمدة شهر</p>
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

            <div className="flex flex-col items-center gap-3 bg-[#162032] rounded-xl p-4">
              <p className="text-xs text-[#94A3B8] font-semibold">ادفع عبر شام كاش</p>
              <button onClick={() => setQrOpen(true)} className="group relative">
                <img
                  src="/shamcashQR.jpeg"
                  alt="Shamcash QR"
                  className="w-28 h-28 rounded-lg object-cover border border-[#1E2D45] group-hover:scale-105 transition-transform cursor-zoom-in"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all flex items-center justify-center">
                  <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">🔍 تكبير</span>
                </div>
              </button>
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

      {isVendor && (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6">
          <p className="text-sm font-semibold text-[#F1F5F9] mb-1">📞 معلومات التواصل</p>
          <p className="text-xs text-[#4A5D78] mb-4">تظهر للمشترين عند النقر على زر التواصل في صفحة منتجاتك</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'whatsapp', label: '📱 واتساب', placeholder: '+963 9XX XXX XXX' },
              { key: 'phone', label: '📞 رقم الهاتف', placeholder: '+963 9XX XXX XXX' },
              { key: 'telegram', label: '✈️ تيليغرام', placeholder: '@username أو رقم' },
              { key: 'other', label: '🔗 تواصل آخر', placeholder: 'أي وسيلة تواصل أخرى...' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">{f.label}</label>
                <input
                  value={contacts[f.key]}
                  onChange={e => setContacts(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
            ))}
          </div>
          {contactsMsg && <p className={`text-xs mt-3 ${contactsMsg.includes('✅') ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>{contactsMsg}</p>}
          <button
            onClick={handleSaveContacts}
            disabled={contactsSaving}
            className="mt-4 gradient-bg text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {contactsSaving ? 'جاري الحفظ...' : '💾 حفظ معلومات التواصل'}
          </button>
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
                  <p className="text-xs text-[#4A5D78]">{enabled ? svc.desc : '🔒 غير مفعّل'}</p>
                </div>
                {enabled && <span className="mr-auto text-[#10B981] text-sm">✓</span>}
              </div>
            )
          })}
        </div>
      </div>

      {qrOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4" onClick={() => setQrOpen(false)}>
          <div className="flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            <img src="/shamcashQR.jpeg" alt="Shamcash QR" className="w-72 h-72 sm:w-96 sm:h-96 rounded-2xl object-cover border-4 border-[#6366F1]/30 shadow-2xl" />
            <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl px-6 py-4 text-center">
              <p className="text-xs text-[#4A5D78] mb-1">معرّف شام كاش</p>
              <p className="text-[#F1F5F9] font-mono font-bold text-sm select-all">{SHAMCASH_ID}</p>
              <button
                onClick={handleCopy}
                className="mt-2 text-xs px-4 py-1.5 rounded-lg bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/20 hover:bg-[#6366F1]/25 transition-all font-medium"
              >
                {copied ? '✓ تم النسخ' : '📋 نسخ المعرّف'}
              </button>
            </div>
            <button onClick={() => setQrOpen(false)} className="text-[#4A5D78] text-sm hover:text-white transition-colors">✕ إغلاق</button>
          </div>
        </div>
      )}

      {depositOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-[#F1F5F9] font-bold mb-1">💰 طلب شحن رصيد</h3>
            <p className="text-[#4A5D78] text-xs mb-4">أرسل طلبك للإدارة — سيتم التواصل معك لإتمام الدفع</p>
            <form onSubmit={handleDepositRequest} className="flex flex-col gap-3">
              <input
                type="number" min="1" step="0.01" value={depositForm.amount}
                onChange={e => setDepositForm(p => ({ ...p, amount: e.target.value }))}
                placeholder="المبلغ المطلوب ($)" required
                className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
              />
              <textarea
                value={depositForm.note} onChange={e => setDepositForm(p => ({ ...p, note: e.target.value }))}
                placeholder="ملاحظة إضافية (اختياري)..." rows={2}
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

const EMPTY_FORM = {
  name: '', subtitle: '', description: '',
  price: '', originalPrice: '', currency: 'USD',
  category: '', stock: '1',
  images: ['', '', ''],
  condition: '',
  specs: [{ key: '', value: '' }],
  deliveryTimeline: 'فوري', pickupLocation: '', warrantyNote: '',
  publishingMonths: '1',
}

function ProductsTab({ user }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [toggleLoading, setToggleLoading] = useState(null)

  const canSell = user?.businessPermissions?.canSellProducts
  const credit = user?.vendorCredit ?? 0
  const priceNum = Number(form.price) || 0
  const months = Math.max(1, Number(form.publishingMonths) || 1)
  const requiredCredit = priceNum > 0 ? (priceNum / 100) * months : 0
  const creditSufficient = credit >= requiredCredit && credit > 0

  const fetchProducts = useCallback(async () => {
    try {
      const data = await api.get('/store/products?own=true')
      setProducts(data.data || [])
    } catch {}
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const addSpecRow = () => setForm(p => ({ ...p, specs: [...p.specs, { key: '', value: '' }] }))
  const removeSpecRow = (i) => setForm(p => ({ ...p, specs: p.specs.filter((_, idx) => idx !== i) }))
  const updateSpec = (i, field, val) => setForm(p => {
    const specs = [...p.specs]
    specs[i] = { ...specs[i], [field]: val }
    return { ...p, specs }
  })
  const updateImage = (i, val) => setForm(p => {
    const images = [...p.images]
    images[i] = val
    return { ...p, images }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!creditSufficient) {
      setMsg(credit <= 0
        ? 'رصيدك صفر — لا يمكنك إضافة منتجات.'
        : `رصيدك (${credit.toFixed(2)}$) غير كافٍ. مطلوب ${requiredCredit.toFixed(2)}$.`)
      setMsgType('error')
      return
    }
    setSubmitting(true)
    try {
      const images = form.images.filter(u => u.trim())
      const specs = form.specs.filter(s => s.key.trim() && s.value.trim())
      await api.post('/store/products', {
        name: form.name,
        subtitle: form.subtitle,
        description: form.description,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        currency: form.currency,
        category: form.category,
        images,
        stock: Number(form.stock),
        condition: form.condition,
        specs,
        deliveryTimeline: form.deliveryTimeline,
        pickupLocation: form.pickupLocation,
        warrantyNote: form.warrantyNote,
        publishingMonths: months,
      })
      setMsg('✅ تم إرسال المنتج للمراجعة')
      setMsgType('success')
      setShowForm(false)
      setForm(EMPTY_FORM)
      await fetchProducts()
    } catch (err) {
      setMsg(err.message)
      setMsgType('error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleVisibility = async (product) => {
    if (product.approvalStatus !== 'approved') return
    setToggleLoading(product._id)
    try {
      await api.patch(`/store/products/${product._id}/visibility`)
      await fetchProducts()
    } catch {}
    finally { setToggleLoading(null) }
  }

  const isExpired = (p) => p.expiresAt && new Date() > new Date(p.expiresAt)
  const daysLeft = (p) => {
    if (!p.expiresAt) return null
    const diff = new Date(p.expiresAt) - new Date()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
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
          className="gradient-bg text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
          title={credit <= 0 ? 'رصيدك صفر — اشحن رصيدك أولاً' : ''}
        >
          {showForm ? 'إلغاء' : '+ إضافة منتج'}
        </button>
      </div>

      {credit <= 0 && !showForm && (
        <div className="bg-[#F43F5E]/8 border border-[#F43F5E]/20 rounded-2xl p-4 text-center">
          <p className="text-[#F43F5E] text-sm font-bold">💳 رصيدك صفر</p>
          <p className="text-[#4A5D78] text-xs mt-1">اذهب إلى <strong className="text-[#94A3B8]">نظرة عامة</strong> واطلب شحن الرصيد</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0F1828] border border-[#6366F1]/20 rounded-2xl p-5 flex flex-col gap-4">
          <p className="text-sm font-bold text-[#F1F5F9] border-b border-[#1E2D45] pb-3">📝 منتج جديد</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-[#94A3B8] mb-1.5 block">اسم المنتج *</label>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="مثال: لابتوب Dell Latitude E7470" required className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-[#94A3B8] mb-1.5 block">العنوان الفرعي</label>
              <input value={form.subtitle} onChange={e => setForm(p => ({...p, subtitle: e.target.value}))} placeholder="مثال: الجهاز الأمثل للطالب الجامعي — خفيف وسريع" className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-[#94A3B8] mb-1.5 block">الوصف التفصيلي</label>
              <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="وصف شامل للمنتج..." rows={3} className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors resize-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">السعر *</label>
              <input type="number" value={form.price} onChange={e => setForm(p => ({...p, price: e.target.value}))} placeholder="0" required min="1"
                className={`w-full bg-[#162032] border ${!creditSufficient && priceNum > 0 ? 'border-[#F43F5E]/50' : 'border-[#1E2D45]'} text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors`}
              />
            </div>
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">سعر السوق (اختياري)</label>
              <input type="number" value={form.originalPrice} onChange={e => setForm(p => ({...p, originalPrice: e.target.value}))} placeholder="0" min="1" className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">العملة *</label>
              <select value={form.currency} onChange={e => setForm(p => ({...p, currency: e.target.value}))} className="w-full bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors">
                <option value="USD">دولار أمريكي ($)</option>
                <option value="SYP">ليرة سورية (SYP)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">الفئة *</label>
              <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} required className="w-full bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors">
                <option value="">اختر الفئة</option>
                <option value="إلكترونيات">إلكترونيات</option>
                <option value="أدوات هندسية">أدوات هندسية</option>
                <option value="قرطاسية">قرطاسية</option>
                <option value="ملابس المنصة">ملابس المنصة</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">الكمية المتاحة</label>
              <input type="number" value={form.stock} onChange={e => setForm(p => ({...p, stock: e.target.value}))} placeholder="1" min="1" className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">حالة المنتج</label>
              <select value={form.condition} onChange={e => setForm(p => ({...p, condition: e.target.value}))} className="w-full bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors">
                <option value="">اختر الحالة</option>
                <option value="جديد">جديد</option>
                <option value="مُجدَّد — Grade A">مُجدَّد — Grade A</option>
                <option value="مُجدَّد — Grade B">مُجدَّد — Grade B</option>
                <option value="مستعمل — جيد جداً">مستعمل — جيد جداً</option>
                <option value="مستعمل — جيد">مستعمل — جيد</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-[#94A3B8] mb-2 block">صور المنتج (روابط URL)</label>
            <div className="flex flex-col gap-2">
              {form.images.map((url, i) => (
                <input key={i} value={url} onChange={e => updateImage(i, e.target.value)} placeholder={`رابط الصورة ${i + 1}...`} className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#6366F1] transition-colors" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-[#94A3B8]">المواصفات التقنية</label>
              <button type="button" onClick={addSpecRow} className="text-xs text-[#6366F1] hover:text-[#818CF8] transition-colors">+ إضافة مواصفة</button>
            </div>
            <div className="flex flex-col gap-2">
              {form.specs.map((spec, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={spec.key} onChange={e => updateSpec(i, 'key', e.target.value)} placeholder="المواصفة (مثال: المعالج)" className="flex-1 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#6366F1] transition-colors" />
                  <input value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)} placeholder="القيمة (مثال: i7-11th Gen)" className="flex-1 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#6366F1] transition-colors" />
                  {form.specs.length > 1 && (
                    <button type="button" onClick={() => removeSpecRow(i)} className="text-[#F43F5E] text-sm hover:opacity-70 shrink-0">✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">وقت التوصيل</label>
              <input value={form.deliveryTimeline} onChange={e => setForm(p => ({...p, deliveryTimeline: e.target.value}))} placeholder="مثال: 2-5 أيام عمل" className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">مكان الاستلام</label>
              <input value={form.pickupLocation} onChange={e => setForm(p => ({...p, pickupLocation: e.target.value}))} placeholder="مثال: كلية الهندسة — البوابة الرئيسية" className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">ملاحظة الضمان</label>
              <input value={form.warrantyNote} onChange={e => setForm(p => ({...p, warrantyNote: e.target.value}))} placeholder="مثال: شهر واحد — Grade A" className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
            </div>
          </div>

          <div className="bg-[#162032] rounded-xl p-4">
            <label className="text-xs text-[#94A3B8] mb-3 block font-semibold">📅 مدة النشر</label>
            <div className="flex gap-2 flex-wrap mb-3">
              {[1, 2, 3, 6, 12].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm(p => ({...p, publishingMonths: String(m)}))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    Number(form.publishingMonths) === m
                      ? 'gradient-bg text-white border-transparent'
                      : 'bg-[#0F1828] border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/30'
                  }`}
                >
                  {m} {m === 1 ? 'شهر' : 'أشهر'}
                </button>
              ))}
            </div>
            {priceNum > 0 ? (
              <div className={`rounded-lg px-3 py-2 text-xs ${creditSufficient ? 'bg-[#10B981]/8 border border-[#10B981]/20 text-[#10B981]' : 'bg-[#F43F5E]/8 border border-[#F43F5E]/20 text-[#F43F5E]'}`}>
                {creditSufficient
                  ? `✓ تكلفة النشر: ${requiredCredit.toFixed(2)}$ · رصيدك: ${credit.toFixed(2)}$ (كافٍ)`
                  : `✗ تكلفة النشر: ${requiredCredit.toFixed(2)}$ · رصيدك: ${credit.toFixed(2)}$ (غير كافٍ)`}
                <span className="block mt-1 text-[#4A5D78]">المعادلة: ({priceNum}$ ÷ 100) × {months} {months === 1 ? 'شهر' : 'أشهر'} = {requiredCredit.toFixed(2)}$</span>
              </div>
            ) : (
              <p className="text-[10px] text-[#4A5D78]">أدخل السعر لمعرفة تكلفة النشر</p>
            )}
          </div>

          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl px-4 py-2.5 text-[#F59E0B] text-xs">
            سيتم مراجعة المنتج من قِبل الإدارة قبل النشر — الرصيد يُخصم فقط عند الموافقة
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
          <p className="text-[#4A5D78] text-sm">لا توجد منتجات — أضف منتجك الأول</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map(p => {
            const expired = isExpired(p)
            const days = daysLeft(p)
            return (
              <div key={p._id} className={`bg-[#0F1828] border rounded-2xl p-5 flex items-start gap-4 ${expired ? 'border-[#F43F5E]/20' : 'border-[#1E2D45]'}`}>
                {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-[#F1F5F9] font-semibold">{p.name}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: '#10B981' }}>
                    {p.price?.toLocaleString()} {p.currency || 'USD'}
                  </p>
                  {p.approvalStatus === 'approved' && p.expiresAt && (
                    <p className={`text-[10px] mt-1 ${expired ? 'text-[#F43F5E]' : days <= 7 ? 'text-[#F59E0B]' : 'text-[#4A5D78]'}`}>
                      {expired ? '⚠️ انتهت فترة النشر' : `⏳ ينتهي خلال ${days} يوم · ${new Date(p.expiresAt).toLocaleDateString('ar-SY')}`}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${
                    p.approvalStatus === 'approved' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' :
                    p.approvalStatus === 'rejected' ? 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20' :
                    'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
                  }`}>
                    {p.approvalStatus === 'approved' ? 'منشور' : p.approvalStatus === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                  </span>
                  {p.approvalStatus === 'approved' && !expired && (
                    <button
                      onClick={() => handleToggleVisibility(p)}
                      disabled={toggleLoading === p._id}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        p.isVisible
                          ? 'bg-[#4A5D78]/10 border-[#4A5D78]/20 text-[#4A5D78] hover:text-[#F43F5E] hover:border-[#F43F5E]/20'
                          : 'bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/20'
                      }`}
                    >
                      {toggleLoading === p._id ? '...' : p.isVisible ? '👁 إخفاء' : '👁 إظهار'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
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
              <p className="text-sm font-bold gradient-text mt-1">{o.amount?.toLocaleString()}</p>
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
      <p className="text-[#4A5D78] text-sm">تقرير الإيرادات قيد التطوير</p>
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
          <p className="text-[#4A5D78] text-sm">لا توجد حملات بعد</p>
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
      await api.post('/ads', form)
      setMsg('تم إنشاء الحملة بنجاح')
      setForm({ title: '', targetUrl: '', imageUrl: '', zone: 'header', startDate: '', endDate: '' })
    } catch (err) {
      setMsg(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-xl font-black text-[#F1F5F9]">➕ حملة إعلانية جديدة</h2>
      <form onSubmit={handleSubmit} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 flex flex-col gap-3">
        {[
          { key: 'title', label: 'عنوان الحملة', placeholder: 'عنوان جذاب لحملتك', type: 'text' },
          { key: 'targetUrl', label: 'رابط الوجهة', placeholder: 'https://...', type: 'url' },
          { key: 'imageUrl', label: 'رابط الصورة', placeholder: 'https://... (صورة الإعلان)', type: 'url' },
          { key: 'startDate', label: 'تاريخ البدء', type: 'date' },
          { key: 'endDate', label: 'تاريخ الانتهاء', type: 'date' },
        ].map(f => (
          <div key={f.key}>
            <label className="text-xs text-[#94A3B8] mb-1.5 block">{f.label}</label>
            <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))} placeholder={f.placeholder} required className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          </div>
        ))}
        <div>
          <label className="text-xs text-[#94A3B8] mb-1.5 block">منطقة الإعلان</label>
          <select value={form.zone} onChange={e => setForm(p => ({...p, zone: e.target.value}))} className="w-full bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors">
            <option value="header">الرأس (Header)</option>
            <option value="sidebar">الشريط الجانبي</option>
            <option value="feed">التغذية الرئيسية</option>
          </select>
        </div>
        {msg && <p className="text-xs text-[#10B981]">{msg}</p>}
        <button type="submit" disabled={submitting} className="gradient-bg text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          {submitting ? 'جاري الإنشاء...' : '🚀 إطلاق الحملة'}
        </button>
      </form>
    </div>
  )
}

function ServicesTab({ user }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const canFreelance = user?.businessPermissions?.canOfferFreelance

  useEffect(() => {
    if (!canFreelance) { setLoading(false); return }
    api.get('/freelance/services')
      .then(data => setServices(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [canFreelance])

  if (!canFreelance) return <LockedService label="الخدمات المستقلة" desc="لم يتم تفعيل خدمة المستقلين لحسابك بعد" />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-[#F1F5F9]">💼 خدماتي المستقلة</h2>
      {loading ? <div className="py-12 flex justify-center"><Spinner /></div> : services.length === 0 ? (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-8 text-center">
          <p className="text-[#4A5D78] text-sm">لا توجد خدمات — أضف خدمتك الأولى</p>
        </div>
      ) : services.map(s => (
        <div key={s._id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
          <p className="text-[#F1F5F9] font-semibold">{s.title}</p>
          <p className="text-xs text-[#4A5D78] mt-1">{s.category}</p>
        </div>
      ))}
    </div>
  )
}

function ContractsTab() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-5xl mb-4">📋</p>
      <h3 className="text-[#F1F5F9] font-bold text-lg mb-2">العقود</h3>
      <p className="text-[#4A5D78] text-sm">لا توجد عقود نشطة حالياً</p>
    </div>
  )
}

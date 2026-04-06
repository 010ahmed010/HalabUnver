import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const VENDOR_PRODUCTS = [
  { id: 'PRD-01', name: 'لابتوب ThinkPad X1', price: '4,500,000 SYP', stock: 3, status: 'منشور' },
  { id: 'PRD-02', name: 'قرص SSD 1TB', price: '850,000 SYP', stock: 12, status: 'قيد المراجعة' },
]

const VENDOR_ORDERS = [
  { id: '#HS-702', item: 'لابتوب ThinkPad X1', customer: 'أحمد الجاسم', status: 'مدفوع', amount: '4,500,000 SYP' },
]

const AD_CAMPAIGNS = [
  { id: 'AD-01', name: 'إعلان رمضان 2026', zone: 'الشريط العلوي', status: 'نشط', clicks: 142, period: 'حتى 30 أبريل' },
  { id: 'AD-02', name: 'عرض الصيف', zone: 'الشريط الجانبي', status: 'قيد المراجعة', clicks: 0, period: 'مايو 2026' },
]

const SERVICES = [
  { id: 'SRV-01', title: 'تطوير تطبيق MERN Stack', price: '500,000 SYP', orders: 3, rating: 4.9 },
  { id: 'SRV-02', title: 'تصحيح أخطاء برمجية', price: '50,000 SYP/ساعة', orders: 7, rating: 5.0 },
]

const STATUS_STYLE = {
  'منشور': 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  'نشط': 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  'قيد المراجعة': 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  'مدفوع': 'bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/20',
  'مرفوض': 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20',
}

export default function BusinessDashboard() {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState('overview')

  const tabs = {
    vendor: ['overview', 'products', 'orders', 'revenue'],
    advertiser: ['overview', 'campaigns', 'create'],
    freelancer: ['overview', 'services', 'contracts', 'earnings'],
  }

  const tabLabels = {
    overview: { icon: '📊', label: 'نظرة عامة' },
    products: { icon: '📦', label: 'منتجاتي' },
    orders: { icon: '🛒', label: 'الطلبات' },
    revenue: { icon: '💰', label: 'الإيرادات' },
    campaigns: { icon: '📢', label: 'الحملات' },
    create: { icon: '➕', label: 'حملة جديدة' },
    services: { icon: '💼', label: 'خدماتي' },
    contracts: { icon: '📋', label: 'العقود' },
    earnings: { icon: '💸', label: 'الأرباح' },
  }

  const activeTabs = tabs[user?.businessType] || []

  const typeConfig = {
    vendor: { label: 'بائع منتجات', color: '#14B8A6', icon: '🛒' },
    advertiser: { label: 'معلن محلي', color: '#F59E0B', icon: '📢' },
    freelancer: { label: 'مستقل خارجي', color: '#F43F5E', icon: '💼' },
  }
  const config = typeConfig[user?.businessType] || {}

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
              user?.status === 'active' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
            }`}>
              {user?.status === 'active' ? '🟢 نشط' : '🕒 قيد المراجعة'}
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {activeTabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-right ${
                tab === t
                  ? 'bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/25'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5'
              }`}
            >
              <span>{tabLabels[t]?.icon}</span>
              {tabLabels[t]?.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1E2D45]">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-[#4A5D78] hover:text-[#F43F5E] hover:bg-[#F43F5E]/5 rounded-xl transition-all text-sm"
          >
            <span>🚪</span> تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#4A5D78] text-sm">لوحة الأعمال</span>
              <h1 className="text-2xl font-black text-[#F1F5F9] mt-1">
                مرحباً، <span className="gradient-text">{user?.name}</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
              style={{ color: config.color, borderColor: `${config.color}30`, background: `${config.color}10` }}>
              {config.icon} {config.label}
            </div>
          </div>
          <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
            {activeTabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  tab === t ? 'gradient-bg text-white' : 'bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8]'
                }`}>
                {tabLabels[t]?.icon} {tabLabels[t]?.label}
              </button>
            ))}
          </div>
        </div>

        {tab === 'overview' && <OverviewTab user={user} config={config} />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'campaigns' && <CampaignsTab />}
        {tab === 'create' && <CreateCampaignTab />}
        {tab === 'services' && <ServicesTab />}
        {tab === 'revenue' || tab === 'earnings' || tab === 'contracts'
          ? <PlaceholderTab label={tabLabels[tab]?.label} />
          : null}
      </main>
    </div>
  )
}

function OverviewTab({ user, config }) {
  const statsMap = {
    vendor: [
      { label: 'إجمالي الإيرادات', value: '4,500,000 SYP', icon: '💰', color: '#10B981' },
      { label: 'المنتجات المنشورة', value: '1', icon: '📦', color: '#14B8A6' },
      { label: 'الطلبات المكتملة', value: '1', icon: '✅', color: '#6366F1' },
      { label: 'تقييم المتجر', value: '4.8 ⭐', icon: '⭐', color: '#F59E0B' },
    ],
    advertiser: [
      { label: 'الحملات النشطة', value: '1', icon: '📢', color: '#F59E0B' },
      { label: 'إجمالي النقرات', value: '142', icon: '👆', color: '#6366F1' },
      { label: 'معدل النقر', value: '3.2%', icon: '📈', color: '#10B981' },
      { label: 'الحملات قيد المراجعة', value: '1', icon: '🕒', color: '#F43F5E' },
    ],
    freelancer: [
      { label: 'إجمالي الأرباح', value: '2,150,000 SYP', icon: '💸', color: '#10B981' },
      { label: 'الخدمات النشطة', value: '2', icon: '💼', color: '#6366F1' },
      { label: 'العقود المكتملة', value: '10', icon: '✅', color: '#14B8A6' },
      { label: 'متوسط التقييم', value: '4.95 ⭐', icon: '⭐', color: '#F59E0B' },
    ],
  }
  const stats = statsMap[user?.businessType] || []

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="text-xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[#4A5D78] text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {user?.status === 'pending' && (
        <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/25 rounded-2xl p-5 flex items-start gap-4">
          <span className="text-2xl shrink-0">🕒</span>
          <div>
            <div className="text-[#F59E0B] font-semibold mb-1">حسابك قيد المراجعة</div>
            <div className="text-[#94A3B8] text-sm">تقوم الإدارة بمراجعة طلبك. ستتلقى إشعاراً فور التفعيل. في العادة لا يستغرق الأمر أكثر من 24 ساعة.</div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProductsTab() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#F1F5F9]">منتجاتي</h2>
        <button className="gradient-bg text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
          ➕ إضافة منتج
        </button>
      </div>
      <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1E2D45]">
              {['المعرّف', 'المنتج', 'السعر', 'المخزون', 'الحالة', ''].map(h => (
                <th key={h} className="px-5 py-4 text-right text-[#4A5D78] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VENDOR_PRODUCTS.map(p => (
              <tr key={p.id} className="border-b border-[#1E2D45] last:border-0 hover:bg-[#162032] transition-colors">
                <td className="px-5 py-4 text-[#4A5D78] font-mono text-xs">{p.id}</td>
                <td className="px-5 py-4 text-[#F1F5F9] font-medium">{p.name}</td>
                <td className="px-5 py-4 text-[#94A3B8]">{p.price}</td>
                <td className="px-5 py-4 text-[#94A3B8]">{p.stock}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[p.status] || ''}`}>{p.status}</span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-[#4A5D78] hover:text-[#6366F1] transition-colors text-xs">✏️ تعديل</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrdersTab() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-bold text-[#F1F5F9]">الطلبات الواردة</h2>
      <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1E2D45]">
              {['رقم الطلب', 'المنتج', 'العميل', 'الحالة', 'المبلغ'].map(h => (
                <th key={h} className="px-5 py-4 text-right text-[#4A5D78] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VENDOR_ORDERS.map(o => (
              <tr key={o.id} className="border-b border-[#1E2D45] last:border-0 hover:bg-[#162032] transition-colors">
                <td className="px-5 py-4 text-[#4A5D78] font-mono text-xs">{o.id}</td>
                <td className="px-5 py-4 text-[#F1F5F9]">{o.item}</td>
                <td className="px-5 py-4 text-[#94A3B8]">{o.customer}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[o.status] || ''}`}>{o.status}</span>
                </td>
                <td className="px-5 py-4 text-[#F1F5F9] font-semibold">{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CampaignsTab() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#F1F5F9]">حملاتي الإعلانية</h2>
        <button className="gradient-bg text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
          ➕ حملة جديدة
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {AD_CAMPAIGNS.map(c => (
          <div key={c.id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#F1F5F9] font-semibold">{c.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[c.status] || ''}`}>{c.status}</span>
              </div>
              <div className="flex items-center gap-4 text-[#4A5D78] text-xs">
                <span>📍 {c.zone}</span>
                <span>📅 {c.period}</span>
                <span>👆 {c.clicks} نقرة</span>
              </div>
            </div>
            <button className="text-[#4A5D78] hover:text-[#6366F1] transition-colors text-sm">✏️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function CreateCampaignTab() {
  return (
    <div className="flex flex-col gap-5 max-w-xl">
      <h2 className="text-lg font-bold text-[#F1F5F9]">إنشاء حملة إعلانية</h2>
      <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 flex flex-col gap-4">
        {[
          { label: 'اسم الحملة', placeholder: 'مثال: عرض رمضان 2026' },
          { label: 'رابط الصفحة المستهدفة', placeholder: 'https://...' },
        ].map(f => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <label className="text-[#94A3B8] text-sm font-medium">{f.label}</label>
            <input placeholder={f.placeholder}
              className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors" />
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#94A3B8] text-sm font-medium">منطقة العرض</label>
          <select className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors">
            <option>الشريط العلوي</option>
            <option>الشريط الجانبي</option>
            <option>داخل المحتوى</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#94A3B8] text-sm font-medium">صورة الإعلان (WebP)</label>
          <div className="bg-[#162032] border border-dashed border-[#1E2D45] rounded-xl p-8 text-center text-[#4A5D78] text-sm hover:border-[#6366F1]/40 transition-colors cursor-pointer">
            📎 اسحب الصورة هنا أو انقر للتحميل
          </div>
        </div>
        <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl px-4 py-3 text-[#F59E0B] text-xs">
          ستُراجَع حملتك من قِبل الإدارة قبل النشر — عادةً خلال 24 ساعة
        </div>
        <button className="gradient-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm">
          📤 إرسال للمراجعة
        </button>
      </div>
    </div>
  )
}

function ServicesTab() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#F1F5F9]">خدماتي</h2>
        <button className="gradient-bg text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
          ➕ إضافة خدمة
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {SERVICES.map(s => (
          <div key={s.id} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-[#F1F5F9] font-semibold mb-1.5">{s.title}</div>
              <div className="flex items-center gap-4 text-[#4A5D78] text-xs">
                <span className="gradient-text font-bold text-sm">{s.price}</span>
                <span>📦 {s.orders} طلب</span>
                <span>⭐ {s.rating}</span>
              </div>
            </div>
            <button className="text-[#4A5D78] hover:text-[#6366F1] transition-colors text-sm">✏️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlaceholderTab({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">🚧</div>
      <h3 className="text-[#F1F5F9] font-bold text-lg mb-2">{label}</h3>
      <p className="text-[#4A5D78] text-sm">هذا القسم قيد التطوير — سيكون متاحاً قريباً</p>
    </div>
  )
}

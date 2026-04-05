import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusPill from '../../components/shared/StatusPill'

const ADMIN_MODULES = [
  { icon: '👥', label: 'إدارة المستخدمين', desc: 'قبول الهويات، الصلاحيات، بيانات الطلاب', color: '#6366F1' },
  { icon: '📦', label: 'إدارة الطلبات', desc: 'جميع طلبات المتجر والمستقلين', color: '#14B8A6' },
  { icon: '📚', label: 'إدارة المكتبة', desc: 'رفع ومراجعة الملفات والملخصات', color: '#F59E0B' },
  { icon: '📢', label: 'لوحة الإعلانات', desc: 'نشر الأخبار والإعلانات المدفوعة', color: '#F43F5E' },
  { icon: '💰', label: 'السجل المالي', desc: 'تتبع الإيرادات وتحويلات ShamCash', color: '#10B981' },
  { icon: '🏪', label: 'مخزون المتجر', desc: 'إدارة المنتجات والأسعار والمخزون', color: '#8B5CF6' },
  { icon: '⚙️', label: 'إعدادات النظام', desc: 'التخطيط العام وسعر الصرف اليومي', color: '#94A3B8' },
]

const PENDING_USERS = [
  { name: 'علي محمد سالم', id: '#ST-4421', faculty: 'هندسة معلوماتية', submitted: '2026-04-03', status: 'pending' },
  { name: 'سارة أحمد', id: '#ST-4422', faculty: 'هندسة كيمياوية', submitted: '2026-04-03', status: 'pending' },
  { name: 'خالد عمر', id: '#ST-4418', faculty: 'هندسة معمارية', submitted: '2026-04-02', status: 'pending' },
]

const PENDING_ORDERS = [
  { id: '#HS-703', item: 'ThinkPad X1 Carbon', student: 'أحمد الجاسم', amount: '3,700,000', status: 'pending' },
  { id: '#HS-704', item: 'Arduino Mega 2560', student: 'سامر خالد', amount: '80,000', status: 'processing' },
]

const STATS = [
  { label: 'طلاب جدد اليوم', val: '14', color: '#6366F1', bg: '#6366F110' },
  { label: 'طلبات معلّقة', val: '7', color: '#F59E0B', bg: '#F59E0B10' },
  { label: 'إيرادات الشهر', val: '2.4M SYP', color: '#10B981', bg: '#10B98110' },
  { label: 'هويات بانتظار المراجعة', val: '3', color: '#F43F5E', bg: '#F43F5E10' },
]

const EXAM_SEASON = true

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('overview')
  const [examSeason, setExamSeason] = useState(EXAM_SEASON)

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <span className="section-label">لوحة الإدارة</span>
            <h1 className="text-xl sm:text-2xl font-black text-[#F1F5F9]">⚙️ مركز التحكم</h1>
          </div>
          <div className="flex items-center gap-3 bg-[#0F1828] border border-[#1E2D45] rounded-xl px-3 sm:px-4 py-2.5 shrink-0">
            <span className="text-xs text-[#94A3B8] hidden sm:inline">موسم الامتحانات</span>
            <button
              onClick={() => setExamSeason(!examSeason)}
              className={`w-10 h-5 rounded-full transition-all relative flex-shrink-0 ${examSeason ? 'bg-[#F43F5E]' : 'bg-[#1E2D45]'}`}
            >
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${examSeason ? 'left-5' : 'left-0.5'}`} />
            </button>
            {examSeason && <span className="text-xs text-[#F43F5E] font-semibold animate-blink-soft">نشط</span>}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {STATS.map(s => (
            <div key={s.label} className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 hover:border-[#6366F1]/20 transition-all">
              <p className="text-xl sm:text-2xl font-black mb-1" style={{ color: s.color }}>{s.val}</p>
              <p className="text-xs text-[#94A3B8] leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6">

          {/* Module nav */}
          <aside className="lg:col-span-1">
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-[#1E2D45]">
                <p className="text-xs font-semibold text-[#F1F5F9]">الوحدات</p>
              </div>
              <nav className="p-2">
                <button
                  onClick={() => setActiveModule('overview')}
                  className={`w-full text-right px-3 py-2.5 text-sm mb-1 rounded-xl transition-all ${
                    activeModule === 'overview'
                      ? 'bg-[#6366F1]/15 text-[#6366F1] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]'
                  }`}
                >
                  📊 نظرة عامة
                </button>
                {ADMIN_MODULES.map(m => (
                  <button
                    key={m.label}
                    onClick={() => setActiveModule(m.label)}
                    className={`w-full text-right px-3 py-2 text-xs mb-1 rounded-xl transition-all ${
                      activeModule === m.label
                        ? 'bg-[#6366F1]/15 text-[#6366F1] font-semibold'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]'
                    }`}
                  >
                    {m.icon} {m.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main panel */}
          <main className="lg:col-span-3 space-y-4">

            {activeModule === 'overview' && (
              <>
                {/* Module cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ADMIN_MODULES.map(m => (
                    <button
                      key={m.label}
                      onClick={() => setActiveModule(m.label)}
                      className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 text-right hover:border-[#6366F1]/30 hover:shadow-lg transition-all"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-2" style={{ background: m.color + '18' }}>
                        {m.icon}
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#F1F5F9] mb-0.5">{m.label}</p>
                      <p className="text-[10px] sm:text-xs text-[#94A3B8] leading-tight">{m.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Pending IDs */}
                <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
                  <div className="px-4 sm:px-5 py-3.5 border-b border-[#1E2D45] flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#F1F5F9]">هويات بانتظار التحقق</p>
                    <span className="text-xs bg-[#F43F5E] text-white px-2 py-0.5 rounded-full font-bold">{PENDING_USERS.length}</span>
                  </div>
                  {PENDING_USERS.map(u => (
                    <div key={u.id} className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[#1E2D45] last:border-0 gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#F1F5F9] font-medium truncate">{u.name}</p>
                        <p className="text-xs text-[#4A5D78] mt-0.5">{u.id} · {u.faculty}</p>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <StatusPill status="pending" />
                        <button className="px-2.5 sm:px-3 py-1.5 bg-[#10B981] text-white text-xs font-bold rounded-lg hover:bg-[#0d9f72] transition-colors">✅ قبول</button>
                        <button className="px-2.5 sm:px-3 py-1.5 bg-[#F43F5E] text-white text-xs font-bold rounded-lg hover:bg-[#e0284f] transition-colors">✕ رفض</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pending orders */}
                <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
                  <div className="px-4 sm:px-5 py-3.5 border-b border-[#1E2D45]">
                    <p className="text-sm font-semibold text-[#F1F5F9]">طلبات المتجر المعلّقة</p>
                  </div>
                  {PENDING_ORDERS.map(o => (
                    <div key={o.id} className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[#1E2D45] last:border-0 gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#F1F5F9] font-medium truncate">{o.item}</p>
                        <p className="text-xs text-[#4A5D78] mt-0.5 truncate">{o.id} · {o.student} · {o.amount} SYP</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusPill status={o.status} />
                        <button className="px-3 py-1.5 rounded-lg border border-[#6366F1]/30 text-[#6366F1] text-xs hover:bg-[#6366F1]/10 transition-all">تفاصيل</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exchange rate */}
                <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 sm:p-5">
                  <p className="text-sm font-semibold text-[#F1F5F9] mb-4">إعدادات اليوم</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#94A3B8]">سعر الصرف (SYP/$):</span>
                      <input
                        defaultValue="14500"
                        className="w-24 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] px-3 py-1.5 text-sm font-mono outline-none focus:border-[#6366F1]/50 rounded-lg transition-colors"
                      />
                    </div>
                    <button className="px-4 py-1.5 gradient-bg text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">تحديث السعر</button>
                  </div>
                </div>
              </>
            )}

            {activeModule !== 'overview' && (
              <div className="bg-[#0F1828] rounded-2xl border border-[#6366F1]/20 p-8 sm:p-10 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-4" style={{ background: (ADMIN_MODULES.find(m => m.label === activeModule)?.color || '#6366F1') + '18' }}>
                  {ADMIN_MODULES.find(m => m.label === activeModule)?.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F1F5F9] mb-2">{activeModule}</h3>
                <p className="text-sm text-[#94A3B8] mb-4">{ADMIN_MODULES.find(m => m.label === activeModule)?.desc}</p>
                <span className="text-xs text-[#4A5D78] bg-[#162032] rounded-full px-4 py-2 inline-block">قيد التطوير — متصل بـ Backend API</span>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusPill from '../../components/shared/StatusPill'

const ADMIN_MODULES = [
  { icon: '👥', label: 'إدارة المستخدمين', desc: 'قبول الهويات، الصلاحيات، بانات الطلاب', color: '#BB86FC' },
  { icon: '📦', label: 'إدارة الطلبات', desc: 'جميع طلبات المتجر والمستقلين', color: '#03DAC6' },
  { icon: '📚', label: 'إدارة المكتبة', desc: 'رفع ومراجعة الملفات والملخصات', color: '#FFD700' },
  { icon: '📢', label: 'لوحة الإعلانات', desc: 'نشر الأخبار والإعلانات المدفوعة', color: '#CF6679' },
  { icon: '💰', label: 'السجل المالي', desc: 'تتبع الإيرادات وتحويلات ShamCash', color: '#4CAF50' },
  { icon: '🏪', label: 'مخزون المتجر', desc: 'إدارة المنتجات والأسعار والمخزون', color: '#BB86FC' },
  { icon: '⚙️', label: 'إعدادات النظام', desc: 'التخطيط العام وسعر الصرف اليومي', color: '#03DAC6' },
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
  { label: 'طلاب جدد اليوم', val: '14', color: '#BB86FC' },
  { label: 'طلبات معلّقة', val: '7', color: '#FFD700' },
  { label: 'إيرادات الشهر', val: '2.4M SYP', color: '#4CAF50' },
  { label: 'هويات بانتظار المراجعة', val: '3', color: '#EF4444' },
]

const EXAM_SEASON = true

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('overview')
  const [examSeason, setExamSeason] = useState(EXAM_SEASON)

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono text-[#888]">[ ADMIN_DASHBOARD ] — مركز التحكم</span>
            <h1 className="text-2xl font-black text-[#E0E0E0] mt-1">⚙️ لوحة الإدارة</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-[#2A2A2A] px-3 py-2">
              <span className="text-xs text-[#888]">موسم الامتحانات</span>
              <button onClick={() => setExamSeason(!examSeason)}
                className={`w-10 h-5 rounded-full transition-colors relative ${examSeason ? 'bg-[#EF4444]' : 'bg-[#2A2A2A]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${examSeason ? 'left-5' : 'left-0.5'}`} />
              </button>
              {examSeason && <span className="text-xs text-[#EF4444] font-mono animate-blink-red">ACTIVE</span>}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {STATS.map(s => (
            <div key={s.label} className="bg-[#1E1E1E] border border-[#2A2A2A] p-4">
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.val}</p>
              <p className="text-xs text-[#888] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Module nav */}
          <aside className="lg:col-span-1">
            <div className="border border-[#2A2A2A]">
              <div className="p-3 border-b border-[#2A2A2A]">
                <p className="text-xs font-mono text-[#888]">[ MODULES ]</p>
              </div>
              <nav className="p-2">
                <button onClick={() => setActiveModule('overview')}
                  className={`w-full text-right px-3 py-2.5 text-sm mb-1 transition-colors ${activeModule === 'overview' ? 'bg-[#BB86FC]/10 text-[#BB86FC] border-r-2 border-[#BB86FC]' : 'text-[#888] hover:text-[#E0E0E0]'}`}>
                  📊 نظرة عامة
                </button>
                {ADMIN_MODULES.map(m => (
                  <button key={m.label} onClick={() => setActiveModule(m.label)}
                    className={`w-full text-right px-3 py-2.5 text-xs mb-1 transition-colors ${activeModule === m.label ? 'bg-[#BB86FC]/10 text-[#BB86FC] border-r-2 border-[#BB86FC]' : 'text-[#888] hover:text-[#E0E0E0]'}`}>
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
                <div className="grid grid-cols-2 gap-3">
                  {ADMIN_MODULES.map(m => (
                    <button key={m.label} onClick={() => setActiveModule(m.label)}
                      className="bg-[#1E1E1E] border border-[#2A2A2A] p-4 text-right hover:border-[#BB86FC]/50 transition-colors">
                      <span className="text-2xl block mb-2">{m.icon}</span>
                      <p className="text-sm font-bold text-[#E0E0E0]">{m.label}</p>
                      <p className="text-xs text-[#888] mt-0.5">{m.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Pending IDs */}
                <div className="bg-[#1E1E1E] border border-[#2A2A2A]">
                  <div className="px-5 py-3 border-b border-[#2A2A2A] flex items-center justify-between">
                    <p className="text-xs font-mono text-[#888]">[ PENDING_IDs ] — هويات بانتظار التحقق</p>
                    <span className="text-xs bg-[#EF4444] text-white px-2 py-0.5">{PENDING_USERS.length}</span>
                  </div>
                  {PENDING_USERS.map(u => (
                    <div key={u.id} className="flex items-center justify-between px-5 py-3 border-b border-[#2A2A2A] last:border-0 gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-[#E0E0E0]">{u.name}</p>
                        <p className="text-xs font-mono text-[#555]">{u.id} · {u.faculty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusPill status="pending" />
                        <button className="px-3 py-1 bg-[#4CAF50] text-white text-xs font-bold hover:bg-[#43a047] transition-colors">✅ قبول</button>
                        <button className="px-3 py-1 bg-[#EF4444] text-white text-xs font-bold hover:bg-[#e53935] transition-colors">✕ رفض</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pending orders */}
                <div className="bg-[#1E1E1E] border border-[#2A2A2A]">
                  <div className="px-5 py-3 border-b border-[#2A2A2A]">
                    <p className="text-xs font-mono text-[#888]">[ PENDING_ORDERS ] — طلبات المتجر</p>
                  </div>
                  {PENDING_ORDERS.map(o => (
                    <div key={o.id} className="flex items-center justify-between px-5 py-3 border-b border-[#2A2A2A] last:border-0 gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-[#E0E0E0]">{o.item}</p>
                        <p className="text-xs font-mono text-[#555]">{o.id} · {o.student} · {o.amount} SYP</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusPill status={o.status} />
                        <button className="px-3 py-1 border border-[#BB86FC]/40 text-[#BB86FC] text-xs hover:bg-[#BB86FC]/10 transition-colors">تفاصيل</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exchange rate */}
                <div className="border border-[#2A2A2A] p-5">
                  <p className="text-xs font-mono text-[#888] mb-3">[ GLOBAL_SETTINGS ] — إعدادات اليوم</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#888]">سعر الصرف اليومي (SYP/$):</span>
                      <input defaultValue="14500" className="w-24 bg-[#1E1E1E] border border-[#2A2A2A] text-[#E0E0E0] px-3 py-1.5 text-sm font-mono outline-none focus:border-[#BB86FC]" />
                    </div>
                    <button className="px-4 py-1.5 bg-[#BB86FC] text-[#121212] text-xs font-bold hover:bg-[#a06cdc] transition-colors">تحديث السعر</button>
                  </div>
                </div>
              </>
            )}

            {activeModule !== 'overview' && (
              <div className="bg-[#1E1E1E] border border-[#BB86FC]/20 p-8 text-center">
                <p className="text-4xl mb-4">{ADMIN_MODULES.find(m => m.label === activeModule)?.icon}</p>
                <h3 className="text-xl font-bold text-[#E0E0E0] mb-2">{activeModule}</h3>
                <p className="text-sm text-[#888]">{ADMIN_MODULES.find(m => m.label === activeModule)?.desc}</p>
                <p className="text-xs font-mono text-[#555] mt-4">[ MODULE UNDER CONSTRUCTION — CONNECTED TO BACKEND API ]</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

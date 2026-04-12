import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'

function Spinner() {
  return <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin mx-auto" />
}

function StatusPill({ status }) {
  const styles = {
    active: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
    pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
    frozen: 'bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/20',
    rejected: 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20',
  }
  const labels = { active: 'نشط', pending: 'معلّق', frozen: 'مجمّد', rejected: 'مرفوض' }
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full border ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  )
}

const SIDEBAR_ITEMS = [
  { key: 'overview', icon: '📊', label: 'نظرة عامة' },
  { key: 'users', icon: '👥', label: 'المستخدمون' },
  { key: 'businesses', icon: '💼', label: 'حسابات الأعمال' },
  { key: 'orders', icon: '📦', label: 'الطلبات' },
  { key: 'revenue', icon: '💰', label: 'الإيرادات' },
  { key: 'announcements', icon: '📢', label: 'الأخبار والامتحانات' },
  { key: 'config', icon: '⚙️', label: 'الإعدادات' },
]

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [active, setActive] = useState('overview')
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
          <div className="bg-[#162032] rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-lg">🔐</span>
            <div>
              <div className="text-[#F1F5F9] font-semibold text-xs">لوحة الإدارة</div>
              <div className="text-[#10B981] text-[10px]">وصول كامل</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-right w-full ${
                active === item.key
                  ? 'bg-[#6366F1]/15 text-[#6366F1] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
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

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-6 sm:p-8">
          {/* Mobile header */}
          <div className="flex gap-2 lg:hidden mb-6 flex-wrap">
            {SIDEBAR_ITEMS.map(item => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active === item.key ? 'gradient-bg text-white' : 'bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8]'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          {active === 'overview' && <OverviewPanel />}
          {active === 'users' && <UsersPanel />}
          {active === 'businesses' && <BusinessesPanel />}
          {active === 'orders' && <OrdersPanel />}
          {active === 'revenue' && <RevenuePanel />}
          {active === 'announcements' && <AnnouncementsPanel />}
          {active === 'config' && <ConfigPanel />}
        </div>
      </main>
    </div>
  )
}

function OverviewPanel() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activityLogs, setActivityLogs] = useState([])

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/activity-log?limit=10'),
    ]).then(([s, a]) => {
      setStats(s.data)
      setActivityLogs(a.data || [])
    }).catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Spinner /></div>

  const STAT_CARDS = [
    { label: 'إجمالي المستخدمين', val: stats?.totalUsers, color: '#6366F1' },
    { label: 'طلاب نشطون', val: stats?.activeStudents, color: '#10B981' },
    { label: 'حسابات أعمال نشطة', val: stats?.activeBusinesses, color: '#14B8A6' },
    { label: 'بانتظار الموافقة (أعمال)', val: stats?.pendingBusinessApprovals, color: '#F59E0B' },
    { label: 'هويات بانتظار المراجعة', val: stats?.pendingVerifications, color: '#F43F5E' },
    { label: 'إجمالي الطلبات', val: stats?.totalOrders, color: '#8B5CF6' },
    { label: 'دورات منشورة', val: stats?.totalCourses, color: '#6366F1' },
    { label: 'وثائق المكتبة', val: stats?.totalDocuments, color: '#14B8A6' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <span className="section-label">لوحة الإدارة</span>
        <h1 className="text-2xl font-black text-[#F1F5F9]">⚙️ مركز التحكم</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 hover:border-[#6366F1]/20 transition-all">
            <p className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.val ?? '—'}</p>
            <p className="text-xs text-[#94A3B8] leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#1E2D45]">
          <p className="text-sm font-semibold text-[#F1F5F9]">سجل النشاط الأخير</p>
        </div>
        {activityLogs.length === 0 ? (
          <div className="p-6 text-center text-[#4A5D78] text-sm">لا يوجد نشاط بعد</div>
        ) : activityLogs.map(log => (
          <div key={log._id} className="px-5 py-3 border-b border-[#1E2D45] last:border-0 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#F1F5F9]">{log.action} <span className="text-[#6366F1] font-medium">{log.targetName}</span></p>
              <p className="text-xs text-[#4A5D78] mt-0.5">{log.adminId?.name || 'Admin'}</p>
            </div>
            <span className="text-xs text-[#4A5D78] shrink-0">{new Date(log.createdAt).toLocaleDateString('ar-SY')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UsersPanel() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [actionLoading, setActionLoading] = useState(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      let url = `/users?page=${page}&limit=15`
      if (typeFilter) url += `&accountType=${typeFilter}`
      if (statusFilter) url += `&status=${statusFilter}`
      if (search) url += `&search=${encodeURIComponent(search)}`
      const data = await api.get(url)
      setUsers(data.data || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, typeFilter, statusFilter, search])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleStatusChange = async (userId, status) => {
    setActionLoading(userId)
    try {
      await api.patch(`/users/${userId}/status`, { status })
      await fetchUsers()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleVerify = async (userId, approved) => {
    setActionLoading(userId)
    try {
      await api.patch(`/users/${userId}/verify`, { approved })
      await fetchUsers()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <span className="section-label">الإدارة</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">👥 إدارة المستخدمين</h2>
        <p className="text-[#4A5D78] text-sm">{total} مستخدم إجمالاً</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="بحث بالاسم أو البريد..."
          className="bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#6366F1] transition-colors flex-1 min-w-48"
        />
        <select
          value={typeFilter}
          onChange={e => { setTypeFilter(e.target.value); setPage(1) }}
          className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#6366F1] transition-colors"
        >
          <option value="">كل الأنواع</option>
          <option value="student">طلاب</option>
          <option value="business">أعمال</option>
          <option value="admin">مشرفون</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
          className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#6366F1] transition-colors"
        >
          <option value="">كل الحالات</option>
          <option value="active">نشط</option>
          <option value="pending">معلّق</option>
          <option value="frozen">مجمّد</option>
          <option value="rejected">مرفوض</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spinner /></div>
      ) : (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
          {users.length === 0 ? (
            <div className="p-8 text-center text-[#4A5D78] text-sm">لا يوجد مستخدمون بهذه الفلاتر</div>
          ) : users.map(u => (
            <div key={u._id} className="px-5 py-4 border-b border-[#1E2D45] last:border-0 flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#F1F5F9] font-semibold text-sm">{u.name}</span>
                  {u.isVerified && <span className="text-[10px] text-[#6366F1]">✅</span>}
                </div>
                <p className="text-xs text-[#4A5D78] mt-0.5">{u.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    u.accountType === 'student' ? 'text-[#6366F1] border-[#6366F1]/20 bg-[#6366F1]/8' :
                    u.accountType === 'business' ? 'text-[#F59E0B] border-[#F59E0B]/20 bg-[#F59E0B]/8' :
                    'text-[#10B981] border-[#10B981]/20 bg-[#10B981]/8'
                  }`}>
                    {u.accountType === 'student' ? '🎓 طالب' : u.accountType === 'business' ? `💼 ${u.businessType || 'أعمال'}` : '🔐 مشرف'}
                  </span>
                  <StatusPill status={u.status} />
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Student verification */}
                {u.accountType === 'student' && u.verificationStatus === 'pending' && (
                  <>
                    <button
                      disabled={actionLoading === u._id}
                      onClick={() => handleVerify(u._id, true)}
                      className="text-xs px-3 py-1.5 bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] rounded-lg hover:bg-[#10B981]/20 transition-all disabled:opacity-50"
                    >
                      ✅ قبول
                    </button>
                    <button
                      disabled={actionLoading === u._id}
                      onClick={() => handleVerify(u._id, false)}
                      className="text-xs px-3 py-1.5 bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E] rounded-lg hover:bg-[#F43F5E]/20 transition-all disabled:opacity-50"
                    >
                      ❌ رفض
                    </button>
                  </>
                )}

                {/* Status controls */}
                {u.status !== 'frozen' && u.accountType !== 'admin' && (
                  <button
                    disabled={actionLoading === u._id}
                    onClick={() => handleStatusChange(u._id, 'frozen')}
                    className="text-xs px-3 py-1.5 bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#818CF8] rounded-lg hover:bg-[#6366F1]/20 transition-all disabled:opacity-50"
                  >
                    🔒 تجميد
                  </button>
                )}
                {u.status === 'frozen' && (
                  <button
                    disabled={actionLoading === u._id}
                    onClick={() => handleStatusChange(u._id, 'active')}
                    className="text-xs px-3 py-1.5 bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] rounded-lg hover:bg-[#10B981]/20 transition-all disabled:opacity-50"
                  >
                    🔓 إلغاء التجميد
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 15 && (
        <div className="flex items-center justify-center gap-3">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-1.5 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-lg text-sm disabled:opacity-40">السابق</button>
          <span className="text-xs text-[#4A5D78]">صفحة {page} من {Math.ceil(total / 15)}</span>
          <button disabled={page >= Math.ceil(total / 15)} onClick={() => setPage(p => p + 1)} className="px-4 py-1.5 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-lg text-sm disabled:opacity-40">التالي</button>
        </div>
      )}
    </div>
  )
}

function BusinessesPanel() {
  const [pending, setPending] = useState([])
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const [permsModal, setPermsModal] = useState(null)
  const [perms, setPerms] = useState({})

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [p, a] = await Promise.all([
        api.get('/admin/pending-businesses'),
        api.get('/users?accountType=business&limit=50'),
      ])
      setPending(p.data || [])
      setAll(a.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleApprove = async (userId, approved) => {
    setActionLoading(userId)
    try {
      await api.patch(`/admin/users/${userId}/approve-business`, { approved })
      await fetchData()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(null)
    }
  }

  const openPerms = (user) => {
    setPermsModal(user)
    setPerms(user.businessPermissions || {})
  }

  const savePerms = async () => {
    if (!permsModal) return
    setActionLoading(permsModal._id)
    try {
      await api.patch(`/admin/users/${permsModal._id}/permissions`, perms)
      setPermsModal(null)
      await fetchData()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(null)
    }
  }

  const PERM_LABELS = {
    canSellProducts: '🛒 بيع المنتجات',
    canRunAds: '📢 تشغيل الإعلانات',
    canOfferFreelance: '💼 تقديم خدمات مستقل',
    canUploadCourses: '📚 رفع دورات',
    canUploadLibraryDocs: '📄 رفع وثائق مكتبة',
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="section-label">إدارة الأعمال</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">💼 حسابات الأعمال</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spinner /></div>
      ) : (
        <>
          {/* Pending approvals */}
          {pending.length > 0 && (
            <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#F59E0B]/20">
                <p className="text-sm font-semibold text-[#F59E0B]">⏳ بانتظار الموافقة ({pending.length})</p>
              </div>
              {pending.map(biz => (
                <div key={biz._id} className="px-5 py-4 border-b border-[#F59E0B]/10 last:border-0 flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F1F5F9] font-semibold text-sm">{biz.name}</p>
                    <p className="text-xs text-[#4A5D78]">{biz.email} · {biz.businessType}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={actionLoading === biz._id}
                      onClick={() => handleApprove(biz._id, true)}
                      className="text-xs px-3 py-1.5 bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] rounded-lg hover:bg-[#10B981]/20 transition-all disabled:opacity-50"
                    >
                      ✅ قبول
                    </button>
                    <button
                      disabled={actionLoading === biz._id}
                      onClick={() => handleApprove(biz._id, false)}
                      className="text-xs px-3 py-1.5 bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E] rounded-lg hover:bg-[#F43F5E]/20 transition-all disabled:opacity-50"
                    >
                      ❌ رفض
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All business accounts */}
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1E2D45]">
              <p className="text-sm font-semibold text-[#F1F5F9]">جميع حسابات الأعمال ({all.length})</p>
            </div>
            {all.length === 0 ? (
              <div className="p-8 text-center text-[#4A5D78] text-sm">لا توجد حسابات أعمال بعد</div>
            ) : all.map(biz => (
              <div key={biz._id} className="px-5 py-4 border-b border-[#1E2D45] last:border-0 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-[#F1F5F9] font-semibold text-sm">{biz.name}</p>
                  <p className="text-xs text-[#4A5D78] mt-0.5">{biz.email} · {biz.businessType}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {Object.entries(biz.businessPermissions || {}).filter(([, v]) => v).map(([k]) => (
                      <span key={k} className="text-[10px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 rounded-full px-2 py-0.5">
                        {PERM_LABELS[k] || k}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusPill status={biz.status} />
                  <button
                    onClick={() => openPerms(biz)}
                    className="text-xs px-3 py-1.5 bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#818CF8] rounded-lg hover:bg-[#6366F1]/20 transition-all"
                  >
                    🔑 الصلاحيات
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Permissions Modal */}
      {permsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-[#F1F5F9] font-bold mb-1">صلاحيات {permsModal.name}</h3>
            <p className="text-[#4A5D78] text-xs mb-5">فعّل الخدمات التي يستطيع هذا الحساب استخدامها</p>
            <div className="flex flex-col gap-3">
              {Object.entries(PERM_LABELS).map(([k, label]) => (
                <label key={k} className="flex items-center justify-between cursor-pointer">
                  <span className="text-[#94A3B8] text-sm">{label}</span>
                  <button
                    onClick={() => setPerms(p => ({ ...p, [k]: !p[k] }))}
                    className={`w-10 h-5 rounded-full transition-all relative ${perms[k] ? 'bg-[#6366F1]' : 'bg-[#1E2D45]'}`}
                  >
                    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${perms[k] ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </label>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={savePerms}
                disabled={actionLoading === permsModal._id}
                className="flex-1 gradient-bg text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {actionLoading === permsModal._id ? 'جاري الحفظ...' : 'حفظ الصلاحيات'}
              </button>
              <button
                onClick={() => setPermsModal(null)}
                className="px-4 py-2.5 border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm hover:border-[#6366F1]/30 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function OrdersPanel() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    let url = `/admin/orders?page=${page}&limit=20`
    if (statusFilter) url += `&status=${statusFilter}`
    api.get(url)
      .then(data => { setOrders(data.data || []); setTotal(data.total || 0) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page, statusFilter])

  const STATUS_STYLE = {
    pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
    processing: 'bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/20',
    delivered: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
    cancelled: 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20',
  }
  const STATUS_LABELS = { pending: 'معلّق', processing: 'قيد المعالجة', delivered: 'تم التسليم', cancelled: 'ملغي' }

  return (
    <div className="space-y-5">
      <div>
        <span className="section-label">الإدارة</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">📦 إدارة الطلبات</h2>
        <p className="text-[#4A5D78] text-sm">{total} طلب إجمالاً</p>
      </div>

      <select
        value={statusFilter}
        onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
        className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#6366F1] transition-colors"
      >
        <option value="">كل الحالات</option>
        <option value="pending">معلّق</option>
        <option value="processing">قيد المعالجة</option>
        <option value="delivered">تم التسليم</option>
        <option value="cancelled">ملغي</option>
      </select>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spinner /></div>
      ) : (
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-[#4A5D78] text-sm">لا توجد طلبات</div>
          ) : orders.map(o => (
            <div key={o._id} className="px-5 py-4 border-b border-[#1E2D45] last:border-0 flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <p className="text-[#F1F5F9] font-semibold text-sm">{o.productId?.name || 'منتج'}</p>
                <p className="text-xs text-[#4A5D78] mt-0.5">{o.studentId?.name} · {o.studentId?.email}</p>
                <p className="text-sm font-bold gradient-text mt-1">{o.totalPrice?.toLocaleString()} SYP</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[o.status] || STATUS_STYLE.pending}`}>
                  {STATUS_LABELS[o.status] || o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {total > 20 && (
        <div className="flex items-center justify-center gap-3">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-1.5 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-lg text-sm disabled:opacity-40">السابق</button>
          <span className="text-xs text-[#4A5D78]">صفحة {page}</span>
          <button disabled={orders.length < 20} onClick={() => setPage(p => p + 1)} className="px-4 py-1.5 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-lg text-sm disabled:opacity-40">التالي</button>
        </div>
      )}
    </div>
  )
}

function RevenuePanel() {
  const [revenue, setRevenue] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/revenue')
      .then(data => setRevenue(data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <span className="section-label">المالية</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">💰 السجل المالي</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'إيرادات المتجر', val: revenue?.storeRevenue, color: '#10B981' },
            { label: 'اشتراكات المستقلين', val: revenue?.freelanceSubRevenue, color: '#6366F1' },
            { label: 'الإعلانات النشطة', val: revenue?.activeAdCampaigns, color: '#F59E0B', unit: 'حملة' },
            { label: 'مبالغ Escrow محتجزة', val: revenue?.escrowHolding, color: '#F43F5E' },
            { label: 'مبالغ Escrow محررة', val: revenue?.escrowReleased, color: '#14B8A6' },
          ].map(item => (
            <div key={item.label} className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
              <p className="text-xs text-[#4A5D78] mb-2">{item.label}</p>
              <p className="text-2xl font-black" style={{ color: item.color }}>
                {(item.val || 0).toLocaleString()} <span className="text-sm text-[#94A3B8] font-normal">{item.unit || 'SYP'}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PasswordInput({ label, value, onChange, show, setShow }) {
  return (
    <div>
      <label className="text-xs text-[#94A3B8] mb-1.5 block">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors pr-12"
        />
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5D78] hover:text-[#94A3B8] transition-colors text-xs select-none"
        >
          {show ? 'إخفاء' : 'إظهار'}
        </button>
      </div>
    </div>
  )
}

function ConfigPanel() {
  const [msg, setMsg] = useState('')
  const [config, setConfig] = useState({
    isExamSeason: false,
    isMaintenanceMode: false,
    freePromoActive: false,
    subscriptionFee: 5,
    contactEmail: '',
    contactPhone: '',
    contactLocation: '',
    socialLinks: {
      whatsapp: '',
      whatsappDisplay: '',
      telegram: '',
      telegramUsername: '',
      facebook: '',
    },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contactMsg, setContactMsg] = useState('')
  const [savingContact, setSavingContact] = useState(false)
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwMsg, setPwMsg] = useState('')
  const [pwError, setPwError] = useState('')
  const [savingPw, setSavingPw] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    api.get('/config')
      .then(data => setConfig(c => ({ ...c, ...(data.data || {}) })))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.patch('/config', {
        isExamSeason: config.isExamSeason,
        isMaintenanceMode: config.isMaintenanceMode,
        freePromoActive: config.freePromoActive,
        subscriptionFee: config.subscriptionFee,
      })
      setMsg('تم حفظ الإعدادات بنجاح')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      setMsg(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveContact = async () => {
    setSavingContact(true)
    try {
      const phoneDigits = ((config.socialLinks || {}).whatsappDisplay || config.contactPhone || '').replace(/\D/g, '')
      const autoWhatsappUrl = phoneDigits ? `https://wa.me/${phoneDigits}` : ''
      await api.patch('/config', {
        contactEmail: config.contactEmail,
        contactPhone: (config.socialLinks || {}).whatsappDisplay || config.contactPhone,
        contactLocation: config.contactLocation,
        socialLinks: {
          ...(config.socialLinks || {}),
          whatsapp: autoWhatsappUrl,
        },
      })
      setContactMsg('تم حفظ بيانات التواصل بنجاح')
      setTimeout(() => setContactMsg(''), 3000)
    } catch (err) {
      setContactMsg(err.message)
    } finally {
      setSavingContact(false)
    }
  }

  const handleChangePassword = async () => {
    setPwError('')
    setPwMsg('')
    if (!pwForm.currentPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      return setPwError('يرجى تعبئة جميع الحقول.')
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      return setPwError('كلمة المرور الجديدة وتأكيدها غير متطابقتين.')
    }
    if (pwForm.newPassword.length < 6) {
      return setPwError('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.')
    }
    setSavingPw(true)
    try {
      const res = await api.patch('/users/me/password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      })
      setPwMsg(res.message || 'تم تغيير كلمة المرور بنجاح.')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setPwMsg(''), 4000)
    } catch (err) {
      setPwError(err.message || 'حدث خطأ، حاول مجدداً.')
    } finally {
      setSavingPw(false)
    }
  }

  const setSocial = (field, val) =>
    setConfig(p => ({ ...p, socialLinks: { ...(p.socialLinks || {}), [field]: val } }))

  const Toggle = ({ label, field }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#1E2D45] last:border-0">
      <span className="text-[#94A3B8] text-sm">{label}</span>
      <button
        onClick={() => setConfig(p => ({ ...p, [field]: !p[field] }))}
        className={`w-10 h-5 rounded-full transition-all relative ${config[field] ? 'bg-[#6366F1]' : 'bg-[#1E2D45]'}`}
      >
        <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${config[field] ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <span className="section-label">الإعدادات</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">⚙️ إعدادات النظام</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spinner /></div>
      ) : (
        <div className="flex flex-wrap gap-6 items-start">
          {/* General Settings */}
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 flex-1 min-w-72 max-w-lg">
            <p className="text-sm font-semibold text-[#F1F5F9] mb-4">🔧 الإعدادات العامة</p>
            <Toggle label="موسم الامتحانات" field="isExamSeason" />
            <Toggle label="وضع الصيانة" field="isMaintenanceMode" />
            <Toggle label="عروض مجانية نشطة" field="freePromoActive" />
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#94A3B8] text-sm">رسوم الاشتراك ($)</span>
              <input
                type="number"
                value={config.subscriptionFee || 5}
                onChange={e => setConfig(p => ({ ...p, subscriptionFee: Number(e.target.value) }))}
                className="w-20 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#6366F1] text-center font-mono"
              />
            </div>
            {msg && (
              <div className="mt-3 bg-[#10B981]/10 border border-[#10B981]/25 rounded-xl px-4 py-2 text-[#10B981] text-sm">
                {msg}
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-4 w-full gradient-bg text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </button>
          </div>

          {/* Contact Details */}
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 flex-1 min-w-72 max-w-lg">
            <p className="text-sm font-semibold text-[#F1F5F9] mb-1">📬 بيانات التواصل</p>
            <p className="text-xs text-[#4A5D78] mb-5">تظهر في الفوتر وصفحة تواصل معنا تلقائياً</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={config.contactEmail || ''}
                  onChange={e => setConfig(p => ({ ...p, contactEmail: e.target.value }))}
                  placeholder="support@example.com"
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">رقم الهاتف (WhatsApp)</label>
                <input
                  type="text"
                  value={(config.socialLinks || {}).whatsappDisplay || config.contactPhone || ''}
                  onChange={e => {
                    setSocial('whatsappDisplay', e.target.value)
                    setConfig(p => ({ ...p, contactPhone: e.target.value }))
                  }}
                  placeholder="+963 999 000 111"
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">اسم مستخدم Telegram</label>
                <input
                  type="text"
                  value={(config.socialLinks || {}).telegramUsername || ''}
                  onChange={e => setSocial('telegramUsername', e.target.value)}
                  placeholder="@HalabUnver"
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">رابط Telegram</label>
                <input
                  type="url"
                  value={(config.socialLinks || {}).telegram || ''}
                  onChange={e => setSocial('telegram', e.target.value)}
                  placeholder="https://t.me/HalabUnver"
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">رابط Facebook</label>
                <input
                  type="url"
                  value={(config.socialLinks || {}).facebook || ''}
                  onChange={e => setSocial('facebook', e.target.value)}
                  placeholder="https://facebook.com/HalabUnver"
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">الموقع الجغرافي (نص)</label>
                <input
                  type="text"
                  value={config.contactLocation || ''}
                  onChange={e => setConfig(p => ({ ...p, contactLocation: e.target.value }))}
                  placeholder="جامعة حلب — سوريا"
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
            </div>
            {contactMsg && (
              <div className="mt-4 bg-[#10B981]/10 border border-[#10B981]/25 rounded-xl px-4 py-2 text-[#10B981] text-sm">
                {contactMsg}
              </div>
            )}
            <button
              onClick={handleSaveContact}
              disabled={savingContact}
              className="mt-5 w-full gradient-bg text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {savingContact ? 'جاري الحفظ...' : 'حفظ بيانات التواصل'}
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-6 flex-1 min-w-72 max-w-lg">
            <p className="text-sm font-semibold text-[#F1F5F9] mb-1">🔑 تغيير كلمة مرور المدير</p>
            <p className="text-xs text-[#4A5D78] mb-5">يجب إدخال كلمة المرور الحالية للتأكيد</p>
            <div className="space-y-4">
              <PasswordInput label="كلمة المرور الحالية" value={pwForm.currentPassword} onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))} show={showCurrent} setShow={setShowCurrent} />
              <PasswordInput label="كلمة المرور الجديدة" value={pwForm.newPassword} onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))} show={showNew} setShow={setShowNew} />
              <PasswordInput label="تأكيد كلمة المرور الجديدة" value={pwForm.confirmPassword} onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))} show={showConfirm} setShow={setShowConfirm} />
            </div>
            {pwError && (
              <div className="mt-4 bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-xl px-4 py-2 text-[#F43F5E] text-sm">
                {pwError}
              </div>
            )}
            {pwMsg && (
              <div className="mt-4 bg-[#10B981]/10 border border-[#10B981]/25 rounded-xl px-4 py-2 text-[#10B981] text-sm">
                {pwMsg}
              </div>
            )}
            <button
              onClick={handleChangePassword}
              disabled={savingPw}
              className="mt-5 w-full bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E] font-bold py-3 rounded-xl hover:bg-[#F43F5E]/20 transition-all disabled:opacity-50 text-sm"
            >
              {savingPw ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const TAG_OPTIONS = ['عام', 'أكاديمية', 'مكتبة', 'متجر', 'مستقلون', 'امتحانات']
const TAG_COLORS = {
  'عام': '#94A3B8', 'أكاديمية': '#6366F1', 'مكتبة': '#14B8A6',
  'متجر': '#F43F5E', 'مستقلون': '#F59E0B', 'امتحانات': '#8B5CF6',
}
const TYPE_COLORS = { LIVE: '#F43F5E', VIDEO: '#6366F1', PDF: '#14B8A6' }

const EMPTY_FORM = { title: '', tag: 'عام', urgent: false, isPublished: true }
const EMPTY_SESSION = { title: '', branch: '', duration: '', type: 'VIDEO', url: '' }

function AnnouncementsPanel() {
  const [tab, setTab] = useState('news')

  // ── Announcements state ──────────────────────────────────────
  const [items, setItems] = useState([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  // ── Exam / config state ───────────────────────────────────────
  const [config, setConfig] = useState({ isExamSeason: false, seasonAdvice: '', reviewSessions: [] })
  const [loadingConfig, setLoadingConfig] = useState(true)
  const [savingConfig, setSavingConfig] = useState(false)
  const [configMsg, setConfigMsg] = useState('')
  const [sessionForm, setSessionForm] = useState(EMPTY_SESSION)
  const [editSessionIdx, setEditSessionIdx] = useState(null)

  const loadItems = useCallback(() => {
    setLoadingItems(true)
    api.get('/announcements').then(d => setItems(d.data || [])).catch(console.error).finally(() => setLoadingItems(false))
  }, [])

  const loadConfig = useCallback(() => {
    setLoadingConfig(true)
    api.get('/config').then(d => setConfig(d.data || {})).catch(console.error).finally(() => setLoadingConfig(false))
  }, [])

  useEffect(() => { loadItems(); loadConfig() }, [loadItems, loadConfig])

  const flash = (text, isConfig) => {
    if (isConfig) { setConfigMsg(text); setTimeout(() => setConfigMsg(''), 3000) }
    else { setMsg(text); setTimeout(() => setMsg(''), 3000) }
  }

  // ── Announcement handlers ─────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    try {
      if (editId) { await api.patch(`/announcements/${editId}`, form); flash('تم تحديث الإعلان') }
      else { await api.post('/announcements', form); flash('تم إضافة الإعلان') }
      setForm(EMPTY_FORM); setEditId(null); loadItems()
    } catch (err) { flash(err.message) }
    finally { setSaving(false) }
  }
  const handleEdit = (item) => {
    setEditId(item._id)
    setForm({ title: item.title, tag: item.tag, urgent: item.urgent, isPublished: item.isPublished })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) return
    await api.delete(`/announcements/${id}`); loadItems()
  }
  const handleTogglePublish = async (item) => {
    await api.patch(`/announcements/${item._id}`, { ...item, isPublished: !item.isPublished }); loadItems()
  }
  const handleCancel = () => { setForm(EMPTY_FORM); setEditId(null) }

  // ── Config / exam handlers ────────────────────────────────────
  const saveConfig = async (patch) => {
    setSavingConfig(true)
    try {
      const updated = await api.patch('/config', patch)
      setConfig(updated.data || {})
      flash('تم الحفظ', true)
    } catch (err) { flash(err.message, true) }
    finally { setSavingConfig(false) }
  }

  const handleToggleExam = () => saveConfig({ isExamSeason: !config.isExamSeason })

  const handleSaveAdvice = () => saveConfig({ seasonAdvice: config.seasonAdvice })

  const handleAddSession = () => {
    if (!sessionForm.title.trim()) return
    const sessions = [...(config.reviewSessions || []), sessionForm]
    saveConfig({ reviewSessions: sessions })
    setSessionForm(EMPTY_SESSION)
    setEditSessionIdx(null)
  }
  const handleEditSession = (idx) => {
    setEditSessionIdx(idx)
    setSessionForm({ ...config.reviewSessions[idx] })
  }
  const handleSaveEditSession = () => {
    if (!sessionForm.title.trim()) return
    const sessions = (config.reviewSessions || []).map((s, i) => i === editSessionIdx ? sessionForm : s)
    saveConfig({ reviewSessions: sessions })
    setSessionForm(EMPTY_SESSION)
    setEditSessionIdx(null)
  }
  const handleDeleteSession = (idx) => {
    const sessions = (config.reviewSessions || []).filter((_, i) => i !== idx)
    saveConfig({ reviewSessions: sessions })
  }
  const cancelSessionEdit = () => { setSessionForm(EMPTY_SESSION); setEditSessionIdx(null) }

  return (
    <div className="space-y-5">
      <div>
        <span className="section-label">إدارة المحتوى</span>
        <h2 className="text-xl font-black text-[#F1F5F9]">📢 الأخبار والامتحانات</h2>
        <p className="text-sm text-[#4A5D78] mt-1">تحكم في جميع أقسام صفحة الأخبار ومركز الامتحانات</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1E2D45] pb-0">
        {[
          { key: 'news', label: '📰 الإعلانات والأخبار' },
          { key: 'exam', label: '🎓 إعدادات الامتحانات' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-xl transition-all border-b-2 -mb-px ${
              tab === t.key
                ? 'text-[#6366F1] border-[#6366F1] bg-[#6366F1]/5'
                : 'text-[#4A5D78] border-transparent hover:text-[#94A3B8]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Announcements ── */}
      {tab === 'news' && (
        <div className="space-y-5">
          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
            <p className="text-sm font-semibold text-[#F1F5F9] mb-4">{editId ? '✏️ تعديل إعلان' : '➕ إضافة إعلان جديد'}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">نص الإعلان</label>
                <textarea
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  rows={2}
                  placeholder="اكتب نص الخبر أو الإعلان هنا..."
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-[#94A3B8] mb-1.5 block">التصنيف</label>
                  <select
                    value={form.tag}
                    onChange={e => setForm(p => ({ ...p, tag: e.target.value }))}
                    className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#6366F1]"
                  >
                    {TAG_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={form.urgent} onChange={e => setForm(p => ({ ...p, urgent: e.target.checked }))} className="w-4 h-4 accent-[#F43F5E]" />
                    <span className="text-sm text-[#94A3B8]">عاجل</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} className="w-4 h-4 accent-[#10B981]" />
                    <span className="text-sm text-[#94A3B8]">منشور</span>
                  </label>
                </div>
              </div>
              {msg && <div className="bg-[#10B981]/10 border border-[#10B981]/25 rounded-xl px-4 py-2 text-[#10B981] text-sm">{msg}</div>}
              <div className="flex gap-2">
                <button type="submit" disabled={saving || !form.title.trim()} className="gradient-bg text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                  {saving ? 'جاري الحفظ...' : editId ? 'حفظ التعديل' : 'إضافة'}
                </button>
                {editId && (
                  <button type="button" onClick={handleCancel} className="px-5 py-2.5 rounded-xl text-sm border border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">إلغاء</button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1E2D45]">
              <p className="text-sm font-semibold text-[#F1F5F9]">جميع الإعلانات ({items.length})</p>
            </div>
            {loadingItems ? (
              <div className="p-8 flex justify-center"><Spinner /></div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-[#4A5D78] text-sm">لا توجد إعلانات بعد — أضف أول إعلان أعلاه</div>
            ) : (
              <div className="divide-y divide-[#1E2D45]">
                {items.map(item => (
                  <div key={item._id} className={`px-5 py-4 flex items-start gap-4 ${!item.isPublished ? 'opacity-50' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-bold rounded-full px-2.5 py-0.5" style={{ color: TAG_COLORS[item.tag], background: TAG_COLORS[item.tag] + '18' }}>{item.tag}</span>
                        {item.urgent && <span className="text-[10px] bg-[#F43F5E]/15 text-[#F43F5E] rounded-full px-2 py-0.5 font-medium">عاجل</span>}
                        {!item.isPublished && <span className="text-[10px] bg-[#4A5D78]/20 text-[#4A5D78] rounded-full px-2 py-0.5">مخفي</span>}
                        <span className="text-[10px] text-[#4A5D78]">{item.date}</span>
                      </div>
                      <p className="text-sm text-[#F1F5F9] leading-relaxed">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => handleTogglePublish(item)} className="px-2.5 py-1.5 rounded-lg text-xs border border-[#1E2D45] text-[#94A3B8] hover:text-[#10B981] hover:border-[#10B981]/30 transition-all">
                        {item.isPublished ? '👁 إخفاء' : '👁 نشر'}
                      </button>
                      <button onClick={() => handleEdit(item)} className="px-2.5 py-1.5 rounded-lg text-xs border border-[#1E2D45] text-[#94A3B8] hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all">تعديل</button>
                      <button onClick={() => handleDelete(item._id)} className="px-2.5 py-1.5 rounded-lg text-xs border border-[#1E2D45] text-[#94A3B8] hover:text-[#F43F5E] hover:border-[#F43F5E]/30 transition-all">حذف</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: Exam Settings ── */}
      {tab === 'exam' && (
        <div className="space-y-5">
          {loadingConfig ? (
            <div className="flex items-center justify-center py-12"><Spinner /></div>
          ) : (
            <>
              {configMsg && <div className="bg-[#10B981]/10 border border-[#10B981]/25 rounded-xl px-4 py-2.5 text-[#10B981] text-sm">{configMsg}</div>}

              {/* Exam Season Toggle */}
              <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
                <p className="text-sm font-semibold text-[#F1F5F9] mb-1">🔴 موسم الامتحانات نشط الآن</p>
                <p className="text-xs text-[#4A5D78] mb-4">عند التفعيل يظهر الشريط الأحمر في أعلى صفحة الأخبار</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#94A3B8]">{config.isExamSeason ? 'نشط — يظهر للزوار' : 'غير نشط — مخفي'}</span>
                  <button
                    onClick={handleToggleExam}
                    disabled={savingConfig}
                    className={`w-12 h-6 rounded-full transition-all relative disabled:opacity-50 ${config.isExamSeason ? 'bg-[#F43F5E]' : 'bg-[#1E2D45]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${config.isExamSeason ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              {/* Season Advice */}
              <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5">
                <p className="text-sm font-semibold text-[#F1F5F9] mb-1">💡 نصيحة الموسم</p>
                <p className="text-xs text-[#4A5D78] mb-4">تظهر في الصندوق الأرجواني أسفل صفحة الأخبار</p>
                <textarea
                  value={config.seasonAdvice || ''}
                  onChange={e => setConfig(p => ({ ...p, seasonAdvice: e.target.value }))}
                  rows={2}
                  placeholder="اكتب نصيحة الموسم هنا..."
                  className="w-full bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition-colors resize-none mb-3"
                />
                <button
                  onClick={handleSaveAdvice}
                  disabled={savingConfig}
                  className="gradient-bg text-white font-bold px-5 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {savingConfig ? 'جاري الحفظ...' : 'حفظ النصيحة'}
                </button>
              </div>

              {/* Review Sessions */}
              <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-[#1E2D45]">
                  <p className="text-sm font-semibold text-[#F1F5F9]">📺 المراجعات والبث المباشر</p>
                  <p className="text-xs text-[#4A5D78] mt-0.5">أضف جلسات المراجعة التي تظهر في صفحة الأخبار (LIVE / VIDEO / PDF)</p>
                </div>

                {/* Session form */}
                <div className="p-5 border-b border-[#1E2D45] space-y-3">
                  <p className="text-xs font-semibold text-[#94A3B8]">{editSessionIdx !== null ? '✏️ تعديل الجلسة' : '➕ إضافة جلسة'}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={sessionForm.title}
                      onChange={e => setSessionForm(p => ({ ...p, title: e.target.value }))}
                      placeholder="عنوان الجلسة أو الملف..."
                      className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1]"
                    />
                    <input
                      value={sessionForm.branch}
                      onChange={e => setSessionForm(p => ({ ...p, branch: e.target.value }))}
                      placeholder="التخصص (مثال: معلوماتية)"
                      className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1]"
                    />
                    <input
                      value={sessionForm.duration}
                      onChange={e => setSessionForm(p => ({ ...p, duration: e.target.value }))}
                      placeholder="المدة (مثال: 2:15:00)"
                      className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1]"
                    />
                    <select
                      value={sessionForm.type}
                      onChange={e => setSessionForm(p => ({ ...p, type: e.target.value }))}
                      className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#6366F1]"
                    >
                      <option value="LIVE">🔴 LIVE — بث مباشر</option>
                      <option value="VIDEO">🎬 VIDEO — فيديو مسجل</option>
                      <option value="PDF">📄 PDF — ملف</option>
                    </select>
                    <input
                      value={sessionForm.url}
                      onChange={e => setSessionForm(p => ({ ...p, url: e.target.value }))}
                      placeholder="رابط الجلسة أو الملف (اختياري)"
                      className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] sm:col-span-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={editSessionIdx !== null ? handleSaveEditSession : handleAddSession}
                      disabled={savingConfig || !sessionForm.title.trim()}
                      className="gradient-bg text-white font-bold px-5 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {savingConfig ? 'جاري الحفظ...' : editSessionIdx !== null ? 'حفظ التعديل' : 'إضافة'}
                    </button>
                    {editSessionIdx !== null && (
                      <button onClick={cancelSessionEdit} className="px-4 py-2 rounded-xl text-sm border border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">إلغاء</button>
                    )}
                  </div>
                </div>

                {/* Sessions list */}
                {(!config.reviewSessions || config.reviewSessions.length === 0) ? (
                  <div className="p-6 text-center text-[#4A5D78] text-sm">لا توجد جلسات بعد — أضف أول جلسة أعلاه</div>
                ) : (
                  <div className="divide-y divide-[#1E2D45]">
                    {config.reviewSessions.map((s, idx) => (
                      <div key={idx} className="px-5 py-4 flex items-center gap-4">
                        <span className="text-[10px] font-bold rounded-full px-2.5 py-1 shrink-0" style={{ color: TYPE_COLORS[s.type], background: TYPE_COLORS[s.type] + '18' }}>{s.type}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#F1F5F9] truncate">{s.title}</p>
                          <p className="text-xs text-[#4A5D78] mt-0.5">{s.branch}{s.duration ? ` · ${s.duration}` : ''}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button onClick={() => handleEditSession(idx)} className="px-2.5 py-1.5 rounded-lg text-xs border border-[#1E2D45] text-[#94A3B8] hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all">تعديل</button>
                          <button onClick={() => handleDeleteSession(idx)} className="px-2.5 py-1.5 rounded-lg text-xs border border-[#1E2D45] text-[#94A3B8] hover:text-[#F43F5E] hover:border-[#F43F5E]/30 transition-all">حذف</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

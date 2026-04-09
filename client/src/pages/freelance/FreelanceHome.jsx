import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

const TYPE_LABELS = { student: '🎓 طالب', business: '💼 مستقل خارجي' }

function ServiceCard({ service }) {
  const freelancer = service.freelancerId || {}
  return (
    <Link
      to={`/freelance/service/${service._id}`}
      className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl overflow-hidden hover:border-[#6366F1]/30 hover:-translate-y-0.5 transition-all group flex flex-col"
    >
      <div className="h-32 bg-gradient-to-br from-[#162032] to-[#0F1828] flex items-center justify-center relative overflow-hidden">
        {service.thumbnail ? (
          <img src={service.thumbnail} alt={service.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl opacity-20">💼</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-sm shrink-0">
            {freelancer.avatar ? <img src={freelancer.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : '👤'}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#94A3B8] font-medium truncate">{freelancer.name || '—'}</p>
            <p className="text-[10px] text-[#4A5D78]">{TYPE_LABELS[freelancer.accountType] || ''}</p>
          </div>
          {freelancer.isVerified && <span className="text-[#6366F1] text-xs mr-auto">✅</span>}
        </div>
        <h3 className="text-[#F1F5F9] font-bold text-sm leading-snug group-hover:text-[#818CF8] transition-colors line-clamp-2">{service.title}</h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-[#4A5D78]">
          {service.rating > 0 && <span>⭐ {service.rating?.toFixed(1)}</span>}
          {service.totalOrders > 0 && <span>📦 {service.totalOrders} طلب</span>}
          {service.deliveryDays && <span>⏱ {service.deliveryDays} أيام</span>}
        </div>
        <div className="mt-auto pt-3 border-t border-[#1E2D45]">
          <span className="text-sm font-black gradient-text">{service.price?.toLocaleString()} SYP</span>
        </div>
      </div>
    </Link>
  )
}

function FreelancerCard({ profile }) {
  return (
    <Link
      to={`/freelance/profile/${profile._id}`}
      className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 hover:border-[#6366F1]/30 transition-all flex items-center gap-4 group"
    >
      <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-xl shrink-0">
        {profile.userId?.avatar ? <img src={profile.userId.avatar} alt="" className="w-full h-full object-cover rounded-2xl" /> : '👤'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#F1F5F9] font-bold group-hover:text-[#818CF8] transition-colors">{profile.displayName || profile.userId?.name}</p>
        <p className="text-xs text-[#4A5D78] mt-0.5">{profile.title}</p>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-[#4A5D78]">
          {profile.rating > 0 && <span>⭐ {profile.rating?.toFixed(1)}</span>}
          {profile.completedJobs > 0 && <span>✓ {profile.completedJobs} مشروع</span>}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold gradient-text">{profile.hourlyRate ? `${profile.hourlyRate?.toLocaleString()} SYP/h` : '—'}</p>
        {profile.isAvailable && <span className="text-[10px] text-[#10B981] mt-1 block">● متاح</span>}
      </div>
    </Link>
  )
}

export default function FreelanceHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('services')
  const [services, setServices] = useState([])
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    setError('')
    if (tab === 'services') {
      let url = `/freelance/services?page=${page}&limit=12`
      if (type) url += `&type=${type}`
      if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`
      api.get(url)
        .then(data => { setServices(data.data || []); setTotal(data.total || 0) })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    } else {
      let url = `/freelance/profiles?page=${page}&limit=12`
      if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`
      api.get(url)
        .then(data => { setProfiles(data.data || []); setTotal(data.total || 0) })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [tab, page, type, search])

  const canJoin = user?.accountType === 'student' && !user?.isFreelancer
  const isFreelancer = user?.isFreelancer || user?.businessPermissions?.canOfferFreelance

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="section-label">العمل الحر</span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#F1F5F9] mb-2">سوق المستقلين 💼</h1>
            <p className="text-[#4A5D78] text-sm">خدمات مقدّمة من طلاب جامعة حلب ومستقلين خارجيين</p>
          </div>
          {canJoin && (
            <Link
              to="/freelance/onboarding"
              className="gradient-bg text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              💼 انضم كمستقل
            </Link>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {[
            { key: 'services', label: '🔧 الخدمات' },
            { key: 'profiles', label: '👤 المستقلون' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setPage(1) }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t.key ? 'gradient-bg text-white' : 'bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/30'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder={tab === 'services' ? 'ابحث في الخدمات...' : 'ابحث في المستقلين...'}
            className="flex-1 min-w-48 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
          />
          {tab === 'services' && (
            <select
              value={type}
              onChange={e => { setType(e.target.value); setPage(1) }}
              className="bg-[#162032] border border-[#1E2D45] text-[#94A3B8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
            >
              <option value="">الكل</option>
              <option value="student">طلاب فقط</option>
              <option value="external">مستقلون خارجيون</option>
            </select>
          )}
          <span className="text-xs text-[#4A5D78]">{total} {tab === 'services' ? 'خدمة' : 'مستقل'}</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-2xl p-8 text-center text-[#F43F5E]">{error}</div>
        ) : tab === 'services' ? (
          services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-[#F1F5F9] font-bold text-lg mb-2">لا توجد خدمات بعد</p>
              <p className="text-[#4A5D78] text-sm">كن أول من يقدم خدمة على المنصة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {services.map(s => <ServiceCard key={s._id} service={s} />)}
            </div>
          )
        ) : (
          profiles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">👤</p>
              <p className="text-[#F1F5F9] font-bold text-lg mb-2">لا يوجد مستقلون بعد</p>
              <p className="text-[#4A5D78] text-sm">انضم إلى المنصة كمستقل وابدأ</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profiles.map(p => <FreelancerCard key={p._id} profile={p} />)}
            </div>
          )
        )}

        {total > 12 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">السابق</button>
            <span className="text-sm text-[#4A5D78]">صفحة {page}</span>
            <button disabled={services.length < 12 && profiles.length < 12} onClick={() => setPage(p => p + 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">التالي</button>
          </div>
        )}
      </div>
    </div>
  )
}

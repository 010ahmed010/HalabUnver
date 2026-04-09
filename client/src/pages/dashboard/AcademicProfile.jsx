import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'

function xpToLevel(xp) { return Math.floor((xp || 0) / 500) + 1 }
function xpProgress(xp) { return Math.round(((xp || 0) % 500) / 500 * 100) }

export default function AcademicProfile() {
  const { user, refreshUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const level = xpToLevel(user?.xp)
  const progress = xpProgress(user?.xp)
  const nextLevelXp = level * 500

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.patch('/users/me/profile', form)
      await refreshUser()
      setEditing(false)
      setMsg('تم تحديث الملف بنجاح')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      setMsg(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Identity Header */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-[#6366F1]/20">
            {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-2xl" /> : '👤'}
          </div>
          <div className="flex-1">
            {user?.isVerified && (
              <span className="text-xs font-medium text-[#6366F1] bg-[#6366F1]/10 rounded-full px-2.5 py-0.5 inline-block mb-2">✅ موثّق</span>
            )}
            {user?.verificationStatus === 'pending' && (
              <span className="text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/10 rounded-full px-2.5 py-0.5 inline-block mb-2">⏳ الهوية قيد المراجعة</span>
            )}
            <h1 className="text-2xl font-black text-[#F1F5F9]">{user?.name}</h1>
            <p className="text-sm text-[#94A3B8]">
              {user?.year ? `${user.year} · ` : ''}{user?.faculty || ''}
            </p>
            {user?.bio && <p className="text-xs text-[#4A5D78] italic mt-1">"{user.bio}"</p>}
          </div>
        </div>
        {msg && (
          <div className="mt-3 bg-[#10B981]/10 border border-[#10B981]/25 rounded-xl px-4 py-2 text-[#10B981] text-sm">
            {msg}
          </div>
        )}
      </div>

      {/* XP Engine */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
        <span className="section-label">نظام XP</span>
        <div className="flex items-center justify-between mb-2 mt-2">
          <span className="text-sm text-[#F1F5F9] font-bold">Level {level}</span>
          <span className="text-xs text-[#4A5D78]">{user?.xp || 0} / {nextLevelXp} XP</span>
        </div>
        <div className="h-3 bg-[#162032] rounded-full overflow-hidden">
          <div className="h-3 gradient-bg rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Academic DNA */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="section-label">الملف الأكاديمي</span>
          <button
            onClick={() => setEditing(!editing)}
            className="text-xs text-[#6366F1] hover:underline font-medium"
          >
            {editing ? 'إلغاء' : '✏️ تعديل'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94A3B8] text-xs">الاسم</label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#6366F1] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94A3B8] text-xs">النبذة الشخصية</label>
              <textarea
                value={form.bio}
                onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                rows={3}
                maxLength={500}
                placeholder="عبّر عن نفسك..."
                className="bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#6366F1] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="gradient-bg text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4">
              <p className="text-[10px] text-[#4A5D78] font-medium mb-1">الكلية</p>
              <p className="text-sm text-[#F1F5F9] font-medium">{user?.faculty || '—'}</p>
            </div>
            <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4">
              <p className="text-[10px] text-[#4A5D78] font-medium mb-1">السنة</p>
              <p className="text-sm text-[#F1F5F9] font-medium">{user?.year || '—'}</p>
            </div>
            <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4 col-span-2">
              <p className="text-[10px] text-[#4A5D78] font-medium mb-1.5">المهارات</p>
              <div className="flex flex-wrap gap-1">
                {user?.skills?.length ? user.skills.map(s => (
                  <span key={s} className="text-[10px] bg-[#0F1828] rounded-full px-2 py-0.5 text-[#94A3B8] border border-[#1E2D45]">{s}</span>
                )) : <span className="text-xs text-[#4A5D78]">لا توجد مهارات مضافة</span>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tiles */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'دوراتي', icon: '📚', desc: 'المقررات المسجّل بها', href: '/dashboard/learning' },
          { label: 'طلباتي', icon: '🛒', desc: 'مشتريات المتجر', href: '/dashboard/orders' },
          { label: 'محفظتي', icon: '💳', desc: 'المدفوعات والرصيد', href: '/dashboard/wallet' },
          { label: 'الرسائل', icon: '📥', desc: 'إشعارات المنصة', href: '/dashboard/inbox' },
        ].map(t => (
          <Link
            key={t.href}
            to={t.href}
            className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 hover:border-[#6366F1]/30 hover:bg-[#6366F1]/5 transition-all"
          >
            <span className="text-xl block mb-1">{t.icon}</span>
            <p className="text-sm font-bold text-[#F1F5F9]">{t.label}</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">{t.desc}</p>
          </Link>
        ))}
      </div>

      {/* University ID Verification */}
      {!user?.isVerified && user?.verificationStatus === 'none' && (
        <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-2xl p-5">
          <p className="text-[#F59E0B] font-bold text-sm mb-1">🎓 وثّق هويتك الجامعية</p>
          <p className="text-[#94A3B8] text-xs mb-3">احصل على +500 XP وعلامة التحقق بعد قبول هويتك</p>
          <UniversityIdUpload onSuccess={refreshUser} />
        </div>
      )}
    </div>
  )
}

function UniversityIdUpload({ onSuccess }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    try {
      await api.post('/users/me/university-id', { photoUrl: url })
      setMsg('تم إرسال طلب التحقق بنجاح — في انتظار مراجعة الإدارة')
      setUrl('')
      onSuccess?.()
    } catch (err) {
      setMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="رابط صورة البطاقة الجامعية..."
        className="flex-1 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#F59E0B] transition-colors"
      />
      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="px-4 py-2 bg-[#F59E0B] text-[#070C18] font-bold text-xs rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? '...' : 'إرسال'}
      </button>
      {msg && <p className="text-xs text-[#10B981] mt-2">{msg}</p>}
    </form>
  )
}

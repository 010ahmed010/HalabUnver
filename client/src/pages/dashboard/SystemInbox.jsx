import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

const CATEGORY_ICONS = {
  financial: '💳',
  academic: '🎓',
  announcements: '📢',
  general: '🔔',
  freelance: '💼',
}

const TAB_FILTERS = [
  { key: 'all', label: '📥 الكل' },
  { key: 'financial', label: '💳 مالي' },
  { key: 'academic', label: '🎓 أكاديمي' },
  { key: 'announcements', label: '📢 إعلانات' },
]

export default function SystemInbox() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    api.get('/notifications')
      .then(data => setNotifications(data.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = notifications.filter(n =>
    activeTab === 'all' || n.category === activeTab
  )

  const unread = notifications.filter(n => !n.isRead).length

  const markRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`)
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
    } catch {}
  }

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all')
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    } catch {}
  }

  const handleExpand = (id) => {
    setExpanded(prev => prev === id ? null : id)
    const notif = notifications.find(n => n._id === id)
    if (notif && !notif.isRead) markRead(id)
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <span className="section-label">الإشعارات</span>
          <h2 className="text-xl font-black text-[#F1F5F9]">
            صندوق الرسائل {unread > 0 && <span className="text-sm text-[#F43F5E] bg-[#F43F5E]/10 rounded-full px-2 py-0.5 mr-2">{unread} غير مقروء</span>}
          </h2>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs text-[#6366F1] hover:underline font-medium">
            تحديد الكل كمقروء
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {TAB_FILTERS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === t.key ? 'gradient-bg text-white' : 'bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-2xl p-6 text-center text-[#F43F5E] text-sm">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-10 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-[#4A5D78] text-sm">لا توجد رسائل في هذا القسم</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map(n => (
            <div
              key={n._id}
              className={`bg-[#0F1828] border rounded-2xl overflow-hidden cursor-pointer transition-all ${
                !n.isRead ? 'border-[#6366F1]/30' : 'border-[#1E2D45]'
              } hover:border-[#6366F1]/20`}
              onClick={() => handleExpand(n._id)}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="text-xl shrink-0">{CATEGORY_ICONS[n.category] || '🔔'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-[#6366F1] shrink-0" />}
                    <p className={`text-sm font-semibold truncate ${!n.isRead ? 'text-[#F1F5F9]' : 'text-[#94A3B8]'}`}>{n.title}</p>
                  </div>
                  <p className="text-xs text-[#4A5D78] truncate">{n.body}</p>
                </div>
                <span className="text-[10px] text-[#4A5D78] shrink-0">
                  {new Date(n.createdAt).toLocaleDateString('ar-SY')}
                </span>
              </div>
              {expanded === n._id && (
                <div className="px-5 pb-4 border-t border-[#1E2D45] pt-3 animate-fade-up">
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{n.body}</p>
                  {n.actionUrl && (
                    <a href={n.actionUrl} className="inline-block mt-3 text-xs text-[#6366F1] hover:underline font-medium">
                      {n.actionLabel || 'اذهب'}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

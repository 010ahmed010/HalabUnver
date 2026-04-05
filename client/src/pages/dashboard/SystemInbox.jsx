import { useState } from 'react'
import { Link } from 'react-router-dom'

const MESSAGES = [
  { id: 1, sender: '🛠️ Admin', title: 'تم التحقق من دفع الطلب #HS-702', time: 'منذ دقيقتين', read: false, tab: 'financial', body: 'تم التحقق من إيصال ShamCash الخاص بطلب Huion H640P. المنتج جاهز للاستلام من مكتب 402.', xp: '+0' },
  { id: 2, sender: '📢 Admin', title: 'ملخصات جديدة أُضيفت للمكتبة — هندسة معمارية', time: 'منذ ساعة', read: false, tab: 'academic', body: 'تم إضافة 14 ملخصاً جديداً لكلية الهندسة المعمارية. رابط: المكتبة > معمار', xp: '', action: { label: '📂 فتح في المكتبة', href: '/library' } },
  { id: 3, sender: '💼 Freelancer', title: 'تسليم مشروع — Project X', time: 'منذ 3 ساعات', read: false, tab: 'all', body: 'قدّم المستقل الملفات النهائية لـ "Project X". لديك 48 ساعة للمراجعة وإلّا ستُحرّر الأموال تلقائياً.', xp: '', action: { label: '👁️ مراجعة التسليم', href: '/dashboard' } },
  { id: 4, sender: '🎓 Academy Bot', title: 'أتممت دورة AutoCAD — +250 XP', time: 'منذ يوم', read: true, tab: 'academic', body: 'تهانينا! أتممت دورة AutoCAD للمبتدئين. شهادتك جاهزة للتحميل.', xp: '+250 XP' },
  { id: 5, sender: '📢 Admin', title: 'تحديث النظام — إطلاق سوق المستقلين v2', time: 'منذ يومين', read: true, tab: 'announcements', body: 'تم إطلاق الإصدار الجديد من سوق المستقلين مع نظام الوساطة المحسّن وبروتوكول الضمان.', xp: '' },
]

const TABS = [
  { key: 'all', label: '📥 الكل' },
  { key: 'financial', label: '💳 مالي' },
  { key: 'academic', label: '🎓 أكاديمي' },
  { key: 'announcements', label: '📢 إعلانات' },
]

export default function SystemInbox() {
  const [activeTab, setActiveTab] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const [messages, setMessages] = useState(MESSAGES)

  const filtered = messages.filter(m => activeTab === 'all' || m.tab === activeTab)
  const unread = messages.filter(m => !m.read).length

  const markRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }
  const markAllRead = () => setMessages(prev => prev.map(m => ({ ...m, read: true })))

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#E0E0E0]">📥 صندوق الرسائل</h2>
        {unread > 0 && <span className="text-xs bg-[#EF4444] text-white px-2 py-0.5 font-bold">{unread} جديد</span>}
      </div>

      {/* Status ticker */}
      <div className="border border-[#2A2A2A] bg-[#0E0E0E] overflow-hidden">
        <div className="flex items-center gap-4 py-2 animate-marquee whitespace-nowrap">
          <span className="text-xs font-mono text-[#888] px-4">[ BROADCAST ]</span>
          <span className="text-xs text-[#E0E0E0]">تحديث النظام: تم إضافة ملخصات امتحانات هندسة المعمارية في المكتبة.</span>
          <span className="text-xs font-mono text-[#BB86FC]">•</span>
          <span className="text-xs text-[#E0E0E0]">Stay Informed. Challenge Every Day.</span>
          <span className="text-xs font-mono text-[#BB86FC] px-4">•</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2A2A2A] gap-0">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-xs transition-colors ${activeTab === t.key ? 'border-b-2 border-[#BB86FC] text-[#BB86FC]' : 'text-[#888] hover:text-[#E0E0E0]'}`}>
            {t.label}
          </button>
        ))}
        <button onClick={markAllRead} className="mr-auto px-3 py-2.5 text-xs text-[#555] hover:text-[#888] transition-colors">
          🧹 قراءة الكل
        </button>
      </div>

      {/* Message list */}
      <div className="space-y-2">
        {filtered.map(m => (
          <div key={m.id} className={`border transition-colors ${!m.read ? 'border-[#BB86FC]/30 bg-[#BB86FC]/5' : 'border-[#2A2A2A] bg-[#1E1E1E]'}`}>
            <button
              className="w-full text-right p-4 flex items-start gap-3"
              onClick={() => { setExpanded(expanded === m.id ? null : m.id); markRead(m.id) }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#888]">{m.sender}</span>
                  {!m.read && <span className="w-2 h-2 rounded-full bg-[#BB86FC] animate-pulse" />}
                </div>
                <p className={`text-sm ${!m.read ? 'text-[#E0E0E0] font-bold' : 'text-[#888]'}`}>{m.title}</p>
              </div>
              <span className="text-[10px] font-mono text-[#555] shrink-0">{m.time}</span>
            </button>

            {expanded === m.id && (
              <div className="border-t border-[#2A2A2A] px-4 pb-4 pt-3 animate-fade-up">
                <p className="text-sm text-[#888] leading-relaxed mb-3">{m.body}</p>
                {m.xp && <span className="text-xs font-mono text-[#4CAF50]">XP المكافأة: {m.xp}</span>}
                {m.action && (
                  <Link to={m.action.href} className="inline-block mt-2 px-4 py-1.5 border border-[#BB86FC]/40 text-[#BB86FC] text-xs hover:bg-[#BB86FC]/10 transition-colors">
                    {m.action.label}
                  </Link>
                )}
                <div className="flex gap-2 mt-3">
                  <button className="text-xs text-[#555] hover:text-[#888] border border-[#2A2A2A] px-2 py-1 transition-colors">🗑️ أرشفة</button>
                  <button className="text-xs text-[#555] hover:text-[#888] border border-[#2A2A2A] px-2 py-1 transition-colors">✅ تحديد مقروء</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Escrow alert */}
      <div className="border border-[#EF4444]/30 bg-[#EF4444]/5 p-4">
        <p className="text-xs font-mono text-[#EF4444] mb-1">[ ESCROW_ALERT ] — تنبيه وساطة</p>
        <p className="text-sm text-[#E0E0E0] mb-2">قدّم المستقل ملفات "Project X". لديك 48 ساعة للمراجعة.</p>
        <Link to="/dashboard" className="text-xs border border-[#EF4444]/40 text-[#EF4444] px-3 py-1.5 hover:bg-[#EF4444]/10 transition-colors inline-block">
          👁️ مراجعة التسليم
        </Link>
      </div>

      {/* Settings */}
      <div className="border border-[#2A2A2A] p-5">
        <p className="text-xs font-mono text-[#888] mb-3">[ NOTIFICATION_SETTINGS ] ⚙</p>
        <div className="space-y-2">
          {[
            { label: '👁️ إشعارات المتصفح', val: true },
            { label: '📱 تنبيهات WhatsApp', val: false },
            { label: '📧 ملخص أسبوعي بالإيميل', val: true },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between text-sm">
              <span className="text-[#888]">{s.label}</span>
              <span className={`text-xs font-mono ${s.val ? 'text-[#4CAF50]' : 'text-[#555]'}`}>{s.val ? 'ON' : 'OFF'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

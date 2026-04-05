import { useState } from 'react'
import { Link } from 'react-router-dom'

const MESSAGES = [
  { id: 1, sender: '⚙ Admin', title: 'تم التحقق من دفع الطلب #HS-702', time: 'منذ دقيقتين', read: false, tab: 'financial', body: 'تم التحقق من إيصال ShamCash الخاص بطلب Huion H640P. المنتج جاهز للاستلام من مكتب 402.', xp: '' },
  { id: 2, sender: '📢 Admin', title: 'ملخصات جديدة أُضيفت للمكتبة — هندسة معمارية', time: 'منذ ساعة', read: false, tab: 'academic', body: 'تم إضافة 14 ملخصاً جديداً لكلية الهندسة المعمارية. المكتبة > معمار', xp: '', action: { label: '📂 فتح في المكتبة', href: '/library' } },
  { id: 3, sender: '💼 Freelancer', title: 'تسليم مشروع — Project X', time: 'منذ 3 ساعات', read: false, tab: 'all', body: 'قدّم المستقل الملفات النهائية لـ "Project X". لديك 48 ساعة للمراجعة وإلّا ستُحرّر الأموال تلقائياً.', xp: '', action: { label: '👁 مراجعة التسليم', href: '/dashboard' } },
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

  const markRead = (id) => setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  const markAllRead = () => setMessages(prev => prev.map(m => ({ ...m, read: true })))

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <span className="section-label">التواصل</span>
          <h2 className="text-xl font-black text-[#F1F5F9]">صندوق الرسائل</h2>
        </div>
        {unread > 0 && (
          <span className="text-xs bg-[#F43F5E] text-white px-2.5 py-1 rounded-full font-bold">
            {unread} غير مقروء
          </span>
        )}
      </div>

      {/* Broadcast ticker */}
      <div className="bg-[#0F1828] rounded-xl border border-[#1E2D45] overflow-hidden">
        <div className="flex items-center py-2.5 gap-3 animate-marquee whitespace-nowrap">
          <span className="text-xs font-semibold text-[#6366F1] px-3 shrink-0">📡 بث حي</span>
          <span className="text-xs text-[#94A3B8]">تحديث: تم إضافة ملخصات امتحانات هندسة المعمارية في المكتبة.</span>
          <span className="text-[#6366F1] px-2">·</span>
          <span className="text-xs text-[#94A3B8]">Stay Informed. Challenge Every Day.</span>
          <span className="text-[#6366F1] px-2">·</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[#1E2D45] gap-0">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-xs transition-colors ${
              activeTab === t.key
                ? 'border-b-2 border-[#6366F1] text-[#6366F1] font-semibold'
                : 'text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            {t.label}
          </button>
        ))}
        <button onClick={markAllRead} className="mr-auto px-3 py-2.5 text-xs text-[#4A5D78] hover:text-[#94A3B8] transition-colors">
          🧹 قراءة الكل
        </button>
      </div>

      {/* Messages */}
      <div className="space-y-2">
        {filtered.map(m => (
          <div
            key={m.id}
            className={`rounded-2xl border transition-all ${
              !m.read
                ? 'border-[#6366F1]/20 bg-[#6366F1]/5'
                : 'border-[#1E2D45] bg-[#0F1828]'
            }`}
          >
            <button
              className="w-full text-right p-4 flex items-start gap-3"
              onClick={() => { setExpanded(expanded === m.id ? null : m.id); markRead(m.id) }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#94A3B8]">{m.sender}</span>
                  {!m.read && <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-blink-soft" />}
                </div>
                <p className={`text-sm ${!m.read ? 'text-[#F1F5F9] font-bold' : 'text-[#94A3B8]'}`}>{m.title}</p>
              </div>
              <span className="text-[10px] text-[#4A5D78] shrink-0 mt-0.5">{m.time}</span>
            </button>

            {expanded === m.id && (
              <div className="border-t border-[#1E2D45] px-4 pb-4 pt-3 animate-fade-up">
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">{m.body}</p>
                {m.xp && (
                  <span className="text-xs font-bold text-[#10B981] font-mono">مكافأة XP: {m.xp}</span>
                )}
                {m.action && (
                  <Link
                    to={m.action.href}
                    className="inline-block mt-2 px-4 py-1.5 rounded-lg border border-[#6366F1]/30 text-[#6366F1] text-xs hover:bg-[#6366F1]/10 transition-all"
                  >
                    {m.action.label}
                  </Link>
                )}
                <div className="flex gap-2 mt-3">
                  <button className="text-xs text-[#4A5D78] hover:text-[#94A3B8] border border-[#1E2D45] rounded-lg px-2.5 py-1 transition-colors">🗑 أرشفة</button>
                  <button className="text-xs text-[#4A5D78] hover:text-[#94A3B8] border border-[#1E2D45] rounded-lg px-2.5 py-1 transition-colors">✓ مقروء</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Escrow alert */}
      <div className="bg-[#F43F5E]/5 rounded-2xl border border-[#F43F5E]/30 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#F43F5E] animate-blink-soft" />
          <p className="text-xs font-semibold text-[#F43F5E]">تنبيه وساطة — Escrow</p>
        </div>
        <p className="text-sm text-[#F1F5F9] mb-3">قدّم المستقل ملفات "Project X". لديك 48 ساعة للمراجعة وإلّا ستُحرّر الأموال تلقائياً.</p>
        <Link to="/dashboard" className="inline-block px-4 py-2 rounded-lg border border-[#F43F5E]/40 text-[#F43F5E] text-xs hover:bg-[#F43F5E]/10 transition-all">
          👁 مراجعة التسليم
        </Link>
      </div>

      {/* Notification settings */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5">
        <p className="text-xs font-semibold text-[#F1F5F9] mb-3">إعدادات الإشعارات</p>
        <div className="space-y-3">
          {[
            { label: '👁 إشعارات المتصفح', val: true },
            { label: '📱 تنبيهات WhatsApp', val: false },
            { label: '📧 ملخص أسبوعي بالإيميل', val: true },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between text-sm">
              <span className="text-[#94A3B8]">{s.label}</span>
              <span className={`text-xs font-mono font-bold ${s.val ? 'text-[#10B981]' : 'text-[#4A5D78]'}`}>
                {s.val ? 'مفعّل' : 'معطّل'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

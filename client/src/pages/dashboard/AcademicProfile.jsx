import { useState } from 'react'
import { Link } from 'react-router-dom'

const XP_HISTORY = [
  { action: 'تحميل ملخص هندسة البرمجيات', xp: '+25 XP', time: 'منذ يوم', color: '#14B8A6' },
  { action: 'إتمام دورة React.js', xp: '+250 XP', time: 'منذ 3 أيام', color: '#6366F1' },
  { action: 'توثيق الهوية الجامعية', xp: '+500 XP', time: 'منذ أسبوع', color: '#8B5CF6' },
  { action: 'التسجيل في المنصة', xp: '+100 XP', time: 'منذ شهر', color: '#10B981' },
]

const ACHIEVEMENTS = [
  { icon: '🏆', label: 'Top 100 مستقلون' },
  { icon: '📚', label: 'محرّك المعرفة' },
  { icon: '🎓', label: 'أكاديمي متقدم' },
  { icon: '✅', label: 'هوية موثّقة' },
]

const QUICK_STATS = [
  { label: 'تحميلات المكتبة', val: '42', icon: '📚', color: '#14B8A6' },
  { label: 'خدمات نشطة', val: '3', icon: '💼', color: '#F59E0B' },
  { label: 'طلبات المتجر', val: '1', icon: '🛒', color: '#F43F5E' },
  { label: 'دورات مكتملة', val: '3', icon: '🎓', color: '#6366F1' },
]

export default function AcademicProfile() {
  const [isPublic, setIsPublic] = useState(false)
  const [showXPHistory, setShowXPHistory] = useState(false)

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Identity Header */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-[#6366F1]/20">👤</div>
          <div className="flex-1">
            <span className="text-xs font-medium text-[#6366F1] bg-[#6366F1]/10 rounded-full px-2.5 py-0.5 inline-block mb-2">✅ Verified Student</span>
            <h1 className="text-2xl font-black text-[#F1F5F9]">أحمد الجاسم</h1>
            <p className="text-sm text-[#94A3B8]">السنة الرابعة · كلية الهندسة المعلوماتية</p>
            <p className="text-xs text-[#4A5D78] italic mt-1">"Challenge Every Day"</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#94A3B8]">عام</span>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`w-11 h-6 rounded-full transition-all relative ${isPublic ? 'bg-[#6366F1]' : 'bg-[#1E2D45]'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${isPublic ? 'left-6' : 'left-1'}`} />
            </button>
            <span className="text-xs text-[#94A3B8]">خاص</span>
          </div>
        </div>
      </div>

      {/* XP Engine */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="section-label">نظام XP</span>
          <button onClick={() => setShowXPHistory(!showXPHistory)} className="text-xs text-[#6366F1] hover:underline font-medium">
            سجل النمو {showXPHistory ? '↑' : '↓'}
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#F1F5F9] font-bold">Level 4 — Academic Researcher</span>
        </div>
        <div className="flex justify-between text-xs text-[#94A3B8] mb-2">
          <span>1,600 XP</span>
          <span>2,500 XP (Level 5)</span>
        </div>
        <div className="h-3 bg-[#162032] rounded-full overflow-hidden mb-3">
          <div className="h-3 gradient-bg rounded-full transition-all w-[64%]" />
        </div>
        {showXPHistory && (
          <div className="space-y-2.5 mt-4 border-t border-[#1E2D45] pt-4 animate-fade-up">
            {XP_HISTORY.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-[#94A3B8]">{h.action}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold font-mono" style={{ color: h.color }}>{h.xp}</span>
                  <span className="text-[#4A5D78]">{h.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Academic DNA */}
      <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-6">
        <span className="section-label">الملف الأكاديمي</span>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4">
            <p className="text-[10px] text-[#4A5D78] font-medium mb-1">التخصص</p>
            <p className="text-sm text-[#F1F5F9] font-medium">هندسة معلوماتية — برمجيات</p>
          </div>
          <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4">
            <p className="text-[10px] text-[#4A5D78] font-medium mb-1">المهارات</p>
            <div className="flex flex-wrap gap-1">
              {['MERN', 'Linux', 'Pentesting'].map(s => (
                <span key={s} className="text-[10px] bg-[#0F1828] rounded-full px-2 py-0.5 text-[#94A3B8] border border-[#1E2D45]">{s}</span>
              ))}
            </div>
          </div>
          <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4">
            <p className="text-[10px] text-[#4A5D78] font-medium mb-1">الإنجازات</p>
            <div className="flex gap-1.5">
              {ACHIEVEMENTS.slice(0, 3).map(a => (
                <span key={a.icon} title={a.label} className="text-base cursor-help">{a.icon}</span>
              ))}
            </div>
          </div>
          <div className="bg-[#162032] rounded-xl border border-[#1E2D45] p-4">
            <p className="text-[10px] text-[#4A5D78] font-medium mb-1">الإحصائيات</p>
            <div className="space-y-1">
              {QUICK_STATS.slice(0, 2).map(s => (
                <div key={s.label} className="flex justify-between text-xs">
                  <span className="text-[#94A3B8]">{s.label}</span>
                  <span className="text-[#F1F5F9] font-bold">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_STATS.map(s => (
          <div
            key={s.label}
            className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 text-center hover:border-[#6366F1]/20 transition-all"
          >
            <span className="text-xl block mb-1">{s.icon}</span>
            <span className="text-2xl font-black" style={{ color: s.color }}>{s.val}</span>
            <p className="text-xs text-[#94A3B8] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Navigation Tiles */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'دوراتي', icon: '📚', desc: 'المقررات المسجّل بها', href: '/dashboard/learning' },
          { label: 'طلباتي', icon: '🛒', desc: 'مشتريات المتجر', href: '/dashboard/orders' },
          { label: 'محفظتي', icon: '💳', desc: 'المدفوعات والاشتراك', href: '/dashboard/wallet' },
          { label: 'الرسائل', icon: '📥', desc: '3 رسائل غير مقروءة', href: '/dashboard/inbox' },
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

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 gradient-bg text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
          ✏️ تعديل الملف الشخصي
        </button>
        <button className="px-5 py-3 border border-[#1E2D45] text-[#94A3B8] text-sm rounded-xl hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all">
          📤 مشاركة
        </button>
      </div>
    </div>
  )
}

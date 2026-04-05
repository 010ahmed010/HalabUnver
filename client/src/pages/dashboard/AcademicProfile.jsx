import { useState } from 'react'
import { Link } from 'react-router-dom'

const XP_HISTORY = [
  { action: 'تحميل ملخص هندسة البرمجيات', xp: '+25 XP', time: 'منذ يوم' },
  { action: 'إتمام دورة React.js', xp: '+250 XP', time: 'منذ 3 أيام' },
  { action: 'توثيق الهوية الجامعية', xp: '+500 XP', time: 'منذ أسبوع' },
  { action: 'التسجيل في المنصة', xp: '+100 XP', time: 'منذ شهر' },
]

const ACHIEVEMENTS = [
  { icon: '🏆', label: 'Top 100 مستقلون' },
  { icon: '📚', label: 'محرّك المعرفة' },
  { icon: '🎓', label: 'أكاديمي متقدم' },
  { icon: '✅', label: 'هوية موثّقة' },
]

const QUICK_STATS = [
  { label: 'تحميلات المكتبة', val: '42', icon: '📚' },
  { label: 'خدمات نشطة', val: '3', icon: '💼' },
  { label: 'طلبات المتجر', val: '1', icon: '🛒' },
  { label: 'دورات مكتملة', val: '3', icon: '🎓' },
]

export default function AcademicProfile() {
  const [isPublic, setIsPublic] = useState(false)
  const [showXPHistory, setShowXPHistory] = useState(false)

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Identity Header */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 border-2 border-[#BB86FC] flex items-center justify-center text-3xl shrink-0 animate-pulse-glow">👤</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-[#BB86FC] border border-[#BB86FC]/40 px-2 py-0.5">✅ Verified Student</span>
            </div>
            <h1 className="text-2xl font-black text-[#E0E0E0]">أحمد الجاسم</h1>
            <p className="text-sm text-[#888]">السنة الرابعة · كلية الهندسة المعلوماتية</p>
            <p className="text-xs text-[#555] italic mt-1">"Challenge Every Day"</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-[#888]">عام</span>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`w-10 h-5 rounded-full transition-colors relative ${isPublic ? 'bg-[#BB86FC]' : 'bg-[#2A2A2A]'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${isPublic ? 'left-5' : 'left-0.5'}`} />
            </button>
            <span className="text-xs text-[#888]">خاص</span>
          </div>
        </div>
      </div>

      {/* XP Engine */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
        <p className="text-xs font-mono text-[#888] mb-3">[ GROWTH & XP ENGINE ]</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#E0E0E0] font-bold">Level 4 — Academic Researcher</span>
          <button onClick={() => setShowXPHistory(!showXPHistory)} className="text-xs text-[#BB86FC] hover:underline">
            سجل النمو ↓
          </button>
        </div>
        <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
          <span>1,600 XP</span>
          <span>2,500 XP (Level 5)</span>
        </div>
        <div className="h-3 bg-[#2A2A2A] mb-3">
          <div className="h-3 bg-gradient-to-r from-[#BB86FC] to-[#a06cdc] transition-all" style={{ width: '64%' }} />
        </div>
        {showXPHistory && (
          <div className="space-y-2 mt-3 border-t border-[#2A2A2A] pt-3 animate-fade-up">
            {XP_HISTORY.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-[#888]">{h.action}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#4CAF50]">{h.xp}</span>
                  <span className="text-[#555]">{h.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Academic DNA Bento */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-6">
        <p className="text-xs font-mono text-[#888] mb-3">[ ACADEMIC_DNA ]</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-[#2A2A2A] p-4">
            <p className="text-[10px] text-[#555] font-mono mb-1">التخصص</p>
            <p className="text-sm text-[#E0E0E0]">هندسة معلوماتية — برمجيات</p>
          </div>
          <div className="border border-[#2A2A2A] p-4">
            <p className="text-[10px] text-[#555] font-mono mb-1">المهارات</p>
            <div className="flex flex-wrap gap-1">
              {['MERN', 'Linux', 'Pentesting'].map(s => (
                <span key={s} className="text-[10px] border border-[#2A2A2A] px-1.5 py-0.5 text-[#888]">{s}</span>
              ))}
            </div>
          </div>
          <div className="border border-[#2A2A2A] p-4">
            <p className="text-[10px] text-[#555] font-mono mb-1">الإنجازات</p>
            <div className="flex gap-1">
              {ACHIEVEMENTS.slice(0, 3).map(a => (
                <span key={a.icon} title={a.label} className="text-base cursor-help">{a.icon}</span>
              ))}
            </div>
          </div>
          <div className="border border-[#2A2A2A] p-4">
            <p className="text-[10px] text-[#555] font-mono mb-1">الإحصائيات</p>
            <div className="space-y-0.5">
              {QUICK_STATS.slice(0, 2).map(s => (
                <div key={s.label} className="flex justify-between text-xs">
                  <span className="text-[#888]">{s.label}</span>
                  <span className="text-[#E0E0E0] font-bold">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_STATS.map(s => (
          <div key={s.label} className="bg-[#1E1E1E] border border-[#2A2A2A] p-4 text-center hover:border-[#BB86FC]/40 transition-colors">
            <span className="text-xl block mb-1">{s.icon}</span>
            <span className="text-2xl font-black text-[#BB86FC]">{s.val}</span>
            <p className="text-xs text-[#888] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Navigation Tiles */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: '📚 دوراتي', desc: 'المقررات المسجّل بها', href: '/dashboard/learning' },
          { label: '🛒 طلباتي', desc: 'مشتريات المتجر', href: '/dashboard/orders' },
          { label: '💳 محفظتي', desc: 'المدفوعات والاشتراك', href: '/dashboard/wallet' },
          { label: '📥 الرسائل', desc: '3 رسائل غير مقروءة', href: '/dashboard/inbox' },
        ].map(t => (
          <Link key={t.href} to={t.href} className="bg-[#1E1E1E] border border-[#2A2A2A] p-4 hover:border-[#BB86FC]/50 transition-colors">
            <p className="text-sm font-bold text-[#E0E0E0]">{t.label}</p>
            <p className="text-xs text-[#888] mt-0.5">{t.desc}</p>
          </Link>
        ))}
      </div>

      {/* Sticky actions */}
      <div className="flex gap-3">
        <button className="flex-1 py-2.5 bg-[#BB86FC] text-[#121212] font-bold text-sm hover:bg-[#a06cdc] transition-colors">
          ✏️ تعديل الملف الشخصي
        </button>
        <button className="px-5 py-2.5 border border-[#2A2A2A] text-[#888] text-sm hover:border-[#BB86FC] transition-colors">
          📤 مشاركة الرابط
        </button>
      </div>

      <p className="text-[10px] font-mono text-[#555] text-center">HalabUnver System Design v1.0</p>
    </div>
  )
}

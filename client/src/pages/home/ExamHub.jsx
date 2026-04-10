import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

const LIVE_RESOURCES = [
  { title: 'مراجعة شاملة — هندسة البرمجيات', duration: '2:15:00', type: 'LIVE', branch: 'معلوماتية', color: '#F43F5E' },
  { title: 'Crash Course — قواعد البيانات', duration: '1:45:00', type: 'VIDEO', branch: 'معلوماتية', color: '#6366F1' },
  { title: 'ملخص سريع — الإلكترونيات', duration: '0:55:00', type: 'PDF', branch: 'كهربائية', color: '#14B8A6' },
  { title: 'حل نماذج — رياضيات هندسية', duration: '1:30:00', type: 'VIDEO', branch: 'عامة', color: '#F59E0B' },
]

const LIBRARY_PICKS = [
  { title: 'ملخص هندسة البرمجيات', branch: 'معلوماتية', downloads: 2100 },
  { title: 'نماذج امتحانات قواعد البيانات 2025', branch: 'معلوماتية', downloads: 1860 },
  { title: 'مراجعة شاملة — إلكترونيات 3', branch: 'كهربائية', downloads: 1540 },
  { title: 'مسائل رياضيات هندسية محلولة', branch: 'عامة', downloads: 1320 },
]

export default function ExamHub() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/announcements?limit=10')
      .then(d => setAnnouncements(d.data || []))
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        <div className="mb-6 sm:mb-8">
          <span className="section-label">موسم الامتحانات</span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9]">مركز الامتحانات والأخبار</h1>
          <p className="text-sm text-[#94A3B8] mt-1">جميع موارد الامتحانات متاحة مجاناً خلال الموسم</p>
        </div>

        {/* Season alert */}
        <div className="bg-[#F43F5E]/5 rounded-2xl border border-[#F43F5E]/30 p-4 sm:p-5 mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E] animate-blink-soft" />
            <span className="text-[#F43F5E] font-bold text-sm">موسم الامتحانات نشط الآن</span>
          </div>
          <p className="text-sm text-[#94A3B8]">استعد جيداً — كل الموارد متاحة مجاناً لفترة محدودة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Live sessions */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-[#1E2D45] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F43F5E] animate-blink-soft" />
                <p className="text-sm font-semibold text-[#F1F5F9]">المراجعات والبث المباشر</p>
              </div>
              {LIVE_RESOURCES.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-[#1E2D45] last:border-0 hover:bg-[#162032] transition-colors cursor-pointer gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="text-[10px] font-bold rounded-full px-2.5 py-1 shrink-0"
                      style={{ color: r.color, background: r.color + '18' }}
                    >
                      {r.type}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-[#F1F5F9] font-medium truncate">{r.title}</p>
                      <p className="text-xs text-[#4A5D78] mt-0.5">{r.branch} · {r.duration}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] border border-[#1E2D45] hover:border-[#6366F1]/40 hover:text-[#6366F1] transition-all shrink-0">
                    {r.type === 'LIVE' ? '▶ انضم' : '▶ شاهد'}
                  </button>
                </div>
              ))}
            </div>

            {/* Library picks */}
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-[#1E2D45] flex items-center justify-between">
                <p className="text-sm font-semibold text-[#F1F5F9]">📚 أبرز ملفات المكتبة</p>
                <Link to="/library" className="text-xs text-[#14B8A6] hover:underline">عرض الكل →</Link>
              </div>
              {LIBRARY_PICKS.map((p, i) => (
                <Link
                  key={i}
                  to="/library"
                  className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[#1E2D45] last:border-0 hover:bg-[#162032] transition-colors gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-[#F1F5F9] truncate">{p.title}</p>
                    <p className="text-xs text-[#4A5D78] mt-0.5">{p.branch}</p>
                  </div>
                  <span className="text-xs text-[#14B8A6] font-medium shrink-0">↓ {p.downloads.toLocaleString('ar')}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-[#1E2D45]">
                <p className="text-sm font-semibold text-[#F1F5F9]">آخر الإعلانات</p>
              </div>
              <div className="divide-y divide-[#1E2D45]">
                {loading ? (
                  <div className="p-6 flex justify-center">
                    <div className="w-5 h-5 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="p-5 text-center text-[#4A5D78] text-sm">لا توجد إعلانات بعد</div>
                ) : announcements.map((a) => (
                  <div key={a._id} className={`px-4 sm:px-5 py-4 ${a.urgent ? 'bg-[#F43F5E]/3' : ''}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-[#4A5D78]">{a.date}</span>
                      <span
                        className="text-[10px] font-semibold rounded-full px-2 py-0.5"
                        style={{ color: a.color, background: a.color + '18' }}
                      >
                        {a.tag}
                      </span>
                      {a.urgent && (
                        <span className="text-[10px] bg-[#F43F5E]/15 text-[#F43F5E] rounded-full px-2 py-0.5 font-medium">عاجل</span>
                      )}
                    </div>
                    <p className="text-xs text-[#F1F5F9] leading-relaxed">{a.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-2xl border border-[#6366F1]/20 p-5 text-center">
              <p className="text-xs font-semibold text-[#6366F1] mb-2">نصيحة الموسم</p>
              <p className="text-sm text-[#F1F5F9] font-medium mb-2 leading-relaxed">حمّل الملخصات، شاهد المراجعات، ونظّم وقتك.</p>
              <p className="text-xs text-[#4A5D78] italic">"Challenge Every Day — النجاح يبدأ من هنا."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'

const LIVE_RESOURCES = [
  { title: 'مراجعة شاملة — هندسة البرمجيات', duration: '2:15:00', type: 'LIVE', branch: 'معلوماتية' },
  { title: 'Crash Course — قواعد البيانات', duration: '1:45:00', type: 'VIDEO', branch: 'معلوماتية' },
  { title: 'مراجعة مكثفة — ميكانيكا الموائع', duration: '3:00:00', type: 'LIVE', branch: 'ميكانيك' },
  { title: 'Shorts — تحليل الدوائر الكهربائية', duration: '0:28:00', type: 'SHORT', branch: 'كهربائية' },
]

const PREDICTED = [
  { title: 'أسئلة متوقعة — هندسة البرمجيات 2026', branch: 'معلوماتية', downloads: 342 },
  { title: 'نماذج امتحانات شبكات الحاسوب', branch: 'معلوماتية', downloads: 218 },
  { title: 'ملخص Shorts — تحليل الدوائر', branch: 'كهربائية', downloads: 156 },
  { title: 'أسئلة متوقعة — رياضيات هندسية 2', branch: 'عامة', downloads: 401 },
]

export default function ExamHub() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="bg-[#EF4444]/8 border-b border-[#EF4444]/30 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] animate-blink-red" />
            <span className="text-xs font-mono text-[#EF4444]">[ EXAM SEASON ACTIVE ]</span>
          </div>
          <h1 className="text-3xl font-black text-[#E0E0E0]">🚨 مركز الامتحانات</h1>
          <p className="text-[#888] text-sm mt-1">موسم الامتحانات نشط — كل الموارد متاحة للطلاب</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Live Terminal */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-xs font-mono text-[#888]">[ LIVE_TERMINAL ] — دروس ومراجعات مباشرة</span>
            </div>
            <div className="space-y-3">
              {LIVE_RESOURCES.map((r, i) => (
                <div key={i} className="bg-[#1E1E1E] border border-[#2A2A2A] p-5 flex items-center justify-between gap-4 hover:border-[#EF4444]/40 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono px-2 py-0.5 ${
                      r.type === 'LIVE' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 animate-blink-red' :
                      r.type === 'SHORT' ? 'bg-[#03DAC6]/20 text-[#03DAC6] border border-[#03DAC6]/40' :
                      'bg-[#BB86FC]/20 text-[#BB86FC] border border-[#BB86FC]/40'
                    }`}>
                      {r.type}
                    </span>
                    <div>
                      <p className="text-[#E0E0E0] text-sm font-medium">{r.title}</p>
                      <p className="text-xs font-mono text-[#555]">{r.duration} · {r.branch}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 border border-[#2A2A2A] text-[#888] text-xs hover:border-[#BB86FC] hover:text-[#BB86FC] transition-colors shrink-0">
                    ▶ شاهد
                  </button>
                </div>
              ))}
            </div>

            {/* Study Chats */}
            <div className="mt-8">
              <span className="text-xs font-mono text-[#888]">[ STUDY_CHATS ] — غرف الدراسة المباشرة</span>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {['معلوماتية', 'كهربائية', 'ميكانيك', 'معمار'].map(branch => (
                  <button key={branch} className="bg-[#1E1E1E] border border-[#2A2A2A] p-4 text-right hover:border-[#BB86FC]/40 transition-colors">
                    <p className="text-sm text-[#E0E0E0] font-medium"># {branch}</p>
                    <p className="text-xs text-[#555] font-mono mt-1">غرفة دراسة نشطة</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="border border-[#2A2A2A] p-4">
              <p className="text-xs font-mono text-[#888] mb-3">[ PREDICTED_RESOURCES ]</p>
              <div className="space-y-3">
                {PREDICTED.map((p, i) => (
                  <Link key={i} to="/library" className="block border-b border-[#2A2A2A] pb-3 last:border-0 last:pb-0 hover:text-[#BB86FC] transition-colors">
                    <p className="text-sm text-[#E0E0E0]">{p.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-[#555] font-mono">{p.branch}</span>
                      <span className="text-xs text-[#03DAC6] font-mono">↓ {p.downloads}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Exclusive offers */}
            <div className="border border-[#FFD700]/20 bg-[#FFD700]/5 p-4">
              <p className="text-xs font-mono text-[#FFD700] mb-2">[ EXCLUSIVE_OFFERS ]</p>
              <p className="text-sm text-[#E0E0E0] mb-3">خصم 30% على دورات الامتحانات — لفترة محدودة</p>
              <Link to="/academy" className="block px-4 py-2 bg-[#FFD700] text-[#121212] font-bold text-sm text-center hover:bg-[#e6c200] transition-colors">
                تصفّح الدورات
              </Link>
            </div>

            {/* Ad zone */}
            <div className="border border-dashed border-[#2A2A2A] p-4 text-center">
              <p className="text-xs font-mono text-[#555]">[ AD_ZONE ]</p>
              <p className="text-xs text-[#444] mt-1">مقهى الدراسة — شارع الجامعة</p>
              <p className="text-xs text-[#444]">خصم 20% بإبراز بطاقة HalabUnver</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

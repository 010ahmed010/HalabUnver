import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function DocumentReader() {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [darkMode, setDarkMode] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [saved, setSaved] = useState(false)

  return (
    <div className="pt-16 min-h-screen">
      <div className="grid grid-cols-12 h-[calc(100vh-64px)] overflow-hidden">

        {/* Viewer — 9 cols */}
        <div className="col-span-12 md:col-span-9 flex flex-col">
          {/* Breadcrumb + controls */}
          <div className="bg-[#0E0E0E] border-b border-[#2A2A2A] px-4 py-2 flex items-center justify-between gap-3">
            <div className="text-xs font-mono text-[#555]">
              <Link to="/library" className="hover:text-[#BB86FC] transition-colors">Library</Link>
              <span className="mx-1">›</span>
              <span className="text-[#888]">برمجة</span>
              <span className="mx-1">›</span>
              <span className="text-[#E0E0E0]">مبادئ هندسة البرمجيات</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(z => Math.max(60, z - 10))}
                className="w-7 h-7 border border-[#2A2A2A] text-[#888] text-xs hover:border-[#BB86FC] hover:text-[#BB86FC] flex items-center justify-center transition-colors"
              >-</button>
              <span className="text-xs font-mono text-[#888] w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(z => Math.min(200, z + 10))}
                className="w-7 h-7 border border-[#2A2A2A] text-[#888] text-xs hover:border-[#BB86FC] hover:text-[#BB86FC] flex items-center justify-center transition-colors"
              >+</button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-2 py-1 text-xs border transition-colors ${darkMode ? 'border-[#BB86FC] text-[#BB86FC]' : 'border-[#2A2A2A] text-[#888]'}`}
              >
                {darkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>

          {/* Action bar */}
          <div className="bg-[#0E0E0E] border-b border-[#2A2A2A] px-4 py-2 flex items-center gap-3">
            <a href="#" className="text-xs border border-[#2A2A2A] px-3 py-1.5 text-[#888] hover:border-[#BB86FC] hover:text-[#BB86FC] transition-colors">📥 تحميل الأصل</a>
            <button
              onClick={() => setSaved(!saved)}
              className={`text-xs border px-3 py-1.5 transition-colors ${saved ? 'border-[#4CAF50] text-[#4CAF50]' : 'border-[#2A2A2A] text-[#888] hover:border-[#BB86FC] hover:text-[#BB86FC]'}`}
            >
              {saved ? '✓ محفوظ' : '⭐ حفظ في لوحتي'}
            </button>
            <button className="text-xs border border-[#2A2A2A] px-3 py-1.5 text-[#888] hover:border-[#BB86FC] hover:text-[#BB86FC] transition-colors">🔗 مشاركة</button>
          </div>

          {/* PDF viewer area */}
          <div className={`flex-1 overflow-auto p-8 ${darkMode ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F5]'}`}>
            <div
              className={`mx-auto border ${darkMode ? 'border-[#2A2A2A] bg-[#1E1E1E] text-[#E0E0E0]' : 'border-gray-300 bg-white text-gray-900'} p-12 transition-all`}
              style={{ width: `${zoom}%`, maxWidth: '800px', minHeight: '500px' }}
            >
              <div className="text-center mb-8">
                <p className="text-xs font-mono text-[#888] mb-2">صفحة {page} من 320</p>
                <h2 className="text-xl font-bold mb-1">مبادئ هندسة البرمجيات</h2>
                <p className="text-sm text-[#888]">د. محمد الحسن</p>
              </div>
              <div className="space-y-4 text-sm leading-loose text-[#888]">
                <p>هندسة البرمجيات هي تطبيق منهجي، منضبط وقابل للقياس لمبادئ الهندسة على تطوير وتشغيل وصيانة البرمجيات.</p>
                <p>تهدف هندسة البرمجيات إلى إنتاج برمجيات عالية الجودة تفي بمتطلبات المستخدمين في حدود الميزانية والجدول الزمني المحدد.</p>
                <p className="text-[#555] font-mono text-xs mt-8 pt-4 border-t border-[#2A2A2A]">
                  [ معاينة — لعرض الكتاب الكامل قم بتسجيل الدخول ]
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-4 py-2 border border-[#2A2A2A] text-[#888] text-sm hover:border-[#BB86FC] transition-colors">← السابق</button>
              <span className="text-xs font-mono text-[#888]">{page} / 320</span>
              <button onClick={() => setPage(p => Math.min(320, p + 1))} className="px-4 py-2 border border-[#2A2A2A] text-[#888] text-sm hover:border-[#BB86FC] transition-colors">التالي →</button>
            </div>

            {/* Feedback */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#888] mb-2">هل كان هذا الملخص مفيداً؟</p>
              <div className="flex justify-center gap-3">
                <button className="px-4 py-1.5 border border-[#4CAF50]/40 text-[#4CAF50] text-xs hover:bg-[#4CAF50]/10 transition-colors">👍 نعم</button>
                <button className="px-4 py-1.5 border border-[#EF4444]/40 text-[#EF4444] text-xs hover:bg-[#EF4444]/10 transition-colors">👎 لا</button>
              </div>
            </div>
          </div>
        </div>

        {/* Context Hub — 3 cols */}
        <div className="hidden md:flex col-span-3 flex-col border-r border-[#2A2A2A] bg-[#121212]/50 overflow-y-auto">
          <div className="p-4 border-b border-[#2A2A2A]">
            <p className="text-xs font-mono text-[#888] mb-3">[ METADATA ]</p>
            <div className="space-y-2 text-xs text-[#888]">
              <div className="flex justify-between"><span>المؤلف</span><span className="text-[#E0E0E0]">د. محمد الحسن</span></div>
              <div className="flex justify-between"><span>الفرع</span><span className="text-[#E0E0E0]">برمجة</span></div>
              <div className="flex justify-between"><span>الحجم</span><span className="text-[#E0E0E0]">4.2MB</span></div>
              <div className="flex justify-between"><span>الصفحات</span><span className="text-[#E0E0E0]">320</span></div>
              <div className="flex justify-between"><span>الحالة</span><span className="text-[#4CAF50]">✅ موثّق</span></div>
            </div>
          </div>

          <div className="p-4 border-b border-[#2A2A2A]">
            <p className="text-xs font-mono text-[#888] mb-3">[ RELATED_CONTENT ]</p>
            <div className="space-y-3">
              {[
                { title: 'ملخص UML والنمذجة', type: 'Short' },
                { title: 'دورة Software Architecture', type: 'Course' },
                { title: 'نماذج امتحان SE 2024', type: 'Exam' },
              ].map(r => (
                <div key={r.title} className="border-b border-[#2A2A2A] pb-2 last:border-0">
                  <p className="text-xs text-[#E0E0E0] hover:text-[#BB86FC] cursor-pointer transition-colors">{r.title}</p>
                  <span className="text-[10px] text-[#555]">{r.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <p className="text-xs font-mono text-[#555] mb-2">[ AD_ZONE ]</p>
            <div className="border border-dashed border-[#2A2A2A] p-4 text-center text-xs text-[#444]">
              إعلان — مكتبة الجامعة
              <br />
              خدمات طباعة وتصوير
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

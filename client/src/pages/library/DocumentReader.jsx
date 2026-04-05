import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function DocumentReader() {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [darkMode, setDarkMode] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [saved, setSaved] = useState(false)

  return (
    <div className="pt-20 min-h-screen">
      <div className="grid grid-cols-12 h-[calc(100vh-64px)] overflow-hidden">

        {/* Viewer — 9 cols */}
        <div className="col-span-12 md:col-span-9 flex flex-col">
          {/* Breadcrumb + controls */}
          <div className="bg-[#0F1828] border-b border-[#1E2D45] px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="text-xs text-[#4A5D78] flex items-center gap-1.5">
              <Link to="/library" className="hover:text-[#14B8A6] transition-colors">المكتبة</Link>
              <span>›</span>
              <span className="text-[#94A3B8]">برمجة</span>
              <span>›</span>
              <span className="text-[#F1F5F9]">مبادئ هندسة البرمجيات</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(z => Math.max(60, z - 10))}
                className="w-7 h-7 rounded-lg border border-[#1E2D45] text-[#94A3B8] text-xs hover:border-[#14B8A6]/50 hover:text-[#14B8A6] flex items-center justify-center transition-all"
              >-</button>
              <span className="text-xs font-mono text-[#94A3B8] w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(z => Math.min(200, z + 10))}
                className="w-7 h-7 rounded-lg border border-[#1E2D45] text-[#94A3B8] text-xs hover:border-[#14B8A6]/50 hover:text-[#14B8A6] flex items-center justify-center transition-all"
              >+</button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${darkMode ? 'border-[#6366F1]/50 text-[#6366F1] bg-[#6366F1]/10' : 'border-[#1E2D45] text-[#94A3B8]'}`}
              >
                {darkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>

          {/* Action bar */}
          <div className="bg-[#0F1828] border-b border-[#1E2D45] px-4 py-2.5 flex items-center gap-2">
            <a href="#" className="text-xs rounded-lg border border-[#1E2D45] px-3 py-1.5 text-[#94A3B8] hover:border-[#14B8A6]/50 hover:text-[#14B8A6] transition-all">📥 تحميل</a>
            <button
              onClick={() => setSaved(!saved)}
              className={`text-xs rounded-lg border px-3 py-1.5 transition-all ${saved ? 'border-[#10B981]/40 text-[#10B981] bg-[#10B981]/10' : 'border-[#1E2D45] text-[#94A3B8] hover:border-[#14B8A6]/50 hover:text-[#14B8A6]'}`}
            >
              {saved ? '✓ محفوظ' : '⭐ حفظ في لوحتي'}
            </button>
            <button className="text-xs rounded-lg border border-[#1E2D45] px-3 py-1.5 text-[#94A3B8] hover:border-[#14B8A6]/50 hover:text-[#14B8A6] transition-all">🔗 مشاركة</button>
          </div>

          {/* PDF viewer area */}
          <div className={`flex-1 overflow-auto p-8 ${darkMode ? 'bg-[#070C18]' : 'bg-[#F8FAFC]'}`}>
            <div
              className={`mx-auto rounded-2xl border p-12 transition-all ${darkMode ? 'border-[#1E2D45] bg-[#0F1828] text-[#F1F5F9]' : 'border-gray-200 bg-white text-gray-900'}`}
              style={{ width: `${zoom}%`, maxWidth: '800px', minHeight: '500px' }}
            >
              <div className="text-center mb-8">
                <p className="text-xs text-[#94A3B8] mb-2">صفحة {page} من 320</p>
                <h2 className="text-xl font-bold mb-1">مبادئ هندسة البرمجيات</h2>
                <p className="text-sm text-[#94A3B8]">د. محمد الحسن</p>
              </div>
              <div className="space-y-4 text-sm leading-loose text-[#94A3B8]">
                <p>هندسة البرمجيات هي تطبيق منهجي، منضبط وقابل للقياس لمبادئ الهندسة على تطوير وتشغيل وصيانة البرمجيات.</p>
                <p>تهدف هندسة البرمجيات إلى إنتاج برمجيات عالية الجودة تفي بمتطلبات المستخدمين في حدود الميزانية والجدول الزمني المحدد.</p>
                <p className="text-[#4A5D78] text-xs mt-8 pt-4 border-t border-[#1E2D45]">
                  معاينة — لعرض الكتاب الكامل قم بتسجيل الدخول
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-5 py-2.5 rounded-xl border border-[#1E2D45] text-[#94A3B8] text-sm hover:border-[#14B8A6]/50 hover:text-[#14B8A6] transition-all"
              >← السابق</button>
              <span className="text-xs text-[#94A3B8] font-mono">{page} / 320</span>
              <button
                onClick={() => setPage(p => Math.min(320, p + 1))}
                className="px-5 py-2.5 rounded-xl border border-[#1E2D45] text-[#94A3B8] text-sm hover:border-[#14B8A6]/50 hover:text-[#14B8A6] transition-all"
              >التالي →</button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#94A3B8] mb-3">هل كان هذا الملخص مفيداً؟</p>
              <div className="flex justify-center gap-3">
                <button className="px-5 py-2 rounded-lg border border-[#10B981]/30 text-[#10B981] text-xs hover:bg-[#10B981]/10 transition-all">👍 نعم</button>
                <button className="px-5 py-2 rounded-lg border border-[#F43F5E]/30 text-[#F43F5E] text-xs hover:bg-[#F43F5E]/10 transition-all">👎 لا</button>
              </div>
            </div>
          </div>
        </div>

        {/* Context Hub — 3 cols */}
        <div className="hidden md:flex col-span-3 flex-col border-r border-[#1E2D45] bg-[#0F1828] overflow-y-auto">
          <div className="p-4 border-b border-[#1E2D45]">
            <p className="text-xs font-semibold text-[#F1F5F9] mb-3">معلومات الملف</p>
            <div className="space-y-2.5 text-xs text-[#94A3B8]">
              {[
                { label: 'المؤلف', val: 'د. محمد الحسن' },
                { label: 'الفرع', val: 'برمجة' },
                { label: 'الحجم', val: '4.2MB' },
                { label: 'الصفحات', val: '320' },
                { label: 'الحالة', val: '✅ موثّق', color: '#10B981' },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span>{r.label}</span>
                  <span style={{ color: r.color || '#F1F5F9' }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-b border-[#1E2D45]">
            <p className="text-xs font-semibold text-[#F1F5F9] mb-3">محتوى ذو صلة</p>
            <div className="space-y-3">
              {[
                { title: 'ملخص UML والنمذجة', type: 'ملخص' },
                { title: 'دورة Software Architecture', type: 'دورة' },
                { title: 'نماذج امتحان SE 2024', type: 'امتحان' },
              ].map(r => (
                <div key={r.title} className="border-b border-[#1E2D45] pb-2.5 last:border-0">
                  <p className="text-xs text-[#F1F5F9] hover:text-[#14B8A6] cursor-pointer transition-colors">{r.title}</p>
                  <span className="text-[10px] text-[#4A5D78] rounded-full bg-[#162032] px-2 py-0.5 inline-block mt-1">{r.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="rounded-xl border border-dashed border-[#1E2D45] p-5 text-center text-xs text-[#4A5D78]">
              إعلان — مكتبة الجامعة
              <br />خدمات طباعة وتصوير
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

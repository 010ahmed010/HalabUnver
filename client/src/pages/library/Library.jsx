import { useState } from 'react'
import { Link } from 'react-router-dom'

const BRANCHES = ['الكل', 'برمجة', 'شبكات', 'أمن سيبراني', 'ذكاء اصطناعي', 'معمار', 'ميكانيك', 'كهربائية', 'طب', 'قانون']
const MODES = [
  { key: 'books', label: '📚 كتب كاملة' },
  { key: 'shorts', label: '📝 ملخصات' },
  { key: 'exams', label: '🎓 نماذج امتحان' },
]

const DOCS = [
  { id: 'doc-001', title: 'مبادئ هندسة البرمجيات', author: 'د. محمد الحسن', branch: 'برمجة', format: 'PDF', size: '4.2MB', pages: 320, rating: 4.8, native: true, mode: 'books', downloads: 1240 },
  { id: 'doc-002', title: 'ملخص شبكات الحاسوب — الفصل الثاني', author: 'أحمد الجاسم', branch: 'شبكات', format: 'PDF', size: '1.1MB', pages: 28, rating: 4.9, native: false, mode: 'shorts', downloads: 843, studentAuthored: true },
  { id: 'doc-003', title: 'أسئلة متوقعة — قواعد البيانات 2025', author: 'هيئة التدريس', branch: 'برمجة', format: 'PDF', size: '0.8MB', pages: 14, rating: 4.7, native: true, mode: 'exams', downloads: 2100 },
  { id: 'doc-004', title: 'مقدمة في التعلم الآلي', author: 'د. سامر خالد', branch: 'ذكاء اصطناعي', format: 'PDF', size: '6.8MB', pages: 410, rating: 4.6, native: false, mode: 'books', downloads: 567 },
  { id: 'doc-005', title: 'ملخص الأمن السيبراني — CTF Basics', author: 'ليلى عمر', branch: 'أمن سيبراني', format: 'MD', size: '0.3MB', pages: 12, rating: 4.8, native: false, mode: 'shorts', downloads: 389, studentAuthored: true },
  { id: 'doc-006', title: 'نماذج امتحانات هندسة الكهرباء 2024', author: 'قسم الهندسة', branch: 'كهربائية', format: 'PDF', size: '2.1MB', pages: 45, rating: 4.5, native: true, mode: 'exams', downloads: 1670 },
]

export default function Library() {
  const [activeBranch, setActiveBranch] = useState('الكل')
  const [activeMode, setActiveMode] = useState('books')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('rating')

  const filtered = DOCS.filter(d => {
    if (activeBranch !== 'الكل' && d.branch !== activeBranch) return false
    if (d.mode !== activeMode) return false
    if (search && !d.title.includes(search) && !d.author.includes(search)) return false
    return true
  }).sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'downloads') return b.downloads - a.downloads
    return 0
  })

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <span className="section-label">المكتبة الرقمية</span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9]">مكتبة حلب</h1>
        <p className="text-sm text-[#94A3B8] mt-1">أرشيف شامل للمصادر الأكاديمية والملفات التخصصية</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden md:block w-48 lg:w-52 shrink-0">
          <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-4 sticky top-20">
            <p className="text-xs font-semibold text-[#F1F5F9] mb-3">الفروع</p>
            <div className="space-y-0.5">
              {BRANCHES.map(b => (
                <button
                  key={b}
                  onClick={() => setActiveBranch(b)}
                  className={`w-full text-right px-3 py-2 text-xs rounded-lg transition-all ${
                    activeBranch === b
                      ? 'bg-[#14B8A6]/10 text-[#14B8A6] font-semibold border-r-2 border-[#14B8A6]'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#162032]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Mode filter */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {MODES.map(m => (
              <button
                key={m.key}
                onClick={() => setActiveMode(m.key)}
                className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm rounded-full transition-all ${
                  activeMode === m.key
                    ? 'bg-[#14B8A6] text-[#070C18] font-semibold'
                    : 'border border-[#1E2D45] text-[#94A3B8] hover:border-[#14B8A6]/40 hover:text-[#14B8A6]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Search & sort */}
          <div className="flex gap-3 mb-6">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="بحث بالعنوان أو المؤلف..."
              className="flex-1 min-w-0 bg-[#0F1828] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]/50 rounded-xl transition-colors"
            />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] px-3 sm:px-4 py-2.5 text-sm outline-none rounded-xl shrink-0"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="downloads">الأكثر تحميلاً</option>
            </select>
          </div>

          <p className="text-sm text-[#94A3B8] mb-4">
            <span className="text-[#F1F5F9] font-semibold">{filtered.length}</span> نتيجة
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(doc => (
              <Link
                key={doc.id}
                to={`/library/viewer/${doc.id}`}
                className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-5 hover:border-[#14B8A6]/30 hover:shadow-lg transition-all block group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold rounded-full bg-[#162032] text-[#94A3B8] px-2.5 py-1">{doc.format}</span>
                  <div className="flex gap-1">
                    {doc.native && <span className="text-[10px] text-[#F59E0B] bg-[#F59E0B]/10 rounded-full px-2 py-0.5 font-medium">جامعي</span>}
                    {doc.studentAuthored && <span className="text-[10px] text-[#14B8A6] bg-[#14B8A6]/10 rounded-full px-2 py-0.5 font-medium">طلابي</span>}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#F1F5F9] mb-1 group-hover:text-[#14B8A6] transition-colors leading-snug">{doc.title}</h3>
                <p className="text-xs text-[#4A5D78] mb-3">{doc.author}</p>
                <div className="flex items-center justify-between text-xs text-[#4A5D78] pt-3 border-t border-[#1E2D45]">
                  <span>{doc.size} · {doc.pages} صفحة</span>
                  <span className="text-[#F59E0B]">★ {doc.rating}</span>
                </div>
                <div className="mt-2 text-xs text-[#14B8A6] font-medium">↓ {doc.downloads.toLocaleString('ar')} تحميل</div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bg-[#0F1828] rounded-2xl border border-[#1E2D45] p-12 text-center">
              <p className="text-[#94A3B8] text-sm">لا توجد نتائج مطابقة</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

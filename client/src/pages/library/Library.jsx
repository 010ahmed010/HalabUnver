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
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden md:block w-52 shrink-0">
          <div className="border border-[#2A2A2A] p-4 sticky top-20">
            <p className="text-xs font-mono text-[#888] mb-3">[ KNOWLEDGE_SIDEBAR ]</p>
            <div className="space-y-1">
              {BRANCHES.map(b => (
                <button
                  key={b}
                  onClick={() => setActiveBranch(b)}
                  className={`w-full text-right px-3 py-2 text-xs transition-colors ${
                    activeBranch === b
                      ? 'bg-[#BB86FC]/10 text-[#BB86FC] border-r-2 border-[#BB86FC]'
                      : 'text-[#888] hover:text-[#E0E0E0]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Mode filter */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {MODES.map(m => (
              <button
                key={m.key}
                onClick={() => setActiveMode(m.key)}
                className={`px-4 py-1.5 text-sm transition-colors ${
                  activeMode === m.key
                    ? 'bg-[#BB86FC] text-[#121212] font-bold'
                    : 'border border-[#2A2A2A] text-[#888] hover:border-[#BB86FC] hover:text-[#BB86FC]'
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
              className="flex-1 bg-[#1E1E1E] border border-[#2A2A2A] text-[#E0E0E0] placeholder-[#555] px-4 py-2.5 text-sm outline-none focus:border-[#BB86FC]"
            />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-[#1E1E1E] border border-[#2A2A2A] text-[#888] px-3 py-2.5 text-sm outline-none"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="downloads">الأكثر تحميلاً</option>
            </select>
          </div>

          <p className="text-xs font-mono text-[#888] mb-4">[ {filtered.length} نتيجة ]</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(doc => (
              <Link key={doc.id} to={`/library/viewer/${doc.id}`} className="bg-[#1E1E1E] border border-[#2A2A2A] p-5 hover:border-[#BB86FC]/50 transition-colors block group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono border border-[#2A2A2A] px-2 py-0.5 text-[#888]">{doc.format}</span>
                  <div className="flex gap-1">
                    {doc.native && <span className="text-[10px] text-[#FFD700] border border-[#FFD700]/40 px-1.5">جامعي</span>}
                    {doc.studentAuthored && <span className="text-[10px] text-[#03DAC6] border border-[#03DAC6]/40 px-1.5">طلابي</span>}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#E0E0E0] mb-1 group-hover:text-[#BB86FC] transition-colors">{doc.title}</h3>
                <p className="text-xs text-[#555] mb-3">{doc.author}</p>
                <div className="flex items-center justify-between text-xs font-mono text-[#555]">
                  <span>{doc.size} · {doc.pages}p</span>
                  <span className="text-[#FFD700]">★ {doc.rating}</span>
                </div>
                <div className="mt-2 text-xs text-[#03DAC6] font-mono">↓ {doc.downloads.toLocaleString('ar')} تحميل</div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      <div className="border-t border-[#2A2A2A] py-4 text-center">
        <p className="text-xs font-mono text-[#555]">"Ahmed Al-Jassem | Knowledge is the Ultimate Challenge"</p>
      </div>
    </div>
  )
}

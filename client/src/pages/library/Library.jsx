import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

const MODES = [
  { key: '', label: '📚 الكل' },
  { key: 'books', label: '📖 كتب' },
  { key: 'shorts', label: '📝 ملخصات' },
  { key: 'exams', label: '🎓 نماذج امتحان' },
]

function DocCard({ doc }) {
  const handleDownload = async () => {
    if (!doc.fileUrl) return
    window.open(doc.fileUrl, '_blank')
    try {
      await api.post(`/library/${doc._id}/download`)
    } catch {}
  }

  return (
    <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-5 hover:border-[#6366F1]/20 transition-all flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-black text-xs shrink-0">PDF</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#F1F5F9] font-bold text-sm leading-snug line-clamp-2">{doc.title}</h3>
          <p className="text-xs text-[#4A5D78] mt-1">{doc.author} {doc.faculty && `· ${doc.faculty}`}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-[#4A5D78]">
        {doc.pages && <span>📄 {doc.pages} صفحة</span>}
        {doc.downloads > 0 && <span>⬇️ {doc.downloads?.toLocaleString()}</span>}
        {doc.rating > 0 && <span>⭐ {doc.rating?.toFixed(1)}</span>}
        {doc.isStudentAuthored && <span className="text-[#6366F1] border border-[#6366F1]/20 px-1.5 py-0.5 rounded-full text-[10px]">طالب</span>}
      </div>
      <button
        onClick={handleDownload}
        disabled={!doc.fileUrl && !doc.externalUrl}
        className="w-full gradient-bg text-white font-bold py-2 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {doc.fileUrl || doc.externalUrl ? '⬇️ تحميل / عرض' : '🔒 غير متاح'}
      </button>
    </div>
  )
}

export default function Library() {
  const { user } = useAuth()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    let url = `/library?page=${page}&limit=12`
    if (mode) url += `&mode=${mode}`
    if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`

    api.get(url)
      .then(data => {
        setDocs(data.data || [])
        setTotal(data.total || 0)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page, mode, search])

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <span className="section-label">المعرفة</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F1F5F9] mb-2">المكتبة الرقمية 📄</h1>
          <p className="text-[#4A5D78] text-sm">كتب، ملخصات، ونماذج امتحانات لجميع الكليات</p>
        </div>

        {/* Search + Filters */}
        <div className="bg-[#0F1828] border border-[#1E2D45] rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="ابحث في المكتبة..."
            className="flex-1 min-w-48 bg-[#162032] border border-[#1E2D45] text-[#F1F5F9] placeholder-[#4A5D78] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] transition-colors"
          />
          <div className="flex gap-2 flex-wrap">
            {MODES.map(m => (
              <button
                key={m.key}
                onClick={() => { setMode(m.key); setPage(1) }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  mode === m.key ? 'gradient-bg text-white' : 'bg-[#162032] border border-[#1E2D45] text-[#94A3B8] hover:border-[#6366F1]/30'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#4A5D78]">{total} وثيقة</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-[#F43F5E]/10 border border-[#F43F5E]/25 rounded-2xl p-8 text-center text-[#F43F5E]">{error}</div>
        ) : docs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-[#F1F5F9] font-bold text-lg mb-2">لا توجد وثائق بعد</p>
            <p className="text-[#4A5D78] text-sm">المكتبة في انتظار إضافة المحتوى</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {docs.map(d => <DocCard key={d._id} doc={d} />)}
          </div>
        )}

        {total > 12 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">السابق</button>
            <span className="text-sm text-[#4A5D78]">صفحة {page} من {Math.ceil(total / 12)}</span>
            <button disabled={page >= Math.ceil(total / 12)} onClick={() => setPage(p => p + 1)} className="px-5 py-2 bg-[#0F1828] border border-[#1E2D45] text-[#94A3B8] rounded-xl text-sm disabled:opacity-40 hover:border-[#6366F1]/30 transition-all">التالي</button>
          </div>
        )}

        {user?.businessPermissions?.canUploadLibraryDocs && (
          <div className="mt-8 bg-[#14B8A6]/8 border border-[#14B8A6]/20 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#F1F5F9] font-bold">📤 أنت مزوّد محتوى مكتبي</p>
              <p className="text-[#4A5D78] text-sm">يمكنك رفع وثائق وملخصات للمكتبة</p>
            </div>
            <a href="/business" className="gradient-bg text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity inline-block">
              رفع وثيقة
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

import { Outlet, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

function App() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [q, setQ] = useState(searchParams.get('q') ?? '')

  useEffect(() => {
    const current = searchParams.get('q') ?? ''
    setQ(current)
  }, [location.search])

  function handleQueryChange(value: string) {
    setQ(value)
    const target = value ? `/?q=${encodeURIComponent(value)}` : '/'
    navigate(target, { replace: true })
  }

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-white font-extrabold text-xl tracking-tight">
            FLOW
          </Link>
          <div className="flex-1" />
          <div className="relative w-full max-w-md">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              value={q}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search projects, tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {/* removed external nav link */}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Flow Projects
        </div>
      </footer>
    </div>
  )
}

export default App

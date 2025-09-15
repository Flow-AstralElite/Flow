import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { projects } from '../projects/data'

export default function GalleryPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter(p =>
      [p.name, p.tags?.join(' ')].join(' ').toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div>
      {/* No heading/subtitle/hint as requested */}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(project => (
          <li key={project.slug}>
            <Link
              to={`/project/${project.slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/50 to-slate-950/60 hover:border-sky-500/30 transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-extrabold tracking-wide text-white">
                  {project.name}
                </h3>
                {project.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800/70 text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}



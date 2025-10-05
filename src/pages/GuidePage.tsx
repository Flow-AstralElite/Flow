import { useMemo, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { projects } from '../projects/data'
import CodeBlock from '../components/CodeBlock'

// Import all markdown files
import openvpnMarkdown from '../projects/markdown/openvpn-access-server.md?raw'

// Create a map of markdown files
const markdownFiles: Record<string, string> = {
  'openvpn-access-server.md': openvpnMarkdown,
}

export default function GuidePage() {
  const { slug } = useParams()
  const project = useMemo(() => projects.find(p => p.slug === slug), [slug])
  const [markdown, setMarkdown] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!project) return

    setLoading(true)

    // Get markdown content from the map
    const content = markdownFiles[project.markdownFile]
    if (content) {
      setMarkdown(content)
    }
    setLoading(false)
  }, [project])

  if (!project) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Project not found</h2>
        <p className="text-slate-400 mt-2">The project you are looking for does not exist.</p>
        <Link to="/" className="inline-block mt-6 px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white">Back to gallery</Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    )
  }

  if (!markdown) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Error</h2>
        <p className="text-slate-400 mt-2">Failed to load content</p>
        <Link to="/" className="inline-block mt-6 px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white">Back to gallery</Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8">
        <img src={project.image} alt="" className="w-full rounded-2xl border border-white/10" />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white">{project.name}</h1>
        {project.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800/70 text-slate-300 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre({ children }) {
              return <>{children}</>
            },
            code(props) {
              const { children, className } = props
              const language = /language-(\w+)/.exec(className || '')?.[1]
              const content = String(children)
              const isBlock = content.includes('\n') || Boolean(language)
              if (isBlock) {
                return <CodeBlock code={content} language={language} />
              }
              return <code className={className}>{children}</code>
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </article>
  )
}



import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'

type CodeBlockProps = {
  code: string
  language?: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-md border border-white/10 bg-slate-800/70 px-2 py-1 text-xs text-slate-300 opacity-0 transition group-hover:opacity-100 hover:text-white hover:border-white/20"
        aria-label="Copy code"
      >
        {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="whitespace-pre break-normal">
        <code className={`language-${language ?? ''}`.trim()}>{code}</code>
      </pre>
    </div>
  )
}



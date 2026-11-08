'use client'

import { useState } from 'react'
import { Link2 } from 'lucide-react'
import { absoluteUrl } from '../../lib/seo'

export function ShareArticle({ path, title }: { path: string; title: string }) {
  const [status, setStatus] = useState('')
  const url = absoluteUrl(path)
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setStatus('Link copied') } catch { setStatus('Copy failed') }
    window.setTimeout(() => setStatus(''), 2000)
  }
  const linkClass = 'inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-fg-2 underline decoration-brand-bright underline-offset-4 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright'
  return <div className="border-t border-line pt-5"><p className="font-secondary text-[0.95rem] font-semibold">Share this article</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2"><button type="button" onClick={copy} className={linkClass}><Link2 aria-hidden="true" size={16} />Copy link</button><a className={linkClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a><a className={linkClass} href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noreferrer">WhatsApp<span className="sr-only"> (opens in a new tab)</span></a></div><div aria-live="polite" className="mt-2 min-h-6 text-sm text-fg-3">{status}</div></div>
}

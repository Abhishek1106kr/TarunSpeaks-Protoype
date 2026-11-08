'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

type TocItem = { id: string; text: string }

export function ArticleToc({ items, mode = 'both' }: { items: TocItem[]; mode?: 'mobile' | 'desktop' | 'both' }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((heading): heading is HTMLElement => Boolean(heading))
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-30% 0px -60% 0px' })
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null
  const list = <ul className="mt-3 max-h-[calc(100vh-10rem)] overflow-y-auto border-l border-line">
    {items.map((item) => <li key={item.id}><a href={`#${item.id}`} className={`block border-l-2 py-1.5 pl-4 text-sm leading-snug ${active === item.id ? 'border-brand-bright text-fg' : 'border-transparent text-fg-3 hover:text-fg-2'}`}>{item.text}</a></li>)}
  </ul>
  const mobile = <details className="lg:hidden"><summary className="group flex min-h-11 cursor-pointer list-none items-center justify-between font-secondary text-[0.95rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright [&::-webkit-details-marker]:hidden">On this page<ChevronDown aria-hidden="true" size={18} className="transition-transform group-open:rotate-180" /></summary>{list}</details>
  const desktop = <nav aria-label="On this page" className="hidden lg:block"><p className="font-secondary text-[0.95rem] font-semibold">On this page</p>{list}</nav>
  if (mode === 'mobile') return mobile
  if (mode === 'desktop') return desktop
  return <>{mobile}{desktop}</>
}

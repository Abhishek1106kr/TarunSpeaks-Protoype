'use client'

import { useEffect, useState } from 'react'
import { track } from '../../lib/analytics'

type Item = { slug: string; title: string; duration: string }

// Sticky in-page index for /programs that highlights the program currently in view,
// and reports program_viewed once per program that a visitor actually reads.
export function ProgramIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug)

  useEffect(() => {
    const viewed = new Set<string>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        setActive(entry.target.id)
        if (!viewed.has(entry.target.id)) {
          viewed.add(entry.target.id)
          track('program_viewed', { program: entry.target.id })
        }
      }
    }, { rootMargin: '-35% 0px -60% 0px' })
    items.forEach((item) => {
      const element = document.getElementById(item.slug)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="Programs on this page">
      <p className="t-label mb-4 text-fg-3">Programs</p>
      <ol className="border-l border-line">
        {items.map((item, index) => {
          const isActive = item.slug === active
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={isActive ? 'location' : undefined}
                className={`-ml-px flex min-h-11 items-baseline gap-3 border-l-2 py-2 pl-4 text-[0.9rem] leading-snug transition-colors ${isActive ? 'border-brand-bright text-fg' : 'border-transparent text-fg-3 hover:text-fg-2'}`}
              >
                <span className="nums text-[0.75rem]">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

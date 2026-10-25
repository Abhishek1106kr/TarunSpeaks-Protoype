'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { type Client, clients, type SectorId, sectors } from '../../data/clients'

type Filter = SectorId | 'all'

const MOBILE_INITIAL = 12

/**
 * Optical sizing: every logo gets roughly the same visual area, so a square crest and a long wordmark
 * read at similar weight. Height = sqrt(area / aspect), clamped; width follows from the true aspect ratio,
 * so nothing is stretched. Clients with a documented case study are drawn slightly larger.
 */
function logoSize(client: Client, prominent: boolean) {
  const { width, height } = client.logo!
  const aspect = width / height
  const area = prominent ? 7600 : 5200
  const h = Math.min(prominent ? 76 : 64, Math.max(22, Math.sqrt(area / aspect)))
  return { width: Math.round(Math.min(h * aspect, prominent ? 210 : 176)), height: Math.round(Math.min(h, (prominent ? 210 : 176) / aspect)) }
}

export function ClientEcosystem() {
  const [filter, setFilter] = useState<Filter>('all')
  const [expanded, setExpanded] = useState(false)
  const reduceMotion = useReducedMotion()

  const pool = filter === 'all' ? clients : clients.filter((client) => client.sector === filter)
  const visible = filter === 'all' && !expanded ? pool.filter((client) => client.curated) : pool
  const activeLabel = filter === 'all' ? (expanded ? 'All industries' : 'A selection across all industries') : sectors.find((sector) => sector.id === filter)!.label
  // On small screens a long list is trimmed until the visitor asks for everything.
  const trimMobile = !expanded && visible.length > MOBILE_INITIAL

  const choose = (next: Filter) => {
    setFilter(next)
    setExpanded(false)
  }

  return (
    <div>
      <div className="border-y border-line py-4">
        <div role="group" aria-label="Filter clients by industry" data-allow-overflow className="-mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
          {([{ id: 'all', label: 'All industries', count: clients.length }, ...sectors.map((sector) => ({ ...sector, count: clients.filter((client) => client.sector === sector.id).length }))] as { id: Filter; label: string; count: number }[]).map((option) => {
            const active = filter === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => choose(option.id)}
                className={`inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-[0.3rem] px-4 text-[0.92rem] font-semibold whitespace-nowrap transition-colors ${active ? 'bg-brand text-fg' : 'text-fg-2 hover:bg-surface hover:text-fg'}`}
              >
                {option.label}
                <span className={`nums text-[0.8rem] font-normal ${active ? 'text-fg/80' : 'text-fg-3'}`}>{option.count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-serif text-[1.6rem] font-normal tracking-[-0.015em]">{activeLabel}</h3>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={`${filter}-${expanded}`}
          className="mt-8 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.3 }}
        >
          {visible.map((client, index) => {
            const prominent = Boolean(client.caseStudy)
            const size = client.logo ? logoSize(client, prominent) : null
            const body = (
              <>
                <span className={`flex h-32 items-center justify-center rounded-[0.3rem] border border-line bg-surface p-4 ${prominent ? 'transition-colors duration-200 ease-editorial group-hover:border-brand-bright/60 group-focus-visible:border-brand-bright/60' : ''}`}>
                  {client.logo && size
                    ? <Image src={client.logo.src} alt={client.name} width={size.width} height={size.height} sizes={`${size.width}px`} className="opacity-85 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" style={{ width: size.width, height: size.height }} />
                    : <span className="font-serif text-[1.15rem] text-fg">{client.name}<span className="sr-only"> (logo not available)</span></span>}
                </span>
                <span aria-hidden="true" className="flex min-h-10 items-start justify-center gap-1.5 text-center text-[0.8rem] leading-snug text-fg-2">
                  {prominent && <span className="mt-[0.4em] size-1.5 shrink-0 rounded-full bg-brand-bright" />}
                  <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">{client.name}</span>
                </span>
              </>
            )
            return (
              <motion.li
                key={client.name}
                className={`${trimMobile && index >= MOBILE_INITIAL ? 'max-sm:hidden' : ''}`}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : Math.min(index, 18) * 0.018, ease: [0.22, 1, 0.36, 1] }}
              >
                {client.caseStudy
                  ? <Link href={`/case-studies/${client.caseStudy}`} aria-label={`${client.name}: read the case study`} className="group block rounded-[0.3rem] focus-visible:outline-offset-[-2px]">{body}</Link>
                  : <div className="group">{body}</div>}
              </motion.li>
            )
          })}
        </motion.ul>
      </AnimatePresence>

      {(filter === 'all' || trimMobile) && (
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
          {filter === 'all' && (
            <button type="button" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded} className="link-arrow">
              {expanded ? 'Show a selection' : `View all ${clients.length} organisations`}
            </button>
          )}
          {filter !== 'all' && trimMobile && (
            <button type="button" onClick={() => setExpanded(true)} className="link-arrow sm:hidden">View all {visible.length} in this industry</button>
          )}
          <p className="t-meta">Named organisations are a selection; the overall figure is 300+ brands across 15+ industries.</p>
        </div>
      )}
    </div>
  )
}

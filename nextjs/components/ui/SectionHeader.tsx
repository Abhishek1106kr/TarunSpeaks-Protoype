import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

type SectionHeaderProps = {
  id?: string
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  aside?: ReactNode
  className?: string
}

// Editorial section opener: optional kicker, serif heading, optional lead and right-hand action.
export function SectionHeader({ id, eyebrow, title, lead, aside, className = '' }: SectionHeaderProps) {
  return (
    // self-start: inside two-column layouts the header sits at the top instead of stretching.
    <div className={`grid gap-6 self-start ${aside ? 'lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end' : ''} ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <h2 id={id} className="t-h2">{title}</h2>
        {lead && <div className="t-lead mt-5 max-w-2xl [.on-paper_&]:text-ink-2">{lead}</div>}
      </div>
      {aside && <div className="lg:pb-1">{aside}</div>}
    </div>
  )
}

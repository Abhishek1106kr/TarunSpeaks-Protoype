import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  line?: boolean
  // On the darker secondary surface, muted text falls below AA contrast, so the lead uses a deeper ink.
  surface?: 'bg' | 'secondary'
  className?: string
}

// Malcom-style section opener: a thin drawn line, then a centred serif heading.
export function SectionHeading({ id, eyebrow, title, lead, line = true, surface = 'bg', className = '' }: SectionHeadingProps) {
  return (
    <div className={`mx-auto flex max-w-3xl flex-col items-center text-center ${className}`}>
      {line && <span aria-hidden="true" data-grow className="vline mb-10" />}
      {eyebrow && <Eyebrow tone={surface === 'secondary' ? 'accent-ink' : 'accent'} className="mb-6">{eyebrow}</Eyebrow>}
      <h2 id={id} data-split className="display-lg">{title}</h2>
      {lead && <p data-reveal className={`mt-6 max-w-xl text-[1.05rem] leading-relaxed ${surface === 'secondary' ? 'text-ink/80' : 'text-muted'}`}>{lead}</p>}
    </div>
  )
}

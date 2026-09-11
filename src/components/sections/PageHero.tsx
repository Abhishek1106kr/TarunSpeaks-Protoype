import type { ReactNode } from 'react'
import { Eyebrow } from '../ui/Eyebrow'

type PageHeroProps = { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }

export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="pt-36 pb-16 sm:pt-44 lg:pb-24">
      <div className="container-x flex flex-col items-center text-center">
        <div data-reveal><Eyebrow className="mb-8">{eyebrow}</Eyebrow></div>
        <h1 data-split="immediate" className="display-xl max-w-5xl">{title}</h1>
        {lead && <p data-reveal data-delay="0.3" className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-muted">{lead}</p>}
        {children}
      </div>
    </section>
  )
}

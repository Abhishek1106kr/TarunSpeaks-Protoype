import Link from 'next/link'
import type { CaseStudy } from '../../data/caseStudies'
import { Photo } from '../ui/Photo'

// An editorial entry rather than a boxed card: photograph, client line, headline, and the
// engagement's documented scale as a single line of meta text.
export function CaseStudyCard({ study, headingLevel = 'h3', priority = false }: { study: CaseStudy; headingLevel?: 'h2' | 'h3'; priority?: boolean }) {
  const Heading = headingLevel
  const cover = study.images[0]
  const lead = study.figures[0]
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {cover
          ? <Photo
              name={cover.name}
              alt={cover.alt}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              loading={priority ? 'eager' : 'lazy'}
              className="size-full object-cover object-[50%_35%] transition-transform duration-700 ease-editorial group-hover:scale-[1.025]"
            />
          // No photo unique to this client: show the documented scale instead of borrowing another event's image.
          : <div aria-hidden="true" className="flex size-full flex-col justify-end bg-brand-deep p-7">
              <span className="t-figure nums text-[clamp(3rem,6vw,4.5rem)]">{lead.value}</span>
              <span className="mt-2 text-fg-2">{lead.label}</span>
            </div>}
      </div>
      <p className="t-meta mt-5">{study.client} · {study.industry}</p>
      <Heading className="mt-2 font-serif text-[1.55rem] leading-[1.15] font-normal tracking-[-0.015em] text-fg">
        <Link href={`/case-studies/${study.slug}`} className="decoration-brand-bright decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline">
          {study.headline}
        </Link>
      </Heading>
      <p className="mt-3 text-[0.95rem] text-fg-2">{study.format.slice(0, 2).join(' · ')}</p>
    </article>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudyBySlug } from '../../data/caseStudies'
import { Eyebrow } from '../ui/Eyebrow'
import { Photo } from '../ui/Photo'

// Proof as a feature story: one engagement told at full width, then three shorter dispatches.
// Each dispatch is text-led — the evidence is in the scale and the delivery, not in a stock-like card.
export function FeaturedCase() {
  const lead = caseStudyBySlug('sansaar-by-ddecor')!
  const more = ['nawany-group', 'motilal-oswal', 'newtech-insurance-brokers'].map((slug) => caseStudyBySlug(slug)!)
  const photo = lead.images[0]

  return (
    <section aria-labelledby="featured-case-title" className="bg-canvas-2 section-y">
      <div className="container-x">
        <Eyebrow className="mb-10">Proof of work</Eyebrow>
        <article className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <figure data-reveal="image" className="relative lg:col-span-7">
            <div className="aspect-[3/2] overflow-hidden bg-surface">
              <Photo name={photo.name} alt={photo.alt} sizes="(min-width: 1024px) 55vw, 92vw" className="size-full object-cover" />
            </div>
          </figure>
          <div className="flex flex-col lg:col-span-5">
            <p className="t-meta">{lead.client} · {lead.industry}</p>
            <h2 id="featured-case-title" className="t-h2 mt-3">{lead.headline}</h2>
            <dl className="mt-8 grid grid-cols-3 border-y border-line">
              {lead.figures.map((figure, index) => (
                <div key={figure.label} className={`flex flex-col gap-2 py-5 ${index ? 'border-l border-line pl-4' : 'pr-4'}`}>
                  <dt className="order-2 text-[0.88rem] text-fg-2">{figure.label}</dt>
                  <dd className="nums order-1 font-serif text-[clamp(1.7rem,2.6vw,2.4rem)] leading-none">{figure.value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-8 text-[0.95rem] font-semibold">What we delivered</h3>
            <ul className="mt-3 space-y-2 text-[1rem] text-fg-2">
              {lead.delivered.slice(0, 3).map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-brand-bright" />{item}</li>)}
            </ul>
            <Link href={`/case-studies/${lead.slug}`} className="link-arrow mt-8">Read the case study<ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </article>

        <div className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8">
          {more.map((study) => (
            <article key={study.slug} className="group relative">
              <p className="t-meta">{study.client}</p>
              <h3 className="mt-2 font-serif text-[1.45rem] leading-[1.18] font-normal tracking-[-0.012em]">
                <Link href={`/case-studies/${study.slug}`} className="decoration-brand-bright decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline">{study.headline}</Link>
              </h3>
              <p className="mt-3 text-[0.95rem] text-fg-2">{study.format.join(' · ')}</p>
            </article>
          ))}
        </div>
        <Link href="/case-studies" className="link-arrow mt-10">View Case Studies<ArrowRight aria-hidden="true" size={16} /></Link>
      </div>
    </section>
  )
}

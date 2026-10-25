import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { PageIntro } from '../../components/blocks/PageIntro'
import { JsonLd } from '../../components/seo/JsonLd'
import { Photo } from '../../components/ui/Photo'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { caseStudies, caseStudyBySlug, type CaseStudyTrack } from '../../data/caseStudies'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Case Studies',
  description: 'Engagements with Nawany Group, Godrej Properties, NewTech Insurance Brokers, Sansaar by D’Decor, Motilal Oswal, HDFC Bank, Bentley Systems and more. What was delivered and what was reported.',
  path: '/case-studies',
})

const tracks: { track: CaseStudyTrack; title: string; lead: string; feature: string }[] = [
  { track: 'AI training & consultation', title: 'AI training & consultation', lead: 'Multi-month AI programs, AI-powered sales and presentation training, and hands-on AI for creative teams.', feature: 'nawany-group' },
  { track: 'Capability building', title: 'Capability building across brands', lead: 'Sales, personal branding, digital transformation and career readiness, from single cohorts to 42-city rollouts.', feature: 'sansaar-by-ddecor' },
]

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }]}
        eyebrow="Proof of work"
        title="What we delivered, and what each engagement reported."
        lead={<p>Every case study separates the work we <strong className="font-semibold text-fg">delivered</strong> from the outcomes the engagement <strong className="font-semibold text-fg">reported</strong>. Figures come from the TarunSpeaks company profile; we don’t publish numbers we can’t source.</p>}
      />

      {tracks.map((group, groupIndex) => {
        const feature = caseStudyBySlug(group.feature)!
        const rest = caseStudies.filter((study) => study.track === group.track && study.slug !== group.feature)
        const photo = feature.images[0]
        return (
          <section key={group.track} aria-labelledby={`track-${groupIndex}`} className={`section-y ${groupIndex ? 'border-t border-line-soft bg-canvas-2' : ''}`}>
            <div className="container-x">
              <SectionHeader id={`track-${groupIndex}`} title={group.title} lead={group.lead} />

              <article className="group relative mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="relative aspect-[3/2] overflow-hidden bg-surface lg:col-span-7">
                  {photo && <Photo name={photo.name} alt={photo.alt} loading={groupIndex === 0 ? 'eager' : 'lazy'} sizes="(min-width: 1024px) 55vw, 92vw" className="size-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.02]" />}
                </div>
                <div className="flex flex-col justify-end lg:col-span-5">
                  <p className="t-meta">{feature.client} · {feature.industry}</p>
                  <h3 className="mt-3 font-serif text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.1] font-normal tracking-[-0.02em]">
                    <Link href={`/case-studies/${feature.slug}`} className="decoration-brand-bright decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline">{feature.headline}</Link>
                  </h3>
                  <p className="t-body mt-4">{feature.objective}</p>
                  <p className="mt-5 text-[0.95rem] text-fg">{feature.format.join(' · ')}</p>
                  <span className="link-arrow mt-6">Read the case study<ArrowRight aria-hidden="true" size={16} /></span>
                </div>
              </article>

              <ul className="mt-16 border-t border-line">
                {rest.map((study) => (
                  <li key={study.slug} className="group relative grid gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                    <p className="font-serif text-[1.35rem] leading-tight md:col-span-3">{study.client}</p>
                    <h3 className="text-[1.1rem] leading-snug font-semibold md:col-span-5">
                      <Link href={`/case-studies/${study.slug}`} className="decoration-brand-bright decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline">{study.headline}</Link>
                    </h3>
                    <p className="text-[0.95rem] text-fg-2 md:col-span-4">{study.format.slice(0, 2).join(' · ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )
      })}

      <EnquiryCta
        title="Have a similar challenge?"
        body="Tell us about your teams and what needs to change. We’ll share how we approached comparable engagements and what a program for you could look like."
        primary={{ label: 'Discuss Your Requirements', to: '/contact' }}
      />
    </>
  )
}

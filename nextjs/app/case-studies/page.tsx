import type { Metadata } from 'next'
import { CaseStudyCard } from '../../components/blocks/CaseStudyCard'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { PageIntro } from '../../components/blocks/PageIntro'
import { JsonLd } from '../../components/seo/JsonLd'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { caseStudies, type CaseStudyTrack } from '../../data/caseStudies'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Case Studies',
  description: 'Engagements with Nawany Group, Godrej Properties, NewTech Insurance Brokers, Sansaar by D’Decor, Motilal Oswal, HDFC Bank, Bentley Systems and more — what was delivered and what was reported.',
  path: '/case-studies',
})

const tracks: { track: CaseStudyTrack; title: string; lead: string }[] = [
  { track: 'AI training & consultation', title: 'AI training & consultation', lead: 'Multi-month AI programs, AI-powered sales and presentation training, and hands-on AI for creative teams.' },
  { track: 'Capability building', title: 'Capability building across brands', lead: 'Sales, personal branding, digital transformation and career readiness — from single cohorts to 42-city rollouts.' },
]

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }]}
        eyebrow="Proof of work. Proof of impact."
        title="Case studies"
        lead={<p>Each case study separates what we <strong className="font-semibold text-fg">delivered</strong> from what the engagement <strong className="font-semibold text-fg">reported</strong>. Figures are taken from the TarunSpeaks company profile; we do not publish numbers we cannot source.</p>}
      />

      {tracks.map((group, groupIndex) => {
        const studies = caseStudies.filter((study) => study.track === group.track)
        return (
          <section key={group.track} aria-labelledby={`track-${groupIndex}`} className={`section-y ${groupIndex ? 'border-t border-line-soft bg-canvas-2' : ''}`}>
            <div className="container-x">
              <SectionHeader id={`track-${groupIndex}`} eyebrow={`${studies.length} engagements`} title={group.title} lead={group.lead} />
              <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {studies.map((study, index) => (
                  <li key={study.slug} data-reveal style={{ '--reveal-delay': `${(index % 3) * 0.06}s` } as React.CSSProperties}>
                    <CaseStudyCard study={study} headingLevel="h3" priority={groupIndex === 0 && index < 3} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )
      })}

      <EnquiryCta title="Have a similar challenge?" body="Tell us about your teams and what needs to change. We’ll share how we approached comparable engagements and what a program for you could look like." secondary={{ label: 'Explore Programs', to: '/programs' }} />
    </>
  )
}

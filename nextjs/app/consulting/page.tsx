import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CaseStudyCard } from '../../components/blocks/CaseStudyCard'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { PageIntro } from '../../components/blocks/PageIntro'
import { JsonLd } from '../../components/seo/JsonLd'
import { Button } from '../../components/ui/Button'
import { Photo } from '../../components/ui/Photo'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { caseStudyBySlug } from '../../data/caseStudies'
import { consultationProcess, consultingAreas, engagementModes } from '../../data/consulting'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Consulting & AI Implementation',
  description: 'Advisory and implementation support from TarunSpeaks: branding and digital marketing, business growth, personal branding for CXOs, and AI tools, agent deployment and generative AI implementation.',
  path: '/consulting',
})

const aiCases = ['nawany-group', 'newtech-insurance-brokers', 'godrej-properties'].map((slug) => caseStudyBySlug(slug)!)

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Consulting', path: '/consulting' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Consulting', path: '/consulting' }]}
        eyebrow="Consulting & AI implementation"
        title={<>From learning to <span className="text-brand-text">organisational execution</span></>}
        lead={<p>Training builds the skill. Advisory sets the direction. Implementation support changes how the work gets done. We’re clear about which one you are buying — and often combine them.</p>}
        actions={<><Button to="/contact?interest=ai" size="lg" arrow>Discuss AI Capability Building</Button><Button to="#areas" variant="quiet">Consulting areas</Button></>}
        aside={
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
            <Photo name="newtech-workshop" alt="Tarun Makhija in a working session with a client team" preload loading="eager" sizes="(min-width: 1024px) 34vw, 92vw" className="size-full object-cover" />
          </div>
        }
      />

      <section aria-labelledby="modes-title" className="section-y">
        <div className="container-x">
          <SectionHeader id="modes-title" eyebrow="Three kinds of engagement" title="Training, advisory and implementation are different jobs" lead="Each has a different starting question. Here is how we distinguish them, with an engagement that shows each in practice." />
          <ol className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
            {engagementModes.map((mode, index) => (
              <li key={mode.title} data-reveal style={{ '--reveal-delay': `${index * 0.08}s` } as React.CSSProperties} className="flex flex-col bg-canvas p-7 sm:p-9">
                <p className="nums font-display text-[0.95rem] font-bold text-brand-text">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="t-h3 mt-5 text-[1.6rem]">{mode.title}</h3>
                <p className="mt-2 font-display text-[1.05rem] font-semibold text-fg-2 italic">“{mode.question}”</p>
                <p className="t-body mt-5">{mode.body}</p>
                <p className="mt-6 border-t border-line pt-4 text-[0.9rem]">
                  <span className="t-label block text-fg-3">In practice</span>
                  <Link href={mode.example.href} className="mt-2 inline-block text-fg hover:text-brand-text">{mode.example.label}</Link>
                </p>
                <Link href={mode.href} className="link-arrow mt-auto pt-8">{mode.cta}<ArrowRight aria-hidden="true" size={16} /></Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="areas" aria-labelledby="areas-title" className="section-y scroll-mt-20 border-t border-line-soft bg-canvas-2">
        <div className="container-x">
          <SectionHeader id="areas-title" eyebrow="What we consult on" title="Consulting areas" lead="Six areas, in two groups: growth and brand, and AI." />
          {(['Growth & brand', 'AI'] as const).map((group) => (
            <div key={group} className="mt-14">
              <h3 className="t-label flex items-center gap-4 text-fg-3">{group}<span aria-hidden="true" className="h-px flex-1 bg-line" /></h3>
              <ul className={`mt-6 grid gap-5 ${group === 'AI' ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
                {consultingAreas.filter((area) => area.group === group).map((area) => (
                  <li key={area.slug} data-reveal className={`flex flex-col border p-6 ${group === 'AI' ? 'border-brand/60 bg-brand-deep/40' : 'border-line bg-canvas'}`}>
                    <h4 className="font-display text-[1.2rem] leading-snug font-semibold tracking-[-0.01em]">{area.title}</h4>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-2">{area.scope}</p>
                    {area.evidence && (
                      <p className="mt-auto pt-5 text-[0.85rem] text-fg-3">
                        Related engagement: <Link href={area.evidence.href} className="text-fg underline decoration-brand-bright underline-offset-4 hover:text-brand-text">{area.evidence.label}</Link>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="process-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeader id="process-title" eyebrow="Consultation process" title="How a consulting engagement runs" lead="The four-step process we use to understand, map and manage the work." />
          <ol className="border-t border-line">
            {consultationProcess.map((step) => (
              <li key={step.number} data-reveal className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-line py-6">
                <span className="nums font-display text-[1.1rem] font-bold text-brand-text">{step.number}</span>
                <div>
                  <h3 className="t-h3 text-[1.25rem]">{step.title}</h3>
                  <p className="t-body mt-1.5">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ai-cases-title" className="section-y border-t border-line-soft bg-canvas-2">
        <div className="container-x">
          <SectionHeader id="ai-cases-title" eyebrow="AI trainings & consultation" title="AI work we can point to" aside={<Button to="/case-studies" variant="secondary" arrow>View Case Studies</Button>} />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {aiCases.map((study) => <li key={study.slug} data-reveal><CaseStudyCard study={study} /></li>)}
          </ul>
        </div>
      </section>

      <EnquiryCta title="Request a consultation" body="Tell us where you are — exploring AI, rolling out tools, or trying to make adoption stick — and what success would look like. We’ll recommend whether training, advisory or implementation support fits." primary={{ label: 'Request a Consultation', to: '/contact?interest=consulting' }} secondary={{ label: 'Explore Programs', to: '/programs' }} />
    </>
  )
}

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
  title: 'Consulting & AI Adoption Support',
  description: 'Advisory and AI adoption support from TarunSpeaks: branding and digital marketing, business growth, personal branding for CXOs, and AI tools, agent rollout and generative AI planning.',
  path: '/consulting',
})

const aiCases = ['nawany-group', 'newtech-insurance-brokers', 'godrej-properties'].map((slug) => caseStudyBySlug(slug)!)

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Consulting', path: '/consulting' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Consulting', path: '/consulting' }]}
        eyebrow="For founders and business leaders"
        title="From learning to organisational execution."
        lead={<p>Training builds the skill. Advisory sets the direction. Adoption support helps the work change. We are clear about which one you are buying, and often combine them.</p>}
        actions={<><Button to="/contact?interest=consulting" size="lg" arrow track="consulting-intro">Request a Consultation</Button><Button to="#areas" variant="quiet">Consulting areas</Button></>}
        aside={
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo name="newtech-workshop" alt="Tarun Makhija in a working session with NewTech Insurance Brokers’ sales leaders" preload loading="eager" sizes="(min-width: 1024px) 38vw, 92vw" className="size-full object-cover" />
            </div>
            <figcaption className="t-meta mt-3">A working session from the NewTech Insurance Brokers engagement.</figcaption>
          </figure>
        }
      />

      <section aria-labelledby="modes-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28"><SectionHeader id="modes-title" title="Three different jobs" lead="Each starts from a different question. Here is how we tell them apart, with an engagement that shows each in practice." /></div>
          </div>
          <ol className="lg:col-span-8">
            {engagementModes.map((mode, index) => (
              <li key={mode.title} className="grid gap-5 border-t border-line py-10 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_minmax(0,1fr)]">
                <span className="font-serif text-[2.2rem] leading-none text-brand-text italic">{index + 1}.</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.08] font-normal tracking-[-0.02em]">{mode.title}</h3>
                  <p className="mt-2 font-serif text-[1.2rem] text-fg-2 italic">“{mode.question}”</p>
                  <p className="t-body mt-4 max-w-2xl">{mode.body}</p>
                  <p className="mt-5 text-[0.95rem] text-fg-3">In practice: <Link href={mode.example.href} className="text-fg underline decoration-line underline-offset-4 hover:decoration-brand-bright">{mode.example.label}</Link></p>
                  <Link href={mode.href} className="link-arrow mt-5">{mode.cta}<ArrowRight aria-hidden="true" size={16} /></Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="areas" aria-labelledby="areas-title" className="section-y scroll-mt-20 border-t border-line-soft bg-canvas-2">
        <div className="container-x">
          <SectionHeader id="areas-title" title="What we consult on" lead="Six areas in two groups: growth and brand, and AI." />
          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-12">
            {(['Growth & brand', 'AI'] as const).map((group) => (
              <div key={group}>
                <h3 className={`font-serif text-[1.6rem] font-normal ${group === 'AI' ? 'text-brand-text' : ''}`}>{group}</h3>
                <ul className="mt-5 border-t border-line">
                  {consultingAreas.filter((area) => area.group === group).map((area) => (
                    <li key={area.slug} className="border-b border-line py-6">
                      <h4 className="text-[1.1rem] font-semibold">{area.title}</h4>
                      <p className="t-body mt-2">{area.scope}</p>
                      {area.evidence && (
                        <p className="mt-3 text-[0.92rem] text-fg-3">Related engagement: <Link href={area.evidence.href} className="text-fg underline decoration-line underline-offset-4 hover:decoration-brand-bright">{area.evidence.label}</Link></p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><SectionHeader id="process-title" title="How a consulting engagement runs" lead="The four-step process we use to understand, map and manage the work." /></div>
          <ol className="lg:col-span-8">
            {consultationProcess.map((step) => (
              <li key={step.number} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-t border-line py-6 last:border-b">
                <span className="nums font-serif text-[1.4rem] text-brand-text">{step.number}</span>
                <div>
                  <h3 className="font-serif text-[1.6rem] leading-tight font-normal">{step.title}</h3>
                  <p className="t-body mt-1.5">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ai-cases-title" className="section-y border-t border-line-soft bg-canvas-2">
        <div className="container-x">
          <SectionHeader id="ai-cases-title" eyebrow="AI trainings & consultation" title="AI work we can point to" aside={<Link href="/case-studies" className="link-arrow">View Case Studies</Link>} />
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {aiCases.map((study) => <li key={study.slug}><CaseStudyCard study={study} /></li>)}
          </ul>
        </div>
      </section>

      <EnquiryCta
        title="Tell us where you are with AI."
        body="Exploring, rolling out tools, or trying to make adoption stick? Share what success would look like and we’ll recommend whether training, advisory or adoption support fits."
        primary={{ label: 'Request a Consultation', to: '/contact?interest=consulting' }}
      />
    </>
  )
}

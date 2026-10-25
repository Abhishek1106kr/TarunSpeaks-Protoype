import type { Metadata } from 'next'
import Link from 'next/link'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { FaqList } from '../../components/blocks/FaqList'
import { PageIntro } from '../../components/blocks/PageIntro'
import { ProgramTable } from '../../components/blocks/ProgramTable'
import { Quote } from '../../components/blocks/Quote'
import { Delivery } from '../../components/home/Delivery'
import { JsonLd } from '../../components/seo/JsonLd'
import { Button } from '../../components/ui/Button'
import { Photo } from '../../components/ui/Photo'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { caseStudyBySlug } from '../../data/caseStudies'
import { faqs } from '../../data/faq'
import { deliveryTerms, trainingAreas } from '../../data/programs'
import { testimonials } from '../../data/testimonials'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Corporate Training',
  description: 'Corporate training for CHROs and L&D leaders: modular programs in AI, sales, leadership, personal branding and communication, delivered as workshops, masterclasses or full learning journeys.',
  path: '/corporate-training',
})

// Scale evidence, straight from the case studies.
const atScale = ['sansaar-by-ddecor', 'motilal-oswal', 'hdfc-bank', 'nawany-group'].map((slug) => caseStudyBySlug(slug)!)

const formats = [
  { title: 'Workshop', body: 'Hands-on, scenario-based sessions for a team or function: live exercises, profile reviews, role-play.' },
  { title: 'Masterclass', body: 'A focused session on one capability, for larger groups or leadership gatherings.' },
  { title: 'Full learning journey', body: 'A multi-session program over weeks or months, with review cycles between sessions.' },
]

const trainingFaqs = ['Who are the programs designed for?', 'Can a program be designed for our roles and industry?', 'What happens after the training?', 'Can you deliver across multiple cities?', 'What happens after we submit an enquiry?']
  .map((question) => faqs.find((faq) => faq.question === question)!)

export default function Page() {
  const quote = testimonials.find((testimonial) => testimonial.name === 'Shailesh Benedict')!
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Corporate Training', path: '/corporate-training' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Corporate Training', path: '/corporate-training' }]}
        eyebrow="For CHROs, L&D and business leaders"
        title="Corporate training that shows up in everyday work."
        lead={<p>Your teams are growing. The question is whether their skills are keeping up. We design practical programs around your roles and real scenarios, and deliver them anywhere from one room to 42 cities.</p>}
        actions={<><Button to="/contact?interest=training" size="lg" arrow track="training-intro">Discuss Your Requirements</Button><Button to="#programs" variant="quiet">See the programs</Button></>}
        aside={
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo name="motilal-room" alt="Tarun Makhija leading a session for entrepreneurs in the Motilal Oswal network" preload loading="eager" sizes="(min-width: 1024px) 38vw, 92vw" className="size-full object-cover" />
            </div>
            <figcaption className="t-meta mt-3">A session from the 11-city Motilal Oswal tour.</figcaption>
          </figure>
        }
      />

      <section aria-labelledby="areas-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><SectionHeader id="areas-title" title="What we train on" lead="Every program draws on six capability areas, combined to match the roles in the room and the outcome you need." /></div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {trainingAreas.map((area, index) => (
              <li key={area} className="flex items-baseline gap-5 border-b border-line py-5">
                <span className="nums font-serif text-[1.1rem] text-brand-text">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-serif text-[1.45rem] leading-tight tracking-[-0.01em]">{area}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="formats-title" className="section-y border-t border-line-soft bg-canvas-2">
        <div className="container-x">
          <SectionHeader id="formats-title" title="Three formats, built to fit your calendar" lead={`${deliveryTerms.note} Duration ranges from ${deliveryTerms.duration}, ${deliveryTerms.basis}.`} />
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {formats.map((format) => (
              <li key={format.title} className="border-t border-fg-3 pt-5">
                <h3 className="font-serif text-[1.75rem] leading-tight font-normal tracking-[-0.015em]">{format.title}</h3>
                <p className="t-body mt-3">{format.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Delivery />

      <section aria-labelledby="scale-title" className="section-y border-t border-line-soft">
        <div className="container-x">
          <SectionHeader id="scale-title" eyebrow="Evidence" title="Delivered at organisational scale" lead="Multi-city tours, store networks and multi-month programs, documented in our case studies." aside={<Link href="/case-studies" className="link-arrow">View Case Studies</Link>} />
          <div className="mt-12 overflow-x-auto" data-allow-overflow>
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Selected training engagements by scale</caption>
              <thead>
                <tr className="border-b border-line text-[0.9rem] text-fg-3">
                  <th scope="col" className="py-4 pr-6 font-normal">Client</th>
                  <th scope="col" className="py-4 pr-6 font-normal">Engagement</th>
                  <th scope="col" className="py-4 font-normal">Scale</th>
                </tr>
              </thead>
              <tbody>
                {atScale.map((study) => (
                  <tr key={study.slug} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-6 font-serif text-[1.3rem] font-normal">
                      <Link href={`/case-studies/${study.slug}`} className="underline decoration-line underline-offset-4 hover:decoration-brand-bright">{study.client}</Link>
                    </th>
                    <td className="py-5 pr-6 text-fg-2">{study.headline}</td>
                    <td className="py-5 text-fg">{study.format.slice(0, 2).join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-16 max-w-3xl"><Quote testimonial={quote} /></div>
        </div>
      </section>

      <section id="programs" aria-labelledby="training-programs-title" className="on-paper section-y scroll-mt-20">
        <div className="container-x">
          <SectionHeader id="training-programs-title" title="Choose a starting point" lead="Eight flagship programs. Each can be tailored, combined or extended with custom modules." />
          <div className="mt-12"><ProgramTable /></div>
          <Link href="/programs" className="link-arrow mt-10">Compare programs in detail</Link>
        </div>
      </section>

      <section aria-labelledby="training-faq-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><SectionHeader id="training-faq-title" title="Planning a program" /></div>
          <div className="lg:col-span-8"><FaqList items={trainingFaqs} /></div>
        </div>
      </section>

      <EnquiryCta title="Discuss a tailored program for your teams." primary={{ label: 'Discuss Your Requirements', to: '/contact?interest=training' }} />
    </>
  )
}

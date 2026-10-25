import type { Metadata } from 'next'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { PageIntro } from '../../components/blocks/PageIntro'
import { Quote } from '../../components/blocks/Quote'
import { JsonLd } from '../../components/seo/JsonLd'
import { Button } from '../../components/ui/Button'
import { Photo } from '../../components/ui/Photo'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { keynoteStat } from '../../data/company'
import { engagements, keynotes, speakingFormats } from '../../data/speaking'
import { testimonials } from '../../data/testimonials'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Keynotes & Speaking',
  description: 'Book Tarun Makhija for keynotes, masterclasses and workshops on personal branding, AI and the future of work, digital marketing, entrepreneurship and storytelling for sales. 100+ keynote sessions delivered.',
  path: '/speaking',
})

export default function Page() {
  const quote = testimonials.find((testimonial) => testimonial.name === 'Ram Raju')!
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Speaking', path: '/speaking' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Speaking', path: '/speaking' }]}
        eyebrow="For event organisers"
        title="Keynotes with something to take back to work."
        lead={<p>Tarun has delivered {keynoteStat.value}{keynoteStat.suffix} keynote sessions on digital marketing, entrepreneurship and business strategy, for corporate teams, business schools and industry events. Every talk is built around what the audience should do next.</p>}
        actions={<><Button to="/contact?interest=keynote" size="lg" arrow track="speaking-intro">Request a speaker</Button><Button to="#keynotes" variant="quiet">Browse topics</Button></>}
        aside={
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo name="about-stage" alt="Tarun Makhija delivering a keynote to a large audience" preload loading="eager" sizes="(min-width: 1024px) 38vw, 92vw" className="size-full object-cover" />
            </div>
            <figcaption className="t-meta mt-3">Tarun Makhija on stage.</figcaption>
          </figure>
        }
      />

      <section id="keynotes" aria-labelledby="keynotes-title" className="section-y scroll-mt-20">
        <div className="container-x">
          <SectionHeader id="keynotes-title" title="Keynote topics" lead="Each can be delivered as a keynote, a masterclass or a hands-on workshop. Length is agreed with you around the event." />
          <ol className="mt-14">
            {keynotes.map((keynote, index) => (
              <li key={keynote.slug} id={keynote.slug} className="grid scroll-mt-28 gap-6 border-t border-line py-10 last:border-b lg:grid-cols-12 lg:gap-10">
                <p className="nums font-serif text-[1.3rem] text-brand-text lg:col-span-1">{String(index + 1).padStart(2, '0')}</p>
                <div className="lg:col-span-6">
                  <h3 className="font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.12] font-normal tracking-[-0.015em]">{keynote.title}</h3>
                  <p className="mt-3 font-serif text-[1.15rem] text-fg-2 italic">{keynote.question}</p>
                </div>
                <dl className="grid gap-4 text-[0.98rem] lg:col-span-5">
                  <div><dt className="text-fg-3">Audience</dt><dd className="mt-0.5">{keynote.audience}</dd></div>
                  <div><dt className="text-fg-3">Takeaway</dt><dd className="mt-0.5 text-fg-2">{keynote.takeaway}</dd></div>
                  {keynote.deliveredAt.length > 0 && (
                    <div><dt className="text-fg-3">Delivered for</dt><dd className="mt-0.5 text-fg-2">{keynote.deliveredAt.join(' · ')}</dd></div>
                  )}
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="formats-title" className="section-y bg-canvas-2">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader id="formats-title" title="Pick the depth your event needs" />
            <ul className="mt-10">
              {speakingFormats.map((format) => (
                <li key={format.title} className="border-t border-line py-5 last:border-b">
                  <h3 className="font-serif text-[1.6rem] font-normal">{format.title}</h3>
                  <p className="t-body mt-1">{format.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <figure className="self-start lg:col-span-6 lg:col-start-7">
            <div data-reveal="image" className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]">
              <Photo name="program-ai-productivity" alt="Tarun Makhija speaking from the floor of a tiered auditorium" sizes="(min-width: 1024px) 45vw, 92vw" className="size-full object-cover" />
            </div>
            <figcaption className="t-meta mt-3">Working the room in a tiered auditorium.</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="engagements-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeader id="engagements-title" title="Where Tarun has spoken and taught" />
            <ul className="mt-10">
              {engagements.map((engagement) => (
                <li key={engagement.organisation} className="grid gap-1 border-t border-line py-5 last:border-b sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
                  <p className="font-serif text-[1.3rem] leading-tight">{engagement.organisation}</p>
                  <p className="text-fg-2">{engagement.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="self-center lg:col-span-4 lg:col-start-9"><Quote testimonial={quote} /></div>
        </div>
      </section>

      <EnquiryCta
        title="Bring Tarun to your stage."
        body="Share the event, the audience, the date and what you want people to leave with. We’ll suggest a topic and format, or shape one around your theme."
        primary={{ label: 'Request a speaker', to: '/contact?interest=keynote' }}
      />
    </>
  )
}

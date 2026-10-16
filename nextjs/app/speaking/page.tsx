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
        eyebrow="Keynotes & speaking"
        title={<>Keynotes with something to <span className="text-brand-text">take back to work</span></>}
        lead={<p>Tarun has delivered {keynoteStat.value}{keynoteStat.suffix} keynote sessions on digital marketing, entrepreneurship and business strategy — for corporate teams, business schools and industry events. Every talk is built around what your audience should do next.</p>}
        actions={<><Button to="/contact?interest=keynote" size="lg" arrow>Request a speaker</Button><Button to="#keynotes" variant="quiet">Browse keynote topics</Button></>}
        aside={
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
            <Photo name="about-stage" alt="Tarun Makhija delivering a keynote to a large audience" preload loading="eager" sizes="(min-width: 1024px) 34vw, 92vw" className="size-full object-cover" />
          </div>
        }
      />

      <section id="keynotes" aria-labelledby="keynotes-title" className="section-y scroll-mt-20">
        <div className="container-x">
          <SectionHeader id="keynotes-title" eyebrow="Keynote catalogue" title="Topics" lead="Each topic can be delivered as a keynote, a masterclass or a hands-on workshop. Duration is set with you around the event." />
          <ol className="mt-14 border-t border-line">
            {keynotes.map((keynote, index) => (
              <li key={keynote.slug} id={keynote.slug} data-reveal className="grid scroll-mt-28 gap-6 border-b border-line py-10 lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
                <p className="nums font-display text-[1rem] font-bold text-brand-text">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className="t-h3 text-[clamp(1.4rem,2.2vw,1.9rem)]">{keynote.title}</h3>
                  <p className="mt-3 font-display text-[1.05rem] font-semibold text-fg-2 italic">{keynote.question}</p>
                </div>
                <dl className="grid gap-4 text-[0.95rem]">
                  <div><dt className="t-label text-fg-3">Audience</dt><dd className="mt-1">{keynote.audience}</dd></div>
                  <div><dt className="t-label text-fg-3">Takeaway</dt><dd className="mt-1 text-fg-2">{keynote.takeaway}</dd></div>
                  {keynote.deliveredAt.length > 0 && (
                    <div><dt className="t-label text-fg-3">Delivered for</dt><dd className="mt-1 text-fg-2">{keynote.deliveredAt.join(' · ')}</dd></div>
                  )}
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="formats-title" className="section-y border-t border-line-soft bg-canvas-2">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SectionHeader id="formats-title" eyebrow="Formats" title="Pick the depth your event needs" />
            <ul className="mt-10 border-t border-line">
              {speakingFormats.map((format) => (
                <li key={format.title} data-reveal className="border-b border-line py-5">
                  <h3 className="t-h3 text-[1.25rem]">{format.title}</h3>
                  <p className="t-body mt-1.5">{format.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start">
            <div data-reveal="image" className="relative col-span-2 aspect-[16/10] overflow-hidden">
              <Photo name="motilal-hall" alt="Tarun Makhija addressing entrepreneurs on the Motilal Oswal tour" sizes="(min-width: 1024px) 45vw, 92vw" className="size-full object-cover" />
            </div>
            <div data-reveal="image" className="relative aspect-square overflow-hidden">
              <Photo name="hdfc-energy" alt="Audience members raising their hands during a session" sizes="(min-width: 1024px) 22vw, 45vw" className="size-full object-cover" />
            </div>
            <div data-reveal="image" className="relative aspect-square overflow-hidden">
              <Photo name="bentley-session" alt="Tarun Makhija presenting a framework on stage" sizes="(min-width: 1024px) 22vw, 45vw" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="engagements-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <SectionHeader id="engagements-title" eyebrow="Selected engagements" title="Where Tarun has spoken and taught" />
            <ul className="mt-10 border-t border-line">
              {engagements.map((engagement) => (
                <li key={engagement.organisation} data-reveal className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
                  <p className="font-display text-[1.08rem] font-semibold">{engagement.organisation}</p>
                  <p className="text-[0.95rem] text-fg-2">{engagement.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="self-center"><Quote testimonial={quote} size="lg" /></div>
        </div>
      </section>

      <EnquiryCta
        title="Bring Tarun to your stage"
        body="Share the event, the audience, the date and what you want people to leave with. We’ll suggest a topic and format — or shape one around your theme."
        primary={{ label: 'Request a speaker', to: '/contact?interest=keynote' }}
        secondary={{ label: 'Explore Corporate Programs', to: '/corporate-training' }}
      />
    </>
  )
}

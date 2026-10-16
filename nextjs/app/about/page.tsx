import type { Metadata } from 'next'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { PageIntro } from '../../components/blocks/PageIntro'
import { Journey } from '../../components/sections/Journey'
import { JsonLd } from '../../components/seo/JsonLd'
import { Button } from '../../components/ui/Button'
import { Photo } from '../../components/ui/Photo'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { communityChannels } from '../../data/community'
import { company, founderCredentials } from '../../data/company'
import { recognitions } from '../../data/journey'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'About Tarun Makhija',
  description: 'Tarun Makhija is Chief Educator & Founder of TarunSpeaks — an IT engineer turned digital marketer, agency co-founder and corporate trainer. BW Marketing 30 Under 30 (2023).',
  path: '/about',
  image: '/images/profile/founder-portrait.webp',
})

// How we teach — the profile's own three words (p.2), each explained in plain terms.
const principles = [
  { title: 'Relevant', body: 'Built around your roles, your industry and the work your teams actually do.' },
  { title: 'Practical', body: 'Hands-on exercises, live reviews and real scenarios — outputs people can use the next day.' },
  { title: 'Inspiring', body: 'Sessions with energy, so people leave wanting to act — not just with notes.' },
]

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
        eyebrow="The practitioner behind the work"
        title="Tarun Makhija, Chief Educator & Founder."
        lead={
          <>
            <p>An IT engineer who co-founded a digital marketing agency, then found his calling in teaching what worked. Today he leads TarunSpeaks and still delivers the programs himself.</p>
            <ul className="mt-6 space-y-1 text-[1rem] text-fg">
              {founderCredentials.map((credential) => <li key={credential} className="flex gap-3"><span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-brand-bright" />{credential}</li>)}
            </ul>
          </>
        }
        actions={<Button to="/contact" size="lg" arrow track="about-intro">Talk to TarunSpeaks</Button>}
        aside={
          <figure>
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden bg-black lg:max-w-none">
              <Photo name="founder-portrait" alt="Portrait of Tarun Makhija" tone="color" preload loading="eager" sizes="(min-width: 1024px) 38vw, 80vw" className="size-full object-cover object-top" />
            </div>
          </figure>
        }
      />

      <section aria-labelledby="mission-title" className="section-y">
        <div className="container-x">
          <h2 id="mission-title" className="sr-only">Mission and vision</h2>
          <div className="grid gap-12 md:grid-cols-2 md:gap-10">
            {[{ label: 'Our mission', text: company.mission }, { label: 'Our vision', text: company.vision }].map((item) => (
              <div key={item.label} className="border-t-2 border-brand-bright pt-6">
                <p className="text-[0.95rem] font-semibold text-brand-text">{item.label}</p>
                <p className="mt-4 font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em]">{item.text}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-line-soft bg-canvas-2"><Journey /></div>

      <section aria-labelledby="principles-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5"><SectionHeader id="principles-title" eyebrow="How we teach" title="We don’t just train individuals — we transform them." lead={company.approach} /></div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {principles.map((principle) => (
              <li key={principle.title} className="border-t border-line py-6 last:border-b">
                <h3 className="font-serif text-[2rem] leading-none font-normal italic">{principle.title}</h3>
                <p className="t-body mt-3">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="recognition-title" className="section-y border-t border-line-soft bg-canvas-2">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader id="recognition-title" title="Recognition" />
            <figure className="mt-10">
              <div data-reveal="image" className="relative aspect-[4/3] overflow-hidden">
                <Photo name="tarun-google" alt="Tarun Makhija at the Google office in Mumbai" sizes="(min-width: 1024px) 38vw, 92vw" className="size-full object-cover object-[50%_30%]" />
              </div>
              <figcaption className="t-meta mt-3">Tarun Makhija at the Google office in Mumbai.</figcaption>
            </figure>
          </div>
          <ul className="self-end lg:col-span-6 lg:col-start-7">
            {recognitions.map((recognition) => (
              <li key={recognition.title} className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-t border-line py-5 last:border-b">
                <div>
                  <p className="font-serif text-[1.35rem] leading-tight">{recognition.title}</p>
                  <p className="mt-1 text-[0.95rem] text-fg-2">{recognition.detail}</p>
                </div>
                {recognition.year && <p className="nums text-fg-3">{recognition.year}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="community-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><SectionHeader id="community-title" title="Beyond the boardroom" lead="Alongside corporate work, Tarun runs the Be Limitless learning community for marketers, creators and entrepreneurs." /></div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {communityChannels.map((channel) => (
              <li key={channel.title} className="border-t border-line py-5">
                <h3 className="text-[1.05rem] font-semibold">{channel.title}</h3>
                <p className="mt-1.5 text-[0.98rem] text-fg-2">{channel.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryCta />
    </>
  )
}

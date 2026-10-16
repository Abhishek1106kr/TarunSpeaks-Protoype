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

// "How we work" — each principle is the profile's own wording (p.2 and p.66).
const principles = [
  { title: 'Relevant', body: 'Learning built around your roles, your industry and the work your teams actually do.' },
  { title: 'Practical', body: 'Hands-on exercises, live reviews and real scenarios — outputs people can use the next day.' },
  { title: 'Inspiring', body: 'High-energy sessions that make people want to act, not just take notes.' },
]

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
        eyebrow="Meet the founder"
        title={<>Tarun Makhija, the <span className="text-brand-text">practitioner</span> behind the work</>}
        lead={
          <>
            <p>An IT engineer who co-founded a digital marketing agency, then found his calling in teaching what worked. Today Tarun leads TarunSpeaks as Chief Educator &amp; Founder, and still delivers the programs himself.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {founderCredentials.map((credential) => <li key={credential} className="border border-line px-3 py-1.5 text-[0.85rem] text-fg">{credential}</li>)}
            </ul>
          </>
        }
        actions={<Button to="/contact" size="lg" arrow>Talk to TarunSpeaks</Button>}
        aside={
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden bg-black lg:max-w-none">
            <Photo name="founder-portrait" alt="Portrait of Tarun Makhija" tone="color" preload loading="eager" sizes="(min-width: 1024px) 34vw, 80vw" className="size-full object-cover object-top" />
          </div>
        }
      />

      <section aria-labelledby="mission-title" className="section-y">
        <div className="container-x">
          <h2 id="mission-title" className="sr-only">Mission and vision</h2>
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {[{ label: 'Mission', text: company.mission }, { label: 'Vision', text: company.vision }].map((item) => (
              <div key={item.label} data-reveal className="bg-canvas p-8 sm:p-12">
                <p className="t-signature text-[1.4rem] text-brand-text">{item.label}</p>
                <p className="mt-6 font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.025em]">{item.text}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-line-soft bg-canvas-2"><Journey /></div>

      <section aria-labelledby="principles-title" className="section-y">
        <div className="container-x">
          <SectionHeader id="principles-title" eyebrow="How we teach" title="We don’t just train individuals — we transform them." lead={company.approach} />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.title} data-reveal style={{ '--reveal-delay': `${index * 0.08}s` } as React.CSSProperties} className="border-t-2 border-brand-bright pt-6">
                <h3 className="t-signature text-[1.9rem]">{principle.title}<span className="text-brand-bright">.</span></h3>
                <p className="t-body mt-3">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="recognition-title" className="section-y border-t border-line-soft bg-canvas-2">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SectionHeader id="recognition-title" eyebrow="Recognition" title="Recognised for teaching and marketing" />
            <div data-reveal="image" className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Photo name="tarun-google" alt="Tarun Makhija at the Google office in Mumbai" sizes="(min-width: 1024px) 38vw, 92vw" className="size-full object-cover object-[50%_30%]" />
            </div>
          </div>
          <ul className="self-end border-t border-line">
            {recognitions.map((recognition) => (
              <li key={recognition.title} data-reveal className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-b border-line py-5">
                <div>
                  <p className="font-display text-[1.15rem] font-semibold tracking-[-0.01em]">{recognition.title}</p>
                  <p className="mt-1 text-[0.92rem] text-fg-2">{recognition.detail}</p>
                </div>
                {recognition.year && <p className="nums text-[0.9rem] text-fg-3">{recognition.year}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="community-title" className="section-y">
        <div className="container-x">
          <SectionHeader id="community-title" eyebrow="Beyond the boardroom" title="The Be Limitless community" lead="Alongside corporate work, Tarun runs a learning community for marketers, creators and entrepreneurs." />
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {communityChannels.map((channel) => (
              <li key={channel.title} data-reveal className="bg-canvas p-6">
                <h3 className="font-display text-[1.1rem] font-semibold">{channel.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-fg-2">{channel.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryCta />
    </>
  )
}

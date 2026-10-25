import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '../ui/Eyebrow'
import { Photo } from '../ui/Photo'

// Tarun as the practitioner behind the work: one real portrait, a short verified narrative, and the
// milestones that explain why buyers can trust the method. The full journey lives on /about.
const milestones = [
  { when: '2015', what: 'Joins Tata Consultancy Services after roles at L&T Infotech, Tech Mahindra and Zensar' },
  { when: '2016', what: 'Co-founds Big Mouth Digital & Media, a Mumbai branding and digital marketing agency' },
  { when: '2023', what: 'BW Marketing 30 Under 30' },
  { when: 'Today', what: 'Chief Educator & Founder, TarunSpeaks, 100+ keynote sessions delivered' },
]

export function Founder() {
  return (
    <section aria-labelledby="founder-title" className="section-y bg-canvas-2">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-5">
          <div data-reveal="image" className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden bg-black lg:max-w-none">
            <Photo name="founder-portrait" alt="Portrait of Tarun Makhija" tone="color" sizes="(min-width: 1024px) 36vw, 90vw" className="size-full object-cover object-top" />
          </div>
          <figcaption className="t-meta mt-3">Tarun Makhija, Chief Educator &amp; Founder.</figcaption>
        </figure>
        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Eyebrow className="mb-6">The practitioner behind the work</Eyebrow>
          <h2 id="founder-title" className="t-h2">An engineer who built a marketing agency, then made teaching it his work.</h2>
          <div className="t-body mt-6 max-w-xl space-y-4">
            <p>Tarun Makhija began in IT engineering. In 2016 he co-founded Big Mouth Digital &amp; Media, running digital marketing for 270+ brands across 15+ industries and more than 750 campaigns.</p>
            <p>Along the way he found his calling in mentoring and educating people on digital growth. TarunSpeaks programs draw on that practitioner experience, and he still delivers them himself.</p>
          </div>
          <ol className="mt-9 border-t border-line">
            {milestones.map((milestone) => (
              <li key={milestone.when} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 border-b border-line py-3.5 text-[0.98rem]">
                <span className="nums font-serif text-[1.1rem] text-brand-text">{milestone.when}</span>
                <span className="text-fg-2">{milestone.what}</span>
              </li>
            ))}
          </ol>
          <Link href="/about" className="link-arrow mt-8">Read Tarun’s story<ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

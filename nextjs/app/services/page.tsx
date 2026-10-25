import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { PageIntro } from '../../components/blocks/PageIntro'
import { JsonLd } from '../../components/seo/JsonLd'
import { Photo } from '../../components/ui/Photo'
import type { PhotoName } from '../../lib/images'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description: 'Everything TarunSpeaks offers: corporate training programs, consulting and AI adoption support, keynotes and speaking, and one-on-one career consultation.',
  path: '/services',
})

// Hub for the service pages. The ids preserve the anchors that legacy URLs and links point to.
const services: { id: string; label: string; title: string; body: string; points: string[]; href: string; cta: string; image: PhotoName; alt: string }[] = [
  {
    id: 'training',
    label: 'Train',
    title: 'Corporate training',
    body: 'Eight flagship programs and custom modules in AI tools, AI for sales, leadership, personal branding, marketing, client relationships and communication.',
    points: ['3–30 hours, modular and customisable', 'Workshop, masterclass or full learning journey', 'Multi-city and multi-cohort delivery'],
    href: '/corporate-training',
    cta: 'Explore Corporate Programs',
    image: 'motilal-room',
    alt: 'A training session for entrepreneurs in the Motilal Oswal network',
  },
  {
    id: 'consultation',
    label: 'Consult',
    title: 'Consulting & AI adoption support',
    body: 'Advisory on branding, digital marketing, campaigns, business growth and personal branding for CXOs, plus support rolling out AI tools, agents and generative AI workflows.',
    points: ['Branding & digital marketing', 'AI tools / agent rollout', 'Gen AI & agentic AI planning'],
    href: '/consulting',
    cta: 'Request a Consultation',
    image: 'nawany-team',
    alt: 'Tarun Makhija with Nawany Group leaders',
  },
  {
    id: 'speaking',
    label: 'Empower',
    title: 'Keynotes & speaking',
    body: 'Keynotes, masterclasses and workshops for corporate and institutional audiences, with 100+ keynote sessions delivered.',
    points: ['Personal branding & LinkedIn growth', 'The future of work: AI & digital skills', 'Entrepreneurship & business growth'],
    href: '/speaking',
    cta: 'Explore Keynotes',
    image: 'about-stage',
    alt: 'Tarun Makhija on stage',
  },
  {
    id: 'career',
    label: 'For individuals',
    title: 'Career consultation',
    body: 'Personal, 1 on 1 consultations for people navigating their professional path, plus one-on-one mentorship for aspiring marketers and entrepreneurs through Topmate.',
    points: ['1 on 1 consultation', 'Career guidance', 'Mentorship on Topmate'],
    href: '/contact?interest=career',
    cta: 'Book a 1 on 1 consultation',
    image: 'consultation-office',
    alt: 'Tarun Makhija in a one-on-one consultation',
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
        eyebrow="Services"
        title="Train. Consult. Empower."
        lead={<p>Everything TarunSpeaks offers, in one place. Organisations usually start with training; many add advisory and adoption support as the work moves into the business.</p>}
      />
      <div className="container-x py-12 lg:py-16">
        <ol>
          {services.map((service, index) => (
            <li key={service.id} id={service.id} className="scroll-mt-24 border-b border-line py-12 lg:py-16">
              <article aria-labelledby={`${service.id}-title`} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <p className="font-serif text-[clamp(2rem,3.4vw,2.8rem)] leading-none text-brand-text italic lg:col-span-3">{service.label}</p>
                <div className="lg:col-span-5">
                  <h2 id={`${service.id}-title`} className="t-h2">{service.title}</h2>
                  <p className="t-body mt-4">{service.body}</p>
                  <ul className="mt-6 space-y-2">
                    {service.points.map((point) => <li key={point} className="flex gap-3"><span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-brand-bright" />{point}</li>)}
                  </ul>
                  <Link href={service.href} className="link-arrow mt-7">{service.cta}<ArrowRight aria-hidden="true" size={16} /></Link>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden lg:col-span-4">
                  <Photo name={service.image} alt={service.alt} loading={index === 0 ? 'eager' : 'lazy'} sizes="(min-width: 1024px) 28vw, 92vw" className="size-full object-cover" />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <EnquiryCta />
    </>
  )
}

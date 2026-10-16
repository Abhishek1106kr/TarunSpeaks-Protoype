import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

// Buyer question: "What exactly can I commission?" — three distinct engagements, set as numbered
// editorial entries (not three identical cards), each with its audience, formats and evidence.
const offers = [
  {
    title: 'Corporate training programs',
    body: 'Practical programs in AI tools, AI for sales, leadership, personal branding, marketing, client relationships and communication — built around your roles and real scenarios.',
    facts: [
      ['For', 'CHROs and L&D leaders building a capability across a team or function'],
      ['Format', 'Workshop, masterclass or full learning journey · 3–30 hours'],
      ['Evidence', '4,300+ trained across 42 cities for Sansaar by D’Decor'],
    ],
    href: '/corporate-training',
    cta: 'Explore Corporate Programs',
  },
  {
    title: 'Advisory & AI implementation',
    body: 'Consulting on branding, digital marketing, campaigns and business growth — and hands-on support deploying AI tools and agents, and implementing generative and agentic AI.',
    facts: [
      ['For', 'Founders and leadership teams setting direction or rolling out AI'],
      ['Format', 'Scoped consulting engagement, often alongside training'],
      ['Evidence', 'A personalised AI adoption plan for each Nawany Group participant'],
    ],
    href: '/consulting',
    cta: 'Discuss AI Capability Building',
  },
  {
    title: 'Keynotes & leadership sessions',
    body: 'Keynotes and masterclasses for offsites, conferences and institutions — on personal branding, digital growth, entrepreneurship, storytelling and the future of work.',
    facts: [
      ['For', 'Event organisers and leaders briefing a large audience'],
      ['Format', 'Keynote, masterclass or hands-on workshop'],
      ['Evidence', '100+ keynote sessions delivered'],
    ],
    href: '/speaking',
    cta: 'Explore Keynotes',
  },
]

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do-title" className="section-y border-t border-line-soft">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              id="what-we-do-title"
              eyebrow="What you can commission"
              title="Three ways to work with us"
              lead="Most engagements start with training. Many continue into advisory work and implementation, so new skills show up in everyday work."
            />
          </div>
        </div>
        <ol className="lg:col-span-8">
          {offers.map((offer, index) => (
            <li key={offer.title} className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_minmax(0,1fr)] lg:py-12">
              <span className="font-serif text-[2.2rem] leading-none text-brand-text italic">{index + 1}.</span>
              <div>
                <h3 className="font-serif text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.08] font-normal tracking-[-0.02em]">{offer.title}</h3>
                <p className="t-body mt-4 max-w-2xl">{offer.body}</p>
                <dl className="mt-7 grid gap-x-8 gap-y-3 text-[0.95rem] sm:grid-cols-[6rem_minmax(0,1fr)]">
                  {offer.facts.map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt className="text-fg-3">{label}</dt>
                      <dd className="text-fg">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={offer.href} className="link-arrow mt-7">{offer.cta}<ArrowRight aria-hidden="true" size={16} /></Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

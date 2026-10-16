import type { Metadata } from 'next'
import Link from 'next/link'
import { ClientSectors } from '../components/blocks/ClientSectors'
import { EnquiryCta } from '../components/blocks/EnquiryCta'
import { FaqList } from '../components/blocks/FaqList'
import { ProgramTable } from '../components/blocks/ProgramTable'
import { Quote } from '../components/blocks/Quote'
import { Delivery } from '../components/home/Delivery'
import { FeaturedCase } from '../components/home/FeaturedCase'
import { Founder } from '../components/home/Founder'
import { Hero } from '../components/home/Hero'
import { Objectives } from '../components/home/Objectives'
import { WhatWeDo } from '../components/home/WhatWeDo'
import { SectionHeader } from '../components/ui/SectionHeader'
import { faqs } from '../data/faq'
import { deliveryTerms } from '../data/programs'
import { testimonials } from '../data/testimonials'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

// Buyer journey (UX.md): proposition + evidence → choose an objective → what you can commission →
// the eight programs → proof → how the work runs → client ecosystem → the practitioner → FAQ → invitation.
const homeFaqs = ['Who are the programs designed for?', 'Can a program be designed for our roles and industry?', 'How long are your programs?', 'What happens after we submit an enquiry?', 'How do we start?']
  .map((question) => faqs.find((faq) => faq.question === question)!)

export default function Page() {
  const quote = testimonials.find((testimonial) => testimonial.name === 'Ram Raju')!
  return (
    <>
      <Hero />
      <Objectives />
      <WhatWeDo />

      <section aria-labelledby="programs-title" className="on-paper section-y">
        <div className="container-x">
          <SectionHeader
            id="programs-title"
            eyebrow="Flagship programs"
            title="Eight programs, each built around a specific problem"
            lead={`${deliveryTerms.note} ${deliveryTerms.duration}, as a workshop, masterclass or full learning journey.`}
          />
          <div className="mt-14"><ProgramTable /></div>
          <Link href="/programs" className="link-arrow mt-10">Compare programs in detail</Link>
        </div>
      </section>

      <FeaturedCase />
      <Delivery />
      <div className="border-t border-line-soft"><ClientSectors /></div>
      <Founder />

      <section aria-labelledby="voice-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h2 id="voice-title" className="sr-only">In participants’ words</h2>
          <div className="lg:col-span-8"><Quote testimonial={quote} size="lg" /></div>
          <div className="flex flex-col justify-end border-t border-line pt-6 lg:col-span-3 lg:col-start-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="font-serif text-[1.35rem] leading-snug">Planning a conference or offsite?</p>
            <p className="t-body mt-2">100+ keynote sessions on personal branding, digital growth, entrepreneurship and the future of work.</p>
            <Link href="/speaking" className="link-arrow mt-4">Explore Keynotes</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="section-y border-t border-line-soft">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><SectionHeader id="faq-title" eyebrow="Questions buyers ask" title="Before you get in touch" /></div>
          <div className="lg:col-span-8"><FaqList items={homeFaqs} /></div>
        </div>
      </section>

      <EnquiryCta
        title="Let’s discuss the capability your organisation needs to build."
        primary={{ label: 'Discuss Your Requirements', to: '/contact' }}
      />
    </>
  )
}

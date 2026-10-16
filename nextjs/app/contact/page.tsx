import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Mail, Phone } from 'lucide-react'
import { EnquiryForm } from '../../components/blocks/EnquiryForm'
import { FaqList } from '../../components/blocks/FaqList'
import { JsonLd } from '../../components/seo/JsonLd'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { company, socials } from '../../data/company'
import { faqs } from '../../data/faq'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: 'Talk to TarunSpeaks about corporate training, AI capability building, consulting or a keynote. Share your team, the capability you want to build and your timelines.',
  path: '/contact',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
}

const nextSteps = [
  'You share the team, the capability and your timelines.',
  'We reply to discuss context, audience and constraints.',
  'We recommend a program, custom modules or a consulting scope — and a format.',
]

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <JsonLd data={faqJsonLd} />

      <section aria-labelledby="contact-title" className="relative overflow-hidden pt-[4.5rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(60%_70%_at_15%_0%,rgb(23_73_209/0.2),transparent_70%)]" />
        <div className="container-x relative grid gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:pb-28">
          <div>
            <Eyebrow className="enter mb-6">Contact</Eyebrow>
            <h1 id="contact-title" className="t-h1 enter" style={{ '--enter-delay': '0.08s' } as React.CSSProperties}>Talk to TarunSpeaks</h1>
            <p className="t-lead enter mt-6" style={{ '--enter-delay': '0.16s' } as React.CSSProperties}>Tell us about your team, the capability you want to build and any timelines. We’ll recommend the right format — a workshop, a masterclass, a full learning journey or a consulting engagement.</p>

            <ol className="mt-10 border-t border-line">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-4 border-b border-line py-4 text-[0.95rem]">
                  <span className="nums font-display font-bold text-brand-text">{String(index + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>

            <ul className="mt-10 grid gap-4">
              <li>
                <a href={company.email.href} className="group flex min-h-11 items-center gap-4">
                  <span className="grid size-11 place-items-center border border-line text-brand-text group-hover:border-brand-bright"><Mail size={18} aria-hidden="true" /></span>
                  <span><span className="t-label block text-fg-3">Email</span><span className="break-all group-hover:text-brand-text">{company.email.label}</span></span>
                </a>
              </li>
              <li>
                <a href={company.phone.href} className="group flex min-h-11 items-center gap-4">
                  <span className="grid size-11 place-items-center border border-line text-brand-text group-hover:border-brand-bright"><Phone size={18} aria-hidden="true" /></span>
                  <span><span className="t-label block text-fg-3">Phone</span><span className="group-hover:text-brand-text">{company.phone.label}</span></span>
                </a>
              </li>
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-5 text-[0.9rem] text-fg-2">
              {socials.map((social) => (
                <li key={social.label}><a href={social.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-fg">{social.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
              ))}
            </ul>
          </div>

          <div className="enter border border-line bg-canvas-2 p-6 sm:p-10" style={{ '--enter-delay': '0.2s' } as React.CSSProperties}>
            <h2 className="t-h3 mb-2">Send an enquiry</h2>
            <p className="mb-8 text-[0.9rem] text-fg-3">All fields are required unless marked optional.</p>
            <Suspense fallback={<div className="min-h-[36rem]" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="section-y border-t border-line-soft">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeader id="faq-title" eyebrow="FAQ" title="Before you write" />
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}

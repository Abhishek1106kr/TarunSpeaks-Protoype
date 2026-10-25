import type { Metadata } from 'next'
import { Suspense } from 'react'
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
  description: 'Talk to TarunSpeaks about corporate training, AI capability building, consulting or a keynote. Request a consultation call or send an enquiry.',
  path: '/contact',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <JsonLd data={faqJsonLd} />

      <section aria-labelledby="contact-title" className="pt-[4.5rem]">
        <div className="container-x grid gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28">
          <div className="contents lg:block lg:col-span-4">
            <div className="order-1 lg:order-none">
              <Eyebrow className="enter mb-6">Contact</Eyebrow>
              <h1 id="contact-title" className="t-h1 enter" style={{ '--enter-delay': '0.06s' } as React.CSSProperties}>Discuss your requirements.</h1>
              <p className="t-lead enter mt-6" style={{ '--enter-delay': '0.14s' } as React.CSSProperties}>Request a consultation call or send an enquiry. Tell us about your team, the capability you want to build and any timelines.</p>
            </div>

            <div className="order-3 mt-12 lg:order-none">
              <h2 className="font-sans text-[0.95rem] font-semibold tracking-normal">Prefer to reach us directly?</h2>
              <dl className="mt-3 border-t border-line">
                <div className="border-b border-line py-4">
                  <dt className="text-[0.9rem] text-fg-3">Email</dt>
                  <dd><a href={company.email.href} className="text-[1.08rem] break-all underline decoration-line underline-offset-4 hover:decoration-brand-bright">{company.email.label}</a></dd>
                </div>
                <div className="border-b border-line py-4">
                  <dt className="text-[0.9rem] text-fg-3">Phone</dt>
                  <dd><a href={company.phone.href} className="text-[1.08rem] underline decoration-line underline-offset-4 hover:decoration-brand-bright">{company.phone.label}</a></dd>
                </div>
              </dl>
              <ul className="mt-6 flex flex-wrap gap-x-5 text-[0.95rem] text-fg-2">
                {socials.map((social) => (
                  <li key={social.label}><a href={social.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-fg">{social.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="enter order-2 border-t-2 border-brand-bright pt-8 lg:order-none lg:col-span-7 lg:col-start-6" style={{ '--enter-delay': '0.18s' } as React.CSSProperties}>
            <p className="t-meta mb-3">Requesting a consultation books a callback; it does not confirm an appointment.</p>
            <p className="t-meta mb-8">Fields are required unless marked optional.</p>
            <Suspense fallback={<div className="min-h-[40rem]" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="section-y border-t border-line-soft">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><SectionHeader id="faq-title" title="Before you write" /></div>
          <div className="lg:col-span-8"><FaqList items={faqs} /></div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import { ContactView } from '../../components/views/ContactView'
import { JsonLd } from '../../components/seo/JsonLd'
import { faqs } from '../../data/faq'
import { breadcrumbJsonLd } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell us about your business, team or event, and we’ll find the right way to work together. 25,000+ individuals trained, 1,600+ sessions and 297+ brands.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — Tarun Makhija', url: '/contact' },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
])

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqJsonLd} />
      <ContactView />
    </>
  )
}

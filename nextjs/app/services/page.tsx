import type { Metadata } from 'next'
import { ServicesView } from '../../components/views/ServicesView'
import { JsonLd } from '../../components/seo/JsonLd'
import { breadcrumbJsonLd } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Digital marketing consultation, corporate training, public speaking and career consultation — practical sessions built around your context.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Services — Tarun Makhija', url: '/services' },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
])

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <ServicesView />
    </>
  )
}

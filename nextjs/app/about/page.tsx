import type { Metadata } from 'next'
import { AboutView } from '../../components/views/AboutView'
import { JsonLd } from '../../components/seo/JsonLd'
import { breadcrumbJsonLd } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'About',
  description: 'From IT engineer to digital marketing mentor — the story behind Tarun Makhija, plus milestones, recognitions and focus areas.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About — Tarun Makhija', url: '/about' },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
])

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AboutView />
    </>
  )
}

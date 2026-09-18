import type { Metadata } from 'next'
import { SpeakingView } from '../../components/views/SpeakingView'
import { JsonLd } from '../../components/seo/JsonLd'
import { breadcrumbJsonLd } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'With over 10 years of experience, Tarun has delivered 1,600+ sessions and 100+ keynotes across the country. Invite him to speak at your event.',
  alternates: { canonical: '/speaking' },
  openGraph: { title: 'Speaking — Tarun Makhija', url: '/speaking' },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Speaking', path: '/speaking' },
])

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <SpeakingView />
    </>
  )
}

import type { Metadata } from 'next'
import { InsightsView } from '../../components/views/InsightsView'
import { JsonLd } from '../../components/seo/JsonLd'
import { breadcrumbJsonLd } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'The most powerful blogs on digital marketing, personal branding and content creation — with a tinge of positivity.',
  alternates: { canonical: '/insights' },
  openGraph: { title: 'Insights — Tarun Makhija', url: '/insights' },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/insights' },
])

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <InsightsView />
    </>
  )
}

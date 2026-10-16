import type { Metadata } from 'next'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { InsightGrid } from '../../components/blocks/InsightGrid'
import { PageIntro } from '../../components/blocks/PageIntro'
import { JsonLd } from '../../components/seo/JsonLd'
import { breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Insights',
  description: 'Articles by Tarun Makhija on AI tools, digital marketing, personal branding, LinkedIn and content creation.',
  path: '/insights',
})

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights' }])} />
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights' }]}
        eyebrow="Insights"
        title="Read, learn, grow."
        lead={<p>Articles on AI tools, digital marketing, personal branding and content creation — the same material Tarun teaches in the room.</p>}
      />
      <section aria-labelledby="articles-title" className="section-y-sm pb-24">
        <div className="container-x">
          <h2 id="articles-title" className="sr-only">Articles</h2>
          <InsightGrid />
        </div>
      </section>
      <EnquiryCta />
    </>
  )
}

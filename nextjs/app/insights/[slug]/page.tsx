import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EnquiryCta } from '../../../components/blocks/EnquiryCta'
import { InsightCard } from '../../../components/blocks/InsightCard'
import { ArticleBody } from '../../../components/insights/ArticleBody'
import { ArticleToc } from '../../../components/insights/ArticleToc'
import { ReadingProgress } from '../../../components/insights/ReadingProgress'
import { ShareArticle } from '../../../components/insights/ShareArticle'
import { JsonLd } from '../../../components/seo/JsonLd'
import { Photo } from '../../../components/ui/Photo'
import { articles } from '../../../data/articles'
import { insights } from '../../../data/insights'
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from '../../../lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  const insight = insights.find((item) => item.slug === slug)
  if (!article || !insight) return {}
  return pageMetadata({ title: article.title, description: insight.excerpt, path: `/insights/${slug}`, image: article.cover.src })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articleIndex = articles.findIndex((item) => item.slug === slug)
  const article = articles[articleIndex]
  const insight = insights.find((item) => item.slug === slug)
  if (!article || !insight) notFound()

  const path = `/insights/${article.slug}`
  const headings = article.blocks.filter((block): block is Extract<typeof article.blocks[number], { type: 'h2' }> => block.type === 'h2')
  const tocItems = (headings.length >= 2 ? headings : article.blocks.filter((block): block is Extract<typeof article.blocks[number], { type: 'h3' }> => block.type === 'h3')).map(({ id, text }) => ({ id, text }))
  const previous = articles[articleIndex - 1]
  const next = articles[articleIndex + 1]
  const related = insights
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const topicOrder = Number(b.topic === insight.topic) - Number(a.topic === insight.topic)
      if (topicOrder) return topicOrder
      return new Date(articles.find((item) => item.slug === b.slug)?.publishedAt ?? 0).getTime() - new Date(articles.find((item) => item.slug === a.slug)?.publishedAt ?? 0).getTime()
    })
    .slice(0, 3)
  const formattedDate = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(article.publishedAt))
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    image: absoluteUrl(article.cover.src),
    author: { '@type': 'Person', name: 'Tarun Makhija', url: absoluteUrl('/about') },
    publisher: { '@type': 'Organization', name: 'TarunSpeaks', url: absoluteUrl('/') },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
  }

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights' }, { name: article.title, path }])} />
      <JsonLd data={articleJsonLd} />

      <section className="pt-[4.5rem]">
        <div className="container-x pb-12 pt-12 sm:pb-16 sm:pt-16">
          <nav aria-label="Breadcrumb" className="t-meta mb-7">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-fg">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/insights" className="inline-flex min-h-11 items-center hover:text-fg">Insights</Link></li>
            </ol>
          </nav>
          <p className="text-[0.95rem] font-semibold text-brand-text">{insight.category}</p>
          <h1 className="t-h1 mt-5 max-w-[22ch]">{article.title}</h1>
          <div className="t-meta mt-6 flex flex-wrap gap-x-5 gap-y-2">
            <span>By <Link href="/about" className="inline-flex min-h-11 items-center text-fg-2 underline underline-offset-4 hover:text-fg">Tarun Makhija</Link></span>
            <span>{formattedDate}</span>
            <span>{article.readingMinutes} min read</span>
          </div>
        </div>
      </section>

      <div className="container-x">
        <Image src={article.cover.src} alt={article.cover.alt || article.title} width={article.cover.width} height={article.cover.height} priority sizes="(min-width: 1280px) 1200px, 100vw" className="aspect-[16/9] w-full rounded-[1.25rem] border border-line object-cover" />
      </div>

      <div className="container-x py-16 lg:py-24">
        <ArticleToc items={tocItems} mode="mobile" />
        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <article id="article-body" className="min-w-0 lg:col-span-8"><ArticleBody blocks={article.blocks} /></article>
          <aside className="hidden lg:col-span-4 lg:block lg:self-start lg:sticky lg:top-28">
            <ArticleToc items={tocItems} mode="desktop" />
            <div className="mt-10"><ShareArticle path={path} title={article.title} /></div>
          </aside>
        </div>
        <p className="mt-8 text-sm text-fg-3">First published on <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-brand-bright underline-offset-4 hover:text-fg">tarunmakhija.in</a></p>

        <section className="mt-16 border-t border-line pt-8" aria-labelledby="author-note-title">
          <div className="flex max-w-2xl items-center gap-5">
            <Photo name="founder-portrait" alt="Tarun Makhija" sizes="4rem" className="size-16 rounded-full object-cover" />
            <p id="author-note-title" className="text-[0.98rem] leading-relaxed text-fg-2">Written by Tarun Makhija, Chief Educator and Founder, TarunSpeaks. <Link href="/about" className="text-fg underline decoration-brand-bright underline-offset-4 hover:text-brand-text">About Tarun</Link></p>
          </div>
        </section>

        <nav className="mt-14 grid gap-8 border-y border-line py-8 sm:grid-cols-2" aria-label="Article navigation">
          {previous ? <Link href={`/insights/${previous.slug}`} className="group"><span className="t-meta block">Previous article</span><span className="mt-2 block font-primary text-lg font-medium group-hover:text-brand-text">{previous.title}</span></Link> : <span />}
          {next ? <Link href={`/insights/${next.slug}`} className="group text-left sm:text-right"><span className="t-meta block">Next article</span><span className="mt-2 block font-primary text-lg font-medium group-hover:text-brand-text">{next.title}</span></Link> : <span />}
        </nav>

        {related.length > 0 && <section className="mt-16" aria-labelledby="keep-reading-title"><h2 id="keep-reading-title" className="t-h2">Keep reading</h2><div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map((post) => <InsightCard key={post.slug} post={post} />)}</div></section>}
      </div>
      <EnquiryCta />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CaseStudyCard } from '../../../components/blocks/CaseStudyCard'
import { EnquiryCta } from '../../../components/blocks/EnquiryCta'
import { PageIntro } from '../../../components/blocks/PageIntro'
import { JsonLd } from '../../../components/seo/JsonLd'
import { Photo } from '../../../components/ui/Photo'
import { caseStudies, caseStudyBySlug } from '../../../data/caseStudies'
import { programBySlug } from '../../../data/programs'
import { photos } from '../../../lib/images'
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from '../../../lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: PageProps<'/case-studies/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudyBySlug(slug)
  if (!study) return {}
  return pageMetadata({
    title: `${study.client} — Case Study`,
    description: `${study.objective} ${study.format.join(' · ')}.`,
    path: `/case-studies/${study.slug}`,
    image: photos[study.images[0].name].src,
  })
}

export default async function Page({ params }: PageProps<'/case-studies/[slug]'>) {
  const { slug } = await params
  const study = caseStudyBySlug(slug)
  if (!study) notFound()

  const programs = study.programs.map((programSlug) => programBySlug(programSlug)!).filter(Boolean)
  const others = caseStudies.filter((other) => other.slug !== study.slug && other.track === study.track).slice(0, 3)
  const path = `/case-studies/${study.slug}`
  // The banner is wide, so it takes the most landscape photo; the rest form the gallery.
  const aspect = (name: (typeof study.images)[number]['name']) => photos[name].width / photos[name].height
  const cover = study.images.reduce((widest, image) => (aspect(image.name) > aspect(widest.name) ? image : widest))
  const gallery = study.images.filter((image) => image !== cover)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.headline,
    description: study.objective,
    image: absoluteUrl(photos[cover.name].src),
    url: absoluteUrl(path),
    author: { '@type': 'Organization', name: 'TarunSpeaks' },
    publisher: { '@type': 'Organization', name: 'TarunSpeaks' },
    about: { '@type': 'Organization', name: study.client },
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }, { name: study.client, path }])} />
      <JsonLd data={articleJsonLd} />

      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }, { name: study.client, path }]}
        eyebrow={`${study.track} · ${study.client}`}
        title={study.headline}
        lead={<p>{study.objective}</p>}
        aside={
          <dl className="grid grid-cols-2 gap-px border border-line bg-line">
            {study.figures.map((figure) => (
              <div key={figure.label} className="flex flex-col gap-2 bg-canvas p-5">
                <dt className="text-[0.82rem] text-fg-3">{figure.label}</dt>
                <dd className="nums order-first font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-none font-bold tracking-[-0.03em]">{figure.value}</dd>
              </div>
            ))}
            <div className={`bg-canvas p-5 ${study.figures.length % 2 ? '' : 'col-span-2'}`}>
              <dt className="text-[0.82rem] text-fg-3">Industry</dt>
              <dd className="mt-1 font-semibold">{study.industry}{study.location ? ` · ${study.location}` : ''}</dd>
            </div>
          </dl>
        }
      />

      <div className="container-x py-16 lg:py-24">
        {/* Source photos are ~800px wide, so the banner is capped at 64rem to stay sharp, and anchored
            toward the top so group shots keep their faces. */}
        <div data-reveal="image" className="relative aspect-[4/3] max-w-[64rem] overflow-hidden sm:aspect-[2/1]">
          <Photo name={cover.name} alt={cover.alt} preload loading="eager" sizes="(min-width: 1100px) 64rem, 100vw" className="size-full object-cover object-[50%_28%]" />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <div className="flex flex-col gap-16">
            <section aria-labelledby="engagement-title">
              <h2 id="engagement-title" className="t-h3 text-brand-text">The engagement</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {study.format.map((item) => <li key={item} className="chip">{item}</li>)}
              </ul>
              <p className="t-body mt-6 max-w-2xl"><span className="font-semibold text-fg">Audience:</span> {study.audience}.</p>
            </section>

            <section aria-labelledby="delivered-title">
              <h2 id="delivered-title" data-reveal className="t-h2 text-[clamp(1.6rem,2.6vw,2.2rem)]">What we delivered</h2>
              <ol className="mt-6 border-t border-line">
                {study.delivered.map((item, index) => (
                  <li key={item} data-reveal className="flex gap-5 border-b border-line py-4 text-[1.02rem]">
                    <span className="nums pt-0.5 text-[0.8rem] text-fg-3">{String(index + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="impact-title" className="border border-line bg-canvas-2 p-6 sm:p-9">
              <h2 id="impact-title" data-reveal className="t-h2 text-[clamp(1.6rem,2.6vw,2.2rem)]">Reported impact</h2>
              <p className="mt-3 text-[0.88rem] text-fg-3">As reported in the TarunSpeaks company profile (pp. {study.pages}). These are the engagement’s documented outcomes, not independent measurements.</p>
              <ul className="mt-6 space-y-3.5">
                {study.reported.map((item) => (
                  <li key={item} data-reveal className="flex gap-3 text-[1.02rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-brand-bright" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {gallery.length > 0 && (
              <div className={`grid gap-4 ${gallery.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {gallery.map((image) => (
                  <div key={image.name} data-reveal="image" className="relative aspect-[4/3] overflow-hidden">
                    <Photo name={image.name} alt={image.alt} sizes="(min-width: 640px) 40vw, 92vw" className="size-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            {programs.length > 0 && (
              <div>
                <h2 className="t-label text-fg-3">Related programs</h2>
                <ul className="mt-4 border-t border-line">
                  {programs.map((program) => (
                    <li key={program.slug} className="border-b border-line">
                      <Link href={`/programs#${program.slug}`} className="flex min-h-14 flex-col justify-center py-3 hover:text-brand-text">
                        <span className="font-semibold leading-snug">{program.title}</span>
                        <span className="nums mt-1 text-[0.82rem] text-fg-3">{program.duration}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="border border-line bg-surface p-6">
              <p className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.01em]">Planning something similar?</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-2">Tell us about your teams and goals — we’ll share how we’d approach it.</p>
              <Link href={`/contact?case=${study.slug}`} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-[0.3rem] bg-brand px-5 font-semibold transition-colors hover:bg-brand-bright">Request a Consultation</Link>
            </div>
          </aside>
        </div>
      </div>

      {others.length > 0 && (
        <section aria-labelledby="more-cases-title" className="section-y border-t border-line-soft bg-canvas-2">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="more-cases-title" className="t-h2">More case studies like this</h2>
              <Link href="/case-studies" className="link-arrow">All case studies</Link>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => <li key={other.slug}><CaseStudyCard study={other} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <EnquiryCta />
    </>
  )
}

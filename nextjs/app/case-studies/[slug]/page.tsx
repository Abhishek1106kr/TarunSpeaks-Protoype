import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { EnquiryCta } from '../../../components/blocks/EnquiryCta'
import { TrackView } from '../../../components/motion/AnalyticsListener'
import { JsonLd } from '../../../components/seo/JsonLd'
import { Button } from '../../../components/ui/Button'
import { Eyebrow } from '../../../components/ui/Eyebrow'
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
    title: `${study.client}: Case Study`,
    description: `${study.objective} ${study.format.join(' · ')}.`,
    path: `/case-studies/${study.slug}`,
    image: study.images[0] ? photos[study.images[0].name].src : undefined,
  })
}

// Order follows the buyer's reading: client → the brief → what we delivered → reported outcome →
// related service → a next step for a similar challenge.
export default async function Page({ params }: PageProps<'/case-studies/[slug]'>) {
  const { slug } = await params
  const study = caseStudyBySlug(slug)
  if (!study) notFound()

  const programs = study.programs.map((programSlug) => programBySlug(programSlug)!).filter(Boolean)
  const others = caseStudies.filter((other) => other.slug !== study.slug).filter((other) => other.track === study.track).slice(0, 3)
  const path = `/case-studies/${study.slug}`
  // The banner takes the most landscape photo unique to this client; the rest form the gallery.
  const aspect = (name: (typeof study.images)[number]['name']) => photos[name].width / photos[name].height
  const cover = study.images.length ? study.images.reduce((widest, image) => (aspect(image.name) > aspect(widest.name) ? image : widest)) : null
  const gallery = study.images.filter((image) => image !== cover)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.headline,
    description: study.objective,
    ...(cover ? { image: absoluteUrl(photos[cover.name].src) } : {}),
    url: absoluteUrl(path),
    author: { '@type': 'Organization', name: 'TarunSpeaks' },
    publisher: { '@type': 'Organization', name: 'TarunSpeaks' },
    about: { '@type': 'Organization', name: study.client },
  }

  return (
    <>
      <TrackView event="case_study_viewed" props={{ case_study: study.slug }} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }, { name: study.client, path }])} />
      <JsonLd data={articleJsonLd} />

      <section className="pt-[4.5rem]">
        <div className="container-x pt-12 pb-12 sm:pt-16">
          <nav aria-label="Breadcrumb" className="enter t-meta mb-10">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-8 items-center hover:text-fg">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/case-studies" className="inline-flex min-h-8 items-center hover:text-fg">Case Studies</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg-2">{study.client}</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <Eyebrow className="enter mb-6">{study.client} · {study.industry}{study.location ? ` · ${study.location}` : ''}</Eyebrow>
              <h1 className="t-h1 enter" style={{ '--enter-delay': '0.06s' } as React.CSSProperties}>{study.headline}</h1>
            </div>
          </div>
          <dl className="enter mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4" style={{ '--enter-delay': '0.14s' } as React.CSSProperties}>
            {study.figures.map((figure, index) => (
              <div key={figure.label} className={`flex flex-col gap-2 py-6 ${index % 2 ? 'pl-5' : 'pr-5'} md:px-6 md:first:pl-0 ${index ? 'md:border-l md:border-line' : ''}`}>
                <dt className="order-2 text-[0.95rem] text-fg-2">{figure.label}</dt>
                <dd className="t-figure nums order-1">{figure.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {cover && (
        <figure className="container-x">
          <div className="relative aspect-[4/3] max-w-[64rem] overflow-hidden sm:aspect-[2/1]">
            <Photo name={cover.name} alt={cover.alt} preload loading="eager" sizes="(min-width: 1100px) 64rem, 100vw" className="size-full object-cover object-[50%_28%]" />
          </div>
        </figure>
      )}

      <div className="container-x py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-16 lg:col-span-8">
            <section aria-labelledby="brief-title">
              <h2 id="brief-title" className="t-h2">The brief</h2>
              <p className="t-lead mt-5 max-w-2xl">{study.objective}</p>
              <dl className="mt-8 border-t border-line">
                <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-fg-3">Format</dt><dd>{study.format.join(' · ')}</dd>
                </div>
                <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-fg-3">Who took part</dt><dd>{study.audience}</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="delivered-title">
              <h2 id="delivered-title" className="t-h2">What we delivered</h2>
              <ol className="mt-6 border-t border-line">
                {study.delivered.map((item, index) => (
                  <li key={item} className="flex gap-5 border-b border-line py-4 text-[1.05rem]">
                    <span className="nums w-6 shrink-0 font-serif text-brand-text">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="impact-title" className="border-l-2 border-brand-bright pl-6 sm:pl-8">
              <h2 id="impact-title" className="t-h2">Reported impact</h2>
              <p className="t-meta mt-3 max-w-xl">As reported in the TarunSpeaks company profile (pp. {study.pages}). These are the engagement’s documented outcomes, not independent measurements.</p>
              <ul className="mt-6 space-y-3">
                {study.reported.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.05rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-brand-bright" />
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

          <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            {programs.length > 0 && (
              <div>
                <h2 className="font-sans text-[0.95rem] font-semibold tracking-normal">The service behind this work</h2>
                <ul className="mt-3 border-t border-line">
                  {programs.map((program) => (
                    <li key={program.slug} className="border-b border-line">
                      <Link href={`/programs#${program.slug}`} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                        <span>
                          <span className="block font-serif text-[1.2rem] leading-snug group-hover:text-brand-text">{program.title}</span>
                          <span className="nums mt-0.5 block text-[0.88rem] text-fg-3">{program.duration}</span>
                        </span>
                        <ArrowRight aria-hidden="true" size={16} className="shrink-0 text-brand-text" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="border-t-2 border-brand-bright pt-6">
              <p className="font-serif text-[1.5rem] leading-snug">Facing a similar challenge?</p>
              <p className="t-body mt-2">Tell us about your teams and goals. We’ll share how we’d approach it for you.</p>
              <div className="mt-5"><Button to={`/contact?case=${study.slug}&interest=${study.track === 'AI training & consultation' ? 'ai' : 'training'}`} arrow track={`case-study:${study.slug}`}>Discuss a similar challenge</Button></div>
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
            <ul className="mt-10 border-t border-line">
              {others.map((other) => (
                <li key={other.slug} className="group relative grid gap-2 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-8">
                  <p className="font-serif text-[1.3rem] md:col-span-3">{other.client}</p>
                  <h3 className="text-[1.08rem] font-semibold md:col-span-5">
                    <Link href={`/case-studies/${other.slug}`} className="decoration-brand-bright decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline">{other.headline}</Link>
                  </h3>
                  <p className="text-[0.95rem] text-fg-2 md:col-span-4">{other.format.slice(0, 2).join(' · ')}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <EnquiryCta primary={{ label: 'Discuss Your Requirements', to: '/contact' }} />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { EnquiryCta } from '../../components/blocks/EnquiryCta'
import { PageIntro } from '../../components/blocks/PageIntro'
import { ProgramIndex } from '../../components/blocks/ProgramIndex'
import { JsonLd } from '../../components/seo/JsonLd'
import { Button } from '../../components/ui/Button'
import { Photo } from '../../components/ui/Photo'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { caseStudyBySlug } from '../../data/caseStudies'
import { customModuleAreas, deliveryTerms, programs, trainingTopics } from '../../data/programs'
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from '../../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Programs',
  description: 'Eight flagship corporate programs in AI tools, AI for sales, leadership, personal branding, marketing, client relationships and communication — modular, 3 to 30 hours.',
  path: '/programs',
})

const structuredData = [
  breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Programs', path: '/programs' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TarunSpeaks flagship programs',
    itemListElement: programs.map((program, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: program.title,
        description: program.summary,
        url: absoluteUrl(`/programs#${program.slug}`),
        provider: { '@type': 'Organization', name: 'TarunSpeaks', sameAs: absoluteUrl('/') },
      },
    })),
  },
]

export default function Page() {
  return (
    <>
      {structuredData.map((data, index) => <JsonLd key={index} data={data} />)}
      <PageIntro
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Programs', path: '/programs' }]}
        eyebrow="Flagship programs"
        title="Eight programs, each built around a problem your teams actually have."
        lead={<p>{deliveryTerms.note} Duration ranges from {deliveryTerms.duration}, {deliveryTerms.basis} — a workshop, a masterclass or a full learning journey.</p>}
        actions={<><Button to="/contact?interest=training" size="lg" arrow track="programs-intro">Discuss a program</Button><Button to="#topics" variant="quiet">Every topic we train on</Button></>}
      />

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:py-24">
        <aside className="hidden lg:block">
          <div className="sticky top-28"><ProgramIndex items={programs.map(({ slug, title, duration }) => ({ slug, title, duration }))} /></div>
        </aside>

        <ol className="flex flex-col">
          {programs.map((program, index) => {
            const studies = program.caseStudies.map((slug) => caseStudyBySlug(slug)!).filter(Boolean)
            return (
              <li key={program.slug} id={program.slug} className="scroll-mt-28 border-t border-line py-14 first:border-t-0 first:pt-0 lg:py-20">
                <article aria-labelledby={`${program.slug}-title`} className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12">
                  <div>
                    <p className="t-meta"><span className="nums font-serif text-[1.05rem] text-brand-text">{String(index + 1).padStart(2, '0')}</span> <span className="mx-2" aria-hidden="true">·</span>{program.category}</p>
                    <h2 id={`${program.slug}-title`} className="t-h2 mt-3">{program.title}</h2>
                    <p className="t-lead mt-4 max-w-2xl">{program.summary}</p>

                    <dl className="mt-9 border-t border-line">
                      {[
                        ['The problem it addresses', program.problem],
                        ['Who it’s for', program.audience],
                        ['Duration', program.duration],
                      ].map(([label, value]) => (
                        <div key={label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                          <dt className="text-[0.95rem] text-fg-3">{label}</dt>
                          <dd className={label === 'Duration' ? 'nums font-semibold' : ''}>{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <h3 className="mt-9 text-[0.95rem] font-semibold">What the program covers</h3>
                    <ol className="mt-3 grid gap-x-10 sm:grid-cols-2">
                      {program.modules.map((module, moduleIndex) => (
                        <li key={module} className="flex gap-4 border-b border-line-soft py-3 text-[1rem] text-fg-2">
                          <span className="nums w-5 shrink-0 pt-0.5 text-[0.85rem] text-fg-3">{moduleIndex + 1}</span>
                          {module}
                        </li>
                      ))}
                    </ol>

                    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                      <Button to={`/contact?program=${program.slug}`} arrow track={`program:${program.slug}`}>Discuss this program</Button>
                      {studies.length > 0 && (
                        <p className="text-[0.95rem] text-fg-2">
                          Delivered for{' '}
                          {studies.map((study, studyIndex) => (
                            <span key={study.slug}>
                              {studyIndex > 0 && (studyIndex === studies.length - 1 ? ' and ' : ', ')}
                              <Link href={`/case-studies/${study.slug}`} className="text-fg underline decoration-line underline-offset-4 hover:decoration-brand-bright">{study.client}</Link>
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative hidden aspect-[3/4] overflow-hidden xl:block">
                    <Photo name={program.image} alt={program.imageAlt} sizes="15rem" className="size-full object-cover" />
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>

      <section id="topics" aria-labelledby="topics-title" className="on-paper section-y scroll-mt-20">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeader id="topics-title" title="Topics we can train on" lead="Shorter sessions and masterclasses, delivered on their own or combined into a learning journey." />
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {trainingTopics.map((topic) => (
                <li key={topic} className="border-b border-paper-line py-3.5 text-[1rem]">{topic}</li>
              ))}
            </ul>
          </div>
          <div className="self-start border-t-2 border-brand pt-6 lg:col-span-4 lg:col-start-9">
            <h2 className="font-serif text-[1.9rem] leading-tight">Custom modules, on request</h2>
            <p className="mt-3 text-ink-2">We also design role-specific training programs across:</p>
            <ul className="mt-5 space-y-2.5">
              {customModuleAreas.map((area) => (
                <li key={area} className="flex gap-3"><span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" />{area}</li>
              ))}
            </ul>
            <p className="mt-7 text-[0.95rem] text-ink-2">{deliveryTerms.note} Duration ranges from <span className="nums font-semibold text-ink">{deliveryTerms.duration}</span>, {deliveryTerms.basis}.</p>
          </div>
        </div>
      </section>

      <EnquiryCta
        title="Not sure which program fits?"
        body="Tell us the team, the roles and the outcome you need. We’ll recommend a program — or design custom modules — and a format that fits your calendar."
        primary={{ label: 'Discuss Your Requirements', to: '/contact?interest=training' }}
      />
    </>
  )
}

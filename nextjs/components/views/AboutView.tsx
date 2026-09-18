'use client'

import { useRef } from 'react'
import { useScrollAnimations } from '../../animation/useScrollAnimations'
import { careerHistory, recognitions } from '../../data/journey'
import { site } from '../../data/site'
import { speakingTopics } from '../../data/speaking'
import { agencyStats } from '../../data/stats'
import { Community } from '../sections/Community'
import { Journey } from '../sections/Journey'
import { PageHero } from '../sections/PageHero'
import { Counter } from '../ui/Counter'
import { Eyebrow } from '../ui/Eyebrow'
import { Img } from '../ui/Img'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutView() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimations(ref)

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="About Tarun"
        title={<>From IT engineer to <em>digital marketing mentor</em></>}
        lead="I am an IT engineer turned digital marketing consultant and educator who loves spreading smiles."
      />

      <section aria-labelledby="roles-title" className="pb-[clamp(5rem,11vw,9rem)]">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div data-image-reveal className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary lg:sticky lg:top-28">
            <Img name="tarun-portrait" alt="Portrait of Tarun Makhija" sizes="(min-width: 1024px) 38vw, 100vw" className="size-full object-cover object-top" />
          </div>
          <div>
            <h2 id="roles-title" className="sr-only">What Tarun does</h2>
            <ul data-reveal-group className="border-t border-line">
              {site.roles.map((role, index) => (
                <li key={role} className="flex items-baseline gap-6 border-b border-line py-5">
                  <span className="text-[0.75rem] tracking-[0.18em] text-accent">0{index + 1}</span>
                  <span className="font-serif text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none">{role}</span>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-10 space-y-5 text-[1.03rem] leading-relaxed text-muted">
              <p>In November 2016, I co-founded Big Mouth Digital &amp; Media, a branding and digital marketing agency based in Mumbai — working with more than 150 clients across the globe in over 15 industries.</p>
              <p>With over a decade of experience, I’ve mentored more than 25,000 individuals in digital marketing, personal branding and content creation. Let’s unlock your full potential in the digital world with strategies that are both effective and enjoyable.</p>
            </div>
            <dl data-reveal-group className="mt-10 grid grid-cols-3 gap-4">
              {agencyStats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end gap-2">
                  <dt className="text-[0.8rem] leading-snug text-muted">{stat.label}</dt>
                  <dd className="font-serif text-[clamp(2rem,3.6vw,3.2rem)] leading-none"><Counter stat={stat} /></dd>
                </div>
              ))}
            </dl>
            <div data-reveal className="mt-10 border-t border-line pt-6">
              <p className="eyebrow text-muted">Before the leap</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {careerHistory.map((company) => <li key={company} className="rounded-full border border-line px-4 py-2 text-[0.9rem]">{company}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Journey />

      <section aria-labelledby="recognition-title" className="on-dark section-y bg-dark text-light">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div data-reveal><Eyebrow tone="light" className="mb-7">Recognition</Eyebrow></div>
            <h2 id="recognition-title" data-split className="display-lg">Milestones along the way</h2>
          </div>
          <ol data-reveal-group className="border-t border-light/15">
            {recognitions.map((item) => (
              <li key={item.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-light/15 py-6 sm:grid-cols-[6rem_1fr]">
                <span className="pt-1 text-[0.85rem] text-light/70">{item.year ?? '—'}</span>
                <div>
                  <h3 className="text-[1.7rem] leading-tight">{item.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-light/75">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="expertise-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="expertise-title" title="Key focus areas" lead="The subjects Tarun trains, consults and speaks on." />
          <ol data-reveal-group className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {speakingTopics.map((topic, index) => (
              <li key={topic} className="flex min-h-48 flex-col justify-between rounded-card border border-line bg-light p-6">
                <span className="font-serif text-[2.6rem] leading-none text-accent">0{index + 1}</span>
                <span className="mt-8 font-serif text-[1.45rem] leading-tight">{topic}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Community />
    </div>
  )
}

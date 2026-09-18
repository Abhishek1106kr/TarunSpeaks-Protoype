'use client'

import { useRef } from 'react'
import { useScrollAnimations } from '../../animation/useScrollAnimations'
import { engagements, speakingTopics } from '../../data/speaking'
import { experienceStat, type Stat } from '../../data/stats'
import { testimonials } from '../../data/testimonials'
import { EngagementList } from '../blocks/EngagementList'
import { Brands } from '../sections/Brands'
import { Testimonials } from '../sections/Testimonials'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { Eyebrow } from '../ui/Eyebrow'
import { Img } from '../ui/Img'
import { SectionHeading } from '../ui/SectionHeading'

const speakingStats: Stat[] = [
  { value: 1600, suffix: '+', label: 'Sessions delivered' },
  { value: 100, suffix: '+', label: 'Keynote sessions' },
  experienceStat,
  { value: 25000, suffix: '+', label: 'Individuals trained' },
]

const audienceVoices = testimonials.filter((item) => ['Ram Raju', 'Shailesh Benedict', 'Shreyash Phatak', 'Raghav', 'Ruchira Mangal'].includes(item.name))

export function SpeakingView() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimations(ref)

  return (
    <div ref={ref}>
      <section aria-labelledby="speaking-hero-title" className="pt-32 pb-20 sm:pt-40 lg:pb-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div data-reveal><Eyebrow className="mb-8">Public speaking</Eyebrow></div>
            <h1 id="speaking-hero-title" data-split="immediate" className="display-xl">Let Tarun help you <em>speak up.</em></h1>
            <p data-reveal data-delay="0.3" className="mt-8 max-w-xl text-[1.08rem] leading-relaxed text-muted">
              With over 10 years of experience, Tarun has delivered 1,600+ sessions and 100+ keynotes, inspiring audiences across the country to believe in themselves, embrace digital transformation and stay motivated.
            </p>
            <div data-reveal data-delay="0.45" className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" icon>Invite Tarun to speak</Button>
              <Button to="/speaking#stages" variant="outline">See past stages</Button>
            </div>
          </div>
          <div data-image-reveal className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-secondary">
            <Img name="stage-keynote" alt="Tarun Makhija on stage at Capturing Wow, speaking on growing your business via social media marketing" priority sizes="(min-width: 1024px) 45vw, 100vw" className="size-full object-cover" />
          </div>
        </div>
      </section>

      <section aria-label="Speaking in numbers" className="on-dark bg-dark py-16 text-light sm:py-20">
        <dl data-reveal-group className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {speakingStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-3 border-l border-light/15 pl-5 sm:pl-8">
              <dt className="text-[0.72rem] tracking-[0.14em] text-light/70 uppercase">{stat.label}</dt>
              <dd className="font-serif text-[clamp(2.6rem,5vw,4.4rem)] leading-none"><Counter stat={stat} /></dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="stages" aria-labelledby="stages-title" className="section-y scroll-mt-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal><Eyebrow lined={false} className="mb-6">Notable engagements</Eyebrow></div>
            <h2 id="stages-title" data-split className="display-lg">Stages &amp; sessions</h2>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-muted">Corporate trainings, keynotes and courses across companies, universities and communities.</p>
            <div data-image-reveal className="mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl bg-secondary lg:block">
              <Img name="speaking-motilal" alt="Tarun Makhija speaking at a Motilal Oswal session" sizes="35vw" className="size-full object-cover" />
            </div>
          </div>
          <EngagementList items={engagements} />
        </div>
      </section>

      <section aria-labelledby="topics-title" className="section-y bg-secondary">
        <div className="container-x">
          <SectionHeading id="topics-title" surface="secondary" title="What Tarun speaks about" lead="Keynotes and sessions on digital marketing, entrepreneurship and business strategy." />
          <ol data-reveal-group className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {speakingTopics.map((topic, index) => (
              <li key={topic} className="flex min-h-48 flex-col justify-between rounded-card bg-light p-6">
                <span className="font-serif text-[2.6rem] leading-none text-accent">0{index + 1}</span>
                <span className="mt-8 font-serif text-[1.45rem] leading-tight">{topic}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Brands showClients={false} />

      <Testimonials items={audienceVoices} title={<>What audiences<br />take away</>} lead="In their own words, after a session with Tarun." />
    </div>
  )
}

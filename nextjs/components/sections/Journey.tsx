'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { journey } from '../../data/journey'
import { Photo } from '../ui/Photo'
import { SectionHeader } from '../ui/SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Signature timeline: Engineering → Digital marketing → Training → TarunSpeaks → AI capability.
 * - The connecting line fills with scroll progress (scroll-linked, never scroll-jacked).
 * - On large screens a sticky stage cross-fades the chapter photo and swaps the marker in kinetic type.
 * - Phase links jump to each chapter, so it works with keyboard and touch as well as scrolling.
 * - Under reduced motion the line is drawn in full and nothing slides.
 */
export function Journey({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const steps = listRef.current?.querySelectorAll<HTMLElement>('[data-step]')
    if (!steps) return
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
    }, { rootMargin: '-45% 0px -50% 0px' })
    steps.forEach((step) => observer.observe(step))
    return () => observer.disconnect()
  }, [])

  const current = journey[active]
  const Heading = headingLevel
  const StepHeading = headingLevel === 'h2' ? 'h3' : 'h4'

  return (
    <section aria-labelledby="journey-title" className="section-y relative overflow-clip">
      <div className="container-x">
        {Heading === 'h2'
          ? <SectionHeader id="journey-title" eyebrow="The journey behind the company" title={<>From IT engineer to building <span className="text-brand-text">capability</span> at scale</>} lead="TarunSpeaks grew out of a practitioner’s path. Each chapter added something buyers rely on today: systems thinking, marketing results, teaching craft, delivery at scale, and now AI." />
          : <Heading id="journey-title" className="t-h2">The journey</Heading>}

        {/* Phase index: anchors for keyboard and touch users, and a live indicator of where you are. */}
        <nav aria-label="Journey chapters" className="sticky top-[4.5rem] z-20 -mx-[var(--gutter)] mt-14 border-y border-line-soft bg-canvas/90 px-[var(--gutter)] backdrop-blur-md lg:static lg:mx-0 lg:border-x-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
          <ol className="flex snap-x gap-1 overflow-x-auto py-2 [scrollbar-width:none]" data-allow-overflow>
            {journey.map((step, index) => (
              <li key={step.phase} className="snap-start">
                <a
                  href={`#journey-step-${index}`}
                  aria-current={index === active ? 'step' : undefined}
                  className={`inline-flex min-h-11 items-center gap-2 px-3 text-[0.85rem] font-medium whitespace-nowrap transition-colors ${index === active ? 'text-fg' : 'text-fg-3 hover:text-fg-2'}`}
                >
                  <span aria-hidden="true" className={`size-1.5 rounded-full transition-colors ${index <= active ? 'bg-brand-bright' : 'bg-line'}`} />
                  {step.phase}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* Sticky stage (desktop only — on mobile each chapter carries its own photo). */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                {journey.map((step, index) => (
                  <Photo
                    key={step.phase}
                    name={step.image}
                    alt=""
                    sizes="40vw"
                    className={`absolute inset-0 size-full object-cover transition-[opacity,scale] duration-700 ease-editorial ${index === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`}
                  />
                ))}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8">
                  <div className="overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={current.marker}
                        className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-fg"
                        initial={reduceMotion ? false : { y: '100%' }}
                        animate={{ y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
                        transition={{ duration: 0.5, ease }}
                      >
                        {current.marker}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <p className="nums pb-2 font-display text-[1.1rem] font-semibold text-fg-2">
                    {String(active + 1).padStart(2, '0')}<span className="text-fg-3"> / {String(journey.length).padStart(2, '0')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-9 sm:pl-12">
            {/* Connecting line: a muted track with a blue fill driven by scroll progress. */}
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.3rem] w-px bg-line sm:left-[0.55rem]" />
            <motion.span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[0.3rem] w-px origin-top bg-brand-bright sm:left-[0.55rem]"
              style={{ scaleY: reduceMotion ? 1 : progress }}
            />

            <ol ref={listRef} className="flex flex-col gap-16 lg:gap-0">
              {journey.map((step, index) => (
                <li
                  key={step.phase}
                  id={`journey-step-${index}`}
                  data-step={index}
                  className="relative scroll-mt-40 lg:flex lg:min-h-[78svh] lg:flex-col lg:justify-center lg:py-10"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 -left-9 size-3 rounded-full border-2 transition-colors duration-300 sm:-left-12 sm:size-[0.9rem] lg:top-auto ${index <= active ? 'border-brand-bright bg-brand-bright' : 'border-line bg-canvas'}`}
                  />
                  <div className="mb-7 aspect-[16/10] overflow-hidden bg-surface lg:hidden" data-reveal="image">
                    <Photo name={step.image} alt={step.imageAlt} sizes="92vw" className="size-full object-cover" />
                  </div>
                  <p className="text-[0.95rem] font-semibold text-brand-text">{step.phase} <span className="font-normal text-fg-3">· {step.marker}</span></p>
                  <StepHeading className="mt-4 max-w-xl font-serif text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.08] font-normal tracking-[-0.02em]">{step.title}</StepHeading>
                  <p className="t-body mt-5 max-w-xl">{step.body}</p>
                  <p className="mt-6 max-w-xl border-l-2 border-brand-bright pl-4 text-[1rem] leading-relaxed text-fg">{step.proof}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

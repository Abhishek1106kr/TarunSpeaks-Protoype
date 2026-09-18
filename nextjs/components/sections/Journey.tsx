'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '../../animation/gsap'
import { journey } from '../../data/journey'
import { Img } from '../ui/Img'
import { SectionHeading } from '../ui/SectionHeading'

export function Journey() {
  const [active, setActive] = useState(0)
  const stepsRef = useRef<HTMLOListElement>(null)

  // The sticky image follows whichever chapter is crossing the middle of the viewport.
  useLayoutEffect(() => {
    const steps = stepsRef.current?.querySelectorAll<HTMLElement>('[data-step]')
    if (!steps) return
    const triggers = [...steps].map((step, index) => ScrollTrigger.create({
      trigger: step,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: (self) => { if (self.isActive) setActive(index) },
    }))
    return () => triggers.forEach((trigger) => trigger.kill())
  }, [])

  return (
    <section aria-labelledby="journey-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="journey-title" eyebrow="Journey & philosophy" title={<>From IT engineer<br /><em>to mentor</em></>} lead="Four chapters that shaped how Tarun teaches, speaks and builds." />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary">
              {journey.map((step, index) => (
                <Img
                  key={step.number}
                  name={step.image}
                  alt=""
                  sizes="45vw"
                  className={`absolute inset-0 size-full object-cover transition-[opacity,scale] duration-1000 ease-editorial ${index === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                />
              ))}
            </div>
          </div>

          <ol ref={stepsRef}>
            {journey.map((step, index) => (
              <li key={step.number} data-step className={`flex flex-col justify-center py-12 lg:min-h-[75svh] ${index ? 'border-t border-line' : 'pt-0'}`}>
                <div className="mb-8 aspect-[4/3] overflow-hidden rounded-3xl bg-secondary lg:hidden">
                  <Img name={step.image} alt={step.imageAlt} sizes="100vw" className="size-full object-cover" />
                </div>
                <p data-reveal className="eyebrow text-accent">{step.number} — {step.phase}</p>
                <h3 data-split className="display-md mt-5">{step.title}</h3>
                <p data-reveal className="mt-5 text-[1.05rem] leading-relaxed text-muted">{step.body}</p>
                <div data-reveal className="mt-8 rounded-2xl border border-line bg-light p-6">
                  <p className="eyebrow text-accent">{step.noteLabel}</p>
                  <p className="mt-3 leading-relaxed text-muted">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

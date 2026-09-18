'use client'

import { useRef } from 'react'
import { useScrollAnimations } from '../../animation/useScrollAnimations'
import { Button } from '../ui/Button'

export function CtaSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollAnimations(ref)

  return (
    <section ref={ref} aria-labelledby="cta-title" className="section-y bg-secondary">
      <div className="container-x flex flex-col items-center text-center">
        <span data-reveal aria-hidden="true" className="grid size-16 place-items-center rounded-full border border-accent-ink/40 font-serif text-[1.6rem] text-accent-ink italic">tm</span>
        <h2 id="cta-title" data-split className="display-lg mt-8">Don’t wait, <em>upskill!</em></h2>
        <p data-reveal className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-ink/80">
          Whether it’s a consultation, a corporate training for your team or a keynote for your audience — let’s find the right way to work together.
        </p>
        <div data-reveal className="mt-10">
          <Button to="/contact" icon>Start a conversation</Button>
        </div>
      </div>
    </section>
  )
}

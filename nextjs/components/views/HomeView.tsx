'use client'

import { useRef } from 'react'
import { useScrollAnimations } from '../../animation/useScrollAnimations'
import { AboutIntro } from '../sections/AboutIntro'
import { Brands } from '../sections/Brands'
import { Community } from '../sections/Community'
import { Credibility } from '../sections/Credibility'
import { Hero } from '../sections/Hero'
import { InsightsPreview } from '../sections/InsightsPreview'
import { Journey } from '../sections/Journey'
import { ServicesGrid } from '../sections/ServicesGrid'
import { SpeakingEvents } from '../sections/SpeakingEvents'
import { Testimonials } from '../sections/Testimonials'

export function HomeView() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimations(ref)

  return (
    <div ref={ref}>
      <Hero />
      <Credibility />
      <AboutIntro />
      <ServicesGrid />
      <Brands />
      <SpeakingEvents />
      <Testimonials />
      <Community />
      <Journey />
      <InsightsPreview />
    </div>
  )
}

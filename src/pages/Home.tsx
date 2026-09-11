import { useRef } from 'react'
import { useScrollAnimations } from '../animation/useScrollAnimations'
import { AboutIntro } from '../components/sections/AboutIntro'
import { Brands } from '../components/sections/Brands'
import { Community } from '../components/sections/Community'
import { Credibility } from '../components/sections/Credibility'
import { Hero } from '../components/sections/Hero'
import { InsightsPreview } from '../components/sections/InsightsPreview'
import { Journey } from '../components/sections/Journey'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { SpeakingEvents } from '../components/sections/SpeakingEvents'
import { Testimonials } from '../components/sections/Testimonials'

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimations(ref)

  return (
    <div ref={ref}>
      <title>Tarun Makhija — Digital Marketing Consultant, Corporate Trainer & Public Speaker</title>
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

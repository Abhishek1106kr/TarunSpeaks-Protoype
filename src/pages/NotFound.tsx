import { useRef } from 'react'
import { useScrollAnimations } from '../animation/useScrollAnimations'
import { PageHero } from '../components/sections/PageHero'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimations(ref)

  return (
    <div ref={ref}>
      <title>Page not found — Tarun Makhija</title>
      <PageHero eyebrow="404" title={<>This page has <em>moved on.</em></>} lead="The page you’re looking for doesn’t exist. Let’s get you back on track.">
        <div data-reveal data-delay="0.45" className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" icon>Back to home</Button>
          <Button to="/insights" variant="outline">Read insights</Button>
        </div>
      </PageHero>
    </div>
  )
}

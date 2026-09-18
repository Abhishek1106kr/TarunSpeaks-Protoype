'use client'

import { useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Eyebrow } from '../components/ui/Eyebrow'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="pt-36 pb-16 sm:pt-44 lg:pb-24">
      <div className="container-x flex flex-col items-center text-center">
        <Eyebrow className="mb-8">Something went wrong</Eyebrow>
        <h1 className="display-xl max-w-5xl">Let’s try that <em>again.</em></h1>
        <p className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-muted">
          An unexpected error occurred while loading this page.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={reset} icon>Try again</Button>
          <Button to="/" variant="outline">Back to home</Button>
        </div>
      </div>
    </section>
  )
}

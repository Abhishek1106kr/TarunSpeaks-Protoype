'use client'

import { useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Eyebrow } from '../components/ui/Eyebrow'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="pt-40 pb-24">
      <div className="container-x">
        <Eyebrow className="mb-6">Something went wrong</Eyebrow>
        <h1 className="t-h1 max-w-3xl">Let’s try that again.</h1>
        <p className="t-lead mt-6 max-w-2xl">An unexpected error occurred while loading this page.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button type="button" onClick={reset} arrow>Try again</Button>
          <Button to="/" variant="secondary">Back to home</Button>
        </div>
      </div>
    </section>
  )
}

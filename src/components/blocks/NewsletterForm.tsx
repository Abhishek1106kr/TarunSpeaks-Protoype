import { type FormEvent, useId, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { Field } from '../ui/FormField'

export function NewsletterForm({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const [subscribed, setSubscribed] = useState(false)
  const id = useId()
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  if (subscribed) {
    return (
      <div role="status" className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-light"><Check size={16} aria-hidden="true" /></span>
        <p className="leading-relaxed"><span className="block font-serif text-2xl leading-tight">You’re on the list.</span>We’ll keep the good ideas coming.</p>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={submit} aria-label="Newsletter signup" className="flex gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input id={`${id}-email`} type="email" required autoComplete="email" placeholder="Email address" className="h-12 min-w-0 flex-1 rounded-full border border-line bg-bg px-5 text-[0.95rem] placeholder:text-muted" />
        <button type="submit" aria-label="Subscribe" className="grid size-12 shrink-0 place-items-center rounded-full bg-dark text-light transition-colors hover:bg-accent">
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={submit} aria-label="Newsletter signup" className="grid gap-5 sm:grid-cols-2">
      <Field label="First name" name="firstName" required autoComplete="given-name" placeholder="First name" />
      <Field label="Last name" name="lastName" required autoComplete="family-name" placeholder="Last name" />
      <Field label="Email address" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="sm:col-span-2" />
      <div className="sm:col-span-2"><Button type="submit" icon>Subscribe</Button></div>
    </form>
  )
}

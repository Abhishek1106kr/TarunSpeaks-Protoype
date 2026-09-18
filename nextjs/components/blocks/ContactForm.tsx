'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { Field, SelectField, TextareaField } from '../ui/FormField'

const serviceOptions = ['Digital Marketing Consultation', 'Corporate Training', 'Public Speaking', 'Career Consultation', '1 on 1 Consultation']

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  // No backend is wired up yet: submissions are validated in the browser and confirmed on screen only.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-3xl bg-light p-8 outline-none sm:p-12">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-light"><Check size={22} aria-hidden="true" /></span>
        <h2 className="display-md mt-8">Thanks for reaching out.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          We’ll get back to you shortly. For anything urgent, call <a href={site.phone.href} className="text-ink underline underline-offset-4">{site.phone.label}</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} aria-label="Contact form" className="grid gap-6 sm:grid-cols-2">
      <Field label="First name" name="firstName" required autoComplete="given-name" placeholder="First name" />
      <Field label="Last name" name="lastName" required autoComplete="family-name" placeholder="Last name" />
      <Field label="Email address" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
      <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" placeholder="+91" />
      <Field label="Company" name="company" autoComplete="organization" placeholder="Company name" className="sm:col-span-2" />
      <SelectField label="Service you need" name="service" required options={serviceOptions} />
      <SelectField label="How did you hear about me?" name="source" options={['Google Search', 'Instagram', 'Referral']} />
      <TextareaField label="Message" name="message" placeholder="Tell me a little about what you’d like to discuss" className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <Button type="submit" className="w-full">Send message</Button>
      </div>
    </form>
  )
}

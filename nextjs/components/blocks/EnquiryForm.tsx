'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle, Check } from 'lucide-react'
import { submitEnquiry } from '../../app/contact/actions'
import { type EnquiryFields, type EnquiryState, interestOptions } from '../../app/contact/enquiry'
import { company } from '../../data/company'
import { programBySlug } from '../../data/programs'
import { Button } from '../ui/Button'
import { Field, SelectField, TextareaField } from '../ui/FormField'

const initialState: EnquiryState = { status: 'idle' }

// Maps ?interest=, ?program= and ?case= (set by CTAs across the site) to a sensible starting point.
function usePrefill() {
  const params = useSearchParams()
  const program = programBySlug(params.get('program') ?? '')
  const interestParam = params.get('interest') ?? ''
  const interest = interestOptions.some((option) => option.value === interestParam)
    ? interestParam
    : program ? (program.category === 'AI capability' ? 'ai' : 'training') : ''
  const message = program ? `We’re interested in the “${program.title}” program for our team.` : ''
  return { interest, message }
}

function mailtoFor(values: EnquiryFields) {
  const interest = interestOptions.find((option) => option.value === values.interest)?.label ?? ''
  const body = [`Name: ${values.name}`, `Organisation: ${values.organisation}`, `Role: ${values.role}`, `Interest: ${interest}`, '', values.message].join('\n')
  return `${company.email.href}?subject=${encodeURIComponent(`Enquiry: ${interest} — ${values.organisation}`)}&body=${encodeURIComponent(body)}`
}

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState)
  const prefill = usePrefill()
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const startedRef = useRef<HTMLInputElement>(null)
  const startedAt = useRef(0)

  // Stamp when the form first became interactive (client only, so no hydration mismatch). Re-applied after
  // React resets the form, keeping the original time so a quick correction is never mistaken for a bot.
  useEffect(() => {
    if (!startedAt.current) startedAt.current = Date.now()
    if (startedRef.current) startedRef.current.value = String(startedAt.current)
  })

  // Move focus to the outcome so screen-reader and keyboard users hear it immediately.
  useEffect(() => {
    if (state.status === 'sent' || state.status === 'not-sent') statusRef.current?.focus()
    if (state.status === 'invalid') formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [state])

  if (state.status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-surface p-8 outline-none sm:p-10">
        <span className="grid size-12 place-items-center bg-brand"><Check size={22} aria-hidden="true" /></span>
        <h2 className="t-h2 mt-8 text-[2rem]">Thank you — your enquiry has been sent.</h2>
        <p className="t-body mt-4 max-w-md">The team will reply to the email you provided. For anything urgent, call <a href={company.phone.href} className="text-fg underline underline-offset-4">{company.phone.label}</a>.</p>
      </div>
    )
  }

  const values = state.status === 'invalid' || state.status === 'not-sent' ? state.values : undefined
  const errors = state.status === 'invalid' ? state.errors : {}
  const errorCount = Object.keys(errors).length

  return (
    <>
      {state.status === 'not-sent' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mb-8 border border-warning/60 bg-warning/10 p-6 outline-none">
          <p className="flex items-center gap-2 font-semibold text-fg"><AlertTriangle size={18} aria-hidden="true" className="text-warning" />Your enquiry has not been sent.</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-2">
            {state.reason === 'unconfigured'
              ? 'Online submissions aren’t connected yet. Your details are still in the form — send them by email in one click, or call us.'
              : 'Something went wrong while sending. Your details are still in the form — please try again, send them by email, or call us.'}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={mailtoFor(state.values)} arrow>Email this enquiry</Button>
            <a href={company.phone.href} className="text-[0.95rem] text-fg underline underline-offset-4">Call {company.phone.label}</a>
          </div>
        </div>
      )}

      {errorCount > 0 && (
        <p role="alert" className="mb-6 border-l-2 border-error pl-4 text-[0.95rem] text-fg">
          Please fix {errorCount === 1 ? '1 field' : `${errorCount} fields`} below.
        </p>
      )}

      {/* key resets uncontrolled defaults when the server returns new values */}
      <form ref={formRef} key={state.status} action={formAction} noValidate aria-label="Enquiry form" className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" defaultValue={values?.name} error={errors.name} maxLength={100} />
        <Field label="Work email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="name@company.com" defaultValue={values?.email} error={errors.email} maxLength={200} />
        <Field label="Organisation" name="organisation" required autoComplete="organization" defaultValue={values?.organisation} error={errors.organisation} maxLength={150} />
        <Field label="Role" name="role" optional autoComplete="organization-title" placeholder="e.g. CHRO, Head of L&D, Founder" defaultValue={values?.role} error={errors.role} maxLength={100} />
        {/* Keyed on its value: React's post-action form reset restores a <select> to its mount-time default,
            so it must remount to keep the submitted choice. Inputs and textareas don't need this. */}
        <SelectField key={values?.interest ?? prefill.interest} label="What would you like to discuss?" name="interest" required options={interestOptions} defaultValue={values?.interest ?? prefill.interest} error={errors.interest} className="sm:col-span-2" />
        <TextareaField
          label="The challenge, briefly"
          name="message"
          required
          hint="Who is the team, what should change, and any timelines."
          defaultValue={values?.message ?? prefill.message}
          error={errors.message}
          maxLength={3000}
          className="sm:col-span-2"
        />

        {/* Spam guards: humans never see this field; the timestamp enforces a minimum fill time. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input ref={startedRef} type="hidden" name="started_at" defaultValue="" />

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-fg-3">We use these details only to reply to your enquiry.</p>
          <Button type="submit" size="lg" arrow disabled={pending}>{pending ? 'Sending…' : 'Send enquiry'}</Button>
        </div>
        <p aria-live="polite" className="sr-only">{pending ? 'Sending your enquiry' : ''}</p>
      </form>
    </>
  )
}

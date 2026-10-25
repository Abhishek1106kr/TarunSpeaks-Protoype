'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { submitEnquiry } from '../../app/contact/actions'
import { type EnquiryFields, type EnquiryState, interestOptions, requestOptions, teamSizeOptions, timelineOptions } from '../../app/contact/enquiry'
import { company } from '../../data/company'
import { programBySlug } from '../../data/programs'
import { track } from '../../lib/analytics'
import { Button } from '../ui/Button'
import { Field, SelectField, TextareaField } from '../ui/FormField'

const initialState: EnquiryState = { status: 'idle' }

// Maps ?interest=, ?program=, ?case= and ?request= (set by CTAs across the site) to a sensible starting point.
function usePrefill() {
  const params = useSearchParams()
  const program = programBySlug(params.get('program') ?? '')
  const interestParam = params.get('interest') ?? ''
  const interest = interestOptions.some((option) => option.value === interestParam)
    ? interestParam
    : program ? (program.category === 'AI capability' ? 'ai' : 'training') : ''
  const caseSlug = params.get('case')
  const message = program
    ? `We’re interested in the “${program.title}” program for our team.`
    : caseSlug ? 'We have a challenge similar to one of your case studies and would like to discuss it.' : ''
  const request = params.get('request') === 'enquiry' ? 'enquiry' : 'consultation'
  return { interest, message, request }
}

function mailtoFor(values: EnquiryFields) {
  const interest = interestOptions.find((option) => option.value === values.interest)?.label ?? ''
  const lines = [`Name: ${values.name}`, `Organisation: ${values.organisation}`, `Role: ${values.role}`, `Interest: ${interest}`]
  if (values.phone) lines.push(`Phone: ${values.phone}`)
  const body = [...lines, '', values.message].join('\n')
  const subject = `${values.request === 'consultation' ? 'Consultation request' : 'Enquiry'}: ${interest}, ${values.organisation}`
  return `${company.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState)
  const prefill = usePrefill()
  const reduceMotion = useReducedMotion()
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const startedRef = useRef<HTMLInputElement>(null)
  const startedAt = useRef(0)
  const reportedStart = useRef(false)

  // Stamp when the form first became interactive (client only, so no hydration mismatch). Re-applied after
  // React resets the form, keeping the original time so a quick correction is never mistaken for a bot.
  useEffect(() => {
    if (!startedAt.current) startedAt.current = Date.now()
    if (startedRef.current) startedRef.current.value = String(startedAt.current)
  })

  // Move focus to the outcome so screen-reader and keyboard users hear it immediately.
  useEffect(() => {
    if (state.status === 'sent') track('enquiry_submitted', { request: state.request })
    if (state.status === 'sent' || state.status === 'not-sent') statusRef.current?.focus()
    if (state.status === 'invalid') formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [state])

  const onFirstInteraction = () => {
    if (reportedStart.current) return
    reportedStart.current = true
    track('enquiry_started', { interest: prefill.interest || undefined })
  }

  if (state.status === 'sent') {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="outline-none"
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="grid size-12 place-items-center rounded-full bg-brand"><Check size={22} aria-hidden="true" /></span>
        <h2 className="t-h2 mt-8">{state.request === 'consultation' ? 'Thank you. Your consultation request has been sent.' : 'Thank you. Your enquiry has been sent.'}</h2>
        <h3 className="mt-8 text-[0.95rem] font-semibold">What happens next</h3>
        <ol className="mt-3 border-t border-line">
          <li className="border-b border-line py-3 text-fg-2">The TarunSpeaks team reads your message.</li>
          <li className="border-b border-line py-3 text-fg-2">They get back to you using the contact details you provided, to understand your team, goals and constraints.</li>
          <li className="border-b border-line py-3 text-fg-2">From there, we recommend a program, custom modules or a consulting scope, and a format.</li>
        </ol>
        <p className="t-body mt-6">For anything urgent, call <a href={company.phone.href} className="text-fg underline underline-offset-4">{company.phone.label}</a>.</p>
      </motion.div>
    )
  }

  const values = state.status === 'invalid' || state.status === 'not-sent' ? state.values : undefined
  const errors = state.status === 'invalid' ? state.errors : {}
  const errorCount = Object.keys(errors).length
  const request = values?.request ?? prefill.request
  const hasOptional = Boolean(values?.phone || values?.teamSize || values?.timeline || errors.phone)

  return (
    <>
      {state.status === 'not-sent' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mb-8 border-l-2 border-warning bg-warning/10 p-6 outline-none">
          <p className="flex items-center gap-2 font-semibold text-fg"><AlertTriangle size={18} aria-hidden="true" className="text-warning" />Your enquiry has not been sent.</p>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-fg-2">
            {state.reason === 'unconfigured'
              ? 'Online submissions aren’t connected yet. Your details are still in the form. Send them by email in one click, or call us.'
              : 'Something went wrong while sending. Your details are still in the form. Please try again, send them by email, or call us.'}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={mailtoFor(state.values)} arrow>Email this enquiry</Button>
            <a href={company.phone.href} className="text-[0.95rem] text-fg underline underline-offset-4">Call {company.phone.label}</a>
          </div>
        </div>
      )}

      {errorCount > 0 && (
        <p role="alert" className="mb-6 border-l-2 border-error pl-4 text-[0.98rem] text-fg">
          Please fix {errorCount === 1 ? '1 field' : `${errorCount} fields`} below.
        </p>
      )}

      {/* key resets uncontrolled defaults when the server returns new values */}
      <form ref={formRef} key={state.status} action={formAction} onFocusCapture={onFirstInteraction} noValidate aria-label="Enquiry form" className="grid gap-6 sm:grid-cols-2">
        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-[0.9rem] font-semibold">How would you like to start?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {requestOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer gap-3 rounded-[0.3rem] border border-line p-4 transition-colors hover:border-fg-3 has-[:checked]:border-brand-bright has-[:checked]:bg-brand/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-text">
                <input type="radio" name="request" value={option.value} defaultChecked={request === option.value} className="mt-1 size-4 accent-[#2864f0] focus-visible:outline-none" />
                <span>
                  <span className="block font-semibold">{option.label}</span>
                  <span className="block text-[0.88rem] text-fg-3">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.request && <p className="mt-2 text-[0.88rem] text-error">{errors.request}</p>}
        </fieldset>

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
          hint="Who is the team, and what should change?"
          defaultValue={values?.message ?? prefill.message}
          error={errors.message}
          maxLength={3000}
          className="sm:col-span-2"
        />

        {/* Progressive disclosure: qualifiers that help the team prepare, never required. */}
        <details open={hasOptional} className="group sm:col-span-2">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-[0.95rem] font-semibold text-fg-2 hover:text-fg [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="text-brand-text transition-transform group-open:rotate-45">+</span>
            Add optional details: phone, team size, timeline
          </summary>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            <Field label="Phone" name="phone" type="tel" optional autoComplete="tel" placeholder="+91" defaultValue={values?.phone} error={errors.phone} maxLength={30} />
            <SelectField key={`team-${values?.teamSize ?? ''}`} label="Team size" name="teamSize" optional options={teamSizeOptions} placeholder="Choose…" defaultValue={values?.teamSize ?? ''} />
            <SelectField key={`timeline-${values?.timeline ?? ''}`} label="Timeline" name="timeline" optional options={timelineOptions} placeholder="Choose…" defaultValue={values?.timeline ?? ''} />
          </div>
        </details>

        {/* Spam guards: humans never see this field; the timestamp enforces a minimum fill time. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input ref={startedRef} type="hidden" name="started_at" defaultValue="" />

        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta max-w-sm">We use these details only to reply to you.</p>
          {/* Disabled while pending: prevents duplicate submissions. */}
          <Button type="submit" size="lg" arrow disabled={pending}>{pending ? 'Sending…' : 'Send'}</Button>
        </div>
        <p aria-live="polite" className="sr-only">{pending ? 'Sending your enquiry' : ''}</p>
      </form>
    </>
  )
}

'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { submitLeadEmail } from '../../app/contact/actions'
import { type LeadEmailState } from '../../app/contact/enquiry'

const initialState: LeadEmailState = { status: 'idle' }

export function FooterEmailForm() {
  const [email, setEmail] = useState('')
  const [startedAt, setStartedAt] = useState(0)
  const [state, formAction, pending] = useActionState(submitLeadEmail, initialState)
  const inputRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === 'sent' || state.status === 'not-sent') statusRef.current?.focus()
    if (state.status === 'invalid') inputRef.current?.focus()
  }, [state])

  return (
    <>
      <div>
        <h2 className="font-primary text-[clamp(1.45rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em]">Leave your email</h2>
        <p className="mt-2 text-fg-2">The team will get back to you.</p>
      </div>

      {state.status === 'sent' ? (
        <div ref={statusRef} tabIndex={-1} role="status" className="mt-6 outline-none">
          <span className="grid size-10 place-items-center rounded-full bg-brand"><Check size={20} aria-hidden="true" /></span>
          <p className="mt-4 font-semibold">Your email has been sent.</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-2">The team will be in touch.</p>
        </div>
      ) : (
        <form action={formAction} noValidate className="mt-6">
          {state.status === 'not-sent' && (
            <div ref={statusRef} tabIndex={-1} role="alert" className="mb-4 border-l-2 border-warning bg-warning/10 p-3 outline-none">
              <p className="text-sm font-semibold">Your email has not been sent.</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{state.reason === 'unconfigured' ? 'Online submissions aren’t connected yet.' : 'Something went wrong while sending. Please try again.'}</p>
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <label htmlFor="footer-email" className="mb-2 block text-sm font-semibold">Email address</label>
              <input
                ref={inputRef}
                id="footer-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onFocus={() => { if (!startedAt) setStartedAt(Date.now()) }}
                autoComplete="email"
                inputMode="email"
                maxLength={200}
                placeholder="name@company.com"
                aria-invalid={state.status === 'invalid'}
                aria-describedby={state.status === 'invalid' ? 'footer-email-error' : undefined}
                className="h-11 w-full rounded-full border border-fg-3 bg-canvas px-4 text-[0.9rem] placeholder:text-fg-3 focus:border-brand-bright focus:outline-none focus:ring-2 focus:ring-brand-bright/30"
              />
              {state.status === 'invalid' && <p id="footer-email-error" role="alert" className="mt-2 text-[0.88rem] text-error">{state.error}</p>}
            </div>
            <button type="submit" disabled={pending} className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-fg transition-colors hover:bg-brand-bright disabled:cursor-wait disabled:opacity-60">
              {pending ? 'Sending…' : 'Send email'}
            </button>
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="footer-company-website">Leave this field empty</label>
            <input id="footer-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input type="hidden" name="started_at" value={startedAt || ''} readOnly />
          <input type="hidden" name="source" value="footer" />
          <p className="mt-4 text-xs leading-relaxed text-fg-3">We use your email only to reply to you.</p>
        </form>
      )}
    </>
  )
}

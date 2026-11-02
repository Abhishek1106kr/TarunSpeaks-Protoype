'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Mail, X } from 'lucide-react'
import { submitLeadEmail } from '../../app/contact/actions'
import { type LeadEmailState } from '../../app/contact/enquiry'

const initialState: LeadEmailState = { status: 'idle' }

export function EmailCaptureWidget() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [startedAt, setStartedAt] = useState(0)
  const [state, formAction, pending] = useActionState(submitLeadEmail, initialState)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      launcherRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (state.status === 'sent' || state.status === 'not-sent') statusRef.current?.focus()
    if (state.status === 'invalid') inputRef.current?.focus()
  }, [state])

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Email capture"
            className="absolute right-0 bottom-[4.25rem] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line bg-brand-deep px-5 py-4">
              <div>
                <p className="font-display text-lg font-semibold leading-tight">Leave your email</p>
                <p className="mt-1.5 text-xs text-fg-2">Leave your email and the team will get back to you.</p>
              </div>
              <button type="button" aria-label="Close email capture" onClick={() => setOpen(false)} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-fg/10">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {state.status === 'sent' ? (
              <div ref={statusRef} tabIndex={-1} role="status" className="p-5 outline-none">
                <span className="grid size-10 place-items-center rounded-full bg-brand"><Check size={20} aria-hidden="true" /></span>
                <p className="mt-4 font-semibold">Your email has been sent.</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">The team will be in touch.</p>
              </div>
            ) : (
              <form action={formAction} noValidate className="grid gap-4 p-5">
                {state.status === 'not-sent' && (
                  <div ref={statusRef} tabIndex={-1} role="alert" className="border-l-2 border-warning bg-warning/10 p-3 outline-none">
                    <p className="text-sm font-semibold">Your email has not been sent.</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{state.reason === 'unconfigured' ? 'Online submissions aren’t connected yet.' : 'Something went wrong while sending. Please try again.'}</p>
                  </div>
                )}
                <div>
                  <label htmlFor="floating-email" className="mb-2 block text-sm font-semibold">Email address</label>
                  <input
                    ref={inputRef}
                    id="floating-email"
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
                    aria-describedby={state.status === 'invalid' ? 'floating-email-error' : undefined}
                    className="h-11 w-full rounded-full border border-line bg-canvas px-4 text-[0.9rem] placeholder:text-fg-3 focus:border-brand-bright focus:outline-none focus:ring-2 focus:ring-brand-bright/30"
                  />
                  {state.status === 'invalid' && <p id="floating-email-error" role="alert" className="mt-2 text-[0.88rem] text-error">{state.error}</p>}
                </div>
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="floating-company-website">Leave this field empty</label>
                  <input id="floating-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <input type="hidden" name="started_at" value={startedAt || ''} readOnly />
                <button type="submit" disabled={pending} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-fg transition-colors hover:bg-brand-bright disabled:cursor-wait disabled:opacity-60">
                  {pending ? 'Sending…' : 'Send email'}
                </button>
                <p className="text-xs leading-relaxed text-fg-3">We use your email only to reply to you.</p>
              </form>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close email capture' : 'Open email capture'}
        onClick={() => {
          setOpen((current) => !current)
          if (!open) setStartedAt(Date.now())
        }}
        className="grid size-13 place-items-center rounded-full border border-line bg-surface text-fg shadow-float transition-colors hover:border-brand-bright hover:bg-brand"
      >
        {open ? <X size={20} aria-hidden="true" /> : <Mail size={21} aria-hidden="true" />}
      </button>
    </div>
  )
}

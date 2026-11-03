'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Mail, Phone, X } from 'lucide-react'
import { submitLeadEmail } from '../../app/contact/actions'
import { type LeadEmailState } from '../../app/contact/enquiry'
import { company } from '../../data/company'

const initialState: LeadEmailState = { status: 'idle' }

export function ContactDock() {
  const [open, setOpen] = useState(false)
  const [stackOpen, setStackOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [startedAt, setStartedAt] = useState(0)
  const [state, formAction, pending] = useActionState(submitLeadEmail, initialState)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const stackLauncherRef = useRef<HTMLButtonElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const focusOpeningControl = () => {
    if (window.matchMedia('(min-width: 1280px)').matches) launcherRef.current?.focus()
    else stackLauncherRef.current?.focus()
  }

  useEffect(() => {
    if (!open && !stackOpen) return
    if (open) inputRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (open) {
        setOpen(false)
        setStackOpen(false)
        requestAnimationFrame(focusOpeningControl)
      } else {
        setStackOpen(false)
        requestAnimationFrame(() => stackLauncherRef.current?.focus())
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, stackOpen])

  useEffect(() => {
    if (state.status === 'sent' || state.status === 'not-sent') statusRef.current?.focus()
    if (state.status === 'invalid') inputRef.current?.focus()
  }, [state])

  return (
    <div className="fixed right-3 bottom-4 z-40 sm:right-4 sm:bottom-6" role="group" aria-label="Contact options">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Email capture"
            className="absolute right-0 bottom-[4.25rem] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-panel xl:right-[calc(100%+0.75rem)] xl:bottom-0"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line bg-brand-deep px-5 py-4">
              <div>
                <p className="font-primary text-lg font-semibold leading-tight">Leave your email</p>
                <p className="mt-1.5 text-xs text-fg-2">Leave your email and the team will get back to you.</p>
              </div>
              <button type="button" aria-label="Close email capture" onClick={() => { setOpen(false); setStackOpen(false); requestAnimationFrame(focusOpeningControl) }} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-fg/10">
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

      <div className={`flex flex-col gap-3 ${stackOpen ? '' : 'hidden xl:flex'}`}>
        <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)" className="grid size-12 place-items-center rounded-full bg-whatsapp text-fg shadow-float transition-[border-radius,scale] duration-200 ease-editorial hover:rounded-2xl active:scale-[0.97] motion-reduce:transition-none" data-track="primary_cta_clicked" data-track-location="dock_whatsapp">
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <a href={company.instagram.href} target="_blank" rel="noopener noreferrer" aria-label="TarunSpeaks on Instagram (opens in a new tab)" className="grid size-12 place-items-center rounded-full text-fg shadow-float transition-[border-radius,scale] duration-200 ease-editorial hover:rounded-2xl active:scale-[0.97] motion-reduce:transition-none [background:linear-gradient(45deg,var(--color-instagram-start),var(--color-instagram-mid),var(--color-instagram-end))]" data-track="primary_cta_clicked" data-track-location="dock_instagram">
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href={company.phone.href} aria-label="Call TarunSpeaks" className="grid size-12 place-items-center rounded-full bg-brand-bright text-fg shadow-float transition-[border-radius,scale] duration-200 ease-editorial hover:rounded-2xl active:scale-[0.97] motion-reduce:transition-none" data-track="primary_cta_clicked" data-track-location="dock_call">
          <Phone size={21} aria-hidden="true" />
        </a>
        <button
          ref={launcherRef}
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Close email capture' : 'Open email capture'}
          onClick={() => {
            setOpen((current) => !current)
            setStackOpen(false)
            if (!open) setStartedAt(Date.now())
          }}
          className="grid size-12 place-items-center rounded-full border border-line bg-surface text-fg shadow-float transition-[border-radius,scale] duration-200 ease-editorial hover:rounded-2xl active:scale-[0.97] motion-reduce:transition-none"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Mail size={21} aria-hidden="true" />}
        </button>
      </div>

      <button
        ref={stackLauncherRef}
        type="button"
        aria-expanded={stackOpen}
        aria-label={stackOpen ? 'Close contact options' : 'Open contact options'}
        onClick={() => setStackOpen((current) => !current)}
        className="mt-3 grid size-12 place-items-center rounded-full border border-line bg-brand-bright text-fg shadow-float transition-[border-radius,scale] duration-200 ease-editorial hover:rounded-2xl active:scale-[0.97] motion-reduce:transition-none xl:hidden"
      >
        {stackOpen ? <X size={20} aria-hidden="true" /> : <Phone size={21} aria-hidden="true" />}
      </button>
    </div>
  )
}

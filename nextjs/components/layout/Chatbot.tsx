'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'

type Message = { from: 'bot' | 'user'; text: string }

const greeting: Message = { from: 'bot', text: 'Hi — I can point you to the right part of TarunSpeaks: AI training, corporate programs, consulting, keynotes or case studies. What are you looking for?' }

// Keyword answers. Every fact comes from data/ (company profile and tarunmakhija.in) — keep them in sync.
const answer = (question: string) => {
  const text = question.toLowerCase()
  if (/\b(ai|chatgpt|copilot|gen ?ai|agent)/.test(text)) return 'Our AI programs range from AI Tools for Productivity & Marketing (6–18 hours) to AI training for sales teams (3–15 hours) and multi-month engagements like the 3-month AI training for Nawany Group. See Consulting for AI tools and agent deployment.'
  if (text.includes('case') || text.includes('result') || text.includes('client')) return 'Case Studies covers engagements with Nawany Group, Godrej Properties, NewTech Insurance Brokers, Sansaar by D’Decor, Motilal Oswal, HDFC Bank and more — each with what was delivered and what was reported.'
  if (text.includes('consult')) return 'We consult on branding & digital marketing, business growth, campaign-led advertising, personal branding for CXOs and founders, and AI tools, agents and implementation. The Consulting page explains each area.'
  if (text.includes('speak') || text.includes('event') || text.includes('keynote')) return 'Tarun has delivered 100+ keynote sessions on digital marketing, entrepreneurship and business strategy. The Speaking page lists keynote topics and how to book.'
  if (text.includes('train') || text.includes('team') || text.includes('program') || text.includes('workshop')) return 'All programs are modular and customisable, from 3 to 30 hours — as a workshop, masterclass or full learning journey. Browse the eight flagship programs on the Programs page.'
  if (text.includes('book') || text.includes('contact') || text.includes('price') || text.includes('cost') || text.includes('call')) return 'Pricing depends on scope, so the best next step is a short conversation: use the Contact page, email teamtarunspeaks@gmail.com or call +91 97702 23646.'
  return 'I can help with AI training, corporate programs, consulting, keynotes and case studies. Which would you like to explore?'
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([greeting])
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, open])

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

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const question = input.trim()
    if (!question) return
    setMessages((current) => [...current, { from: 'user', text: question }, { from: 'bot', text: answer(question) }])
    setInput('')
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="TarunSpeaks assistant"
            className="absolute right-0 bottom-[4.25rem] flex h-[min(30rem,70svh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line bg-brand-deep px-5 py-4">
              <div>
                <p className="font-display text-lg font-semibold leading-none">TarunSpeaks assistant</p>
                <p className="mt-1.5 text-xs text-fg-2">Answers from published TarunSpeaks information</p>
              </div>
              <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full hover:bg-fg/10">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div ref={logRef} role="log" aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <p
                  key={`${message.from}-${index}`}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-[0.88rem] leading-relaxed ${message.from === 'bot' ? 'self-start bg-surface-2 text-fg' : 'self-end bg-brand text-fg'}`}
                  data-from={message.from}
                >
                  {message.text}
                </p>
              ))}
            </div>
            <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question…"
                aria-label="Ask the assistant"
                className="h-11 min-w-0 flex-1 rounded-full border border-line bg-canvas px-4 text-[0.9rem] placeholder:text-fg-3"
              />
              <button type="submit" aria-label="Send message" className="grid size-11 shrink-0 place-items-center rounded-full bg-brand transition-colors hover:bg-brand-bright">
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close assistant chat' : 'Open assistant chat'}
        onClick={() => setOpen((current) => !current)}
        className="grid size-13 place-items-center rounded-full border border-line bg-surface text-fg shadow-[0_14px_34px_-10px_rgb(0_0_0/0.8)] transition-colors hover:border-brand-bright hover:bg-brand"
      >
        {open ? <X size={20} aria-hidden="true" /> : <MessageCircle size={21} aria-hidden="true" />}
      </button>
    </div>
  )
}

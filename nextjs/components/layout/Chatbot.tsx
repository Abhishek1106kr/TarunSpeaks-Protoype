'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'

type Message = { from: 'bot' | 'user'; text: string }

const greeting: Message = { from: 'bot', text: 'Hi, I’m Tarun’s assistant. Ask me about consulting, speaking, corporate training, career consultation or booking a session.' }

// Keyword answers built from facts published on tarunmakhija.in.
const answer = (question: string) => {
  const text = question.toLowerCase()
  if (text.includes('career') || text.includes('mentor')) return 'Career consultation is available as a 1 on 1 session, and Tarun also offers one-on-one mentorship on Topmate. Share your details on the Contact page to get started.'
  if (text.includes('consult')) return 'For digital marketing consultation, Tarun helps you grow your business with proven digital marketing strategies — he has worked on digital and branding strategy for 297+ brands. See the Services page for details.'
  if (text.includes('speak') || text.includes('event') || text.includes('keynote')) return 'Tarun has delivered 100+ keynote sessions — at Motilal Oswal, Reliance Entertainment, NMIMS, Masters’ Union and more. Visit the Speaking page to invite him.'
  if (text.includes('train') || text.includes('team')) return 'Corporate training covers digital marketing, personal branding and content creation. Tarun has trained 25,000+ professionals at companies like HDFC Bank, Reliance Retail, TataPlay and Motilal Oswal.'
  if (text.includes('book') || text.includes('contact') || text.includes('price') || text.includes('call')) return 'You can reach the team at teamtarunspeaks@gmail.com or call +91 97702 23646 to discuss your requirement.'
  return 'I can help with consulting, speaking, corporate training, career consultation and booking a session. What would you like to explore?'
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([greeting])
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  // Keep the newest message in view.
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
            aria-label="Tarun’s assistant"
            className="absolute right-0 bottom-[4.5rem] flex h-[min(30rem,70svh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-light shadow-[0_30px_80px_-20px_rgba(23,23,23,0.35)]"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <div className="on-dark flex items-center justify-between bg-dark px-5 py-4 text-light">
              <div>
                <p className="font-serif text-xl leading-none">Tarun’s assistant</p>
                <p className="mt-1.5 text-xs text-light/70">Usually replies instantly</p>
              </div>
              <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-light/10">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div ref={logRef} role="log" aria-live="polite" data-lenis-prevent className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <p
                  key={`${message.from}-${index}`}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-[0.88rem] leading-relaxed ${message.from === 'bot' ? 'self-start bg-secondary text-ink' : 'self-end bg-accent text-light'}`}
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
                className="h-11 min-w-0 flex-1 rounded-full bg-bg px-4 text-[0.9rem]"
              />
              <button type="submit" aria-label="Send message" className="grid size-11 shrink-0 place-items-center rounded-full bg-dark text-light transition-colors hover:bg-accent">
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
        className="relative grid size-14 place-items-center rounded-full bg-dark text-light shadow-[0_14px_34px_-10px_rgba(23,23,23,0.5)] transition-transform duration-500 ease-editorial hover:scale-105"
      >
        {open ? <X size={21} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
        <span aria-hidden="true" className="absolute top-0.5 right-0.5 size-3 rounded-full border-2 border-dark bg-highlight" />
      </button>
    </div>
  )
}

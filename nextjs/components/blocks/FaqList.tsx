'use client'

import { Dices, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMotionAllowed } from '../../lib/useMotionAllowed'
import { Photo } from '../ui/Photo'

type FaqItem = { question: string; answer: string }

const bubbleTransition = { type: 'spring' as const, stiffness: 420, damping: 28 }

export function FaqList({ items }: { items: FaqItem[] }) {
  const firstQuestion = items[0]?.question
  const [asked, setAsked] = useState<string[]>(firstQuestion ? [firstQuestion] : [])
  const [answersVisible, setAnswersVisible] = useState<string[]>(firstQuestion ? [firstQuestion] : [])
  const [typingQuestion, setTypingQuestion] = useState<string | null>(null)
  const answerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const previousAnswers = useRef<string[]>(firstQuestion ? [firstQuestion] : [])
  const pillRowRef = useRef<HTMLDivElement | null>(null)
  const resetFocusPending = useRef(false)
  const motionAllowed = useMotionAllowed()

  useEffect(() => {
    const newlyVisible = answersVisible.find((question) => !previousAnswers.current.includes(question) && question !== firstQuestion)
    if (newlyVisible) answerRefs.current[newlyVisible]?.focus()
    previousAnswers.current = answersVisible
  }, [answersVisible, firstQuestion])

  useEffect(() => {
    if (!typingQuestion) return

    const timer = window.setTimeout(() => {
      setAnswersVisible((current) => current.includes(typingQuestion) ? current : [...current, typingQuestion])
      setTypingQuestion(null)
    }, 650)

    return () => window.clearTimeout(timer)
  }, [motionAllowed, typingQuestion])

  useEffect(() => {
    if (!resetFocusPending.current) return
    resetFocusPending.current = false
    pillRowRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
  }, [asked])

  function ask(question: string) {
    if (typingQuestion) {
      setAnswersVisible((current) => current.includes(typingQuestion) ? current : [...current, typingQuestion])
    }
    setAsked((current) => current.includes(question) ? current : [...current, question])
    setTypingQuestion(motionAllowed ? question : null)
    if (!motionAllowed) {
      setAnswersVisible((current) => current.includes(question) ? current : [...current, question])
    }
  }

  function startOver() {
    resetFocusPending.current = true
    setAsked(firstQuestion ? [firstQuestion] : [])
    setAnswersVisible(firstQuestion ? [firstQuestion] : [])
    setTypingQuestion(null)
  }

  const askedItems = asked.flatMap((question) => items.filter((item) => item.question === question))
  const unaskedItems = items.filter((item) => !asked.includes(item.question))
  const visibleAnswers = new Set(answersVisible)
  const isFinished = items.length > 0 && asked.length === items.length

  function bubbleMotion(initial: boolean, origin: 'right' | 'left') {
    if (initial || !motionAllowed) return { initial: false, animate: undefined, style: { transformOrigin: `bottom ${origin}` } }
    return {
      initial: { opacity: 0, transform: 'translateY(10px) scale(0.96)' },
      animate: { opacity: 1, transform: 'translateY(0px) scale(1)' },
      transition: bubbleTransition,
      style: { transformOrigin: `bottom ${origin}` },
    }
  }

  function renderPair(item: FaqItem, unasked = false) {
    const isInitial = item.question === firstQuestion
    const answerVisible = visibleAnswers.has(item.question)
    const isTyping = typingQuestion === item.question
    const questionMotion = bubbleMotion(isInitial, 'right')
    const answerMotion = bubbleMotion(isInitial, 'left')

    return (
      <div key={item.question} className={unasked ? 'faq-pair faq-unasked hidden' : 'faq-pair'}>
        <div className="flex flex-col items-end">
          <span className="t-meta mb-1.5 mr-3">You</span>
          <motion.div
            {...questionMotion}
            className="max-w-[85%] rounded-[1.25rem] rounded-br-md bg-brand px-4 py-3 text-[1rem] font-semibold leading-snug text-fg sm:px-5"
          >
            <p>{item.question}</p>
          </motion.div>
        </div>

        <div className="mt-4 flex items-end gap-3">
          <div className="size-9 shrink-0 overflow-hidden rounded-full">
            <Photo name="photo-founder-blue" alt="" sizes="96px" className="size-full object-cover object-[50%_0%] scale-[2.3] origin-[50%_18%]" />
          </div>
          <div className="min-w-0 max-w-[90%]">
            <span className="t-meta mb-1.5 ml-3 block">TarunSpeaks</span>
            {isTyping && !answerVisible ? (
              <div className="rounded-[1.25rem] rounded-bl-md border border-line bg-surface px-5 py-4" aria-hidden="true">
                <span className="flex items-center gap-1.5">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="size-1.5 rounded-full bg-fg-3"
                      animate={motionAllowed ? { opacity: [0.35, 1, 0.35], transform: ['translateY(0px)', 'translateY(-3px)', 'translateY(0px)'] } : undefined}
                      transition={motionAllowed ? { duration: 0.8, repeat: Infinity, delay: dot * 0.12 } : undefined}
                    />
                  ))}
                </span>
              </div>
            ) : answerVisible || unasked ? (
              <motion.div
                {...answerMotion}
                ref={(node) => { answerRefs.current[item.question] = node }}
                data-faq-answer="true"
                tabIndex={-1}
                className="t-body outline-none rounded-[1.25rem] rounded-bl-md border border-line bg-surface px-4 py-3.5 sm:px-5"
              >
                {item.answer}
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0 border-t border-line">
      <noscript><style>{'.faq-unasked { display: block !important; } .faq-controls { display: none !important; }'}</style></noscript>
      <div aria-live="polite" className="space-y-7 border-b border-line py-7">
        {askedItems.map((item) => renderPair(item))}
        {unaskedItems.map((item) => renderPair(item, true))}
      </div>

      <div className="faq-controls pt-6">
        {isFinished ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="t-body">That’s everything. Still curious?</span>
            <Link href="/contact" className="link-arrow">Talk to TarunSpeaks</Link>
            <button type="button" onClick={startOver} className="inline-flex min-h-11 items-center gap-2 text-[0.9rem] font-semibold text-fg-2 underline decoration-line underline-offset-4 transition-colors hover:text-fg focus-visible:text-fg">
              <RotateCcw aria-hidden="true" size={16} />
              Start over
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="t-meta font-semibold text-fg">Ask another <span className="ml-2 font-normal text-fg-3">{asked.length} of {items.length} asked</span></p>
              {unaskedItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const index = Math.floor(Math.random() * unaskedItems.length)
                    ask(unaskedItems[index].question)
                  }}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 py-2 text-left text-[0.9rem] text-fg-2 focus-visible:text-fg ${motionAllowed ? 'transition-[translate,scale,border-color] duration-200 ease-editorial hover:-translate-y-0.5 hover:border-brand-bright active:scale-[0.97]' : ''}`}
                >
                  <Dices aria-hidden="true" size={16} />
                  <span>Surprise me</span>
                </button>
              )}
            </div>
            <div ref={pillRowRef} className="-mx-[var(--gutter)] mt-3 flex flex-nowrap gap-2 overflow-x-auto px-[var(--gutter)] snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-sm:[contain:inline-size] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {unaskedItems.map((item) => (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => ask(item.question)}
                  className={`inline-flex min-h-11 shrink-0 snap-start items-center whitespace-nowrap rounded-full border border-line px-4 py-2 text-left text-[0.9rem] leading-snug text-fg-2 focus-visible:text-fg ${motionAllowed ? 'transition-[translate,scale,border-color] duration-200 ease-editorial hover:-translate-y-0.5 hover:border-brand-bright active:scale-[0.97]' : ''}`}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

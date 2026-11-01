'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '../ui/Button'

const SHOWN_KEY = 'consultation-popup-shown'

export function ConsultationPopup() {
  const [open, setOpen] = useState(false)
  const [armed, setArmed] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const shownRef = useRef(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SHOWN_KEY)) {
        shownRef.current = true
        return
      }
    } catch {
      // If storage is unavailable, the in-memory guard still prevents duplicates this visit.
    }

    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const progress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      return scrollable > 0 ? window.scrollY / scrollable : 0
    }

    const show = () => {
      if (shownRef.current) return
      shownRef.current = true
      try {
        sessionStorage.setItem(SHOWN_KEY, '1')
      } catch {
        // The in-memory guard remains effective when session storage is blocked.
      }
      returnFocusRef.current = document.body
      setArmed(true)
      setOpen(true)
    }

    let frame = 0
    let desktopReady = false
    let timeReady = false
    let scrollReady = false
    let exitIntent: ((event: MouseEvent) => void) | undefined

    const armDesktop = () => {
      if (desktopReady || !timeReady || !scrollReady || shownRef.current) return
      desktopReady = true
      setArmed(true)
      exitIntent = (event: MouseEvent) => {
        if (event.clientY <= 0) show()
      }
      document.addEventListener('mouseleave', exitIntent)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        if (shownRef.current) return
        if (desktop) {
          scrollReady = progress() > 0.25
          armDesktop()
        } else if (progress() > 0.6) {
          show()
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    let timer: number | undefined
    if (desktop) {
      timer = window.setTimeout(() => {
        timeReady = true
        scrollReady = progress() > 0.25
        armDesktop()
      }, 15000)
      scrollReady = progress() > 0.25
      armDesktop()
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      if (timer) window.clearTimeout(timer)
      if (exitIntent) document.removeEventListener('mouseleave', exitIntent)
      setArmed(false)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      returnFocusRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const close = () => {
    setOpen(false)
    returnFocusRef.current?.focus()
  }

  return (
    <AnimatePresence>
      {armed && open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-popup-title"
            tabIndex={-1}
            className="w-full max-w-md rounded-[var(--radius-card)] border border-line bg-surface p-7 shadow-panel outline-none sm:p-8"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="t-meta">A useful next step</p>
                <h2 id="consultation-popup-title" className="t-h2 mt-3">Still deciding?</h2>
              </div>
              <button type="button" aria-label="Close" onClick={close} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-fg/10">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="t-body mt-5">If you’d rather talk it through than read more, we can set up a consultation.</p>
            <Button to="/contact?request=consultation" size="lg" arrow track="consultation-popup" className="mt-7">Request a Consultation</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

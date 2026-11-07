'use client'

import { useSyncExternalStore } from 'react'
import { X } from 'lucide-react'
import { previewNotice } from '../../data/site'

const DISMISSED_KEY = 'ts-preview-dismissed'
const listeners = new Set<() => void>()
let dismissedInMemory = false

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => listeners.delete(onStoreChange)
}

function getSnapshot() {
  if (dismissedInMemory) return true

  try {
    return sessionStorage.getItem(DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function getServerSnapshot() {
  return true
}

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true })
  window.addEventListener('resize', onStoreChange)

  return () => {
    window.removeEventListener('scroll', onStoreChange)
    window.removeEventListener('resize', onStoreChange)
  }
}

function getScrollSnapshot() {
  return window.scrollY <= window.innerHeight * 0.5
}

function getScrollServerSnapshot() {
  return false
}

function dismiss() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, '1')
  } catch {
    // The notice still dismisses when session storage is unavailable.
  }

  dismissedInMemory = true
  listeners.forEach((listener) => listener())
}

export function PreviewNotice() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const nearTop = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getScrollServerSnapshot,
  )

  if (!previewNotice.show || dismissed || !nearTop) return null

  return (
    <div
      role="status"
      aria-label="Site preview notice"
      className="fixed left-1/2 top-[5rem] z-30 -translate-x-1/2 flex w-max max-w-[calc(100vw-2rem)] items-center gap-2 rounded-[var(--radius-card)] border border-line bg-surface px-3 py-1.5 font-secondary text-[0.85rem] leading-snug text-fg-2 shadow-panel"
    >
      <p>{previewNotice.message}</p>
      <button
        type="button"
        aria-label="Dismiss preview notice"
        onClick={dismiss}
        className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-fg/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  )
}

import { useSyncExternalStore } from 'react'

const motionQuery = '(prefers-reduced-motion: reduce)'

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(motionQuery)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return !window.matchMedia(motionQuery).matches
}

function getServerSnapshot() {
  return false
}

export function useMotionAllowed() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

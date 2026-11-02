'use client'

import { useSyncExternalStore } from 'react'
import { useMotionAllowed } from '../../lib/useMotionAllowed'

const desktopQuery = '(min-width: 768px)'

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(desktopQuery)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(desktopQuery).matches
}

function getServerSnapshot() {
  return false
}

export function HeroVideoTile() {
  const motionAllowed = useMotionAllowed()
  const desktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (!motionAllowed || !desktop) return null

  return (
    <div className="absolute left-[72%] top-0 h-[47.41%] w-[28%]">
      <video
        src="/videos/hero-session-loop.mp4"
        poster="/videos/hero-session-loop-poster.jpg"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="size-full object-cover object-[35%_50%]"
      />
    </div>
  )
}

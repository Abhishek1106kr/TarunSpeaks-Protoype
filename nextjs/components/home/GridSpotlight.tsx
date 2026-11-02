'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useMotionAllowed } from '../../lib/useMotionAllowed'

const pointerQuery = '(hover: hover) and (pointer: fine)'
const gridSize = 56

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(pointerQuery)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(pointerQuery).matches
}

function getServerSnapshot() {
  return false
}

export function GridSpotlight() {
  const motionAllowed = useMotionAllowed()
  const pointerFine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!motionAllowed || !pointerFine) return

    const root = rootRef.current
    if (!root) return

    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let hasPointer = false

    const update = () => {
      frame = 0
      const scrollY = window.scrollY
      root.style.setProperty('--grid-y', `${-(scrollY % gridSize)}px`)

      if (!hasPointer) return

      const cellX = Math.floor(pointerX / gridSize) * gridSize
      const cellY = Math.floor((pointerY + scrollY) / gridSize) * gridSize - scrollY
      root.style.setProperty('--x', `${pointerX}px`)
      root.style.setProperty('--y', `${pointerY}px`)
      root.style.setProperty('--cell-x', `${cellX}px`)
      root.style.setProperty('--cell-y', `${cellY}px`)
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      hasPointer = true
      root.style.opacity = '1'
      requestUpdate()
    }

    const handlePointerLeave = () => {
      hasPointer = false
      root.style.opacity = '0'
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    requestUpdate()

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('scroll', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [motionAllowed, pointerFine])

  if (!motionAllowed || !pointerFine) return null

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none overflow-hidden mix-blend-screen"
      style={{
        '--x': '0px',
        '--y': '0px',
        '--grid-y': '0px',
        '--cell-x': '0px',
        '--cell-y': '0px',
        opacity: 0,
        transition: 'opacity 300ms ease-out',
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, color-mix(in srgb, var(--color-brand-bright) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-brand-bright) 60%, transparent) 1px, transparent 1px)`,
          backgroundPosition: '0 var(--grid-y)',
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundRepeat: 'repeat',
          maskImage: 'radial-gradient(circle 240px at var(--x) var(--y), black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 240px at var(--x) var(--y), black 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute left-0 top-0 h-14 w-14"
        style={{
          transform: 'translate3d(var(--cell-x), var(--cell-y), 0)',
          backgroundColor: 'color-mix(in srgb, var(--color-brand-bright) 14%, transparent)',
        }}
      />
    </div>
  )
}

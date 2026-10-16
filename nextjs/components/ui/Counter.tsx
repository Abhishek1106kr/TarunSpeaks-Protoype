'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { formatNumber } from '../../lib/format'

// Server-renders the final figure (correct without JS and for crawlers), then counts up once in view.
export function Counter({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => { element.textContent = `${formatNumber(Math.round(latest))}${suffix}` },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, suffix, value])

  return (
    <span ref={ref} className={`nums ${className}`}>
      {formatNumber(value)}{suffix}
    </span>
  )
}

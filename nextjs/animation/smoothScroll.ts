import Lenis from 'lenis'
import { gsap, prefersReducedMotion, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

// Starts Lenis and drives it from GSAP's ticker so ScrollTrigger stays in sync. Returns a cleanup function.
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  const tick = (time: number) => lenis?.raf(time * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTarget(target: HTMLElement | number, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset: typeof target === 'number' ? 0 : -96 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' })
  else target.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? 'instant' : 'smooth' })
}

export const lockScroll = (locked: boolean) => {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

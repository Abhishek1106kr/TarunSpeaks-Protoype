'use client'

import { type RefObject, useLayoutEffect } from 'react'
import { formatNumber } from '../lib/format'
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText } from './gsap'

const onEnter = (trigger: Element, start = 'top 88%') => ({ trigger, start, once: true })

/**
 * Declarative scroll animations for everything inside `scope`, driven by data attributes:
 * - data-reveal           fade + rise (data-delay in seconds)
 * - data-reveal-group     staggers its direct children
 * - data-split            line-by-line masked text reveal (data-split="immediate" skips the scroll trigger)
 * - data-image-reveal     clip-path wipe with a gentle zoom on the inner image
 * - data-parallax         scrubbed vertical drift (value = strength in %)
 * - data-counter          counts up to the given number
 * - data-grow             vertical line that draws itself
 * Content is fully visible without JavaScript and when the user prefers reduced motion.
 */
export function useScrollAnimations(scope: RefObject<HTMLElement | null>, key?: unknown) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const splits: SplitText[] = []

      root.querySelectorAll<HTMLElement>('[data-split]').forEach((element) => {
        const immediate = element.dataset.split === 'immediate'
        splits.push(SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.25,
            stagger: 0.09,
            delay: Number(element.dataset.delay ?? 0),
            scrollTrigger: immediate ? undefined : onEnter(element, 'top 90%'),
          }),
        }))
      })

      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 36, autoAlpha: 0, delay: Number(element.dataset.delay ?? 0), scrollTrigger: onEnter(element) })
      })

      root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, { y: 40, autoAlpha: 0, stagger: 0.1, scrollTrigger: onEnter(group) })
      })

      root.querySelectorAll<HTMLElement>('[data-image-reveal]').forEach((frame) => {
        const image = frame.querySelector('img')
        const trigger = onEnter(frame, 'top 85%')
        gsap.fromTo(frame, { clipPath: 'inset(18% 10% 18% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: trigger })
        if (image) gsap.fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: trigger })
      })

      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
        const strength = Number(element.dataset.parallax || 8)
        gsap.fromTo(element, { yPercent: -strength }, {
          yPercent: strength,
          ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      root.querySelectorAll<HTMLElement>('[data-counter]').forEach((element) => {
        const target = Number(element.dataset.counter)
        const suffix = element.dataset.suffix ?? ''
        const state = { value: 0 }
        element.textContent = `0${suffix}`
        gsap.to(state, {
          value: target,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: onEnter(element, 'top 92%'),
          onUpdate: () => { element.textContent = `${formatNumber(Math.round(state.value))}${suffix}` },
        })
      })

      root.querySelectorAll<HTMLElement>('[data-grow]').forEach((line) => {
        gsap.from(line, { scaleY: 0, transformOrigin: 'top center', duration: 1.6, ease: 'expo.inOut', scrollTrigger: onEnter(line, 'top 92%') })
      })

      return () => splits.forEach((split) => split.revert())
    }, root)

    // Lazy images and web fonts change layout after mount; recalculate trigger positions once they settle.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [scope, key])
}

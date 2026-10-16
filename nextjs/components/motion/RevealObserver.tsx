'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Marks [data-reveal] elements with `data-shown` as they enter the viewport. It's an attribute React doesn't own,
// so marking a not-yet-hydrated (Suspense-streamed) segment can't cause a hydration mismatch. The transition lives
// in globals.css, so content is visible without JS and under prefers-reduced-motion. Re-scans after navigation.
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((element) => element.setAttribute('data-shown', ''))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-shown', '')
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    const scan = () => document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((element) => observer.observe(element))
    scan()
    // Catch content streamed in after the first scan (e.g. route segments resolving).
    const mutations = new MutationObserver(scan)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [pathname])

  return null
}

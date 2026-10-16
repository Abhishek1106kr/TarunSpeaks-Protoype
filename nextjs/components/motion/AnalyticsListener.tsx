'use client'

import { useEffect } from 'react'
import { type AnalyticsEvent, track } from '../../lib/analytics'

// One delegated click listener, so CTAs stay Server Components: any element with
// data-track="<event>" reports that event, with data-track-location as context.
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]')
      if (!element) return
      track(element.dataset.track as AnalyticsEvent, {
        location: element.dataset.trackLocation,
        destination: element.getAttribute('href') ?? undefined,
        label: element.textContent?.trim().slice(0, 60),
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}

// Fires a page-level view event once (e.g. case_study_viewed with the slug).
export function TrackView({ event, props }: { event: AnalyticsEvent; props: Record<string, string> }) {
  const key = JSON.stringify(props)
  useEffect(() => {
    track(event, JSON.parse(key))
  }, [event, key])
  return null
}

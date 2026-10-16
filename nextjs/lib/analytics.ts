// Conversion events (UX.md §11). The site has NO analytics connected yet: `track` forwards to Google tag
// (`window.gtag`) or a GTM `dataLayer` only if one is present on the page, and is otherwise a no-op.
// Nothing is sent anywhere until an analytics provider is added — see .claude/skills/analytics-measurement.
//
// Never put personal data (names, emails, message text) in event properties.

export type AnalyticsEvent =
  | 'primary_cta_clicked'
  | 'objective_selected'
  | 'program_viewed'
  | 'case_study_viewed'
  | 'enquiry_started'
  | 'enquiry_submitted'
  | 'consultation_booking_started'

export type EventProps = Record<string, string | number | boolean | undefined>

type AnalyticsWindow = Window & {
  gtag?: (command: 'event', name: string, params?: EventProps) => void
  dataLayer?: Record<string, unknown>[]
}

export function track(event: AnalyticsEvent, props: EventProps = {}) {
  if (typeof window === 'undefined') return
  const target = window as AnalyticsWindow
  const payload = { route: window.location.pathname, ...props }
  if (typeof target.gtag === 'function') target.gtag('event', event, payload)
  else if (Array.isArray(target.dataLayer)) target.dataLayer.push({ event, ...payload })
  if (process.env.NODE_ENV !== 'production') console.debug('[analytics]', event, payload)
}

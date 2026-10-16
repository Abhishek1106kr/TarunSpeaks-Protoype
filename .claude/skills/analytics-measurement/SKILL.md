---
name: analytics-measurement
description: Use when adding or changing conversion tracking on the TarunSpeaks site, or when connecting an analytics provider. Explains the event interface, which events exist, where they fire, and what must stay true (no personal data, no claims of tracking when nothing is connected).
---

# Analytics and measurement

**Current state: no analytics provider is connected.** `nextjs/lib/analytics.ts` exposes `track(event, props)`, which forwards to `window.gtag` or a GTM `window.dataLayer` *only if present*. In development it logs to the console. Nothing is collected in production until a provider is added. Never report numbers from this site as measured until then.

## Events

| Event | Fires when | Where |
|---|---|---|
| `primary_cta_clicked` | A `<Button track="location">` is clicked | `components/ui/Button.tsx` + `components/motion/AnalyticsListener.tsx` (delegated listener) |
| `objective_selected` | A homepage objective is clicked | `data-track` on `components/home/Objectives.tsx` |
| `program_viewed` | A program section enters view on /programs (once each) | `components/blocks/ProgramIndex.tsx` |
| `case_study_viewed` | A case-study page loads | `TrackView` in `app/case-studies/[slug]/page.tsx` |
| `enquiry_started` | First focus inside the enquiry form | `components/blocks/EnquiryForm.tsx` |
| `enquiry_submitted` | The server confirmed delivery (`status: 'sent'`) | `EnquiryForm.tsx` |
| `consultation_booking_started` | Reserved for a future booking integration | — |

Every event gets `route`. Allowed properties: location, destination, label (CTA text), program, case_study, interest, request type. **Never** names, emails, phone numbers or message text.

## Connecting a provider

1. Pick one (GA4 via `@next/third-parties/google`, GTM, Vercel Analytics custom events, PostHog). Don't run two.
2. Load it with consent handling appropriate to the audience (GDPR applies to EU visitors).
3. Map `track()` to the provider in `lib/analytics.ts` only — components stay unchanged.
4. Verify in the provider's debug view, then update this skill and CLAUDE.md.

## What to measure first

Qualified enquiry rate (enquiries with organisation + work email ÷ sessions), consultation-request share, form start → submit completion, CTA engagement by location, program and case-study views before an enquiry. Clicks are not sales: judge changes on qualified enquiries and the conversations that follow.

---
name: enquiry-ux
description: Use when changing the TarunSpeaks enquiry or consultation flow (/contact, EnquiryForm, the Server Action, CTA prefill links) — field set, validation, spam guards, honest delivery states and what-happens-next copy.
---

# Enquiry and consultation UX

Files: `nextjs/app/contact/{page.tsx,actions.ts,enquiry.ts}`, `nextjs/components/blocks/EnquiryForm.tsx`, `nextjs/components/ui/FormField.tsx`.

## The form

- **Request type first:** "Request a consultation call" (default) or "Send an enquiry". It qualifies the lead and tells the team how to respond.
- **Required:** name, work email, organisation, what to discuss, the challenge (≥ 10 characters). **Optional:** role; and, behind a disclosure, phone, team size and timeline. Don't promote an optional field to required without a business reason.
- **Prefill from CTAs:** `?interest=ai|training|consulting|keynote|branding|career|other`, `?program=<slug>`, `?case=<slug>`, `?request=enquiry`. Every contextual CTA should pass one.

## Behaviour that must not regress (checked by visual-qa/flows.mjs)

- Validation is server-side (`actions.ts`) and runs **before** the spam guards, so a fast human never gets a silent "sent".
- Errors: summary `role="alert"`, per-field message linked with `aria-describedby`, focus moves to the first invalid field, and values persist (React resets forms after an action; `<select>`s are keyed so they keep their value).
- Submit is disabled while pending (no duplicates).
- **Success only when a channel accepted it** — `CONTACT_WEBHOOK_URL` or Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Otherwise show "Your enquiry has not been sent" with a prefilled email and the phone number.
- After success, "What happens next" describes the real process only. No response-time promises unless the business confirms one.

## Booking

No calendar integration exists. Don't add a fake scheduler. If one is connected (Calendly, Cal.com, Topmate…), add it as a second step after a consultation request, pass the interest along, and fire `consultation_booking_started` / `consultation_booked` (the latter only on a confirmed booking).

---
name: b2b-conversion
description: Use when adding or restructuring a TarunSpeaks page or section — maps every section to an executive buyer question and keeps CTAs specific and truthful.
---

# B2B conversion for TarunSpeaks

Buyers: CHROs, L&D/OD leaders, founders/CEOs, CXOs, sales and marketing heads.

## Every section answers one question

| Buyer question | Where it's answered |
|---|---|
| Is this relevant to my organisation? | Home hero, Corporate Training intro |
| Which problem can they solve? | Home "Organisational challenges" (problem → program → evidence) |
| What exactly can I commission? | Home "Three ways", `/programs`, `/consulting` engagement modes |
| Have they worked in a similar context? | Case studies, client sectors, "Related work" links |
| What evidence supports it? | StatGrid, case studies (delivered vs reported), verbatim quotes |
| What does an engagement look like? | Delivery (Scope → Design → Deliver → Sustain), formats, FAQ |
| What should I do next? | One primary CTA per view + closing `EnquiryCta` |

If a new section doesn't answer one of these, cut it.

## CTAs

Use the descriptive set, only where the destination exists:
`Talk to TarunSpeaks` (→ /contact) · `Explore Programs` · `Explore Corporate Programs` · `Discuss AI Capability Building` (→ /contact?interest=ai) · `View Case Studies` · `Explore Keynotes` · `Request a Consultation` · `Request a speaker` (→ /contact?interest=keynote) · `Discuss this program` (→ /contact?program=slug).

Pass context in the query string; `EnquiryForm` pre-selects the interest and pre-writes the message. One blue (primary) button per view; the rest are secondary or quiet.

## Enquiry form rules

Capture only: name, work email, organisation, role (optional), interest, challenge. Server-side validation in `app/contact/actions.ts`. Delivery via `CONTACT_WEBHOOK_URL` or Resend env vars. **If nothing is configured or delivery fails, the UI says the enquiry was not sent and offers a prefilled email** — never a fake success.

## Copy

Short headlines, concrete nouns, documented facts. No "transform your business", no guarantees, no fake urgency. Problem statements restate a program's own "Designed to…" line.

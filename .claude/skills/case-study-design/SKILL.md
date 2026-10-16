---
name: case-study-design
description: Use when adding or editing a TarunSpeaks case study — data shape, the delivered-vs-reported distinction, imagery and page structure.
---

# Case studies

Data: `data/caseStudies.ts`. Pages: `app/case-studies/page.tsx` (grouped by `track`) and `app/case-studies/[slug]/page.tsx` (static params, `dynamicParams = false`).

## Adding one

1. The source must be the company profile or another first-party document. Record the page range in `pages`.
2. Fill the fields from the source, verbatim where possible:
   - `headline`, `objective` — the slide title and subtitle.
   - `format` — the three blue-chip facts (duration, participants, audience).
   - `delivered` — "What we delivered".
   - `reported` — "The Impact", **verbatim**. Never add outcomes.
   - `figures` — only numbers printed in the source.
3. `programs` — link to related flagship programs by slug.
4. Images: add to `public/images/profile/` and `data/images.profile.ts`. The page auto-selects the most landscape photo for the 21:9 banner.
5. If the client should not be public, or details are confidential, don't publish — ask.

## Page structure (executive scan order)

Client · industry → headline → figures → banner → The engagement (format chips, audience) → What we delivered → **Reported impact** (with source note) → gallery → related programs + "Request a Consultation" → more case studies → CTA.

"Reported impact" always carries: *"As reported in the TarunSpeaks company profile (pp. X). These are the engagement's documented outcomes, not independent measurements."*

Structured data: `Article` (author/publisher TarunSpeaks, `about` the client) + BreadcrumbList. Never use Review or AggregateRating.

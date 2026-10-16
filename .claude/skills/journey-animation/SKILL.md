---
name: journey-animation
description: Use when editing the founder/company Journey timeline (components/sections/Journey.tsx, data/journey.ts) — facts, interaction model and accessibility constraints.
---

# Journey timeline

`components/sections/Journey.tsx`, data in `data/journey.ts`. Used on `/` and `/about`.

## Narrative (verified)

Engineering (TCS from 2015) → Digital marketing (co-founded Big Mouth Digital & Media, 2016) → Training (100+ keynotes) → TarunSpeaks (29,000+ trained) → AI capability (Nawany, NewTech, Godrej, Double Tap).

Only 2015 and 2016 are published dates. Later chapters use word markers ("Calling", "Company", "Now") — **never invent years**. Each chapter has a `proof` line, which must be a documented fact.

## Interaction model

- Desktop (lg+): a sticky photo stage cross-fades per chapter, and the marker swaps with a masked slide (AnimatePresence).
- The connecting line is scroll-linked (`useScroll` on the list, `useSpring`) with no pinning and no scroll hijack.
- Active chapter: IntersectionObserver with `rootMargin: '-45% 0px -50% 0px'`.
- A phase index (`nav[aria-label="Journey chapters"]`) gives anchor links for keyboard and touch. On mobile it's sticky under the header and horizontally scrollable (`data-allow-overflow`).
- Mobile: no sticky stage; each chapter carries its own photo with an image reveal.
- Reduced motion: line fully drawn, marker swaps without sliding.

## When editing

- Keep 4–6 chapters, so each gets ~78svh of scroll on desktop.
- Pass `headingLevel` to match the page outline.
- Verify with `flows.mjs` ("Journey tracks the chapter in view").

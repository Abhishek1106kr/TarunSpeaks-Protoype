---
name: visual-qa
description: Use before claiming any TarunSpeaks UI change works — runs real-browser screenshots at desktop/tablet/mobile, console/hydration/overflow checks, and the interaction suite (enquiry form, menu, keyboard, reduced motion, redirects, SEO).
---

# Visual QA for the TarunSpeaks site

Compiling is not verification. Every UI change is checked in a real browser before it is called done.

## Workflow

1. Start the Next.js app (from `nextjs/`): `npx next dev -p 3100` (run in background).
2. From the **repo root** (the scripts use the root Playwright install):
   ```bash
   # Git Bash rewrites "/" into a Windows path — disable that for route lists.
   MSYS_NO_PATHCONV=1 node .claude/skills/visual-qa/qa.mjs --base http://localhost:3100 \
     --out <scratch dir> --routes /,/programs,/corporate-training,/consulting,/case-studies,/case-studies/nawany-group,/speaking,/about,/services,/insights,/contact \
     --widths 1440,834,390
   node .claude/skills/visual-qa/flows.mjs http://localhost:3100
   ```
   - `--viewport` captures only the first screen (use for hero review); default is full page.
   - `--reduced` emulates `prefers-reduced-motion: reduce`.
3. **Look at the screenshots.** Slice tall pages into ~2400px chunks before viewing. Check: hierarchy, cropping of photos, empty/unrevealed sections, text wrapping in buttons, header at 390px.
4. Fix, then re-run the affected routes. Report what was actually run and its output.

## What the scripts catch

| Check | Script | Notes |
|---|---|---|
| Console errors, hydration mismatches, failed requests, HTTP ≥400 | qa.mjs | A hydration error is a bug, not noise. |
| Horizontal overflow (lists offending elements) | qa.mjs | Mark intentional scrollers with `data-allow-overflow`. |
| Broken images, h1 count, canonical, description | qa.mjs | Exactly one `<h1>` per page. |
| Enquiry validation, focus management, honest not-sent state, mailto fallback | flows.mjs | Must never show "sent" unless a channel accepted it. |
| CTA prefill (`?program=`, `?interest=`) | flows.mjs | |
| Mobile menu: visible toggle, focus trap, Escape returns focus | flows.mjs | |
| Skip link, reduced motion (nothing hidden), journey state, FAQ, chatbot | flows.mjs | |
| Legacy redirects, sitemap, robots, JSON-LD, no review schema | flows.mjs | |

## Known false positives

- **LCP "add loading=eager" warnings for below-the-fold images** — produced by the scripted scroll (programmatic scroll isn't user input, so LCP keeps updating). Only act on it when the image is in the first viewport.
- **Journey stage / program index showing the last item in full-page screenshots** — they keep the state from the scroll-through. Verify state with `flows.mjs`, not a full-page image.
- **404 on `/nope`** — expected.

## Lessons recorded here

- `html { scroll-behavior: smooth }` turns `window.scrollTo(y)` into interrupted smooth scrolls; QA scrolling must pass `behavior: 'instant'`.
- Anything that mutates the DOM before hydration (classes, attributes) causes React 19 hydration errors. Don't add Suspense boundaries (e.g. an empty `loading.tsx`) that let the layout hydrate before the page.
- React resets forms after a Server Action; `<select defaultValue>` falls back to its mount-time default unless remounted.

---
name: motion-design
description: Use when adding or changing animation on the TarunSpeaks site — decides CSS vs Motion for React, enforces reduced-motion and no scroll-jacking.
---

# Motion design

Motion explains hierarchy or progress. If it only decorates, remove it.

## Which tool

| Need | Use | Where |
|---|---|---|
| Hero/page-intro entrance | CSS `.enter` with `--enter-delay` | starts at first paint, no hydration wait (LCP-safe) |
| Image reveal (a few key photos only) | `data-reveal="image"` | `RevealObserver` sets `data-shown`; CSS does the clip. Plain `data-reveal` is inert — text never fades in on scroll |
| Menu, journey marker, logo-filter change, insight filter | Motion for React (`framer-motion` package) | small client components only |
| Scroll-linked progress | `useScroll` + `useSpring` | journey line — linked, never pinned |

GSAP, ScrollTrigger and Lenis were removed: nothing on the site needs a timeline engine, and smooth-scroll libraries hijack scrolling. Re-adding one needs a written reason.

## Rules

- Content is visible without JS: reveals only hide when `html.js` is set, and never under `prefers-reduced-motion`.
- Reduced motion: no transforms, no counting, journey line drawn in full (`useReducedMotion`).
- Durations 0.25–0.9s; ease `--ease-editorial`. Stagger ≤ 0.08s per item, max ~5 items.
- Animate `opacity`, `transform`, `clip-path`, `scale` only. No layout properties.
- Never mutate React-owned attributes (`className`) from observers — use `data-*` attributes React doesn't render.
- Don't animate every card. Pick the section's one meaningful movement.

## Checklist per animation

What does the user notice? What does it communicate? Does it block reading? Mobile behaviour? Reduced-motion behaviour? Cost (main-thread, layout)?

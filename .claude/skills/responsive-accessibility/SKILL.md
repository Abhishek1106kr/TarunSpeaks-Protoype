---
name: responsive-accessibility
description: Use when building or reviewing TarunSpeaks components — responsive layout rules and the accessibility bar every page must meet.
---

# Responsive & accessibility standards

## Layout

- Containers: `.container-x` (80rem max, gutter `clamp(1rem, 4vw, 2.5rem)`). Breakpoints: Tailwind defaults, plus `nav:` (75rem), where the desktop navigation appears.
- Test widths: 1440, 834, 390 (`visual-qa`). There must be no horizontal overflow; intentional scrollers (journey index, the scale table) carry `data-allow-overflow`.
- Buttons: don't put `hidden` on `<Button>` — its `inline-flex` wins. Wrap it in an element that controls visibility.
- The header is fixed at 4.5rem. Page intros start with `pt-[4.5rem]`, and `scroll-padding-top: 6rem` keeps anchors clear of it.

## Accessibility bar

- One `<h1>` per page, with headings in order. `SectionHeader` renders `h2`; nested items use `h3`.
- Landmarks: header nav `Main`, mobile nav `Mobile`, footer navs labelled, and a breadcrumb `nav` on inner pages.
- A skip link is the first focusable element and targets `#main` (`tabIndex=-1`).
- Focus: global `:focus-visible` outline in `brand-text`. The mobile menu traps focus and returns it on Escape.
- Touch targets are ≥ 44px (`min-h-11`).
- Forms: visible labels, `(optional)` markers, `aria-invalid` + `aria-describedby` errors, a summary `role="alert"`, and focus moved to the first invalid field or to the outcome message.
- Colour is never the only signal: the active nav item has an underline, errors have an icon and text, and the active journey chapter uses `aria-current`.
- Contrast: body text uses fg-2 or above; fg-3 is the floor for small meta text (5.1:1). Blue text uses `brand-text`.
- Images: meaningful alt text for photos of people and events; `alt=""` for decorative duplicates (the journey stage, card thumbnails beside a titled link).
- Motion: see `motion-design`. All content is reachable under reduced motion and without JS.
- FAQs use native `<details>/<summary>`.

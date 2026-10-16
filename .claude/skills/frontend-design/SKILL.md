---
name: frontend-design
description: Use when composing new TarunSpeaks UI — the component kit, composition patterns and the editorial look that keeps pages from becoming identical card grids.
---

# Frontend design — TarunSpeaks kit

## Components (reuse before writing new)

| Component | Use |
|---|---|
| `blocks/PageIntro` | Inner-page opener: breadcrumb, kicker, serif h1, lead, actions, optional captioned photo |
| `ui/SectionHeader` | Section opener (optional kicker, serif h2, lead, optional right-aligned action) — leave the kicker off when the heading is self-explanatory |
| `ui/Button` | `primary` (one per view), `secondary`, `quiet` (underlined text), `inverse` (on blue) |
| `ui/Photo` | All local images, by registry name (`lib/images.ts`); `tone="mono"` by default |
| `blocks/StatGrid` | Figures as evidence: serif numerals, plain labels, a source line. Static (no counters) |
| `blocks/ProgramTable` | The eight programs as an index: problem, audience, duration. Works on dark and `.on-paper` |
| `blocks/CaseStudyCard` | Editorial entry (photo, client line, serif headline, scale); typographic when no unique photo exists |
| `blocks/ClientSectors` + `ClientEcosystem` | 59 client logos with industry filters, optical sizing, names on hover/focus or via "Show organisation names" |
| `home/Objectives` | "What do you need to achieve?" router — goal → page, plus a pre-filled enquiry |
| `blocks/FaqList` | `<details>` accordion |
| `blocks/Quote` | Verbatim testimonial |
| `blocks/EnquiryCta` | Closing blue band; tailor `title`/`body`/CTAs per page |
| `sections/Journey` | Signature timeline |

## Composition patterns that create rhythm

Vary the device from section to section. Don't stack card grids.
- **Numbered editorial entries** (serif italic numeral + title + facts list): offers, consulting modes.
- **Ruled list** (`border-t` + `border-b` rows): challenges table, keynotes, modules, recognitions.
- **Photo + list split**: speaking teaser, recognition.
- **Numbered steps with blue tick**: delivery process.
- **Alternating surfaces**: `bg-canvas` ↔ `bg-canvas-2` with `border-line-soft` between, and one blue band (EnquiryCta) per page.

## Look

An editorial business publication: black canvas, news-serif headlines, ruled lists instead of boxes, documentary black-and-white photography with honest captions, a paper-toned index section, one flat blue invitation band. Square-ish corners (0.3rem). No glows, gradients, chips, glass or decorative motion. Vary composition section to section (12-column grid; sticky left headings, full-width spreads, ruled registers).

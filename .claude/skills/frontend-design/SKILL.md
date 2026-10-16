---
name: frontend-design
description: Use when composing new TarunSpeaks UI — the component kit, composition patterns and the editorial look that keeps pages from becoming identical card grids.
---

# Frontend design — TarunSpeaks kit

## Components (reuse before writing new)

| Component | Use |
|---|---|
| `blocks/PageIntro` | Inner-page hero: crumbs, eyebrow, h1, lead, actions, optional aside photo or figures |
| `ui/SectionHeader` | Section opener (eyebrow, h2, lead, optional right-aligned action) |
| `ui/Button` | `primary` (one per view), `secondary`, `quiet` (underlined text), `inverse` (on blue) |
| `ui/Photo` | All local images, by registry name (`lib/images.ts`); `tone="mono"` by default |
| `blocks/StatGrid` + `ui/Counter` | Proof figures on a hairline grid |
| `blocks/ProgramCard`, `blocks/CaseStudyCard` | Summary cards with category or format chip |
| `blocks/ClientSectors` | Client names by sector (text, no logos) |
| `blocks/FaqList` | `<details>` accordion |
| `blocks/Quote` | Verbatim testimonial |
| `blocks/EnquiryCta` | Closing blue band; tailor `title`/`body`/CTAs per page |
| `sections/Journey` | Signature timeline |

## Composition patterns that create rhythm

Vary the device from section to section. Don't stack card grids.
- **Hairline grid** (`gap-px bg-line` + `bg-canvas` cells): Train/Consult/Empower, capability areas, consulting modes.
- **Ruled list** (`border-t` + `border-b` rows): challenges table, keynotes, modules, recognitions.
- **Photo + list split**: speaking teaser, recognition.
- **Numbered steps with blue tick**: delivery process.
- **Alternating surfaces**: `bg-canvas` ↔ `bg-canvas-2` with `border-line-soft` between, and one blue band (EnquiryCta) per page.

## Look

Black canvas, restrained blue, editorial left-aligned headings, square-ish corners (0.3rem buttons, no pill shapes), grayscale photography with blue chips, and big numerals for proof. A radial blue "stage light" is allowed only behind page intros and the hero portrait.

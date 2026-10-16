---
name: brand-system
description: Use when writing or changing any TarunSpeaks copy, figure, client name, case study, image or visual token — enforces factual accuracy against the company profile and the black + rich-blue system.
---

# TarunSpeaks brand system

## Positioning (one sentence)

A premium corporate training, consulting and AI capability-building partner that connects practical learning with organisational implementation. Business proposition first; Tarun's story makes it credible. Not a celebrity, influencer or motivational-speaker site.

## Sources of truth — in this order

1. `Company Profile - TarunSpeaks '26 (2).pdf` (repo root). Cite as "profile p.N".
2. tarunmakhija.in pages (journey, corporate-training, digital-marketing-consultant).
3. Nothing else. If a fact isn't in 1 or 2, it doesn't ship.

All facts live in `nextjs/data/` with a source comment. Pages import them — never hard-code a number in a component.

| Fact | Value | Source |
|---|---|---|
| Individuals trained | 29,000+ | profile p.6 |
| Training sessions conducted | 2,300+ | profile p.7 |
| Brands trained & consulted | 300+, across 15+ industries | profile p.8 |
| Experience | 10+ years | profile p.2 |
| Keynote sessions | 100+ | tarunmakhija.in |
| Mission | Empower 1 million individuals by December 1, 2029 | profile p.3 |
| Vision | Help 1 billion people make money by doing what they love | profile p.4 |

The older 25,000+ / 1,600+ / 297+ figures are superseded — don't reintroduce them.

## Never invent

Client results, ROI, revenue or adoption percentages, testimonials, awards, speaking engagements, durations, certifications, logos or case-study details. Case-study outcomes are labelled **"Reported impact"** with the profile page range — they are the profile's statements, not independent measurements. Testimonials in `data/testimonials.ts` are verbatim; never edit quote text. Keynote topics list only documented deliveries (`deliveredAt: []` when none).

## Visual tokens (`app/globals.css` `@theme`)

- Canvas `#080B10`, canvas-2 `#0D121B`, surface `#131B28`, line `#273246`.
- Blue `#1749D1` is a **fill** (white text on it is 8:1). For blue *text* on black use `brand-text` `#86A6FF` (8:1). `#2864F0` (brand-bright) is for rules, dots and focus-adjacent accents only.
- Text: fg `#F5F7FB`, fg-2 `#AAB5C7`, fg-3 `#778399` (5.1:1, the minimum for body copy).
- Type: Archivo (variable, `wdth` axis) for display; Inter for reading. `.t-signature` = heavy italic uppercase, reserved for "Train. Consult. Empower." and section signatures.
- Photography: profile photos are grayscale (`.photo`); keep them that way. Blue `.chip` captions echo the profile slides.
- Avoid: purple/pink gradients, glassmorphism, glowing outlines, floating blobs, 3D, stock photos presented as Tarun or clients.

## Logo

The official #TARUNSPEAKS wordmark is `nextjs/public/images/brand/tarunspeaks-logo.webp` (300×53, brand blue `#0048A8` on transparent), rendered by `components/layout/Logo.tsx`. On dark surfaces it shows white (`brightness-0 invert`), as on the profile's black slides, because the blue artwork reaches only ~2.3:1 on the canvas. Use `tone="brand"` for the original blue on light backgrounds. Never redraw or retype the wordmark.

## Photography

Company-profile photos are in `public/images/profile/`, registered in `data/images.profile.ts` with their source page. To re-extract from the PDF: render embedded images with PyMuPDF (`pymupdf.Pixmap(doc, xref)`; for the founder cutout combine with its soft mask: `Pixmap(base, mask)`), save WebP q≈82, then update the manifest's dimensions. Use the most landscape photo for wide banners.

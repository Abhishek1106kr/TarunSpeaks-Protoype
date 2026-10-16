# CLAUDE.md — TarunSpeaks

## Project mission

Build and maintain the TarunSpeaks website as a premium, trustworthy, conversion-focused B2B platform for corporate training, consulting, and AI capability building.

Primary audiences:
- CHROs and HR leaders
- Founders, CEOs, and senior leadership
- Learning & Development and organisational capability leaders
- Business leaders exploring AI adoption, sales, marketing, and productivity

Help visitors understand the offer, trust the company, find the right service, and take a clear next step toward a qualified enquiry or consultation.

## Repository map and commands

- `nextjs/` — **the live site** (Next.js 16 App Router, TypeScript, Tailwind v4). All new work goes here. Read `nextjs/AGENTS.md` and the bundled docs in `nextjs/node_modules/next/dist/docs/` before using unfamiliar Next.js APIs.
  - `nextjs/data/` — every fact, figure, program, case study and client, each with a source comment. Pages import from here; never hard-code a figure in a component.
  - `nextjs/public/images/profile/` and `nextjs/public/images/clients/` — photography and client logos extracted from the company profile.
- Repo root (`src/`, `index.html`, `vite.config.ts`, root `vercel.json`) — the **legacy Vite site**. Root `vercel.json` still deploys it; to ship `nextjs/`, set the Vercel project's Root Directory to `nextjs`.
- `Company Profile - TarunSpeaks '26 (2).pdf` — primary source of truth (cite as "profile p.N").
- `UX.md` — the conversion brief the site is built against.
- `.claude/skills/` — project skills (brand-system, frontend-design, b2b-conversion, enquiry-ux, analytics-measurement, motion-design, journey-animation, case-study-design, responsive-accessibility, seo-performance, visual-qa).

Commands (run in `nextjs/` unless noted):
- `npx next dev -p 3100` — local development.
- `npx tsc --noEmit`, `npx eslint`, `npx next build` — type-check, lint, production build.
- From the repo root, against a running server: `MSYS_NO_PATHCONV=1 node .claude/skills/visual-qa/qa.mjs --base http://localhost:3100 --routes /,/programs --widths 1440,834,390` (screenshots, console/hydration/overflow) and `node .claude/skills/visual-qa/flows.mjs http://localhost:3100` (forms, menu, keyboard, reduced motion, redirects, SEO).

## Working principles

- Inspect the repository, existing routes, dependencies, design system, assets, and Git status before editing.
- Preserve existing user changes, working functionality, routes, approved content, pricing, and SEO.
- Improve the existing implementation; do not rebuild from scratch without a clear technical reason.
- Implement working changes rather than stopping at plans, mockups, or recommendations.
- Use available MCPs and project skills when useful. Never claim a tool was used if it was unavailable.
- Use Playwright or available browser automation to verify significant UI changes.
- Run available lint, type-check, tests, and build commands when practical. Report what was actually run and any failures.
- Do not commit, push, publish, or change repository settings unless explicitly authorised.
- Never overwrite unrelated user work.

## Brand and design direction

The current visual direction is black and rich blue.

Starting colour tokens:
- Black: #080B10
- Deep surface: #0D121B
- Elevated surface: #131B28
- Rich blue: #1749D1
- Blue accent: #2864F0
- Primary text: #F5F7FB
- Secondary text: #AAB5C7
- Border: #273246

Use these as design tokens and refine them only for a clear accessibility or design reason.

The identity should feel premium, editorial, human, executive-grade, clear, and credible. Use intentional typography, authentic photography, meaningful whitespace, varied layouts, and clear hierarchy.

Avoid generic AI-generated design patterns: repetitive card grids, blue glowing borders everywhere, gratuitous gradients or glassmorphism, floating decorative blobs, meaningless 3D, excessive pills and tiny uppercase labels, animation on every component, generic SaaS layouts, and vague marketing copy.

Do not add visual complexity to compensate for weak messaging.

## Conversion and UX priorities

Optimise for qualified business enquiries and consultation bookings, not merely clicks or visual novelty.

Every major page should make clear:
1. Who the offer is for.
2. What problem it addresses.
3. What the engagement includes.
4. What evidence supports the company's credibility.
5. What the visitor should do next.

Prioritise a clear first-viewport value proposition, distinct paths for corporate buyers and founders, easy service discovery, verified case studies and client proof, contextual CTAs, short accessible enquiry forms, real submission and booking flows, mobile usability, and analytics only where a real integration exists.

Do not use fake urgency, dark patterns, fabricated testimonials, invented outcomes, or false success messages. A CTA must lead somewhere real. A form must not claim success unless submission succeeded.

## Factual integrity

Use approved first-party material and existing official content as the source of truth.

Never invent client relationships or endorsements, logos, testimonials, awards, credentials, outcomes, ROI, program details, durations, prices, guarantees, booking availability, or response-time promises.

Company-profile figures that may be used only after verifying their source and wording include 29,000+ individuals trained, 2,300+ sessions, 300+ brands, 15+ industries, and 10+ years of experience.

Preserve client names and industry groupings supplied by the project owner. Use official, verified logo assets where available. If an asset cannot be verified, use a clearly identified typographic fallback rather than fabricating a logo.

- The company profile **reuses some photographs across different clients' pages**. Only caption a photo with a client if it appears on that client's pages and nowhere else; shared photos get neutral captions (see `nextjs/data/images.profile.ts`).
- Client logos come from the profile's "Our Clients" pages (pp. 9–12); the manifest is `nextjs/data/clients.ts`.

Protect confidential client information and do not publish private material without approval.

## Technical implementation

- Follow the installed framework, package manager, conventions, and supported dependency versions.
- Prefer server-rendered components by default and client-side code only when interaction requires it.
- Keep components maintainable and avoid unnecessary dependencies or abstractions.
- Preserve URLs and existing SEO value.
- Use appropriate metadata, canonical URLs, sitemap, robots configuration, and structured data only when truthful and supported.
- Optimise images, font loading, layout stability, performance, and accessibility.
- Respect keyboard navigation, visible focus, contrast, semantic HTML, and prefers-reduced-motion.
- Use animation tools only when available or clearly justified. Motion must support meaning and usability.
- Keep secrets out of source code and client bundles.

## MCPs and skills

Inspect available MCP servers and existing project-local skills before work. Use relevant tools such as Playwright, Figma, Context7, or GitHub only when connected, authorised, and useful.

Reuse and improve project skills where appropriate, for example: brand-system, frontend-design, b2b-conversion, motion-design, responsive-accessibility, seo-performance, and visual-qa.

Do not waste time creating documentation instead of implementing the task.

## Contribution and attribution policy — important

Do not include Claude, Claude Code, Anthropic, or the AI assistant as a contributor, author, co-author, maintainer, or credit in any project contribution.

Specifically:
- Do not add AI attribution to source files, documentation, README files, release notes, UI credits, or project metadata.
- Do not add a Co-authored-by trailer for Claude, Claude Code, Anthropic, or any AI system to commit messages.
- Do not create commits under an AI identity or change Git identity to an AI identity.
- Do not add the AI assistant to contributor lists, acknowledgements, author fields, or copyright notices.
- Do not claim a human performed work they did not perform. Preserve existing attribution and follow repository or organisation disclosure requirements.
- Do not commit or push unless the project owner explicitly requests it.

This means do not credit the AI as a project contributor; it does not authorise falsifying authorship, removing existing human credits, or bypassing applicable disclosure requirements.

## Definition of done

Before reporting completion:
1. Summarise changes actually implemented.
2. List routes and key components affected.
3. Report tests, browser checks, lint, type-check, and build results actually run.
4. Identify remaining blockers or integrations requiring access.
5. Confirm no commit or push was performed unless explicitly authorised.

Be direct and factual. Do not claim unverified work is complete.

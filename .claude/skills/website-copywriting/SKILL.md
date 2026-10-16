---
name: website-copywriting
description: Use when writing or rewriting TarunSpeaks website copy — hero headlines, section titles, body copy, CTAs, page narratives, case-study text, metadata. Runs the full workflow (audience and intent → messaging hierarchy → several genuinely different directions → chosen draft written for the layout → read-aloud revision → evidence/voice/SEO/conversion check). Proposes copy for review; does not replace live content until approved.
---

# Website copywriting — TarunSpeaks

Combines three tools already in this repo: **copywriting** (Harry Dry's concrete / falsifiable / ownable test), **ogilvy** (positioning, headlines that promise a benefit), and **brand-voice** (whose voice speaks). Facts come only from `nextjs/data/` and the sources in the brand-system skill.

## Workflow (follow in order, show your work)

1. **Audience and intent.** Name the reader (CHRO, L&D head, founder, sales leader, event organiser), what they arrived wanting to know, and what they should do next. One line each.
2. **Messaging hierarchy** before any sentence:
   - *One* primary message (what this page must make the reader believe).
   - Up to three supporting points, each tied to evidence in `nextjs/data/`.
   - The proof to show, and where.
   - The single action, and the CTA label.
3. **Directions, not rewordings.** Write at least three headline directions that take *different angles*, e.g.:
   - **Outcome** — what changes for the team.
   - **Contrast** — the approach vs. the usual approach (training that stays in the room vs. work that changes).
   - **Proof-led** — lead with a documented fact.
   - **Voice-led** — a line only Tarun/TarunSpeaks could say, from his stated beliefs.
   Run each through the copywriting test: can you see it, can you check it, could a competitor sign it? Pick one and explain why in two or three sentences.
4. **Write for the layout.** Check the component before writing:
   - Hero headline (`.t-display`): ≤ 60 characters, wraps to 2–3 lines at 1440px.
   - Hero lead: ≤ 45 words. Section title (`.t-h2`): ≤ 10 words. Kicker: 2–5 words, sentence case.
   - CTA: verb-first, 2–4 words, says what happens ("Discuss Your Requirements", "Request a speaker").
   - Meta description: 140–160 characters, includes the page's search intent.
5. **Read it aloud (mentally).** Rewrite anything you wouldn't say to a CHRO across a table.
6. **Cut.** Delete every sentence that adds no meaning, evidence, emotion or direction (the paragraph test: remove it — does the paragraph still work?).
7. **Check before handing over** — evidence (every factual claim cited to a file/page), voice (brand-voice), SEO intent (title/H1/meta still match the query), conversion (one clear next step; b2b-conversion-copy).

## Output format for proposals

For each block: **Existing copy → Proposed copy → Why it's stronger → Evidence for each claim → Remaining weaknesses.** Save reviews under `docs/copy-review/`. Apply to the site only after a human approves.

## Rules

- No generic AI/SaaS hero formula ("The all-in-one platform to…", "Empower your teams to unlock…").
- Banned unless a specific context justifies them: unlock your potential, transform your business, in today's rapidly evolving world, cutting-edge solutions, take it to the next level, seamless, robust, leverage (as a verb), holistic, synergy, game-changer.
- Never fabricate outcomes, testimonials, statistics, credentials, quotations or stories. If a stronger line needs a fact we don't have, write the line with `[NEEDS SOURCE: …]` and flag it.
- Vary rhythm on purpose; don't make every paragraph three polished sentences.
- Human ≠ slang, forced humour, deliberate errors or performed emotion.
- Preserve facts, URLs, SEO metadata and working functionality.
- Where a vendored skill (copywriting, ogilvy, copy-editing, page-cro) suggests guarantees, risk reversal, urgency or invented proof, the TarunSpeaks rules win.

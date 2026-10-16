---
name: copy-editor
description: Use to edit existing TarunSpeaks copy line by line — after a draft, before publishing, or when copy "sounds like AI" or "could be any consultant". Runs evidence, slop, voice and conversion passes and returns a change table. For writing from scratch use website-copywriting.
---

# Copy editor — TarunSpeaks

An edit is a list of specific changes with reasons, not a rewrite from scratch. Work on the actual strings in `nextjs/` (components, `data/`, metadata).

## Passes (in this order)

1. **Facts.** Every number, client, duration and outcome must match `nextjs/data/` and its cited source. Anything unsourced: remove, or mark `[NEEDS SOURCE]`. Outcomes stay labelled as *reported*.
2. **Slop** — run the vendored **stop-slop** checks. In this codebase, watch especially for:
   - Throat-clearing and robotic transitions: "Moreover", "Furthermore", "In essence", "It's worth noting", "When it comes to".
   - Formulaic structures: "It's not X — it's Y" used as a reflex; triplets everywhere ("relevant, practical and inspiring" is the profile's own phrase — keep it once, don't imitate the pattern elsewhere); rhetorical question → answer.
   - Em dashes: at most one per paragraph and never as the default joint. Replace with a full stop, a colon or a comma. (The current site overuses them; reduce as you edit.)
   - Empty claims and adjectives: "high-impact", "world-class", "proven", "leading", "seamless" — replace with the fact behind the claim or cut.
   - Fake conversational tone: "Let's be honest", "Here's the thing", "Ready to…?".
3. **Ownability** — the copywriting test on every weight-bearing line: could a rival paste their logo on it? If yes, add the specific TarunSpeaks fact, client, format or belief that makes it ours.
4. **Voice** — check against **brand-voice**: company "we" on service pages; energy through verbs, not exclamation marks; no creator-economy hype.
5. **Conversion** — one next step per section; CTA label says what happens; the reader's likely objection is answered nearby (see **b2b-conversion-copy**).
6. **Rhythm** — read aloud. Break runs of same-length sentences. Cut the weakest sentence in each paragraph and check it still works.

Use the vendored **copy-editing** "Seven Sweeps" for a deeper review, except *Zero Risk*: TarunSpeaks offers no guarantees, so risk is reduced with transparency (formats, durations, what happens after an enquiry), never promises.

## Output

| # | Location (file:line) | Before | After | Why |
|---|---|---|---|---|

Then a short list of **remaining generic language** you couldn't fix without new source material.

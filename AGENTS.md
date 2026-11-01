# AGENTS.md — TarunSpeaks

Read `CLAUDE.md` at the repo root in full before doing anything else. It is the
single source of truth for this project (mission, repo map, working
principles, brand direction, factual-integrity rules, and the contribution
and attribution policy) and applies to every agent working in this repo, not
only Claude.

A few rules worth repeating here since they are easy to miss:

- `nextjs/` is the live site. All new work goes there. `src/` at the repo
  root is the legacy Vite app; do not touch it. Root `vercel.json` still
  deploys that legacy app, so it's a separate concern from `nextjs/`.
- Read `nextjs/AGENTS.md` before using any Next.js API you're not certain of —
  this project pins a version with breaking changes from older training data.
- Never fabricate client names, logos, testimonials, figures, or outcomes.
  Company-profile stats may only be used after verifying source and wording;
  `nextjs/data/` holds the sourced facts components must import from.
- Do not add any AI attribution (contributor, co-author, commit trailer,
  credits) anywhere in this repo. Do not commit or push unless explicitly
  authorised by the project owner.
- Verify changes with real output: `npx tsc --noEmit`, `npx eslint .`, and
  the scripts in `.claude/skills/visual-qa/` from `nextjs/` and the repo root
  respectively. Do not report work as done without having actually run them.

End every task the same way CLAUDE.md's "Definition of done" describes:
summarise what changed, what was verified and how, what's left, and confirm
no commit/push happened unless the project owner asked for it.

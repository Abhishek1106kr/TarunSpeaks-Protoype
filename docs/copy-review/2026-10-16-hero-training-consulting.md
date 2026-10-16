# Copy review — homepage hero, corporate training, consulting

Status: **proposal for human review. Nothing here is live.** Apply only after Tarun/the team approves.
Method: `.claude/skills/website-copywriting` (workflow), `copywriting` (concrete / falsifiable / ownable), `brand-voice`, `b2b-conversion-copy`, edited with `copy-editor` + `stop-slop`.
Sources: company profile (cited "p.N"), tarunmakhija.in (homepage export, journey article, corporate-training page), `nextjs/data/`.

---

## 1. Homepage hero — `nextjs/components/home/Hero.tsx`

**Reader and intent.** A CHRO or founder arriving cold. They need, in five seconds: what this is, whether it's for organisations like theirs, why to believe it, what to click.

**Messaging hierarchy**
- Primary: TarunSpeaks trains corporate teams in AI, sales, marketing, personal branding and leadership, and builds in what happens after the session.
- Supports: (1) delivered at real scale; (2) follow-through is designed in (adoption plans, challenges, review cycles); (3) practitioner-led.
- Proof on screen: the four figures directly below.
- Action: Talk to TarunSpeaks (secondary: Explore Programs).

### Existing

> **Kicker:** Corporate training · Consulting · AI capability building
> **H1:** We build digital-first, confident, high-performing teams.
> **Lead:** TarunSpeaks is a corporate training and consulting company. We work with CHROs, founders and business leaders on AI tools, sales, marketing, personal branding and leadership — and help teams put new skills to work.

### Three directions

| Direction | Headline | Test (see / check / ownable) |
|---|---|---|
| A. Contrast | **Training that doesn't stop when the session ends.** | ✓ you can picture the session ending · ✓ checkable against adoption plans, #90DayChallenge, review cycles · ~ most L&D vendors *claim* this, few document it |
| B. Proof-led | **4,300 store staff in 42 cities. 3,000 entrepreneurs in 11.** | ✓ · ✓ · ✓ only TarunSpeaks has these engagements. Weak on *what we do*: it needs the lead to explain the offer |
| C. Voice-led | **Practical training your teams enjoy, and use.** | ~ "practical" is an adjective · ~ hard to check · ✓ "effective and enjoyable" is Tarun's own long-standing promise (old homepage) |

**Recommended: A.** It names the buyer's real fear (training that evaporates) and makes a promise the case studies can back. B is the most ownable line and works better as the evidence strip than as the headline: a CHRO has to decode it. C is the most "Tarun" but the least specific.

### Proposed

> **Kicker:** Corporate training · Consulting · AI capability building *(unchanged)*
> **H1:** Training that doesn't stop when the session ends.
> **Lead:** TarunSpeaks trains corporate teams in AI tools, sales, marketing, personal branding and leadership. Then we help the skills stick: adoption plans, 90-day challenges, review cycles. 29,000+ people trained across 300+ brands.
> **CTAs:** Talk to TarunSpeaks · Explore Programs *(unchanged)*

**Why it's stronger.** The old H1 is three adjectives from the profile ("digital-first, confident, high-performing"): accurate brand language, but nobody can picture it and any trainer could sign it. The new H1 states a difference and the lead immediately proves it with three named mechanisms. The lead loses the em dash and the second clause that buried the differentiator.

**Evidence**
| Claim | Source |
|---|---|
| Trains teams in AI tools, sales, marketing, personal branding, leadership | Flagship programs, profile pp.56–63 |
| Adoption plans | "Personalised AI adoption plan for each participant" — Nawany Group, profile p.19 |
| 90-day challenges | "Post-session #90DayChallenge to sustain momentum" — Motilal Oswal, profile p.40 |
| Review cycles | "Hands-on reviews and iterative improvement cycles" — NewTech, profile p.27 |
| 29,000+ trained, 300+ brands | Profile pp.6, 8 |

**Editorial critique.** "Doesn't stop when the session ends" is documented for three engagements, not all nine (Godrej was a 2-day intensive; keynotes are one session). **Needs Tarun's confirmation that follow-through is offered as standard**, otherwise soften to "Training built to outlast the session." "Help the skills stick" is slightly colloquial; acceptable in this voice.

---

## 2. Corporate training — `nextjs/app/corporate-training/page.tsx` (page intro)

**Reader and intent.** CHRO / L&D head comparing providers. They want: relevance to their roles, formats and duration, evidence at their scale.

**Messaging hierarchy**
- Primary: programs are designed around your roles and run at any scale.
- Supports: eight flagship programs plus custom modules; three formats, 3–30 hours; delivered from one room to 42 cities.
- Proof: Sansaar (42 cities), Motilal Oswal (11 cities), HDFC Bank (7 cities).
- Action: Discuss Your Requirements.

### Existing

> **Kicker:** For CHROs, L&D and business leaders
> **H1:** Corporate training that shows up in everyday work.
> **Lead:** Your teams are growing — the question is whether their skills are keeping up. We design practical programs around your roles and real scenarios, and deliver them anywhere from one room to 42 cities.

### Three directions

| Direction | Headline | Test |
|---|---|---|
| A. The buyer's question (brand line) | **Your company is growing. Is your team?** | ✓ · n/a (a question) · ✓ adapted from TarunSpeaks' own corporate-training headline "You Are Growing But Is Your Team Growing?" |
| B. Scale | **One room or 42 cities. Training built around your roles.** | ✓ · ✓ (Sansaar) · ✓ |
| C. Offer-specific | **Eight programs, 3 to 30 hours, built around the roles in the room.** | ✓ · ✓ · ~ reads like a spec sheet |

**Recommended: A as the H1, B's fact in the lead.** A is the company's existing, recognisable line, tightened, and it puts the CHRO's own worry in their own words. B's "one room or 42 cities" is the most concrete proof of scale, so it moves into the first sentence of the lead where it can be read with its source.

### Proposed

> **Kicker:** For CHROs, L&D and business leaders *(unchanged)*
> **H1:** Your company is growing. Is your team?
> **Lead:** We build programs around your roles and real scenarios: AI tools, AI for sales, leadership, personal branding, communication. Run them as a workshop, a masterclass or a full learning journey, in one room or across 42 cities.

**Why it's stronger.** The old H1 ("shows up in everyday work") is fine but abstract. The new H1 is a line TarunSpeaks already owns. The lead swaps "practical programs" (an adjective) for the named programs and the three named formats, and drops the em dash.

**Evidence**
| Claim | Source |
|---|---|
| "You Are Growing But Is Your Team Growing?" | tarunmakhija.in/corporate-training (headline) |
| Named programs | Profile pp.56–63 |
| Workshop / masterclass / full learning journey | Profile p.65 |
| 42 cities | Sansaar by D'Decor, profile pp.34–35 |

**Editorial critique.** "Real scenarios" is close to generic; it's supported ("energy-filled, practical workshops with real scenarios", p.36) but could be replaced by a specific scenario if Tarun has a favourite example. The question H1 depends on the lead answering it immediately, which it does.

---

## 3. Consulting — `nextjs/app/consulting/page.tsx` (page intro)

**Reader and intent.** A founder or business leader who wants advice or hands-on help, especially with AI. They need to know what kind of help, from whom, and whether it's training dressed up as consulting.

**Messaging hierarchy**
- Primary: consulting from a practitioner, on growth, brand and AI, and clear about what kind of help you're buying.
- Supports: Big Mouth Digital & Media (750+ campaigns); six consulting areas; AI tools and agent deployment; training and implementation combined when needed.
- Proof: Nawany (AI adoption plan), NewTech (3-month engagement).
- Action: Request a Consultation.

### Existing

> **Kicker:** For founders and business leaders
> **H1:** From learning to organisational execution.
> **Lead:** Training builds the skill. Advisory sets the direction. Implementation support changes how the work gets done. We are clear about which one you are buying — and often combine them.

### Three directions

| Direction | Headline | Test |
|---|---|---|
| A. Practitioner proof | **Consulting from a founder who has run 750+ campaigns.** | ✓ · ✓ (journey article) · ✓ |
| B. Founder's problem (AI) | **You bought the AI tools. Now get your team using them.** | ✓ · n/a (scenario) · ~ any AI consultancy could say it |
| C. Scope clarity | **Advice on growth, brand and AI, with the training to make it stick.** | ~ · ~ · ~ |

**Recommended: A.** The old H1 fails all three tests ("organisational execution" is jargon you can't picture). A is the only option a competitor couldn't sign, and it answers the founder's first question: who is advising me? B is the strongest *section* headline for the AI part of the page (`#areas`, AI group). C explains the offer but proves nothing.

### Proposed

> **Kicker:** For founders and business leaders *(unchanged)*
> **H1:** Consulting from a founder who has run 750+ campaigns.
> **Lead:** We advise on branding, digital marketing, business growth and AI, and we help put the advice to work: deploying AI tools and agents, mapping workflows, setting each person up with a plan. Training, advisory or implementation: we'll say which one you're buying.
> **Section H2 (AI areas):** You bought the AI tools. Now get your team using them.

**Why it's stronger.** It replaces an abstract promise with a checkable credential and keeps the old lead's best idea (honesty about the type of engagement) in one sentence instead of a four-beat formula.

**Evidence**
| Claim | Source |
|---|---|
| 750+ campaigns | "Executed 750+ successful digital marketing campaigns globally" — journey article (Big Mouth Digital & Media years) |
| Branding, digital marketing, business growth, AI | "What we consult on", profile p.13 |
| Deploying AI tools and agents | "AI tools/agent deployment", profile p.13 |
| Mapping workflows | "Introduction to AI Agents & Automation for real workflow mapping" — Nawany, p.19 |
| A plan for each person | "Personalised AI adoption plan for each participant" — Nawany, p.19 |

**Editorial critique.** The 750+ campaigns were run at Big Mouth Digital & Media, not TarunSpeaks. "A founder who has run" is accurate (Tarun co-founded it), but **confirm Tarun is comfortable leading the consulting page with agency-era work.** "Put the advice to work" is a mild cliché; keep only if nothing more specific is available.

---

## Pages still needing human review

- **All of the above** — approval before applying.
- **Homepage, "Three ways to work with us"** — written before the editorial skills existed; run `copy-editor` (em dashes, "practical" repetition).
- **/about** — principles text ("Relevant / Practical / Inspiring" explanations) is our paraphrase of the profile's three words; Tarun should confirm it reflects how he teaches.
- **FAQ "What happens after we submit an enquiry?"** — describes a process we inferred, not one the business has documented. Confirm.
- **Keynote takeaways (/speaking)** — each takeaway line is our summary of the topic; confirm with Tarun.
- **Founder section (homepage)** — "he still delivers them himself": confirm this is true for all programs.

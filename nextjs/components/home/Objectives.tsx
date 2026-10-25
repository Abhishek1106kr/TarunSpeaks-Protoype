import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

// "Choose your objective" (UX.md §3): five real offers, phrased as the buyer's goal. Each goes to the page
// that answers it, with a direct route to an enquiry pre-set to the right interest. No quiz, no scoring.
const objectives = [
  { goal: 'Build AI capability across my organisation', who: 'CHROs · L&D · founders', page: '/programs#ai-tools-for-productivity-and-marketing', pageLabel: 'AI programs', interest: 'ai' },
  { goal: 'Improve sales or marketing capability', who: 'Sales & marketing leaders', page: '/programs#ai-tools-training-for-sales-teams', pageLabel: 'Sales & marketing programs', interest: 'training' },
  { goal: 'Explore corporate training and workshops', who: 'CHROs · L&D leaders', page: '/corporate-training', pageLabel: 'Corporate training', interest: 'training' },
  { goal: 'Discuss consulting or implementation', who: 'Founders · business leaders', page: '/consulting', pageLabel: 'Consulting & AI', interest: 'consulting' },
  { goal: 'Book a keynote or speaking engagement', who: 'Event organisers', page: '/speaking', pageLabel: 'Keynotes', interest: 'keynote' },
]

export function Objectives() {
  return (
    <section aria-labelledby="objectives-title" className="section-y border-t border-line-soft">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeader id="objectives-title" eyebrow="Start with your objective" title="What do you need to achieve?" lead="Pick the closest match. You’ll see the relevant programs and evidence, or go straight to a conversation." />
        </div>
        <ul className="lg:col-span-8">
          {objectives.map((objective) => (
            <li key={objective.goal} className="group relative grid gap-3 border-t border-line py-6 last:border-b sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
              <div>
                <Link href={objective.page} data-track="objective_selected" data-track-location={objective.interest} className="font-serif text-[clamp(1.45rem,2.3vw,1.95rem)] leading-[1.15] tracking-[-0.015em] decoration-brand-bright decoration-2 underline-offset-[0.2em] after:absolute after:inset-0 group-hover:underline">
                  {objective.goal}
                </Link>
                <p className="t-meta mt-1.5">{objective.who} · {objective.pageLabel}</p>
              </div>
              <div className="relative z-10 flex items-center gap-5">
                <Link href={`/contact?interest=${objective.interest}`} className="inline-flex min-h-11 items-center text-[0.92rem] text-fg-2 underline decoration-line underline-offset-4 hover:text-fg hover:decoration-brand-bright">Discuss directly</Link>
                <ArrowRight aria-hidden="true" size={22} className="hidden text-brand-text transition-transform group-hover:translate-x-1 sm:block" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

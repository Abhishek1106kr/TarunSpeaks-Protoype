import Link from 'next/link'
import { deliveryTerms } from '../../data/programs'
import { SectionHeader } from '../ui/SectionHeader'

// Buyer question: "What does an engagement look like?" Four steps on one connecting line, each anchored
// to something an engagement actually did. Not a proprietary framework — just how the work runs.
export const deliverySteps = [
  {
    title: 'Scope',
    body: 'We start from your team, roles and goal, then set depth, team size and format.',
    proof: 'All programs are modular and customisable, from 3 to 30 hours.',
  },
  {
    title: 'Design',
    body: 'Modules are matched to real work: department-specific AI use cases, your sales motion, your brand story.',
    proof: 'Hands-on exercises for Sales, Marketing, Finance, HR and Operations. Nawany Group.',
    href: '/case-studies/nawany-group',
  },
  {
    title: 'Deliver',
    body: 'Practical, demo-led sessions with live reviews, role-play and real scenarios, in one room or across many cities.',
    proof: '200+ LinkedIn profiles optimised in-session. Motilal Oswal.',
    href: '/case-studies/motilal-oswal',
  },
  {
    title: 'Sustain',
    body: 'The work continues after the session: adoption plans, structured challenges and review cycles.',
    proof: 'A personalised AI adoption plan for each participant. Nawany Group.',
    href: '/case-studies/nawany-group',
  },
]

export function Delivery() {
  return (
    <section aria-labelledby="delivery-title" className="section-y">
      <div className="container-x">
        <SectionHeader
          id="delivery-title"
          eyebrow="How the work runs"
          title="From the session to the way people work"
          lead={<>Training is where most engagements start. What makes it stick is the design before and the follow-through after. Formats: {deliveryTerms.formats.join(', ').toLowerCase()}, {deliveryTerms.duration}.</>}
        />
        <ol className="relative mt-16 grid gap-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-10">
          {/* The connecting line (desktop): one rule the four steps hang from. */}
          <span aria-hidden="true" className="absolute top-[0.45rem] right-0 left-0 hidden h-px bg-line xl:block" />
          {deliverySteps.map((step, index) => (
            <li key={step.title} className="relative">
              <span aria-hidden="true" className="relative z-10 block size-[0.95rem] rounded-full border-2 border-brand-bright bg-canvas" />
              <p className="nums mt-6 font-serif text-[1.05rem] text-brand-text italic">Step {index + 1}</p>
              <h3 className="mt-1 font-serif text-[2rem] leading-none font-normal tracking-[-0.02em]">{step.title}</h3>
              <p className="t-body mt-4">{step.body}</p>
              <p className="mt-5 border-l-2 border-line pl-4 text-[0.92rem] leading-relaxed text-fg">
                {step.href ? <Link href={step.href} className="hover:text-brand-text">{step.proof}</Link> : step.proof}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

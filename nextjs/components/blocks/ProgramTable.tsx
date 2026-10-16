import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { programs } from '../../data/programs'

// The eight flagship programs as an index: number, title, the problem it addresses, who it's for,
// duration. Reads like a contents page — distinct offers you can compare at a glance.
// Works on the dark canvas and inside an .on-paper section.
export function ProgramTable({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <div>
      <div aria-hidden="true" className="t-label hidden grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,1.2fr)_minmax(0,0.8fr)_7rem] gap-6 border-b border-current/20 pb-3 opacity-70 lg:grid">
        <span>No.</span><span>Program</span><span>The problem it addresses</span><span>For</span><span className="text-right">Duration</span>
      </div>
      <ol>
        {programs.map((program, index) => (
          <li key={program.slug} className="group relative border-b border-line [.on-paper_&]:border-paper-line">
            <div className="grid gap-x-6 gap-y-2 py-6 lg:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,1.2fr)_minmax(0,0.8fr)_7rem] lg:items-baseline">
              <span className="nums font-serif text-[1.15rem] text-brand-text [.on-paper_&]:text-brand">{String(index + 1).padStart(2, '0')}</span>
              <Heading className="font-serif text-[1.45rem] leading-[1.15] font-normal tracking-[-0.015em]">
                <Link href={`/programs#${program.slug}`} className="decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline group-hover:decoration-brand-bright [.on-paper_&]:group-hover:decoration-brand">
                  {program.title}
                </Link>
              </Heading>
              <p className="text-[0.98rem] leading-relaxed text-fg-2 [.on-paper_&]:text-ink-2">{program.problem}</p>
              <p className="text-[0.92rem] leading-snug text-fg-2 [.on-paper_&]:text-ink-2"><span className="lg:hidden">For: </span>{program.audience}</p>
              <p className="nums flex items-center justify-between gap-3 text-[0.95rem] font-semibold lg:justify-end">
                {program.duration}
                <ArrowRight aria-hidden="true" size={17} className="text-brand-text transition-transform group-hover:translate-x-1 [.on-paper_&]:text-brand lg:hidden" />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

import Link from 'next/link'
import type { Program } from '../../data/programs'
import { Photo } from '../ui/Photo'

// Compact program summary: category, who it's for, duration — enough to tell programs apart at a glance.
export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-canvas transition-colors duration-300 hover:border-brand-bright/70">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo name={program.image} alt="" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw" className="size-full object-cover opacity-80 transition-[opacity,scale] duration-700 ease-editorial group-hover:scale-[1.03] group-hover:opacity-100" />
        <p className="chip absolute top-4 left-4">{program.category}</p>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="t-h3 text-[1.22rem]">
          <Link href={`/programs#${program.slug}`} className="after:absolute after:inset-0">{program.title}</Link>
        </h3>
        <p className="text-[0.93rem] leading-relaxed text-fg-2">{program.summary}</p>
        <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-line pt-4 text-[0.85rem]">
          <dt className="text-fg-3">For</dt><dd className="text-fg">{program.audience}</dd>
          <dt className="text-fg-3">Duration</dt><dd className="nums text-fg">{program.duration}</dd>
        </dl>
      </div>
    </article>
  )
}

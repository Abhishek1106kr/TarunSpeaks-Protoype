import type { CSSProperties } from 'react'

type MarqueeProps = { label: string; items: string[]; reverse?: boolean; duration?: number }

// Infinite typographic marquee. The second copy is aria-hidden; with reduced motion it becomes a wrapped list.
export function Marquee({ label, items, reverse = false, duration = 70 }: MarqueeProps) {
  return (
    <div
      className="marquee overflow-hidden py-2 [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      <div className={`marquee-track ${reverse ? 'marquee-track--reverse' : ''}`}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-label={copy ? undefined : label} aria-hidden={copy ? true : undefined} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item} className="flex items-center font-serif text-[clamp(1.85rem,3.6vw,3.1rem)] leading-none whitespace-nowrap">
                <span className="px-5 sm:px-8">{item}</span>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-highlight" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

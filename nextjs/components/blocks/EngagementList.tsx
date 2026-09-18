import type { Engagement } from '../../data/speaking'

export function EngagementList({ items, tone = 'light' }: { items: Engagement[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const border = dark ? 'border-light/15' : 'border-line'
  return (
    <ol data-reveal-group className={`border-t ${border}`}>
      {items.map((item, index) => (
        <li key={item.organisation} className={`grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-3 border-b py-6 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-x-8 ${border}`}>
          <span aria-hidden="true" className={`nums-lining font-serif text-[2.3rem] leading-none sm:text-[3rem] ${dark ? 'text-light' : 'text-accent'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-[1.55rem] leading-tight sm:text-[1.85rem]">{item.organisation}</h3>
            <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? 'text-light/75' : 'text-muted'}`}>{item.detail}</p>
          </div>
          {item.year && (
            <span className={`col-start-2 w-fit rounded-full px-3 py-1 text-xs sm:col-start-3 ${dark ? 'bg-light/10 text-light' : 'bg-secondary text-ink'}`}>
              {item.year}
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

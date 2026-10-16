import type { Stat } from '../../data/company'
import { formatNumber } from '../../lib/format'

// Figures presented as evidence: a ruled row of serif numerals, plain labels and a source line.
// Static on purpose — a number that has to count up before it can be read is decoration.
export function StatGrid({ stats, source, className = '' }: { stats: Stat[]; source?: string; className?: string }) {
  return (
    <figure className={className}>
      <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`flex flex-col gap-3 py-7 md:py-9 ${index % 2 ? 'pl-5 md:pl-8' : 'pr-5 md:pr-8'} md:px-8 md:first:pl-0 ${index ? 'md:border-l md:border-line' : ''} ${index > 1 ? 'border-t border-line md:border-t-0' : ''}`}>
            <dt className="order-2 max-w-[13rem] text-[0.98rem] leading-snug text-fg-2">{stat.label}</dt>
            <dd className="t-figure nums order-1">{formatNumber(stat.value)}{stat.suffix}</dd>
          </div>
        ))}
      </dl>
      {source && <figcaption className="t-meta border-t border-line pt-4">{source}</figcaption>}
    </figure>
  )
}

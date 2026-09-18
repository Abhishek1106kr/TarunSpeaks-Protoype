import type { Stat } from '../../data/stats'
import { formatNumber } from '../../lib/format'

// Renders the final figure (so it reads correctly without JS); useScrollAnimations counts up to it.
export function Counter({ stat, className = '' }: { stat: Stat; className?: string }) {
  return (
    <span className={`nums-lining ${className}`} data-counter={stat.value} data-suffix={stat.suffix ?? ''}>
      {formatNumber(stat.value)}{stat.suffix}
    </span>
  )
}

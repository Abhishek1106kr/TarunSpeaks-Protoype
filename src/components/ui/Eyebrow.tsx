import type { ReactNode } from 'react'

type Tone = 'accent' | 'accent-ink' | 'light' | 'muted'

const tones: Record<Tone, string> = {
  accent: 'text-accent',
  'accent-ink': 'text-accent-ink',
  light: 'text-light',
  muted: 'text-muted',
}

export function Eyebrow({ children, tone = 'accent', lined = true, className = '' }: { children: ReactNode; tone?: Tone; lined?: boolean; className?: string }) {
  return <p className={`eyebrow ${lined ? 'eyebrow--lined' : ''} ${tones[tone]} ${className}`}>{children}</p>
}

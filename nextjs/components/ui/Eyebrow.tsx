import type { ReactNode } from 'react'

// Section kicker: a short blue rule and a sentence-case label. Use it where a heading needs context,
// not as a reflex above every heading.
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`kicker ${className}`}>{children}</p>
}

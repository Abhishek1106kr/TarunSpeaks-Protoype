import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'quiet' | 'inverse'
type Size = 'md' | 'lg'

// `track` marks a conversion CTA: AnalyticsListener reports clicks as primary_cta_clicked with `track` as the location.
type Common = { children: ReactNode; variant?: Variant; size?: Size; arrow?: boolean; className?: string; track?: string }
type ButtonProps = Common & (
  | { to: string; href?: never; type?: never; onClick?: () => void; disabled?: never }
  | { href: string; to?: never; type?: never; onClick?: never; disabled?: never }
  | { type: 'button' | 'submit'; to?: never; href?: never; onClick?: () => void; disabled?: boolean }
)

// Primary = the one action per view (blue fill). Secondary = outlined. Quiet = text with arrow.
const variants: Record<Variant, string> = {
  primary: 'bg-brand text-fg hover:bg-brand-bright shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]',
  secondary: 'border border-line text-fg hover:border-fg-2 hover:bg-surface',
  quiet: 'text-fg underline decoration-brand-bright decoration-2 underline-offset-[0.4em] hover:text-brand-text',
  // For blue surfaces, where a blue fill would disappear.
  inverse: 'bg-fg text-canvas hover:bg-white',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-[0.92rem]',
  lg: 'min-h-13 px-6 text-[0.98rem]',
}

export function Button({ children, variant = 'primary', size = 'md', arrow = false, className = '', track, ...target }: ButtonProps) {
  const tracking = track ? { 'data-track': 'primary_cta_clicked', 'data-track-location': track } : {}
  const classes = `group inline-flex items-center justify-center gap-2.5 font-semibold tracking-[-0.005em] transition-[background-color,border-color,color] duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variant === 'quiet' ? 'min-h-11' : `rounded-[0.3rem] ${sizes[size]}`} ${variants[variant]} ${className}`
  const external = 'href' in target && target.href?.startsWith('http')
  const Icon = external ? ArrowUpRight : ArrowRight
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon aria-hidden="true" size={17} strokeWidth={2} className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5" />}
    </>
  )

  if ('to' in target && target.to) return <Link href={target.to} onClick={target.onClick} className={classes} {...tracking}>{content}</Link>
  if ('href' in target && target.href) {
    return (
      <a href={target.href} className={classes} {...tracking} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }
  return <button type={target.type} onClick={target.onClick} disabled={target.disabled} className={classes} {...tracking}>{content}</button>
}

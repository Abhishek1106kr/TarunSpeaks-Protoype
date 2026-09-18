import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'accent' | 'coral' | 'light' | 'dark' | 'outline'

type Common = { children: ReactNode; variant?: Variant; icon?: boolean; className?: string }
type ButtonProps = Common & (
  | { to: string; href?: never; type?: never; onClick?: () => void }
  | { href: string; to?: never; type?: never; onClick?: never }
  | { type: 'button' | 'submit'; to?: never; href?: never; onClick?: () => void }
)

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-light hover:bg-accent-ink',
  coral: 'bg-highlight text-ink hover:bg-[#ff7f50]',
  light: 'bg-light text-ink hover:bg-secondary',
  dark: 'bg-dark text-light hover:bg-accent-ink',
  outline: 'border border-line text-ink hover:border-ink',
}

const iconVariants: Record<Variant, string> = {
  accent: 'bg-light text-ink',
  coral: 'bg-dark text-light',
  light: 'bg-accent text-light',
  dark: 'bg-light text-ink',
  outline: 'bg-dark text-light',
}

export function Button({ children, variant = 'accent', icon = false, className = '', ...target }: ButtonProps) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full text-[0.94rem] font-medium tracking-tight transition-colors duration-300 ${icon ? 'py-1.5 pr-1.5 pl-6' : 'px-6 py-3'} ${variants[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span aria-hidden="true" className={`grid size-9 place-items-center rounded-full transition-transform duration-500 ease-editorial group-hover:rotate-45 ${iconVariants[variant]}`}>
          <ArrowUpRight size={17} strokeWidth={1.75} />
        </span>
      )}
    </>
  )

  if ('to' in target && target.to) return <Link href={target.to} onClick={target.onClick} className={classes}>{content}</Link>
  if ('href' in target && target.href) {
    const external = target.href.startsWith('http')
    return <a href={target.href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{content}</a>
  }
  return <button type={target.type} onClick={target.onClick} className={classes}>{content}</button>
}

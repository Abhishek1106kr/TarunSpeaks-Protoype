import type { ReactNode } from 'react'
import Link from 'next/link'
import { Eyebrow } from '../ui/Eyebrow'

type Crumb = { name: string; path: string }

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  lead: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  crumbs?: Crumb[]
}

// Inner-page opener: breadcrumb, kicker, serif headline, lead, actions — and an optional aside
// (usually a captioned photograph). Enters with CSS on first paint; nothing waits for hydration.
export function PageIntro({ eyebrow, title, lead, actions, aside, crumbs }: PageIntroProps) {
  return (
    <section className="border-b border-line-soft pt-[4.5rem]">
      <div className={`container-x grid gap-12 pt-12 pb-16 sm:pt-16 lg:pb-20 ${aside ? 'lg:grid-cols-12 lg:items-end lg:gap-10' : ''}`}>
        <div className={aside ? 'lg:col-span-7' : 'max-w-4xl'}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="enter t-meta mb-10">
              <ol className="flex flex-wrap items-center gap-2">
                {crumbs.map((crumb, index) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {index === crumbs.length - 1
                      ? <span aria-current="page" className="text-fg-2">{crumb.name}</span>
                      : <Link href={crumb.path} className="inline-flex min-h-8 items-center hover:text-fg">{crumb.name}</Link>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <Eyebrow className="enter mb-6">{eyebrow}</Eyebrow>
          <h1 className="t-h1 enter" style={{ '--enter-delay': '0.06s' } as React.CSSProperties}>{title}</h1>
          <div className="t-lead enter mt-7 max-w-2xl" style={{ '--enter-delay': '0.14s' } as React.CSSProperties}>{lead}</div>
          {actions && <div className="enter mt-9 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ '--enter-delay': '0.2s' } as React.CSSProperties}>{actions}</div>}
        </div>
        {aside && <div className="enter lg:col-span-5" style={{ '--enter-delay': '0.24s' } as React.CSSProperties}>{aside}</div>}
      </div>
    </section>
  )
}

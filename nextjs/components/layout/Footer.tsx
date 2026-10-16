import Link from 'next/link'
import { company, socials } from '../../data/company'
import { Logo } from './Logo'

type FooterLink = { label: string; to?: string; href?: string }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Work with us',
    links: [
      { label: 'Programs', to: '/programs' },
      { label: 'Corporate Training', to: '/corporate-training' },
      { label: 'Consulting & AI', to: '/consulting' },
      { label: 'Keynotes & Speaking', to: '/speaking' },
      { label: 'All services', to: '/services' },
    ],
  },
  {
    title: 'Evidence',
    links: [
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'About Tarun', to: '/about' },
      { label: 'Insights', to: '/insights' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Send an enquiry', to: '/contact' },
      { label: company.email.label, href: company.email.href },
      { label: company.phone.label, href: company.phone.href },
    ],
  },
  { title: 'Follow', links: socials },
]

function FooterAnchor({ link }: { link: FooterLink }) {
  const className = 'inline-flex min-h-10 items-center break-all text-fg-2 transition-colors hover:text-fg'
  if (link.to) return <Link href={link.to} className={className}>{link.label}</Link>
  const external = link.href!.startsWith('http')
  return (
    <a href={link.href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {link.label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-2">
      <div className="container-x grid gap-14 py-16 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-6">
          <Logo />
          <p className="t-body max-w-xs">{company.about}</p>
          <p className="t-signature text-[1.6rem] text-fg">
            Train<span className="text-brand-bright">.</span> Consult<span className="text-brand-bright">.</span> Empower<span className="text-brand-bright">.</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-[1fr_1fr_1.35fr_0.9fr]">
          {columns.map((column) => (
            <nav key={column.title} aria-label={`Footer — ${column.title}`}>
              <h2 className="t-label mb-3 font-sans text-fg-3">{column.title}</h2>
              <ul className="text-[0.93rem]">
                {column.links.map((link) => <li key={link.label}><FooterAnchor link={link} /></li>)}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="container-x flex flex-col gap-3 border-t border-line-soft py-6 text-[0.85rem] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} TarunSpeaks · Tarun Makhija. All rights reserved.</p>
        <ul className="flex gap-6">
          <li><FooterAnchor link={{ label: 'Privacy Policy', href: 'https://tarunmakhija.in/privacy-policy/' }} /></li>
          <li><FooterAnchor link={{ label: 'Refund Policy', href: 'https://tarunmakhija.in/refund_policy/' }} /></li>
        </ul>
      </div>
    </footer>
  )
}

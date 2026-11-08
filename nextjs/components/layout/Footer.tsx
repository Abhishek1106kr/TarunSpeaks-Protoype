import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { company, proofStats, socials } from '../../data/company'
import { Button } from '../ui/Button'
import { FooterEmailForm } from './FooterEmailForm'
import { Logo } from './Logo'

type FooterLink = { label: string; to?: string; href?: string }

const workLinks: FooterLink[] = [
  { label: 'Programs', to: '/programs' },
  { label: 'Corporate Training', to: '/corporate-training' },
  { label: 'Consulting & AI', to: '/consulting' },
  { label: 'Keynotes & Speaking', to: '/speaking' },
  { label: 'All services', to: '/services' },
]

const evidenceLinks: FooterLink[] = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About Tarun', to: '/about' },
  { label: 'Insights', to: '/insights' },
]

function FooterAnchor({ link }: { link: FooterLink }) {
  const className = 'inline-flex min-h-10 items-center whitespace-nowrap text-fg-2 transition-colors hover:text-fg'
  if (link.to) return <Link href={link.to} className={className}>{link.label}</Link>
  const external = link.href!.startsWith('http')
  return (
    <a href={link.href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {link.label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

function FooterNav({ label, links, noWrapFrom1440 = false }: { label: string; links: FooterLink[]; noWrapFrom1440?: boolean }) {
  return (
    <nav aria-label={`Footer: ${label}`}>
      <ul className={`flex flex-wrap gap-x-6 gap-y-0${noWrapFrom1440 ? ' min-[1440px]:flex-nowrap' : ''}`}>
        {links.map((link) => <li key={link.label}><FooterAnchor link={link} /></li>)}
      </ul>
    </nav>
  )
}

export function Footer() {
  const proof = proofStats[0]

  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas pb-24">
      <div className="container-x relative z-10 grid gap-4 py-8 md:gap-6 md:py-12 xl:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]">
        <div className="relative min-h-[20rem] overflow-hidden rounded-[1.25rem] border border-line bg-brand-deep md:rounded-none md:border-0 md:bg-transparent">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden size-full md:block" preserveAspectRatio="none" viewBox="0 0 720 318">
            <defs>
              <linearGradient id="footer-brand-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: 'var(--color-brand-deep)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--color-canvas-2)' }} />
              </linearGradient>
            </defs>
            <path d="M28 1h528c9 0 17 4 24 11l137 129c3 3 3 7 0 10L580 280c-7 7-15 11-24 11H28c-15 0-27-12-27-27V28C1 13 13 1 28 1Z" fill="url(#footer-brand-gradient)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="relative flex min-h-[20rem] flex-col items-start gap-6 rounded-[1.25rem] p-7 pr-7 md:pr-[26%] lg:p-10 lg:pr-[26%]">
            <Logo />
            <p className="font-primary text-[clamp(2.05rem,3.55vw,3.3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">{company.signature.join('. ')}.</p>
            <p className="t-body max-w-md">{company.about}</p>
            <Button to="/contact" track="footer" arrow>Enquire Now</Button>
          </div>
          <div className="absolute right-[12%] bottom-7 hidden size-28 flex-col items-center justify-center rounded-full border border-line bg-canvas text-center xl:flex">
            <span className="nums font-primary text-[1.3rem] font-medium leading-none">{proof.value.toLocaleString('en-IN')}{proof.suffix}</span>
            <span className="mt-2 max-w-20 text-[0.7rem] leading-tight text-fg-2">{proof.label}</span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.25rem] border border-line bg-canvas-2 p-6 lg:p-8">
            <FooterEmailForm />
          </div>
          <div className="grid gap-y-2 rounded-[1.25rem] border border-line bg-canvas-2 p-5 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">Contact</span>
              <Link href="/contact" className="inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap font-semibold text-fg transition-colors hover:text-brand-text">
                Send an enquiry
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-0">
              <a href={company.email.href} className="inline-flex min-w-0 max-w-full shrink items-center gap-2 whitespace-nowrap text-[0.9rem] text-fg-2 transition-colors hover:text-fg sm:text-base">
                <Mail size={16} className="shrink-0" aria-hidden="true" />
                <span>{company.email.label}</span>
              </a>
              <a href={company.phone.href} className="inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap text-fg-2 transition-colors hover:text-fg">
                <Phone size={16} aria-hidden="true" />
                {company.phone.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-5 border-t border-line-soft py-6 md:flex-row md:items-start md:justify-between min-[1440px]:grid min-[1440px]:grid-cols-[minmax(0,1fr)_max-content] min-[1440px]:gap-x-10">
          <div className="min-w-0 flex flex-wrap gap-x-6 gap-y-0">
            <FooterNav label="Work with us" links={workLinks} noWrapFrom1440 />
          </div>
          <div className="min-w-0 flex flex-wrap gap-x-6 gap-y-0 min-[1440px]:flex-col min-[1440px]:items-end min-[1440px]:justify-self-end min-[1440px]:text-right">
            <FooterNav label="Evidence" links={evidenceLinks} />
            <FooterNav label="Follow" links={socials} />
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-3 rounded-[1.25rem] border border-line-soft bg-canvas-2 px-5 py-5 text-[0.85rem] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TarunSpeaks · Tarun Makhija. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-0">
            <li><FooterAnchor link={{ label: 'Sitemap', href: '/sitemap.xml' }} /></li>
            <li><FooterAnchor link={{ label: 'Privacy Policy', href: 'https://tarunmakhija.in/privacy-policy/' }} /></li>
            <li><FooterAnchor link={{ label: 'Refund Policy', href: 'https://tarunmakhija.in/refund_policy/' }} /></li>
          </ul>
        </div>
      </div>

      <Image src="/images/festive/diwali-mandala-v2.webp" alt="" width={1080} height={345} sizes="100vw" aria-hidden="true" className="festive-only festive-only-block pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl select-none opacity-60" />
    </footer>
  )
}

import { Link } from 'react-router'
import { site, socials } from '../../data/site'
import { NewsletterForm } from '../blocks/NewsletterForm'
import { Img } from '../ui/Img'

type FooterLink = { label: string; to?: string; href?: string }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Pages',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Speaking', to: '/speaking' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Consultation', to: '/services#consultation' },
      { label: 'Corporate Training', to: '/services#training' },
      { label: 'Public Speaking', to: '/speaking' },
      { label: 'Career Consultation', to: '/services#career' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Email the team', href: site.email.href },
      { label: 'Call +91 97702 23646', href: site.phone.href },
      { label: 'Digital Marketing Course', href: 'https://tarunmakhija.in/digital-marketing-course-copy/' },
    ],
  },
  { title: 'Follow', links: socials },
]

function FooterAnchor({ link }: { link: FooterLink }) {
  const className = 'inline-block py-1 transition-colors hover:text-accent'
  if (link.to) return <Link to={link.to} className={className}>{link.label}</Link>
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
    <footer className="bg-secondary pt-2 pb-5">
      <div className="container-x">
        <div className="grid gap-10 rounded-[2rem] bg-light p-5 sm:p-8 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-14">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary sm:aspect-[16/10] lg:aspect-[4/5]">
            <Img name="tarun-portrait" alt="Tarun Makhija" sizes="(min-width: 1024px) 19rem, 90vw" className="size-full object-cover object-top" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/85 to-transparent p-6 pt-16 font-medium leading-snug text-light">
              Digital marketing consultant, corporate trainer, public speaker &amp; mentor.
            </figcaption>
          </figure>

          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {columns.map((column) => (
                <nav key={column.title} aria-label={`Footer — ${column.title}`}>
                  <h2 className="mb-4 font-sans text-[0.95rem] font-medium tracking-normal text-accent">{column.title}</h2>
                  <ul className="space-y-1.5 text-[0.95rem]">
                    {column.links.map((link) => <li key={link.label}><FooterAnchor link={link} /></li>)}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="grid gap-5 border-t border-line pt-8 sm:grid-cols-[1fr_1.1fr] sm:items-end lg:mt-auto">
              <div>
                <h2 className="mb-2 font-sans text-[0.95rem] font-medium tracking-normal text-accent">Newsletter</h2>
                <p className="max-w-xs text-[0.92rem] leading-relaxed text-muted">
                  Digital marketing, personal branding and content creation — with a tinge of positivity.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-6 text-[0.9rem] sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
            <p>© {new Date().getFullYear()} Tarun Makhija. All rights reserved.</p>
            <ul className="flex gap-6">
              <li><FooterAnchor link={{ label: 'Privacy Policy', href: 'https://tarunmakhija.in/privacy-policy/' }} /></li>
              <li><FooterAnchor link={{ label: 'Refund Policy', href: 'https://tarunmakhija.in/refund_policy/' }} /></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

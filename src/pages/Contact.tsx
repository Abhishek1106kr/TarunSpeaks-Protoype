import { useRef } from 'react'
import { AtSign, Mail, Phone } from 'lucide-react'
import { useScrollAnimations } from '../animation/useScrollAnimations'
import { ContactForm } from '../components/blocks/ContactForm'
import { FaqList } from '../components/blocks/FaqList'
import { Img } from '../components/ui/Img'
import { SectionHeading } from '../components/ui/SectionHeading'
import { site, socials } from '../data/site'

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimations(ref)

  return (
    <div ref={ref}>
      <title>Contact — Tarun Makhija</title>

      <section aria-labelledby="contact-title" className="bg-secondary pt-28 pb-20 sm:pt-32 lg:pb-28">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-image-reveal className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-dark">
            <Img name="tarun-portrait" alt="Portrait of Tarun Makhija" priority sizes="(min-width: 1024px) 34vw, 100vw" className="absolute inset-0 size-full object-cover object-top" />
            <div className="on-dark absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark via-dark/75 to-transparent p-7 pt-28 text-light sm:p-9 sm:pt-32">
              <p className="eyebrow">Let’s connect</p>
              <p className="mt-4 font-serif text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight">25,000+ individuals trained, 1,600+ sessions and 297+ brands.</p>
            </div>
          </div>

          <div>
            <h1 id="contact-title" data-split="immediate" className="display-lg">Get in touch</h1>
            <p data-reveal className="mt-5 max-w-lg leading-relaxed text-ink/80">
              Tell us about your business, team or event, and we’ll find the right way to work together.
            </p>
            <div data-reveal className="mt-10"><ContactForm /></div>
          </div>
        </div>
      </section>

      <section aria-label="Contact details" className="pt-16 sm:pt-20">
        <ul data-reveal-group className="container-x grid gap-5 md:grid-cols-3">
          <li className="rounded-card border border-line bg-light p-7">
            <Mail aria-hidden="true" className="text-accent" />
            <h2 className="mt-6 font-sans text-[0.75rem] font-medium tracking-[0.16em] text-muted uppercase">Email</h2>
            <a href={site.email.href} className="mt-2 inline-block font-serif text-[1.55rem] break-all hover:text-accent">{site.email.label}</a>
          </li>
          <li className="rounded-card border border-line bg-light p-7">
            <Phone aria-hidden="true" className="text-accent" />
            <h2 className="mt-6 font-sans text-[0.75rem] font-medium tracking-[0.16em] text-muted uppercase">Phone</h2>
            <a href={site.phone.href} className="mt-2 inline-block font-serif text-[1.55rem] hover:text-accent">{site.phone.label}</a>
          </li>
          <li className="rounded-card border border-line bg-light p-7">
            <AtSign aria-hidden="true" className="text-accent" />
            <h2 className="mt-6 font-sans text-[0.75rem] font-medium tracking-[0.16em] text-muted uppercase">Social</h2>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {socials.map((social) => (
                <li key={social.label}><a href={social.href} target="_blank" rel="noreferrer" className="inline-block py-1 font-serif text-[1.3rem] hover:text-accent">{social.label}</a></li>
              ))}
            </ul>
          </li>
        </ul>
      </section>

      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="faq-title" title="Frequently asked questions" />
          <div className="mx-auto mt-14 max-w-3xl"><FaqList /></div>
        </div>
      </section>
    </div>
  )
}

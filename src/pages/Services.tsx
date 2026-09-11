import { useRef } from 'react'
import { Check } from 'lucide-react'
import { Link } from 'react-router'
import { useScrollAnimations } from '../animation/useScrollAnimations'
import { PageHero } from '../components/sections/PageHero'
import { Button } from '../components/ui/Button'
import { Img } from '../components/ui/Img'
import { consultationProcess, serviceHref, services } from '../data/services'
import { testimonials } from '../data/testimonials'

const quoteFor: Record<string, string> = { consultation: 'Alan Paul', training: 'Aditya Singh' }

function PullQuote({ name }: { name: string }) {
  const testimonial = testimonials.find((item) => item.name === name)
  if (!testimonial) return null
  return (
    <figure data-reveal className="mx-auto mt-20 max-w-3xl text-center">
      <blockquote className="font-serif text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.2] italic"><p>“{testimonial.quote}”</p></blockquote>
      <figcaption className="mt-6 text-[0.95rem]">— {testimonial.name}</figcaption>
    </figure>
  )
}

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimations(ref)

  return (
    <div ref={ref}>
      <title>Services — Tarun Makhija</title>
      <PageHero
        eyebrow="Services"
        title={<>Ways to <em>work together</em></>}
        lead="Digital marketing consultation, corporate training, public speaking and career consultation — practical sessions built around your context."
      >
        <nav aria-label="Services on this page" data-reveal data-delay="0.45" className="mt-10 flex flex-wrap justify-center gap-2">
          {services.map((service) => (
            <Link key={service.slug} to={serviceHref(service.slug)} className="rounded-full border border-line px-4 py-2.5 text-[0.9rem] transition-colors hover:border-ink">
              {service.title}
            </Link>
          ))}
        </nav>
      </PageHero>

      {services.map((service, index) => {
        const alternate = index % 2 === 1
        return (
          <section key={service.slug} id={service.slug} aria-labelledby={`${service.slug}-title`} className={`section-y scroll-mt-20 ${alternate ? 'bg-secondary' : ''}`}>
            <div className="container-x">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div data-image-reveal className={`aspect-[4/3] overflow-hidden rounded-[2rem] bg-secondary ${alternate ? 'lg:order-2' : ''}`}>
                  <Img name={service.image} alt={service.imageAlt} sizes="(min-width: 1024px) 45vw, 100vw" className="size-full object-cover" />
                </div>
                <div>
                  <p data-reveal className={`eyebrow ${alternate ? 'text-accent-ink' : 'text-accent'}`}>{service.number} — Service</p>
                  <h2 id={`${service.slug}-title`} data-split className="display-lg mt-6">{service.title}</h2>
                  <p data-reveal className="mt-6 font-serif text-[clamp(1.4rem,2.1vw,1.75rem)] leading-snug">{service.summary}</p>
                  <p data-reveal className={`mt-5 leading-relaxed ${alternate ? 'text-ink/80' : 'text-muted'}`}>{service.description}</p>
                  <ul data-reveal-group className="mt-8 space-y-3">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-light"><Check size={13} aria-hidden="true" /></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal className="mt-10">
                    {service.slug === 'speaking'
                      ? <Button to="/speaking" icon>Explore speaking</Button>
                      : <Button to="/contact" icon>Enquire now</Button>}
                  </div>
                </div>
              </div>

              {service.slug === 'consultation' && (
                <div className="mt-20">
                  <h3 data-reveal className="text-center text-[clamp(2rem,3.4vw,2.9rem)]">How a consultation works</h3>
                  <ol data-reveal-group className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {consultationProcess.map((step) => (
                      <li key={step.number} className="bg-light p-7">
                        <span className="font-serif text-[2.6rem] leading-none text-accent">{step.number}</span>
                        <h4 className="mt-8 text-[1.55rem] leading-tight">{step.title}</h4>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {quoteFor[service.slug] && <PullQuote name={quoteFor[service.slug]} />}
            </div>
          </section>
        )
      })}
    </div>
  )
}

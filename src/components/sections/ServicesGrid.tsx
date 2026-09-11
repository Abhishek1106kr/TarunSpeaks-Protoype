import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { serviceHref, services } from '../../data/services'
import { Img } from '../ui/Img'
import { SectionHeading } from '../ui/SectionHeading'

export function ServicesGrid() {
  return (
    <section aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="services-title" title={<>Ways we can<br />work together</>} lead="From a focused consultation to a room full of people ready to grow — every engagement is practical and built around your context." />

        <ul data-reveal-group className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20">
          {services.map((service) => (
            <li key={service.slug}>
              <Link to={serviceHref(service.slug)} className="group flex h-full flex-col rounded-card border border-line bg-light p-5 transition-shadow duration-500 hover:shadow-[0_30px_70px_-40px_rgba(23,23,23,0.45)] sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-[0.9rem] text-light">{service.number}</span>
                  <h3 className="flex-1 text-[clamp(1.75rem,2.6vw,2.35rem)] leading-tight">{service.title}</h3>
                  <ArrowRight aria-hidden="true" className="shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5" />
                </div>
                <div className="mt-6 aspect-[16/10] overflow-hidden rounded-2xl bg-secondary">
                  <Img name={service.image} alt={service.imageAlt} sizes="(min-width: 768px) 45vw, 100vw" className="size-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-105" />
                </div>
                <p className="mt-6 leading-relaxed text-muted">{service.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

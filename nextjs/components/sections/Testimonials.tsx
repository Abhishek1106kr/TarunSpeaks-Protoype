import type { ReactNode } from 'react'
import { type Testimonial, testimonials } from '../../data/testimonials'
import { TestimonialCard } from '../blocks/TestimonialCard'
import { SectionHeading } from '../ui/SectionHeading'

type TestimonialsProps = { items?: Testimonial[]; title?: ReactNode; lead?: string }

export function Testimonials({ items = testimonials, title = <>Words from people<br />I’ve worked with</>, lead = 'Notes from learners, teams and founders after a session.' }: TestimonialsProps) {
  return (
    <section aria-labelledby="testimonials-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="testimonials-title" title={title} lead={lead} />
        <div data-reveal-group className="mt-16 columns-1 gap-5 md:columns-2 lg:mt-20 lg:columns-3">
          {items.map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} className="mb-5 break-inside-avoid" />)}
        </div>
      </div>
    </section>
  )
}

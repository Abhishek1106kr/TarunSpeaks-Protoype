import type { Testimonial } from '../../data/testimonials'
import { Img } from '../ui/Img'

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2)

export function TestimonialCard({ testimonial, className = '' }: { testimonial: Testimonial; className?: string }) {
  return (
    <figure className={`rounded-card bg-secondary p-7 sm:p-8 ${className}`}>
      <span aria-hidden="true" className="block h-9 font-serif text-[5.5rem] leading-[0.8] text-highlight">“</span>
      <blockquote className="mt-5 text-[1.02rem] leading-relaxed text-ink/85">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        {testimonial.avatar
          ? <Img name={testimonial.avatar} alt="" sizes="44px" className="size-11 rounded-full object-cover" />
          : <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-accent font-serif text-lg text-light">{initials(testimonial.name)}</span>}
        <span>
          <span className="block font-medium">{testimonial.name}</span>
          {testimonial.role && <span className="block text-[0.88rem] text-ink/70">{testimonial.role}</span>}
        </span>
      </figcaption>
    </figure>
  )
}

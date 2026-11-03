import type { Testimonial } from '../../data/testimonials'
import { Photo } from '../ui/Photo'

// Verbatim testimonial from tarunmakhija.in, set as a serif pull quote. Never edit the quote text.
export function Quote({ testimonial, size = 'md' }: { testimonial: Testimonial; size?: 'md' | 'lg' }) {
  return (
    <figure className="flex h-full flex-col">
      <blockquote className={`font-primary ${size === 'lg' ? 'text-[clamp(1.25rem,2.2vw,1.85rem)] leading-[1.25]' : 'text-[1.1rem] leading-[1.4]'} font-normal tracking-[-0.01em] text-fg`}>
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3 text-[0.95rem]">
        {testimonial.avatar && <Photo name={testimonial.avatar} alt="" tone="color" sizes="44px" className="size-11 rounded-full object-cover" />}
        <span>
          <span className="block font-semibold">{testimonial.name}</span>
          {testimonial.role && <span className="block text-fg-3">{testimonial.role}</span>}
        </span>
      </figcaption>
    </figure>
  )
}

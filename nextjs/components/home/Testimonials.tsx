import Link from 'next/link'
import type { Testimonial } from '../../data/testimonials'
import { testimonials } from '../../data/testimonials'
import { Photo } from '../ui/Photo'

const testimonialNames = ['Ram Raju', 'Aditya Singh', 'Shivani Sahay', 'Alan Paul', 'Ruchira Mangal'] as const

const selectedTestimonials = testimonialNames.map((name) => {
  const testimonial = testimonials.find((item) => item.name === name)
  if (!testimonial) throw new Error(`Missing testimonial: ${name}`)
  return testimonial
})

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return parts.length > 1 ? `${parts[0][0]}${parts.at(-1)?.[0]}` : parts[0][0]
}

function TestimonialCard({ testimonial, featured = false, className = '' }: { testimonial: Testimonial; featured?: boolean; className?: string }) {
  return (
    <figure className={`flex h-full flex-col justify-between rounded-[1.25rem] p-6 sm:p-7 ${featured ? 'bg-brand text-white' : 'border border-line bg-surface text-fg'} ${className}`}>
      <div>
        {testimonial.avatar ? (
          <Photo name={testimonial.avatar} alt="" tone="color" sizes="44px" className="size-11 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-fg/10 font-secondary text-sm font-semibold text-fg-2">
            {initials(testimonial.name)}
          </span>
        )}
        <blockquote className={`mt-5 font-primary font-normal ${featured ? 'text-[1.15rem] leading-[1.45] lg:text-[1.25rem]' : 'text-[1rem] leading-[1.55] sm:text-[1.05rem]'}`}>
          <p>“{testimonial.quote}”</p>
        </blockquote>
      </div>
      <figcaption className="mt-8">
        <span className="block font-secondary text-[0.95rem] font-semibold">{testimonial.name}</span>
        {testimonial.role && <span className={`block text-[0.9rem] ${featured ? 'text-white/80' : 'text-fg-3'}`}>{testimonial.role}</span>}
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const [featured, narrowTop, wideTop, wideBottom, narrowBottom] = selectedTestimonials

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between">
        <h2 id="voice-title" className="t-h2"><span className="text-fg-3">In participants’</span> <span className="text-fg">words</span></h2>
        <Link href="/case-studies" className="link-arrow">Read case studies</Link>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        <TestimonialCard testimonial={featured} featured className="md:col-span-2 lg:col-span-1 lg:row-span-2" />
        <TestimonialCard testimonial={narrowTop} className="lg:col-span-1" />
        <TestimonialCard testimonial={wideTop} className="lg:col-span-2" />
        <TestimonialCard testimonial={wideBottom} className="lg:col-span-2" />
        <TestimonialCard testimonial={narrowBottom} className="lg:col-span-1" />
      </div>
    </>
  )
}

import { credibilityStats } from '../../data/stats'
import { testimonials } from '../../data/testimonials'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { Eyebrow } from '../ui/Eyebrow'
import { Img } from '../ui/Img'

const cellBorders = ['', 'border-l pl-5 sm:pl-8', 'border-t lg:border-t-0 lg:border-l lg:pl-8', 'border-t border-l pl-5 sm:pl-8 lg:border-t-0']

export function Credibility() {
  const avatars = testimonials.flatMap((testimonial) => testimonial.avatar ? [testimonial.avatar] : [])

  return (
    <section aria-labelledby="credibility-title" className="section-y">
      <div className="container-x">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div data-reveal><Eyebrow className="mb-7">Trusted by 297+ brands</Eyebrow></div>
          <h2 id="credibility-title" data-split className="display-md">
            Let’s unlock your full potential in the digital world with strategies that are both effective and enjoyable.
          </h2>
          <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            <Button to="/contact" icon>Book a consultation</Button>
            <div className="flex items-center gap-3 text-left">
              <div className="flex -space-x-3">
                {avatars.map((avatar) => <Img key={avatar} name={avatar} alt="" sizes="44px" className="size-11 rounded-full border-2 border-bg object-cover" />)}
              </div>
              <p className="text-[0.9rem] leading-snug text-muted">Trusted by<br /><span className="font-medium text-ink">25,000+ learners</span></p>
            </div>
          </div>
        </div>

        <dl data-reveal-group className="mt-20 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {credibilityStats.map((stat, index) => (
            <div key={stat.label} className={`flex flex-col-reverse justify-end gap-4 border-line py-8 pr-3 ${cellBorders[index]}`}>
              <dt className="text-[0.72rem] tracking-[0.14em] text-muted uppercase">{stat.label}</dt>
              <dd className="font-serif text-[clamp(2.7rem,5.2vw,4.7rem)] leading-none"><Counter stat={stat} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

import { useLayoutEffect, useRef } from 'react'
import { Mic } from 'lucide-react'
import { Link } from 'react-router'
import { gsap, prefersReducedMotion } from '../../animation/gsap'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { Img } from '../ui/Img'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('[data-hero-portrait]', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' })
        .from('[data-hero-portrait] img', { scale: 1.3, duration: 2.2 }, '<')
        .from('[data-hero-fade]', { y: 28, autoAlpha: 0, stagger: 0.12 }, 0.55)
        .from('[data-hero-card]', { y: 50, autoAlpha: 0, duration: 1.4 }, 1.1)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-dark text-light">
      <div className="container-x grid items-center gap-14 pt-32 pb-14 lg:min-h-[100svh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-28 lg:pb-12">
        <div>
          <div data-hero-fade><Eyebrow tone="light" className="mb-8">Tarun Makhija</Eyebrow></div>
          <h1 id="hero-title" data-split="immediate" data-delay="0.35" className="display-xl">
            Consultant, Trainer &amp; <em className="text-highlight">Public Speaker</em>
          </h1>
          <p data-hero-fade className="mt-8 max-w-lg text-[1.08rem] leading-relaxed sm:text-[1.18rem]">
            With over a decade of experience, I’ve mentored more than 25,000 individuals in digital marketing, personal branding and content creation.
          </p>
          <div data-hero-fade className="mt-10 flex flex-wrap gap-3">
            <Button to="/contact" variant="light" icon>Book a call</Button>
            <Button to="/speaking" variant="coral">Invite me to speak</Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none lg:self-end">
          <div data-hero-portrait className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-accent/20">
            <Img name="tarun-portrait" alt="Portrait of Tarun Makhija" priority sizes="(min-width: 1024px) 38vw, 90vw" className="size-full object-cover object-top" />
          </div>

          <div data-hero-fade className="absolute bottom-8 -left-3 grid size-28 place-items-center rounded-full bg-light text-center text-ink sm:size-32 lg:hidden">
            <span>
              <span className="nums-lining block font-serif text-[2.4rem] leading-none">10+</span>
              <span className="mt-1 block text-[0.62rem] tracking-[0.14em] uppercase">years of<br />experience</span>
            </span>
          </div>

          <Link to="/speaking" data-hero-card className="group absolute bottom-10 -left-20 hidden w-[23rem] grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-3xl bg-light text-ink shadow-[0_30px_60px_-30px_rgba(23,23,23,0.5)] lg:grid xl:-left-28">
            <div className="overflow-hidden">
              <Img name="speaking-motilal" alt="" sizes="190px" className="size-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105" />
            </div>
            <div className="flex flex-col items-start gap-4 p-5">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-light"><Mic size={15} aria-hidden="true" /></span>
              <span className="font-serif text-[1.4rem] leading-tight">100+ keynote sessions across the country</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-[0.88rem]">Explore speaking</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

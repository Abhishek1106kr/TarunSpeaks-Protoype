import { proofStats } from '../../data/company'
import { StatGrid } from '../blocks/StatGrid'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { Photo } from '../ui/Photo'

const delay = (seconds: number) => ({ '--enter-delay': `${seconds}s` }) as React.CSSProperties

// The proposition first, in the company's own words (profile p.66), then the evidence.
// The photograph is documentary — Tarun working with a room — not a portrait competing with the message.
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-[4.5rem]">
      <div className="container-x grid gap-12 pt-12 pb-14 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-20">
        <div className="flex flex-col justify-end lg:col-span-7">
          <Eyebrow className="enter mb-8">Corporate training · Consulting · AI capability building</Eyebrow>
          <h1 id="hero-title" className="t-display enter max-w-[15ch]" style={delay(0.05)}>
            We build digital-first, confident, <em className="text-brand-text">high-performing</em> teams.
          </h1>
          <p className="t-lead enter mt-8 max-w-[34rem]" style={delay(0.15)}>
            TarunSpeaks is a corporate training and consulting company. We work with CHROs, founders and business leaders on AI tools, sales, marketing, personal branding and leadership, and help teams put new skills to work.
          </p>
          <div className="enter mt-10 flex flex-wrap items-center gap-x-7 gap-y-3" style={delay(0.22)}>
            <Button to="/contact" size="lg" arrow track="hero">Talk to TarunSpeaks</Button>
            <Button to="/programs" variant="quiet">Explore Programs</Button>
          </div>
        </div>

        <figure className="enter lg:col-span-5 lg:self-end" style={delay(0.12)}>
          <div className="relative aspect-[5/4] overflow-hidden bg-surface lg:aspect-[4/5]">
            <Photo
              name="about-audience"
              alt="Tarun Makhija, microphone in hand, crouching to talk with seated participants during a session"
              preload
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="size-full object-cover object-[62%_50%]"
            />
          </div>
          <figcaption className="t-meta mt-3">Tarun Makhija, Chief Educator &amp; Founder, in session with participants.</figcaption>
        </figure>
      </div>

      <div className="container-x pb-6">
        <StatGrid stats={proofStats.slice(0, 4)} source={`Source: TarunSpeaks company profile, 2026. ${proofStats[4].value}${proofStats[4].suffix} years of experience.`} />
      </div>
    </section>
  )
}

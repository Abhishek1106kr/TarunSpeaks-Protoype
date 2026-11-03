import { getImageProps } from 'next/image'
import { proofStats } from '../../data/company'
import { StatGrid } from '../blocks/StatGrid'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { HeroVideoTile } from './HeroVideoTile'

const delay = (seconds: number) => ({ '--enter-delay': `${seconds}s` }) as React.CSSProperties

const collageAlt = 'Collage of TarunSpeaks sessions: a packed auditorium, a Motilal Oswal training room and Tarun Makhija speaking with participants at an HDFC Bank session'

// The proposition first, in the company's own words (profile p.66), then the evidence.
// The full-bleed collage keeps the range of TarunSpeaks sessions visible behind the message.
export function Hero() {
  const common = { alt: collageAlt, sizes: '100vw', preload: true, fetchPriority: 'high' as const }
  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({ ...common, src: '/images/home/hero-collage-desktop-v2.webp', width: 2400, height: 1350 })
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: '/images/home/hero-collage-mobile.webp', width: 1080, height: 1520 })

  return (
    <>
    <section aria-labelledby="hero-title">
      <div className="relative min-h-svh overflow-hidden bg-canvas">
        <link rel="preload" as="image" href="/images/home/hero-collage-mobile.webp" media="(max-width: 767px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/home/hero-collage-desktop-v2.webp" media="(min-width: 768px)" fetchPriority="high" />
        <div className="absolute inset-0 [container-type:size]">
          <picture className="absolute inset-0 block md:hidden">
            <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
            <img {...desktopProps} srcSet={desktopSrcSet} alt={collageAlt} className="size-full object-cover" />
          </picture>
          <div className="absolute inset-0 hidden md:block">
            <div className="absolute left-1/2 top-1/2 h-[max(100cqh,calc(100cqw*9/16))] w-[max(100cqw,calc(100cqh*16/9))] -translate-x-1/2 -translate-y-1/2">
              <picture className="absolute inset-0 block">
                <img {...desktopProps} srcSet={desktopSrcSet} alt={collageAlt} className="size-full object-cover" />
              </picture>
              <HeroVideoTile />
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 [background:linear-gradient(to_bottom,_color-mix(in_srgb,_var(--color-canvas)_88%,_transparent)_0%,_transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-[16%] [background:linear-gradient(to_top,_color-mix(in_srgb,_var(--color-canvas)_90%,_transparent)_0%,_color-mix(in_srgb,_var(--color-canvas)_84%,_transparent)_78%,_transparent_100%)] [mask-image:linear-gradient(to_bottom,_transparent_0%,_black_14%)] [-webkit-mask-image:linear-gradient(to_bottom,_transparent_0%,_black_14%)] md:top-[32%] md:[background:linear-gradient(to_right,_color-mix(in_srgb,_var(--color-canvas)_88%,_transparent)_0%,_color-mix(in_srgb,_var(--color-canvas)_82%,_transparent)_46%,_transparent_70%)]"
        />

        <div className="container-x relative z-10 flex min-h-svh items-end pb-12 pt-[calc(4.5rem+5rem)] sm:pb-16 lg:pb-20">
          <div>
          <Eyebrow className="enter mb-8">Corporate training, consulting and AI capability building</Eyebrow>
          <h1 id="hero-title" className="t-display enter" style={delay(0.05)}>
            We build digital-first, confident, <span className="text-brand-text">high-performing</span> teams.
          </h1>
          <p className="t-lead enter mt-8 max-w-[38rem]" style={delay(0.15)}>
            Corporate training and consulting in AI, sales, marketing, personal branding and leadership, for CHROs, founders and business leaders.
          </p>
          <div className="enter mt-10 flex flex-wrap items-center gap-x-7 gap-y-3" style={delay(0.22)}>
            <Button to="/contact" size="lg" arrow track="hero">Talk to TarunSpeaks</Button>
            <Button to="/programs" variant="quiet">Explore Programs</Button>
          </div>
          </div>
        </div>
      </div>

    </section>

    <section aria-label="Company figures">
      <div className="container-x pb-6">
        <StatGrid stats={proofStats.slice(0, 4)} source={`TarunSpeaks figures, October 2026. ${proofStats[4].value}${proofStats[4].suffix} years of experience.`} />
      </div>
    </section>
    </>
  )
}

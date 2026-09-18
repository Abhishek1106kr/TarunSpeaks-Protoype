import { Handshake, type LucideIcon, Mic, Radio, ShoppingBag, Users, Video } from 'lucide-react'
import { type CommunityChannel, communityChannels } from '../../data/community'
import { communityStats } from '../../data/stats'
import { Counter } from '../ui/Counter'
import { Eyebrow } from '../ui/Eyebrow'
import { Img } from '../ui/Img'

const icons: Record<CommunityChannel['kind'], LucideIcon> = {
  community: Users,
  broadcast: Radio,
  podcast: Mic,
  live: Video,
  mentorship: Handshake,
  merch: ShoppingBag,
}

export function Community() {
  return (
    <section aria-labelledby="community-title" className="section-y bg-secondary">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <div data-reveal><Eyebrow tone="accent-ink" className="mb-7">Community &amp; impact</Eyebrow></div>
            <h2 id="community-title" data-split className="display-lg">Be limitless, <em>together.</em></h2>
            <p data-reveal className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/80">
              Tarun has a strong community of 20,000+ followers across all major social media platforms, and his content reaches more than 20,00,000 people every month.
            </p>
            <dl data-reveal-group className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-[auto_auto_auto] sm:justify-start sm:gap-x-12">
              {communityStats.map((stat) => (
                <div key={stat.label} className="flex max-w-[11rem] flex-col-reverse justify-end gap-3">
                  <dt className="text-[0.8rem] leading-snug text-ink/75">{stat.label}</dt>
                  <dd className="font-serif text-[clamp(2rem,3vw,2.7rem)] leading-none"><Counter stat={stat} /></dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-image-reveal className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-bg lg:aspect-[5/6]">
            <Img data-parallax="6" name="community-meetup" alt="Tarun Makhija with participants holding “Wait for it or make it happen” signs" sizes="(min-width: 1024px) 45vw, 100vw" className="size-full scale-110 object-cover" />
          </div>
        </div>

        <ul data-reveal-group className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {communityChannels.map((channel) => {
            const Icon = icons[channel.kind]
            return (
              <li key={channel.title} className="flex gap-4 bg-light p-6 sm:p-7">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-accent-ink"><Icon size={18} aria-hidden="true" /></span>
                <div>
                  <h3 className="text-[1.5rem] leading-tight">{channel.title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{channel.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

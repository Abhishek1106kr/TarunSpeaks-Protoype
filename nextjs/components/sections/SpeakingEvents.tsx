import { engagements } from '../../data/speaking'
import { EngagementList } from '../blocks/EngagementList'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { Img } from '../ui/Img'

export function SpeakingEvents() {
  return (
    <section aria-labelledby="speaking-title" className="pb-[clamp(5rem,11vw,9rem)]">
      <div className="container-x">
        <div className="on-dark grid overflow-hidden rounded-[2rem] bg-dark text-light lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[20rem] overflow-hidden sm:min-h-[26rem]">
            <Img data-parallax="7" name="speaking-motilal" alt="Tarun Makhija speaking at a Motilal Oswal session" sizes="(min-width: 1024px) 40vw, 100vw" className="absolute inset-0 size-full scale-115 object-cover" />
          </div>
          <div className="p-7 sm:p-10 lg:p-14">
            <div data-reveal><Eyebrow tone="light" className="mb-6">Speaking &amp; events</Eyebrow></div>
            <h2 id="speaking-title" data-split className="display-md">Notable stages &amp; sessions</h2>
            <div className="mt-10">
              <EngagementList items={engagements.slice(0, 4)} tone="dark" />
            </div>
            <div data-reveal className="mt-10">
              <Button to="/speaking" variant="light" icon>Explore speaking</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

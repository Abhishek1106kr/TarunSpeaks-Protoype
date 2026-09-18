import { consultingClients, trainingPartners } from '../../data/brands'
import { Marquee } from '../blocks/Marquee'
import { SectionHeading } from '../ui/SectionHeading'

export function Brands({ showClients = true }: { showClients?: boolean }) {
  return (
    <section aria-labelledby="brands-title" className="section-y overflow-hidden">
      <div className="container-x">
        <SectionHeading id="brands-title" title={<>Brands &amp; institutions<br />I’ve worked with</>} lead="297+ brands across consultation, corporate training and keynote sessions." />
      </div>

      <div data-reveal className="mt-16 space-y-12 lg:mt-20">
        <div>
          <div className="container-x mb-5"><p className="eyebrow text-muted">Corporate trainings &amp; keynotes</p></div>
          <Marquee label="Corporate trainings and keynotes" items={trainingPartners} duration={90} />
        </div>
        {showClients && (
          <div>
            <div className="container-x mb-5"><p className="eyebrow text-muted">Digital &amp; branding strategy</p></div>
            <Marquee label="Digital and branding strategy clients" items={consultingClients} reverse duration={80} />
          </div>
        )}
      </div>
    </section>
  )
}

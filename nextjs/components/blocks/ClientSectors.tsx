import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { ClientEcosystem } from './ClientEcosystem'

// Clients & Industries section: server-rendered header and closing line around the interactive canvas.
export function ClientSectors() {
  return (
    <section aria-labelledby="clients-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-6">Clients & industries</Eyebrow>
            <h2 id="clients-title" className="t-h1">300+ brands. 15+ industries. Practical experience across organisations.</h2>
          </div>
          <p className="t-lead lg:col-span-4 lg:pb-2">
            A selection of organisations TarunSpeaks has trained and consulted, spanning financial services, education, retail, consumer brands, media, logistics, and other sectors.
          </p>
        </div>

        <div className="mt-14"><ClientEcosystem /></div>

        <div className="mt-20 grid gap-8 border-t border-line pt-12 lg:grid-cols-12 lg:items-center">
          <p className="font-serif text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] tracking-[-0.02em] lg:col-span-8">Your industry. Your people. Your next capability milestone.</p>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Button to="/contact?interest=training" size="lg" arrow track="clients">Discuss a Corporate Engagement</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

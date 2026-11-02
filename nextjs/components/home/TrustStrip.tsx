import Image from 'next/image'
import { clients } from '../../data/clients'
import { Eyebrow } from '../ui/Eyebrow'

const curatedClients = clients.filter((client) => client.curated === true)

export function TrustStrip() {
  return (
    <section aria-label="Client trust signal" className="border-y border-line-soft bg-canvas py-7 sm:py-8">
      <div className="container-x">
        <Eyebrow className="mb-5">Organisations we’ve worked with</Eyebrow>
        <div data-allow-overflow className="-mx-[var(--gutter)] flex snap-x gap-8 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-between sm:gap-x-8 sm:gap-y-6 sm:overflow-visible sm:px-0">
          {curatedClients.map((client) => (client.colorLogo ?? client.logo) && (
            <div key={client.name} className="flex h-14 w-[7.5rem] shrink-0 snap-start items-center justify-start rounded-[0.3rem] bg-logo-tile p-3 sm:w-[8.5rem] sm:justify-center">
              <Image
                src={(client.colorLogo ?? client.logo)!.src}
                alt={client.name}
                width={(client.colorLogo ?? client.logo)!.width}
                height={(client.colorLogo ?? client.logo)!.height}
                sizes="136px"
                className={`max-h-8 w-auto max-w-full object-contain ${client.colorLogo ? '' : 'brightness-0'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { company } from '../../data/company'
import { Button } from '../ui/Button'

type EnquiryCtaProps = {
  title?: string
  body?: string
  primary?: { label: string; to: string }
}

// Closing invitation on every page except /contact: one flat field of brand blue — the only
// full-bleed colour on the page — with the action and the direct contact details side by side.
export function EnquiryCta({
  title = 'Tell us what your teams need to do differently.',
  body = 'Share the capability you want to build, who it is for and your timelines. We’ll come back with a recommended format: a workshop, a masterclass or a full learning journey.',
  primary = { label: 'Talk to TarunSpeaks', to: '/contact' },
}: EnquiryCtaProps) {
  return (
    <section aria-labelledby="enquiry-cta-title" className="bg-brand">
      <div className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="enquiry-cta-title" className="t-h1 text-fg">{title}</h2>
          <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-fg/85">{body}</p>
          <div className="mt-10"><Button to={primary.to} size="lg" variant="inverse" arrow track="closing-band">{primary.label}</Button></div>
        </div>
        <dl className="grid content-end gap-6 border-t border-fg/25 pt-8 text-fg lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <div>
            <dt className="text-[0.9rem] text-fg/75">Email</dt>
            <dd><a href={company.email.href} className="text-[1.15rem] font-semibold break-all underline decoration-fg/40 underline-offset-4 hover:decoration-fg">{company.email.label}</a></dd>
          </div>
          <div>
            <dt className="text-[0.9rem] text-fg/75">Phone</dt>
            <dd><a href={company.phone.href} className="text-[1.15rem] font-semibold underline decoration-fg/40 underline-offset-4 hover:decoration-fg">{company.phone.label}</a></dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

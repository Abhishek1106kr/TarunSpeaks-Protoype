import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { Img } from '../ui/Img'

export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="section-y bg-secondary">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div data-image-reveal className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-bg">
          <Img data-parallax="6" name="tarun-google" alt="Tarun Makhija at the Google office in Mumbai" sizes="(min-width: 1024px) 45vw, 100vw" className="size-full scale-110 object-cover" />
        </div>

        <div>
          <div data-reveal><Eyebrow tone="accent-ink" className="mb-7">About me</Eyebrow></div>
          <h2 id="about-title" data-split className="display-lg">Hi, I’m Tarun.</h2>
          <p data-reveal className="mt-6 font-serif text-[clamp(1.5rem,2.3vw,1.95rem)] leading-[1.25]">
            An IT engineer turned digital marketing consultant and educator who loves spreading smiles.
          </p>
          <div data-reveal className="mt-8 space-y-5 text-[1.03rem] leading-relaxed text-ink/80">
            <p>In November 2016, I co-founded Big Mouth Digital &amp; Media, a branding and digital marketing agency based in Mumbai. We have worked with more than 150 clients across the globe in over 15 industries, delivering over 750 campaigns on digital platforms.</p>
            <p>Along the way I discovered my true calling — mentoring and educating people on digital growth strategies, through corporate training, keynotes and one-on-one mentorship.</p>
          </div>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-8">
            <p aria-hidden="true" className="font-serif text-[2.4rem] leading-none text-accent-ink italic">Tarun Makhija</p>
            <Button to="/about" variant="outline" icon>Read my story</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

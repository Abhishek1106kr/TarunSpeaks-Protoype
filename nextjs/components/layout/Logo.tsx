import Image from 'next/image'
import Link from 'next/link'

// Official #TARUNSPEAKS wordmark (public/images/brand/tarunspeaks-logo.webp, 300×53, brand blue on transparent).
// On the black canvas the blue artwork is too dim (~2.3:1), so it is rendered white — as the company profile
// prints it on its black slides. Pass tone="brand" on light surfaces to show the original blue.
export function Logo({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'brand' }) {
  return (
    <Link href="/" aria-label="TarunSpeaks — home" className={`group inline-flex min-h-11 items-center ${className}`}>
      <Image
        src="/images/brand/tarunspeaks-logo.webp"
        alt="TarunSpeaks"
        width={300}
        height={53}
        loading="eager"
        className={`h-[1.3rem] w-auto transition-opacity group-hover:opacity-80 sm:h-6 ${tone === 'light' ? 'brightness-0 invert' : ''}`}
      />
    </Link>
  )
}

'use client'

import { photos } from '../../lib/images'
import { useMotionAllowed } from '../../lib/useMotionAllowed'
import { Photo } from '../ui/Photo'

const founderPortrait = photos['founder-portrait']

export function FounderMedia() {
  const motionAllowed = useMotionAllowed()

  // Keep the still portrait until the preference is known, so reduced-motion visitors
  // never mount an autoplaying video during hydration.
  if (!motionAllowed) {
    return <Photo name="founder-portrait" alt="Portrait of Tarun Makhija" tone="color" sizes="(min-width: 1024px) 36vw, 90vw" className="size-full object-cover object-top" />
  }

  // The 3:4 box shows the lower 75% of this 9:16 video, trimming the empty wall at the top.
  return (
    <video
      src="/videos/founder-intro.mp4"
      poster={founderPortrait.src}
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      className="size-full object-cover object-bottom"
      aria-label="Tarun Makhija, Chief Educator and Founder, speaking"
    />
  )
}

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'

export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return <div className="mt-8 aspect-video w-full overflow-hidden rounded-[1.25rem] border border-line"><iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="size-full" loading="lazy" /></div>
  }
  return (
    <button type="button" aria-label={`Play video: ${title}`} onClick={() => setPlaying(true)} className="group relative mt-8 aspect-video w-full overflow-hidden rounded-[1.25rem] border border-line text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright">
      <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
      <span className="absolute inset-0 grid place-items-center"><span className="grid size-16 place-items-center rounded-full bg-brand text-white"><Play aria-hidden="true" fill="currentColor" size={25} /></span></span>
      <span className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-sm font-semibold text-white">{title}</span>
    </button>
  )
}

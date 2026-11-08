'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

type ArticleImageProps = { src: string; alt: string; width: number; height: number }

export function ArticleImage({ src, alt, width, height }: ArticleImageProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0)
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus()
    wasOpen.current = open
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Enlarge image${alt ? `: ${alt}` : ''}`}
        onClick={() => setOpen(true)}
        className="mt-8 block w-full overflow-hidden rounded-[1.25rem] border border-line text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 720px, 100vw" className="h-auto w-full" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={alt || 'Enlarged image'} onClick={() => setOpen(false)}>
          <div className="relative max-h-[88vh] max-w-[90vw]" onClick={(event) => event.stopPropagation()}>
            <Image src={src} alt={alt} width={width} height={height} sizes="90vw" className="max-h-[88vh] w-auto max-w-[90vw] object-contain" />
            <button ref={closeRef} type="button" aria-label="Close image" onClick={() => setOpen(false)} className="absolute right-2 top-2 grid size-11 place-items-center rounded-full bg-canvas/80 text-fg hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright">
              <X aria-hidden="true" size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

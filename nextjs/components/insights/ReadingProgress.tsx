'use client'

import { useEffect, useRef } from 'react'

export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const target = document.getElementById(targetId)
      if (!target || !barRef.current) return
      const range = target.offsetHeight - window.innerHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, (window.scrollY - target.offsetTop) / range)) : 1
      barRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) window.cancelAnimationFrame(frame) }
  }, [targetId])
  return <div ref={barRef} aria-hidden="true" className="fixed inset-x-0 top-[4.5rem] z-40 h-[3px] origin-left scale-x-0 bg-brand-bright" />
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { lockScroll } from '../../animation/smoothScroll'
import { navLinks } from '../../data/site'
import { Button } from '../ui/Button'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  // The menu remembers which page it was opened on, so navigating anywhere closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const open = menuPath === pathname
  const setOpen = (value: boolean) => setMenuPath(value ? pathname : null)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open: lock page scroll, keep focus inside the header, close on Escape.
  useEffect(() => {
    if (!open) return
    const header = headerRef.current!
    const focusables = () => [...header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter((element) => element.offsetParent !== null)
    lockScroll(true)
    header.querySelector<HTMLElement>('#mobile-menu a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuPath(null)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      lockScroll(false)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const overHero = pathname === '/' && !scrolled && !open
  const solid = scrolled && !open

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${open || overHero ? 'on-dark text-light' : 'text-ink'} ${solid ? 'bg-bg/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl' : ''}`}
    >
      <div className="container-x flex h-20 items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.to
            return (
              <Link
                key={link.to}
                href={link.to}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-[0.95rem] after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100 ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <Link href="/" aria-label="Tarun Makhija — home" className="font-serif text-[1.65rem] leading-none font-semibold tracking-tight lg:text-[1.85rem]">
          Tarun Makhija
        </Link>

        <div className="hidden justify-self-end lg:block">
          <Button to="/contact" variant={overHero ? 'coral' : 'accent'}>Let’s Connect</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 grid size-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>{open && <MobileMenu onNavigate={() => setOpen(false)} />}</AnimatePresence>
    </header>
  )
}

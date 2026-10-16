'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '../../data/company'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

const isActive = (pathname: string, to: string) => pathname === to || pathname.startsWith(`${to}/`)

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
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open: lock page scroll, trap focus in the header, close on Escape.
  useEffect(() => {
    if (!open) return
    const header = headerRef.current!
    const focusables = () => [...header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter((element) => element.offsetParent !== null)
    document.documentElement.style.overflow = 'hidden'
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
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${scrolled || open ? 'border-b border-line-soft bg-canvas/90 backdrop-blur-md' : 'border-b border-transparent'}`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.to)
              return (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-flex min-h-11 items-center text-[0.9rem] font-medium transition-colors hover:text-fg after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:bg-brand-bright after:transition-transform after:duration-300 ${active ? 'text-fg after:scale-x-100' : 'text-fg-2 after:scale-x-0 hover:after:scale-x-100'} after:origin-left`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Visibility lives on a wrapper: `hidden` on the Button itself loses to its own `inline-flex`. */}
          <div className="hidden sm:block"><Button to="/contact" track="header">Talk to TarunSpeaks</Button></div>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid size-11 place-items-center nav:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-300 ${open ? 'top-[5px] -rotate-45' : 'top-2.5'}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>{open && <MobileMenu onNavigate={() => setOpen(false)} />}</AnimatePresence>
    </header>
  )
}

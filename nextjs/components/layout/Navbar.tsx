'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
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
  const programsRef = useRef<HTMLLIElement>(null)
  const programsTriggerRef = useRef<HTMLButtonElement>(null)
  const [programsOpen, setProgramsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!programsOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!programsRef.current?.contains(event.target as Node)) setProgramsOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setProgramsOpen(false)
      programsTriggerRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [programsOpen])

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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[border-color] duration-300 ${scrolled || open ? 'border-line-soft' : 'border-transparent'}`}
    >
      <div aria-hidden="true" className={`absolute inset-0 -z-10 transition-[background-color,backdrop-filter] duration-300 ${scrolled || open ? 'bg-canvas/90 backdrop-blur-md' : ''}`} />
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.to) || Boolean(link.children?.some((child) => isActive(pathname, child.to)))
              if (link.children) {
                const panelId = 'programs-nav-menu'
                return (
                  <li key={link.to} ref={programsRef} className="relative">
                    <button
                      ref={programsTriggerRef}
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={programsOpen}
                      aria-controls={panelId}
                      className={`relative inline-flex min-h-11 items-center gap-1 text-[0.9rem] font-medium transition-colors hover:text-fg after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:bg-brand-bright after:transition-transform after:duration-300 ${active ? 'text-fg after:scale-x-100' : 'text-fg-2 after:scale-x-0 hover:after:scale-x-100'} after:origin-left`}
                      onClick={() => setProgramsOpen((value) => !value)}
                    >
                      {link.label}
                      <ChevronDown aria-hidden="true" size={15} className={`transition-transform duration-200 ease-editorial ${programsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {programsOpen && (
                        <motion.div
                          id={panelId}
                          role="menu"
                          aria-label="Programs"
                          initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-[var(--radius-card)] border border-line bg-surface p-2 shadow-panel"
                        >
                          {link.children.map((child) => (
                            <Link key={child.to} href={child.to} role="menuitem" onClick={() => setProgramsOpen(false)} className="block rounded-[0.25rem] px-3 py-2.5 text-[0.9rem] font-medium text-fg-2 transition-colors hover:bg-fg/5 hover:text-fg">
                              {child.label}
                            </Link>
                          ))}
                          <Link href={link.to} role="menuitem" onClick={() => setProgramsOpen(false)} className="mt-1 block border-t border-line px-3 pt-2.5 text-[0.82rem] font-medium text-brand-text transition-colors hover:text-fg">
                            All Programs
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              }
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
          <div className="hidden sm:block"><Button to="/contact" track="header">Enquire Now</Button></div>
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
              <span className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-2.5 h-0.5 w-full bg-current transition-transform duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>{open && <MobileMenu onNavigate={() => setOpen(false)} />}</AnimatePresence>
    </header>

  )
}

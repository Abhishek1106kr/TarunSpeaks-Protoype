'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { company, navLinks } from '../../data/company'

const ease = [0.22, 1, 0.36, 1] as const
const links = [...navLinks, { label: 'Contact', to: '/contact' }]

export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const programsLink = navLinks.find((link) => link.children)
  const programsActive = programsLink
    ? pathname === programsLink.to || pathname.startsWith(`${programsLink.to}/`) || Boolean(programsLink.children?.some((child) => pathname === child.to || pathname.startsWith(`${child.to}/`)))
    : false
  const [programsExpanded, setProgramsExpanded] = useState(programsActive)

  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-x-0 top-[4.5rem] bottom-0 flex flex-col overflow-y-auto bg-canvas nav:hidden"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
    >
      <nav aria-label="Mobile" className="container-x flex flex-1 flex-col pt-6 pb-8">
        <ul className="border-t border-line">
          {links.map((link, index) => {
            const active = pathname === link.to || pathname.startsWith(`${link.to}/`)
            if (link.children) {
              const submenuId = 'mobile-programs-submenu'
              return (
                <motion.li
                  key={link.to}
                  className="border-b border-line"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.45, ease }}
                >
                  <button
                    type="button"
                    aria-expanded={programsExpanded}
                    aria-controls={submenuId}
                    onClick={() => setProgramsExpanded((value) => !value)}
                    className={`flex min-h-14 w-full items-center justify-between text-left font-secondary text-[1.45rem] font-semibold tracking-[-0.02em] ${programsActive ? 'text-brand-text' : 'text-fg'}`}
                  >
                    {link.label}
                    <ChevronDown aria-hidden="true" size={22} className={`mr-1 transition-transform duration-200 ease-editorial ${programsExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {programsExpanded && (
                      <motion.div
                        id={submenuId}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease }}
                        className="overflow-hidden"
                      >
                        <div className="mb-3 ml-1 border-l border-line pl-4">
                          {link.children.map((child) => {
                            const childActive = pathname === child.to || pathname.startsWith(`${child.to}/`)
                            return (
                              <Link key={child.to} href={child.to} onClick={onNavigate} aria-current={childActive ? 'page' : undefined} className={`flex min-h-12 items-center text-[1.05rem] font-medium ${childActive ? 'text-brand-text' : 'text-fg-2'}`}>
                                {child.label}
                              </Link>
                            )
                          })}
                          <Link href={link.to} onClick={onNavigate} aria-current={active ? 'page' : undefined} className={`flex min-h-12 items-center border-t border-line text-[1.05rem] font-medium ${active ? 'text-brand-text' : 'text-fg-2'}`}>
                            All Programs
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            }
            return (
              <motion.li
                key={link.to}
                className="border-b border-line"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.45, ease }}
              >
                <Link
                  href={link.to}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-14 items-center font-secondary text-[1.45rem] font-semibold tracking-[-0.02em] ${active ? 'text-brand-text' : 'text-fg'}`}
                >
                  {link.label}
                </Link>
              </motion.li>
            )
          })}
        </ul>
        <div className="mt-auto grid gap-4 pt-10">
          <Link href="/contact" onClick={onNavigate} className="inline-flex min-h-13 items-center justify-center rounded-[0.3rem] bg-brand px-6 font-semibold">Enquire Now</Link>
          <div className="flex flex-col text-[0.95rem] text-fg-2">
            <a href={company.email.href} className="py-2">{company.email.label}</a>
            <a href={company.phone.href} className="py-2">{company.phone.label}</a>
          </div>
        </div>
      </nav>
    </motion.div>
  )
}

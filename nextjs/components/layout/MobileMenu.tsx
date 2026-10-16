'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { company, navLinks } from '../../data/company'

const ease = [0.22, 1, 0.36, 1] as const
const links = [...navLinks, { label: 'Insights', to: '/insights' }, { label: 'Contact', to: '/contact' }]

export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
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
                  className={`flex min-h-14 items-center justify-between font-display text-[1.45rem] font-semibold tracking-[-0.02em] ${active ? 'text-brand-text' : 'text-fg'}`}
                >
                  {link.label}
                  <span aria-hidden="true" className="text-fg-3">→</span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
        <div className="mt-auto grid gap-4 pt-10">
          <Link href="/contact" onClick={onNavigate} className="inline-flex min-h-13 items-center justify-center rounded-[0.3rem] bg-brand px-6 font-semibold">Talk to TarunSpeaks</Link>
          <div className="flex flex-col text-[0.95rem] text-fg-2">
            <a href={company.email.href} className="py-2">{company.email.label}</a>
            <a href={company.phone.href} className="py-2">{company.phone.label}</a>
          </div>
        </div>
      </nav>
    </motion.div>
  )
}

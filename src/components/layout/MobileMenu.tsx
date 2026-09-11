import { motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router'
import { navLinks, site, socials } from '../../data/site'

const ease = [0.22, 1, 0.36, 1] as const
const links = [...navLinks, { label: 'Contact', to: '/contact' }]

export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-dark text-light lg:hidden"
      initial={reduceMotion ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.7, ease }}
    >
      <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center gap-1 pt-28 pb-10">
        {links.map((link, index) => (
          <motion.div key={link.to} initial={reduceMotion ? false : { y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 + index * 0.06, duration: 0.8, ease }}>
            <NavLink
              to={link.to}
              onClick={onNavigate}
              className={({ isActive }) => `flex items-baseline gap-5 py-2 font-serif text-[clamp(2.6rem,11vw,3.6rem)] leading-none ${isActive ? 'italic' : ''}`}
            >
              <span className="font-sans text-xs tracking-[0.2em] text-light/60">0{index + 1}</span>
              {link.label}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <motion.div className="container-x grid gap-6 border-t border-light/15 py-8 text-[0.95rem]" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
        <div className="flex flex-col gap-1">
          <a href={site.email.href} className="py-1.5">{site.email.label}</a>
          <a href={site.phone.href} className="py-1.5">{site.phone.label}</a>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-light/70">
          {socials.map((social) => <li key={social.label}><a href={social.href} target="_blank" rel="noreferrer" className="inline-block py-1.5">{social.label}</a></li>)}
        </ul>
      </motion.div>
    </motion.div>
  )
}

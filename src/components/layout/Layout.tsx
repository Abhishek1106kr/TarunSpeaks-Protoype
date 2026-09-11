import { Suspense, useEffect, useLayoutEffect } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router'
import { ScrollTrigger } from '../../animation/gsap'
import { scrollToTarget, startSmoothScroll } from '../../animation/smoothScroll'
import { CtaSection } from '../sections/CtaSection'
import { Chatbot } from './Chatbot'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

// Rendered inside the page's Suspense boundary, so it only runs once the (lazy) page content is in the DOM:
// jump to the top, or to the requested section when the URL has a hash.
function ScrollOnNavigate({ hash }: { hash: string }) {
  useLayoutEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) scrollToTarget(target)
    else scrollToTarget(0, { immediate: true })
    ScrollTrigger.refresh()
  }, [hash])
  return null
}

export function Layout() {
  const { pathname, hash } = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => startSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-dark focus:px-5 focus:py-3 focus:text-light">
        Skip to content
      </a>
      <Navbar />
      <motion.main
        key={pathname}
        id="main"
        tabIndex={-1}
        className="outline-none"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<div className="min-h-svh" />}>
          <Outlet />
          <ScrollOnNavigate key={pathname + hash} hash={hash} />
        </Suspense>
      </motion.main>
      {pathname !== '/contact' && <CtaSection />}
      <Footer />
      <Chatbot />
    </MotionConfig>
  )
}

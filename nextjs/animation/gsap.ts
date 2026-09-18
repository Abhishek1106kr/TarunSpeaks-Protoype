import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)
gsap.defaults({ ease: 'expo.out', duration: 1.1 })

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText }

import type { ImageName } from './images.generated'

export type Service = {
  slug: string
  number: string
  title: string
  summary: string
  description: string
  image: ImageName
  imageAlt: string
  highlights: string[]
}

export const services: Service[] = [
  {
    slug: 'consultation',
    number: '01',
    title: 'Digital Marketing Consultation',
    summary: "Let's grow your business together via proven digital marketing strategies.",
    description: 'I have worked on digital and branding strategies for over 297 brands — including Axis Bank, Purplle, Gatsby India, Swiss Education Group, Kra Foods India and Vaunt Skincare.',
    image: 'consultation-table',
    imageAlt: 'Tarun Makhija reviewing a digital strategy with two business owners',
    highlights: ['Digital & branding strategy', 'Performance marketing & social media', 'Personal branding & LinkedIn growth'],
  },
  {
    slug: 'training',
    number: '02',
    title: 'Corporate Training',
    summary: "Are you seeking high-quality corporate training programs to enhance your team's skill set? Let us help!",
    description: 'I have trained over 25,000 professionals, delivered more than 1,600 training sessions and given 100+ keynote sessions at institutions including HDFC Bank, Reliance Retail, TataPlay and Motilal Oswal.',
    image: 'speaking-motilal',
    imageAlt: 'Tarun Makhija leading a training session for Motilal Oswal',
    highlights: ['Digital & performance marketing', 'Content creation & social media strategy', 'Personal branding for teams'],
  },
  {
    slug: 'speaking',
    number: '03',
    title: 'Public Speaking',
    summary: "With over 10 years of experience, I've delivered 1,600+ sessions and 100+ keynotes, inspiring audiences across the country to believe in themselves, embrace digital transformation and stay motivated.",
    description: 'Keynotes on digital marketing, entrepreneurship and business strategy — from a 10-city Motilal Oswal tour to NMIMS, Masters’ Union and Reliance Entertainment.',
    image: 'stage-keynote',
    imageAlt: 'Tarun Makhija on stage delivering a keynote on growing your business via social media marketing',
    highlights: ['Keynotes & inspirational sessions', 'Personal branding & social media growth', 'Communication & public speaking'],
  },
  {
    slug: 'career',
    number: '04',
    title: 'Career Consultation',
    summary: 'Are you looking for personalized career consultations to help you navigate your professional path?',
    description: 'Personal, 1 on 1 consultations for people navigating their professional path — and one-on-one mentorship for aspiring marketers and entrepreneurs through Topmate.',
    image: 'consultation-office',
    imageAlt: 'Tarun Makhija in a one-on-one career consultation',
    highlights: ['1 on 1 consultation', 'Career guidance', 'One-on-one mentorship on Topmate'],
  },
]

// Public speaking has its own page; the other services live as sections on /services.
export const serviceHref = (slug: string) => slug === 'speaking' ? '/speaking' : `/services#${slug}`

export const consultationProcess = [
  { number: '01', title: 'Process identification', description: 'Identify objectives, scope, players and work areas.' },
  { number: '02', title: 'Assemble a team', description: 'Find people who work well with the process.' },
  { number: '03', title: 'Process mapping', description: 'Turn your collected information into a process map.' },
  { number: '04', title: 'Manage process', description: 'Maintain, store and routinely review the map.' },
]

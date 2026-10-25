import type { PhotoName } from '../lib/images'
import { proofSummary } from './company'

export type JourneyStep = {
  phase: string
  marker: string
  title: string
  body: string
  proof: string
  image: PhotoName
  imageAlt: string
}

// Verified against tarunmakhija.in/journey-from-it-engineering-to-digital-marketing/ and the company profile.
// Only two dates are published (TCS in 2015, Big Mouth in 2016); later chapters are deliberately undated.
export const journey: JourneyStep[] = [
  {
    phase: 'Engineering',
    marker: '2015',
    title: 'An IT engineer first',
    body: 'Tarun earned a degree in IT engineering and began his career in technology. He excelled there, but his passion for marketing, branding and education led him to take a bold leap.',
    proof: 'L&T Infotech, Tech Mahindra and Zensar Technologies, then Tata Consultancy Services from 2015.',
    image: 'tarun-google',
    imageAlt: 'Tarun Makhija at the Google office in Mumbai',
  },
  {
    phase: 'Digital marketing',
    marker: '2016',
    title: 'Co-founding Big Mouth Digital & Media',
    body: 'In 2016 he co-founded Big Mouth Digital & Media, a branding and digital marketing agency in Mumbai, serving 270+ brands across 15+ industries.',
    proof: '750+ digital marketing campaigns executed. Practitioner experience, not theory.',
    image: 'consultation-table',
    imageAlt: 'Tarun Makhija in a strategy session with clients',
  },
  {
    phase: 'Training',
    marker: 'Calling',
    title: 'Teaching what worked',
    body: 'Running the agency, he discovered his true calling: mentoring and educating people on digital growth, across corporate and academic institutions.',
    proof: '100+ keynote sessions on digital marketing, entrepreneurship and business strategy.',
    image: 'about-stage',
    imageAlt: 'Tarun Makhija presenting on stage to a large audience',
  },
  {
    phase: 'TarunSpeaks',
    marker: 'Company',
    title: 'Train. Consult. Empower.',
    body: 'TarunSpeaks became a corporate training and consulting company, with Tarun as Chief Educator & Founder, running multi-city programs for organisations like Motilal Oswal, HDFC Bank and Sansaar by D’Decor.',
    proof: proofSummary,
    image: 'sansaar-stage',
    imageAlt: 'Tarun Makhija addressing a Sansaar by D’Decor audience',
  },
  {
    phase: 'AI capability',
    marker: 'Now',
    title: 'From awareness to adoption',
    body: 'Today the work extends into AI: multi-month AI training, AI-powered sales and presentation programs, and consulting on AI tools, agent rollout and generative AI adoption.',
    proof: 'Nawany Group, NewTech Insurance Brokers, Godrej Properties and Double Tap Digital.',
    image: 'nawany-workshop',
    imageAlt: 'Tarun Makhija leading an AI training session',
  },
]

// tarunmakhija.in journey page
export const recognitions = [
  { title: 'BW Marketing 30 Under 30', detail: 'Recognised as a top marketing professional under 30', year: '2023' },
  { title: 'Featured on Times Square, New York', detail: 'By Topmate, as one of the Top 10 Global Creators', year: '2023' },
  { title: 'Unacademy Top 50 Educators in India', detail: 'Ranked 38th on the list' },
  { title: 'Top 50 Upcoming Podcasters in India', detail: 'Host of the BE LIMITLESS podcast', year: '2021' },
  { title: 'Captain of the Year (Top 3)', detail: 'Recognised as a top mentor', year: '2021' },
]

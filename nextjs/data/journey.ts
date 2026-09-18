import type { ImageName } from './images.generated'

export type JourneyStep = {
  number: string
  phase: string
  title: string
  body: string
  noteLabel: string
  note: string
  image: ImageName
  imageAlt: string
}

// Drawn from "From IT Engineer to Digital Marketing Mentor" and the homepage on tarunmakhija.in.
export const journey: JourneyStep[] = [
  {
    number: '01',
    phase: 'Engineering',
    title: 'It started in IT',
    body: 'Tarun earned a degree in IT engineering and worked with L&T Infotech, Tech Mahindra and Zensar Technologies before joining Tata Consultancy Services (TCS) in 2015.',
    noteLabel: 'The turn',
    note: 'He excelled in technology — but his passion for marketing, branding and education led him to take a bold leap.',
    image: 'tarun-google',
    imageAlt: 'Tarun Makhija at the Google office in Mumbai',
  },
  {
    number: '02',
    phase: 'Entrepreneurship',
    title: 'Big Mouth Digital & Media',
    body: 'In November 2016, Tarun co-founded Big Mouth Digital & Media, a branding and digital marketing agency based in Mumbai, working with more than 150 clients across the globe in over 15 industries.',
    noteLabel: 'The work',
    note: '750+ campaigns delivered on digital platforms, helping businesses scale through performance marketing and social media strategy.',
    image: 'consultation-table',
    imageAlt: 'Tarun Makhija in a strategy session with clients',
  },
  {
    number: '03',
    phase: 'Education',
    title: 'Finding the true calling',
    body: 'Along the way, Tarun discovered his true calling — mentoring and educating individuals on digital growth strategies, across corporate and academic institutions.',
    noteLabel: 'The impact',
    note: '25,000+ individuals trained, 1,600+ sessions delivered and 100+ keynote sessions.',
    image: 'stage-keynote',
    imageAlt: 'Tarun Makhija speaking to a full auditorium',
  },
  {
    number: '04',
    phase: 'Mission',
    title: 'A bigger purpose',
    body: 'For Tarun, success is about impact, not just numbers. This vision fuels his pursuit of educating, mentoring and empowering individuals worldwide.',
    noteLabel: 'The mission',
    note: 'Empower 1 million individuals by December 1, 2029 — and help 1 billion people make money by doing what they love.',
    image: 'community-meetup',
    imageAlt: 'Tarun Makhija with participants after a session',
  },
]

export const recognitions = [
  { title: 'Featured on Times Square, New York', detail: 'By Topmate, as one of the Top 10 Global Creators', year: '2023' },
  { title: 'BW Marketing 30 Under 30', detail: 'Recognised as a top marketing professional under 30', year: '2023' },
  { title: 'Unacademy Top 50 Educators in India', detail: 'Ranked 38th on the list' },
  { title: 'Top 50 Upcoming Podcasters in India', detail: 'Host of the BE LIMITLESS podcast', year: '2021' },
  { title: 'Captain of the Year (Top 3)', detail: 'Recognised as a top mentor', year: '2021' },
]

export const careerHistory = ['L&T Infotech', 'Tech Mahindra', 'Zensar Technologies', 'Tata Consultancy Services']

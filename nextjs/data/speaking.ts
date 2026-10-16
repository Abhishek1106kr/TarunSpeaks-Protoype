// Keynote topics: each one is a subject Tarun has documented delivering (tarunmakhija.in journey page,
// "Notable Corporate Trainings & Speaking Engagements", and the company profile). `deliveredAt` lists only
// those documented engagements. Session durations for keynotes are not published, so none are shown.

export type Keynote = {
  slug: string
  title: string
  question: string
  audience: string
  takeaway: string
  deliveredAt: string[]
}

export const keynotes: Keynote[] = [
  {
    slug: 'personal-branding-linkedin',
    title: 'Personal Branding & LinkedIn Growth',
    question: 'Why should clients trust you before they have met you?',
    audience: 'Sales leaders, entrepreneurs, client-facing professionals',
    takeaway: 'A clear personal brand narrative and the LinkedIn habits that make credibility visible.',
    deliveredAt: ['Motilal Oswal — city tour for entrepreneurs', 'Reliance Entertainment — keynote for employees'],
  },
  {
    slug: 'future-of-work',
    title: 'The Future of Work: AI, Personal Branding & Digital Skills',
    question: 'What should professionals learn now so AI works for them, not around them?',
    audience: 'Corporate teams, leadership offsites, institutions',
    takeaway: 'A practical view of which AI and digital skills matter, and how to start building them.',
    // Offered topic (company profile p.64) — no specific delivery is documented, so none is claimed.
    deliveredAt: [],
  },
  {
    slug: 'digital-marketing-trends',
    title: 'Digital Marketing Trends & Innovations',
    question: 'What is actually changing in how brands grow online?',
    audience: 'Marketing teams, business schools, industry events',
    takeaway: 'The trends worth acting on, illustrated with campaigns and platform shifts.',
    deliveredAt: ['NMIMS, Mumbai — keynote', 'Google HQ, Mumbai — meet for Mumbai’s Top 50 digital marketing agencies'],
  },
  {
    slug: 'entrepreneurship-business-growth',
    title: 'Entrepreneurship & Business Growth',
    question: 'How do founders turn digital visibility into business?',
    audience: 'Founders, business owners, entrepreneurship programmes',
    takeaway: 'Storytelling, digital presence and client acquisition practices founders can apply immediately.',
    deliveredAt: ['APCA, Mumbai — entrepreneurship & content marketing for chefs', 'Masters’ Union, Gurgaon — keynote and Marketing Hackathon judge'],
  },
  {
    slug: 'storytelling-sales',
    title: 'Storytelling for Sales & Purpose-Driven Selling',
    question: 'How do teams sell value — not just product?',
    audience: 'Retail and sales teams, store managers',
    takeaway: 'Story-led selling aligned with the brand’s purpose, practised on real scenarios.',
    deliveredAt: ['Sansaar by D’Decor — 42-city retail program'],
  },
  {
    slug: 'communication-public-speaking',
    title: 'Communication & Public Speaking',
    question: 'How do you present, pitch and handle objections with clarity?',
    audience: 'Professionals at every level',
    takeaway: 'Frameworks for presentations, elevator pitches and high-stakes conversations.',
    deliveredAt: ['Bentley Systems — interview communication through roleplay'],
  },
]

export type Engagement = { organisation: string; detail: string; year?: string }

// Notable speaking & training engagements as listed on tarunmakhija.in.
export const engagements: Engagement[] = [
  { organisation: 'Reliance Entertainment', detail: 'Personal Branding & Social Media Growth keynote for employees' },
  { organisation: 'Google HQ, Mumbai', detail: 'Hosted an exclusive meet for Mumbai’s Top 50 Digital Marketing Agencies' },
  { organisation: 'Masters’ Union, Gurgaon', detail: 'Judged the Marketing Hackathon and delivered a keynote session' },
  { organisation: 'NMIMS, Mumbai', detail: 'Keynote on Digital Marketing Trends & Innovations' },
  { organisation: 'Capturing Wow', detail: 'Designed & delivered an Instagram Marketing Course for 500,000 photographers' },
  { organisation: 'Chitkara University', detail: 'Teaching Search Engine Marketing (SEM) and digital strategies' },
  { organisation: 'APCA, Mumbai', detail: 'Trained chefs in Entrepreneurship, Business Management and Content Marketing' },
]

export const speakingFormats = [
  { title: 'Keynote', body: 'A single session for a conference, offsite or leadership gathering.' },
  { title: 'Masterclass', body: 'A deeper, practical session with frameworks the audience applies in the room.' },
  { title: 'Workshop', body: 'Hands-on, scenario-based work for teams — profile reviews, live exercises and role-play.' },
]

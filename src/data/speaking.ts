export type Engagement = { organisation: string; detail: string; year?: string }

// Notable corporate training & speaking engagements, as listed on tarunmakhija.in.
export const engagements: Engagement[] = [
  { organisation: 'Motilal Oswal Financial Services', detail: '10-city India tour on Personal Branding & LinkedIn Growth', year: '2023' },
  { organisation: 'Reliance Entertainment', detail: 'Personal Branding & Social Media Growth keynote for employees' },
  { organisation: 'Google HQ, Mumbai', detail: 'Hosted an exclusive meet for Mumbai’s Top 50 Digital Marketing Agencies' },
  { organisation: 'Masters’ Union, Gurgaon', detail: 'Judged the Marketing Hackathon and delivered a keynote session' },
  { organisation: 'NMIMS, Mumbai', detail: 'Keynote on Digital Marketing Trends & Innovations' },
  { organisation: 'Capturing Wow', detail: 'Designed & delivered an Instagram Marketing Course for 500,000 photographers' },
  { organisation: 'Chitkara University', detail: 'Teaching Search Engine Marketing (SEM) and digital strategies' },
  { organisation: 'D’Decor', detail: 'Training sales teams on sustainability, customer education and digital marketing' },
  { organisation: 'APCA, Mumbai', detail: 'Trained chefs in Entrepreneurship, Business Management and Content Marketing' },
]

export const speakingTopics = [
  'Personal Branding & LinkedIn Growth',
  'Digital Marketing & Performance Marketing',
  'Content Creation & Social Media Strategy',
  'Entrepreneurship & Business Growth',
  'Communication & Public Speaking',
]

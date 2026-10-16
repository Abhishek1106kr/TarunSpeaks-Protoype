// Single source of truth for company-level facts.
// Sources: "Company Profile - TarunSpeaks '26" (repo root, cited as "profile p.N") and tarunmakhija.in.
// Never add a figure here without a source comment.

export const company = {
  name: 'TarunSpeaks',
  founder: 'Tarun Makhija',
  signature: ['Train', 'Consult', 'Empower'], // profile p.1
  // profile p.2 — "TarunSpeaks is a next-gen corporate training and consulting company built to inspire action, drive growth, and spark transformation."
  about: 'TarunSpeaks is a next-gen corporate training and consulting company built to inspire action, drive growth, and spark transformation.',
  // profile p.2
  approach: 'With over 10+ years of experience, we specialise in transforming teams through high-impact learning that’s relevant, practical, and inspiring.',
  // profile p.3 and tarunmakhija.in journey page
  mission: 'Empower 1 million individuals by December 1, 2029',
  // profile p.4 and tarunmakhija.in journey page
  vision: 'Help 1 billion people make money by doing what they love',
  // profile p.66
  closing: 'Let’s build a digital-first, confident, high-performing workforce — together.',
  phone: { label: '+91 97702 23646', href: 'tel:+919770223646' },
  email: { label: 'teamtarunspeaks@gmail.com', href: 'mailto:teamtarunspeaks@gmail.com' },
}

// profile p.5
export const founderCredentials = [
  'Chief Educator & Founder, TarunSpeaks',
  'Co-founded Big Mouth Digital & Media',
  'BW Marketing 30 Under 30 — 2023',
]

export type Stat = { value: number; suffix?: string; label: string; source: string }

// profile pp.2, 6–8. These supersede the older 25,000+ / 1,600+ / 297+ figures on tarunmakhija.in.
export const proofStats: Stat[] = [
  { value: 29000, suffix: '+', label: 'Individuals trained', source: 'profile p.6' },
  { value: 2300, suffix: '+', label: 'Training sessions conducted', source: 'profile p.7' },
  { value: 300, suffix: '+', label: 'Brands trained & consulted', source: 'profile p.8' },
  { value: 15, suffix: '+', label: 'Industries', source: 'profile p.8' },
  { value: 10, suffix: '+', label: 'Years of experience', source: 'profile p.2' },
]

// tarunmakhija.in journey page: "Conducted 100+ keynote sessions on digital marketing, entrepreneurship, and business strategy."
export const keynoteStat: Stat = { value: 100, suffix: '+', label: 'Keynote sessions', source: 'tarunmakhija.in' }

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tarunmakhija01/' },
  { label: 'Instagram', href: 'https://www.instagram.com/tarunmakhija01/' },
  { label: 'X (Twitter)', href: 'https://twitter.com/tarunmakhija01' },
  { label: 'YouTube', href: 'https://www.youtube.com/@tarunmakhija01' },
]

export const navLinks = [
  { label: 'Programs', to: '/programs' },
  { label: 'Corporate Training', to: '/corporate-training' },
  { label: 'Consulting', to: '/consulting' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Speaking', to: '/speaking' },
  { label: 'About', to: '/about' },
]

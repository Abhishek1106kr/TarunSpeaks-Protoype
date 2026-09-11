export type Stat = { value: number; suffix?: string; label: string }

// Figures as published on tarunmakhija.in.
export const credibilityStats: Stat[] = [
  { value: 25000, suffix: '+', label: 'Individuals trained' },
  { value: 1600, suffix: '+', label: 'Training sessions delivered' },
  { value: 100, suffix: '+', label: 'Keynote sessions' },
  { value: 297, suffix: '+', label: 'Brands worked with' },
]

export const agencyStats: Stat[] = [
  { value: 150, suffix: '+', label: 'Clients across the globe' },
  { value: 15, suffix: '+', label: 'Industries' },
  { value: 750, suffix: '+', label: 'Campaigns on digital platforms' },
]

export const communityStats: Stat[] = [
  { value: 20000, suffix: '+', label: 'Followers across social platforms' },
  { value: 2000000, suffix: '+', label: 'People reached every month' },
  { value: 4, label: 'Active Be Limitless WhatsApp groups' },
]

export const experienceStat: Stat = { value: 10, suffix: '+', label: 'Years of experience' }

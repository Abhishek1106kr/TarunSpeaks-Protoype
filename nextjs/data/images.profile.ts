// Photography extracted from "Company Profile - TarunSpeaks '26" (repo root PDF); `page` is the source page.
// The profile REUSES some photos across clients; those carry neutral names and must not be captioned
// with a client (see .claude/skills/brand-system — 'Photo attribution').
// Regenerate with the snippet in .claude/skills/brand-system/SKILL.md — do not hand-edit dimensions.
export const profileImages = {
  'founder-portrait': { src: '/images/profile/founder-portrait.webp', width: 640, height: 800, page: 5 },
  'about-audience': { src: '/images/profile/about-audience.webp', width: 800, height: 482, page: 2 },
  'about-stage': { src: '/images/profile/about-stage.webp', width: 800, height: 533, page: 2 },
  // pages 2, 25, 34, 38 and 42 (About, NewTech, Sansaar, Motilal Oswal, HDFC Bank) — neutral caption only
  'session-classroom': { src: '/images/profile/session-classroom.webp', width: 800, height: 600, page: 2 },
  'nawany-session': { src: '/images/profile/nawany-session.webp', width: 600, height: 800, page: 17 },
  'nawany-workshop': { src: '/images/profile/nawany-workshop.webp', width: 600, height: 800, page: 19 },
  'nawany-team': { src: '/images/profile/nawany-team.webp', width: 800, height: 600, page: 20 },
  'godrej-session': { src: '/images/profile/godrej-session.webp', width: 800, height: 600, page: 21 },
  'godrej-tarun': { src: '/images/profile/godrej-tarun.webp', width: 600, height: 800, page: 23 },
  'godrej-cohort': { src: '/images/profile/godrej-cohort.webp', width: 800, height: 600, page: 24 },
  'newtech-room': { src: '/images/profile/newtech-room.webp', width: 600, height: 800, page: 27 },
  'newtech-workshop': { src: '/images/profile/newtech-workshop.webp', width: 800, height: 600, page: 28 },
  'doubletap-session': { src: '/images/profile/doubletap-session.webp', width: 800, height: 600, page: 29 },
  'sansaar-stage': { src: '/images/profile/sansaar-stage.webp', width: 800, height: 533, page: 36 },
  'motilal-stage': { src: '/images/profile/motilal-stage.webp', width: 600, height: 800, page: 40 },
  'motilal-room': { src: '/images/profile/motilal-room.webp', width: 800, height: 597, page: 41 },
  // pages 44 and 48 (HDFC Bank and Project Sophos) — neutral caption only
  'session-full-hall': { src: '/images/profile/session-full-hall.webp', width: 600, height: 800, page: 44 },
  // pages 45 and 49 (HDFC Bank and Project Sophos) — neutral caption only
  'session-hands-raised': { src: '/images/profile/session-hands-raised.webp', width: 800, height: 533, page: 45 },
  'sophos-speaker': { src: '/images/profile/sophos-speaker.webp', width: 451, height: 800, page: 46 },
  'bentley-session': { src: '/images/profile/bentley-session.webp', width: 800, height: 600, page: 50 },
  'bentley-team': { src: '/images/profile/bentley-team.webp', width: 599, height: 800, page: 52 },
  'bentley-cohort': { src: '/images/profile/bentley-cohort.webp', width: 800, height: 600, page: 53 },
  'program-leadership': { src: '/images/profile/program-leadership.webp', width: 599, height: 800, page: 56 },
  'program-branding': { src: '/images/profile/program-branding.webp', width: 800, height: 600, page: 58 },
  'program-ai-productivity': { src: '/images/profile/program-ai-productivity.webp', width: 800, height: 532, page: 59 },
  'program-ai-sales': { src: '/images/profile/program-ai-sales.webp', width: 450, height: 800, page: 60 },
  'program-marketing': { src: '/images/profile/program-marketing.webp', width: 800, height: 532, page: 61 },
  'program-client': { src: '/images/profile/program-client.webp', width: 720, height: 515, page: 62 },
  'program-communication': { src: '/images/profile/program-communication.webp', width: 800, height: 533, page: 63 },
  'program-group': { src: '/images/profile/program-group.webp', width: 720, height: 540, page: 64 },
  'program-custom': { src: '/images/profile/program-custom.webp', width: 800, height: 600, page: 65 },
} as const

export type ProfileImageName = keyof typeof profileImages

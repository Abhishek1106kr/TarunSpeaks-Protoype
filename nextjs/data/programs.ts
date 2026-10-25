import type { PhotoName } from '../lib/images'

// Flagship programs — profile pp.54–65. Titles, durations and modules are verbatim from the profile;
// `audience` and `problem` restate each program's own "Designed for / Designed to" line, nothing more.

export type ProgramCategory = 'AI capability' | 'Sales & client growth' | 'Leadership' | 'Marketing & brand' | 'Communication'

export type Program = {
  slug: string
  title: string
  category: ProgramCategory
  audience: string
  problem: string
  summary: string
  duration: string
  modules: string[]
  image: PhotoName
  imageAlt: string
  caseStudies: string[]
}

export const programs: Program[] = [
  {
    slug: 'ai-tools-for-productivity-and-marketing',
    title: 'AI Tools for Productivity & Marketing',
    category: 'AI capability',
    audience: 'Cross-functional teams: Sales, Marketing, HR and Finance',
    problem: 'Teams have access to AI tools but are not yet using them to save time, spark ideas or automate routine work.',
    summary: 'Empowering teams with hands-on AI skills to save time, spark creativity, and automate tasks.',
    duration: '6–18 hours',
    modules: [
      'Demystifying AI: ChatGPT, Copilot, Gemini',
      'Tools for Content Creation (Jasper, Canva AI, Notion AI)',
      'AI for Campaign Planning & Idea Generation',
      'Automation with AI (Zapier, Formula Bot, Reclaim.ai)',
      'Department-specific use cases: Sales, Marketing, HR, Finance',
    ],
    image: 'program-ai-productivity',
    imageAlt: 'Tarun Makhija presenting to a full training room',
    caseStudies: ['nawany-group', 'godrej-properties', 'double-tap-digital'],
  },
  {
    slug: 'ai-tools-training-for-sales-teams',
    title: 'AI Tools Training for Sales Teams',
    category: 'AI capability',
    audience: 'Sales professionals and sales leadership',
    problem: 'Prospecting, meeting preparation and follow-ups take too long and depend on individual habits.',
    summary: 'Designed to help sales professionals leverage AI for smarter prospecting, faster follow-ups, and sharper communication.',
    duration: '3–15 hours',
    modules: [
      'AI for Lead Generation & Prospect Research',
      'Crafting Personalized Pitches in Seconds',
      'Smarter Meeting Prep Using AI Tools',
      'AI-Assisted Sales Emails & Follow-ups',
    ],
    image: 'program-ai-sales',
    imageAlt: 'Tarun Makhija facilitating a sales training session',
    caseStudies: ['newtech-insurance-brokers', 'nawany-group'],
  },
  {
    slug: 'execution-focused-leadership-journey',
    title: 'Execution-Focused Leadership Journey',
    category: 'Leadership',
    audience: 'Managers moving into broader leadership responsibility',
    problem: 'Managers spend their time firefighting instead of leading with clarity, delegation and ownership.',
    summary: 'Designed to help managers transition from firefighting to focused leadership through clarity, ownership, and real-world application.',
    duration: '18–24 hours',
    modules: [
      'Clarity in Role & Ownership',
      'Delegation & Managing Downstream Execution',
      'Cross-Functional Collaboration & Influence',
      'Coaching Conversations & Team Development',
      'Values-Based Decision Making & Feedback',
      'Review Labs: Reflection, Accountability & Growth',
    ],
    image: 'program-leadership',
    imageAlt: 'Tarun Makhija on stage facing a large audience',
    caseStudies: [],
  },
  {
    slug: 'leadership-energy-and-self-mastery',
    title: 'Leadership, Energy & Self-Mastery',
    category: 'Leadership',
    audience: 'Professionals and entrepreneurs',
    problem: 'High performers struggle to sustain energy, focus and confidence in a fast-paced, always-on environment.',
    summary: 'Designed for professionals and entrepreneurs to lead with clarity, manage energy, and build a mindset for growth in today’s fast-paced world.',
    duration: '6–12 hours',
    modules: [
      'Energy Management for High Performers',
      'Stress Management in a Digital World',
      'Leadership Through Influence, Not Authority',
      'Growth Mindset & Personal Productivity Hacks',
      'The Inner Game of Confidence',
    ],
    image: 'program-group',
    imageAlt: 'Participants gathered with Tarun Makhija after a session',
    caseStudies: [],
  },
  {
    slug: 'personal-branding-and-linkedin',
    title: 'Personal Branding & LinkedIn for Professionals',
    category: 'Marketing & brand',
    audience: 'Professionals, senior leaders, founders and client-facing teams',
    problem: 'Experienced people are under-represented online, so their credibility does not reach clients, partners or talent.',
    summary: 'Build strong digital presence, credibility, and influence online.',
    duration: '6–15 hours',
    modules: [
      'Optimising LinkedIn Profiles',
      'Crafting a Personal Brand Narrative',
      'Storytelling for Sales & Influence',
      'Thought Leadership Content Strategy',
      'LinkedIn Sales Navigator Deep Dive',
      'The 90-Day LinkedIn Challenge',
    ],
    image: 'program-branding',
    imageAlt: 'A training cohort photographed with Tarun Makhija',
    caseStudies: ['motilal-oswal', 'newtech-insurance-brokers', 'project-sophos'],
  },
  {
    slug: 'modern-marketing-strategies',
    title: 'Modern Marketing Strategies & Content Frameworks',
    category: 'Marketing & brand',
    audience: 'In-house marketers and brand teams',
    problem: 'Marketing teams need sharper content, channel and performance-marketing fundamentals to improve digital performance.',
    summary: 'Designed for in-house marketers and brand teams to improve digital performance.',
    duration: '3–18 hours',
    modules: [
      'Building Campaigns with Strategic Content',
      'Performance Marketing Basics (Meta & Google)',
      'Reels & Video Marketing',
      'Data-Led Storytelling',
      'Content Calendar + Channel Mix Strategy',
    ],
    image: 'program-marketing',
    imageAlt: 'Tarun Makhija teaching in a tiered auditorium',
    caseStudies: ['hdfc-bank'],
  },
  {
    slug: 'digital-client-relationships',
    title: 'Building & Managing Digital Client Relationships',
    category: 'Sales & client growth',
    audience: 'Client-facing teams',
    problem: 'Client acquisition, engagement and retention still rely on offline habits that do not scale digitally.',
    summary: 'Designed for client-facing teams to strengthen acquisition, engagement, and retention using modern storytelling and digital tools.',
    duration: '6–18 hours',
    modules: [
      'Digital Storytelling for Client Acquisition',
      'Networking & Visibility through Digital Communities',
      'Role-Play for High-Stakes Client Conversations',
      'Mapping the Digital Client Lifecycle',
      'Retention Tactics Using Email, Social & Automation',
    ],
    image: 'program-client',
    imageAlt: 'Tarun Makhija presenting in a seminar hall',
    caseStudies: ['sansaar-by-ddecor', 'motilal-oswal'],
  },
  {
    slug: 'communication-and-influence',
    title: 'Communication & Influence Skills',
    category: 'Communication',
    audience: 'Professionals who present, pitch and negotiate',
    problem: 'Good ideas lose impact when people cannot present, pitch or handle objections with clarity.',
    summary: 'Practical tools to help professionals present, pitch, and communicate with clarity.',
    duration: '3–15 hours',
    modules: [
      'Public Speaking & Presentation Skills',
      'Crafting Your Elevator Pitch',
      'Handling Objections & Building Trust',
      'Influence Through Authentic Communication',
    ],
    image: 'program-communication',
    imageAlt: 'Tarun Makhija speaking in front of a slide reading “Empower 1 billion individuals”',
    caseStudies: ['godrej-properties', 'bentley-systems'],
  },
]

export const programCategories: ProgramCategory[] = ['AI capability', 'Sales & client growth', 'Leadership', 'Marketing & brand', 'Communication']

export const programBySlug = (slug: string) => programs.find((program) => program.slug === slug)

// profile p.64 — "We can train on"
export const trainingTopics = [
  'Digital Marketing Fundamentals',
  'Performance Marketing (Google Ads & Meta Ads)',
  'Instagram & LinkedIn Growth Masterclass',
  'Personal Branding for Professionals & Entrepreneurs',
  'Storytelling for Social Media',
  'LinkedIn Profile, Networking & Content Workshop',
  'Starting and Scaling a Freelance or Consulting Business',
  'Business Development & Client Acquisition',
  'Pitching & Negotiation Skills',
  'Time Management & Productivity for Creators',
  'Growth Mindset & Self-Confidence Building',
  'Using ChatGPT for Content Creation & Campaigns',
  'From 0 to 30 Reels with AI',
  'The Future of Work: AI, Personal Branding & Digital Skills',
]

// profile p.65
export const customModuleAreas = ['AI x Industry Deep Dives', 'Sales & Leadership Training', 'Digital Marketing & Personal Branding']

// profile p.65 — delivery terms that apply to every program.
export const deliveryTerms = {
  duration: '3–30 hours',
  basis: 'based on depth, team size, and format',
  formats: ['Workshop', 'Masterclass', 'Full learning journey'],
  note: 'All training programs are modular and customisable.',
}

// profile p.10 — "What we train on"
export const trainingAreas = [
  'Digital Marketing & Growth',
  'Personal Branding & Communication',
  'Presentation & Business Skills',
  'Sales & Leadership',
  'Specialised Masterclasses',
  'AI-Powered Workshops',
]

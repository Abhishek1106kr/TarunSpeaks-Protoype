import type { PhotoName } from '../lib/images'

// Case studies — company profile pp.15–53, reproduced without embellishment.
// `figures` are numbers printed in the profile; `reported` are the profile's own "The Impact" statements.
// Nothing here is an independent measurement — the UI labels them "reported" for that reason.

export type CaseStudyTrack = 'AI training & consultation' | 'Capability building'

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  location?: string
  track: CaseStudyTrack
  headline: string
  objective: string
  format: string[]
  audience: string
  delivered: string[]
  figures: { value: string; label: string }[]
  reported: string[]
  programs: string[]
  // Only photos that appear on this client's own profile pages and nowhere else. The profile reuses some
  // photos across clients; those are excluded here, so a study may have none (the UI goes typographic).
  images: { name: PhotoName; alt: string }[]
  pages: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nawany-group',
    client: 'Nawany Group',
    industry: 'Real estate, trading & logistics',
    track: 'AI training & consultation',
    headline: 'Empowering Nawany Group with AI for practical impact',
    objective: 'An AI training to boost efficiency, automation, and AI awareness across roles in Real Estate, Trading, Logistics, and more.',
    format: ['3-month AI training', '50+ participants', 'Multiple functions: Sales, Marketing, Operations etc.'],
    audience: 'Sales, Marketing, Finance, HR and Operations teams',
    delivered: [
      'Introduction to Generative AI & business applications',
      'Prompt & Context Engineering for meaningful AI outputs',
      'Hands-on exercises for Sales, Marketing, Finance, HR, and Operations',
      'Introduction to AI Agents & Automation for real workflow mapping',
      'Personalised AI adoption plan for each participant',
    ],
    figures: [{ value: '3', label: 'Months' }, { value: '50+', label: 'Participants' }],
    reported: [
      '50+ participants trained with practical AI skills',
      'Hands-on application across roles',
      'Improved efficiency, automation, and decision-making',
      'Foundation for ongoing AI adoption',
    ],
    programs: ['ai-tools-for-productivity-and-marketing', 'ai-tools-training-for-sales-teams'],
    images: [
      { name: 'nawany-session', alt: 'Nawany Group team members in an AI training session led by Tarun Makhija' },
      { name: 'nawany-workshop', alt: 'Tarun Makhija presenting during the Nawany Group AI programme' },
      { name: 'nawany-team', alt: 'Tarun Makhija with Nawany Group leaders' },
    ],
    pages: '17–20',
  },
  {
    slug: 'godrej-properties',
    client: 'Godrej Properties',
    industry: 'Real estate',
    track: 'AI training & consultation',
    headline: 'AI-powered presentation excellence for Godrej Properties',
    objective: 'Transforming information-heavy decks into action-oriented narratives using AI design and storytelling workflows.',
    format: ['2-day intensive training', '50+ participants', 'Junior & mid-senior level professionals, design teams'],
    audience: 'Junior and mid-senior professionals in design teams',
    delivered: [
      'Strategic storytelling using the Context → Insight → Recommendation (CIR) framework',
      'AI-powered deck creation with Gamma, Canva AI, and Copilot',
      'Clear, structured slide design using visual hierarchy principles',
      'Insight-led data visualization and dashboards',
      'Delivery toolkits to improve presence and narrative flow',
    ],
    figures: [{ value: '2', label: 'Day intensive' }, { value: '50+', label: 'Professionals' }],
    reported: [
      '50+ professionals trained in AI-led storytelling and design',
      'Reduced deck creation time with improved visual quality',
      'Shift from information-heavy to insight-driven presentations',
      'Improved delivery confidence through practice and feedback',
    ],
    programs: ['ai-tools-for-productivity-and-marketing', 'communication-and-influence'],
    images: [
      { name: 'godrej-session', alt: 'Tarun Makhija leading a presentation workshop for Godrej Properties' },
      { name: 'godrej-tarun', alt: 'Tarun Makhija at the Godrej Properties office' },
      { name: 'godrej-cohort', alt: 'The Godrej Properties cohort with Tarun Makhija' },
    ],
    pages: '21–24',
  },
  {
    slug: 'newtech-insurance-brokers',
    client: 'NewTech Insurance Brokers LLC',
    industry: 'Insurance brokerage',
    location: 'Dubai',
    track: 'AI training & consultation',
    headline: 'Driving global sales authority: AI & LinkedIn mastery',
    objective: 'A long-term engagement for senior sales leadership focused on mastering digital authority and AI.',
    format: ['3-month structured, long-term engagement', 'Senior sales teams', 'Dubai-based international insurance brokerage'],
    audience: 'Senior sales leadership',
    delivered: [
      'LinkedIn strategy for senior sales leadership',
      'AI tools for prospecting, content, and follow-ups',
      'Personal brand positioning for sales credibility',
      'Structured content and outreach frameworks',
      'Hands-on reviews and iterative improvement cycles',
    ],
    figures: [{ value: '3 months', label: 'Engagement length' }],
    reported: [
      'Established a sustained, 3-month capability-building engagement',
      'Stronger LinkedIn presence and thought leadership for senior sales',
      'Improved consistency in outreach and follow-ups using AI',
      'Clear shift from ad-hoc efforts to a structured growth system',
    ],
    programs: ['ai-tools-training-for-sales-teams', 'personal-branding-and-linkedin'],
    images: [
      { name: 'newtech-room', alt: 'NewTech Insurance Brokers sales leaders during a training session' },
      { name: 'newtech-workshop', alt: 'Tarun Makhija reviewing work with NewTech participants' },
    ],
    pages: '25–28',
  },
  {
    slug: 'double-tap-digital',
    client: 'Double Tap Digital',
    industry: 'Creative & digital agency',
    location: 'Dubai',
    track: 'AI training & consultation',
    headline: 'A Dubai-based agency harnessing AI for creative visuals',
    objective: 'Hands-on training to create realistic visuals for branding, social media, and advertising.',
    format: ['1-on-1 AI training', 'AI-generated visuals for branding & advertising', 'Practical application for client projects'],
    audience: 'Agency creative team',
    delivered: [
      'AI tools for generating realistic visuals',
      'Prompt frameworks for social media and brand content',
      'Hands-on creation of visuals using AI',
      'Guidance on integrating AI into creative projects',
    ],
    figures: [{ value: '1:1', label: 'AI training' }],
    reported: [
      'AI-generated visuals implemented in client projects',
      'Reduced content creation time while maintaining quality',
      'Enabled high-quality branding and advertising outputs',
      'Practical AI application for ongoing creative work',
    ],
    programs: ['ai-tools-for-productivity-and-marketing'],
    images: [{ name: 'doubletap-session', alt: 'Tarun Makhija during a hands-on AI training session' }],
    pages: '29–32',
  },
  {
    slug: 'sansaar-by-ddecor',
    client: 'Sansaar by D’Decor',
    industry: 'Home furnishings retail',
    track: 'Capability building',
    headline: 'Fuelling retail impact for Sansaar by D’Decor across 42 cities',
    objective: 'Equipping 4,300+ sales leaders with storytelling, sustainability, and selling with purpose.',
    format: ['42 cities in India', '100 top-performing stores', '4,300+ trained, retail sales teams, managers & founders'],
    audience: 'Retail sales teams, store managers and founders',
    delivered: [
      'Storytelling for Sales: how to sell luxury with emotion',
      'Communicating Sustainability in Retail',
      'Brand Experience Training at the store level',
      'Aligning Sales Strategy with Brand Purpose',
      'Energy-filled, practical workshops with real scenarios',
    ],
    figures: [{ value: '4,300+', label: 'Trained' }, { value: '42', label: 'Cities' }, { value: '100', label: 'Top stores' }],
    reported: [
      'Top 100 stores trained & empowered with consistent messaging',
      '4,300+ trained across 42 cities',
      'Leadership-level participation',
      'Activated “Purpose-Driven Selling”',
      'Sales teams more aligned with brand values',
    ],
    programs: ['digital-client-relationships', 'communication-and-influence'],
    images: [
      { name: 'sansaar-stage', alt: 'Tarun Makhija addressing a Sansaar by D’Decor audience' },
    ],
    pages: '34–37',
  },
  {
    slug: 'motilal-oswal',
    client: 'Motilal Oswal',
    industry: 'Financial services',
    track: 'Capability building',
    headline: 'How we impacted 3,000 entrepreneurs across India',
    objective: 'An 11-city tour with Motilal Oswal to build personal brands, boost digital confidence, and drive business growth.',
    format: ['3,000 entrepreneurs', '11-city offline training tour', '3-month engagement'],
    audience: 'Entrepreneurs and professionals in the Motilal Oswal network',
    delivered: [
      'LinkedIn Profile Optimisation',
      'Storytelling for Sales & Client Acquisition',
      'Personal Branding in a Digital-First World',
      'Sales Navigator Training & Live Profile Reviews',
      'Building Trust online in under 3 seconds',
      'Post-session #90DayChallenge to sustain momentum',
    ],
    figures: [{ value: '3,000+', label: 'Trained' }, { value: '11', label: 'Cities' }, { value: '500+', label: 'First-time LinkedIn posts' }, { value: '200+', label: 'Profiles optimised in-session' }],
    reported: [
      '3,000+ entrepreneurs & professionals trained',
      '500+ first-time LinkedIn posts',
      '200+ profiles optimised in-session',
      'Standing ovation moments, Ahmedabad',
      'Measurable boost in digital visibility & confidence',
    ],
    programs: ['personal-branding-and-linkedin', 'digital-client-relationships'],
    images: [
      { name: 'motilal-stage', alt: 'Tarun Makhija on the Motilal Oswal stage' },
      { name: 'motilal-room', alt: 'A Motilal Oswal training session in progress' },
    ],
    pages: '38–41',
  },
  {
    slug: 'hdfc-bank',
    client: 'HDFC Bank',
    industry: 'Banking',
    track: 'Capability building',
    headline: "Digital transformation training for HDFC Bank's retail business network",
    objective: 'Empowering teams to build their first digital presence and master WhatsApp marketing.',
    format: ['7-city training series', '1,500+ local & retail business owners', 'Focused on digital transformation'],
    audience: 'Local and retail business owners',
    delivered: [
      'Building a Website: tools, templates, & strategy',
      'Creating a Digital Marketing Plan from scratch',
      'WhatsApp Business for local & regional engagement',
      'Using Bitly for smarter tracking and link sharing',
      'Practical, demo-led sessions for instant application',
    ],
    figures: [{ value: '1,500+', label: 'Business owners' }, { value: '7', label: 'Cities' }],
    reported: [
      'Teams built their first-ever online presence',
      'Equipped with DIY digital tools',
      'WhatsApp became a core part of regional marketing',
      'Confidence in navigating the digital ecosystem',
      'Foundation set for long-term brand-led communication',
    ],
    programs: ['modern-marketing-strategies'],
    images: [],
    pages: '42–45',
  },
  {
    slug: 'project-sophos',
    client: 'Project Sophos',
    industry: 'Professional development',
    track: 'Capability building',
    headline: 'Building personal brands',
    objective: 'A structured personal branding engagement focused on clarity, positioning, and consistent digital presence.',
    format: ['Recurring engagement', 'Delivered across multiple cohorts', 'Focused on credible digital presence'],
    audience: 'Multiple participant cohorts',
    delivered: [
      'Foundations of personal branding and digital presence',
      'Clarity on positioning, niche, and value proposition',
      'Profile and content audits with actionable improvements',
      'Practical frameworks for consistency across platforms',
    ],
    figures: [{ value: 'Recurring cohorts', label: 'Delivery format' }],
    reported: [
      'Executed multiple times as a repeatable personal branding program',
      'Participants gained clear personal brand direction and confidence',
      'Improved visibility, credibility, and content clarity',
      'Actionable outputs ready for immediate implementation',
    ],
    programs: ['personal-branding-and-linkedin'],
    images: [
      { name: 'sophos-speaker', alt: 'Tarun Makhija presenting at a Project Sophos session' },
    ],
    pages: '46–49',
  },
  {
    slug: 'bentley-systems',
    client: 'Bentley Systems',
    industry: 'Engineering software',
    track: 'Capability building',
    headline: 'Career-ready skills for future engineers',
    objective: 'A 4-day intensive engagement for M.Tech students to bridge the gap between technical expertise and professional visibility.',
    format: ['4-day structured career readiness program', '40+ M.Tech students, core engineering', 'AI, communication, LinkedIn & resume focus'],
    audience: 'M.Tech students in core engineering',
    delivered: [
      'AI & prompting frameworks for faster research',
      'Interview communication through roleplay',
      'LinkedIn positioning for industry visibility',
      'Resume, portfolio, and job search roadmap',
    ],
    figures: [{ value: '96%', label: 'Satisfaction' }, { value: '90%', label: 'Relevance to career goals' }, { value: '100%', label: 'Would recommend' }, { value: '4.7/5', label: 'Confidence to apply' }],
    reported: [
      '96% satisfaction with the learning experience',
      '90% relevance to career goals',
      '100% recommendation rate',
      '4.7/5 confidence to apply learnings',
      'Stronger communication and interview clarity',
      'Clear career direction and job readiness',
    ],
    programs: ['communication-and-influence', 'personal-branding-and-linkedin'],
    images: [
      { name: 'bentley-session', alt: 'Tarun Makhija teaching the Bentley Systems career readiness program' },
      { name: 'bentley-team', alt: 'Tarun Makhija with programme organisers' },
      { name: 'bentley-cohort', alt: 'The Bentley Systems M.Tech cohort' },
    ],
    pages: '50–53',
  },
]

export const caseStudyBySlug = (slug: string) => caseStudies.find((study) => study.slug === slug)

// Homepage order: one AI engagement, one scale engagement, one long-term sales engagement.
export const featuredCaseStudies = ['nawany-group', 'sansaar-by-ddecor', 'newtech-insurance-brokers'].map((slug) => caseStudyBySlug(slug)!)

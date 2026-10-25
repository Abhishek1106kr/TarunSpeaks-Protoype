// "What we consult on" — company profile p.13. Area names are verbatim; each `scope` line describes
// the area in plain terms without claiming outcomes. `evidence` links only to documented engagements.

export type ConsultingArea = {
  slug: string
  title: string
  group: 'Growth & brand' | 'AI'
  scope: string
  evidence?: { label: string; href: string }
}

export const consultingAreas: ConsultingArea[] = [
  {
    slug: 'branding-digital-marketing',
    title: 'Branding & Digital Marketing',
    group: 'Growth & brand',
    scope: 'Digital and branding strategy for businesses. This is the practice Tarun built at Big Mouth Digital & Media, across 750+ campaigns on digital platforms.',
  },
  {
    slug: 'business-growth',
    title: 'Business Growth',
    group: 'Growth & brand',
    scope: 'Working with founders and leadership teams on the growth levers that sit between marketing, sales and positioning.',
  },
  {
    slug: 'campaign-led-consulting',
    title: 'Advertising: Campaign-led Consulting',
    group: 'Growth & brand',
    scope: 'Consulting anchored on specific campaigns: planning, content and performance marketing on Meta and Google.',
  },
  {
    slug: 'personal-branding-cxos',
    title: 'Personal Branding for CXOs / Founders',
    group: 'Growth & brand',
    scope: 'Positioning, narrative and a consistent LinkedIn presence for senior leaders whose visibility carries the company’s credibility.',
    evidence: { label: 'NewTech Insurance Brokers', href: '/case-studies/newtech-insurance-brokers' },
  },
  {
    slug: 'ai-tools-agent-deployment',
    title: 'AI Tools / Agent Deployment',
    group: 'AI',
    scope: 'Choosing and rolling out AI tools and agents against real workflows, so teams adopt them in day-to-day work rather than in isolated pilots.',
    evidence: { label: 'Nawany Group', href: '/case-studies/nawany-group' },
  },
  {
    slug: 'gen-ai-agentic-ai-implementation',
    title: 'AI: Gen AI & Agentic AI Implementation',
    group: 'AI',
    scope: 'Mapping where generative and agentic AI fit into existing workflows, from prompt and context engineering to automation.',
    evidence: { label: 'Nawany Group', href: '/case-studies/nawany-group' },
  },
]

// The consultation process published on tarunmakhija.in/digital-marketing-consultant (spelling corrected).
export const consultationProcess = [
  { number: '01', title: 'Process identification', description: 'Identify objectives, scope, players and work areas.' },
  { number: '02', title: 'Assemble a team', description: 'Find people who work well with the process.' },
  { number: '03', title: 'Process mapping', description: 'Turn the collected information into a process map.' },
  { number: '04', title: 'Manage the process', description: 'Maintain, store and routinely review the map.' },
]

// How the three kinds of engagement differ. Each line is grounded in a documented engagement.
export const engagementModes = [
  {
    title: 'Training',
    question: 'Your people need a new capability.',
    body: 'Modular programs from 3 to 30 hours, delivered as workshops, masterclasses or full learning journeys, built around your roles and real scenarios.',
    example: { label: 'Sansaar by D’Decor, 4,300+ trained across 42 cities', href: '/case-studies/sansaar-by-ddecor' },
    href: '/corporate-training',
    cta: 'Explore Corporate Programs',
  },
  {
    title: 'Advisory',
    question: 'Leadership needs a clear direction.',
    body: 'Consulting on branding, digital marketing, campaigns, business growth and personal branding for CXOs and founders.',
    example: { label: 'NewTech Insurance Brokers, 3-month senior sales engagement', href: '/case-studies/newtech-insurance-brokers' },
    href: '#areas',
    cta: 'See consulting areas',
  },
  {
    title: 'AI adoption support',
    question: 'The work has to change, not just the knowledge.',
    body: 'Hands-on support to map workflows, roll out AI tools and agents, and set each person up with a plan they can act on.',
    example: { label: 'Nawany Group, personalised AI adoption plan for each participant', href: '/case-studies/nawany-group' },
    href: '/contact?interest=ai',
    cta: 'Discuss AI Capability Building',
  },
]

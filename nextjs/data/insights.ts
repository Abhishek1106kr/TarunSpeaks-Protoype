import type { ImageName } from './images.generated'

export type InsightTopic = 'Social Media' | 'Content Creation' | 'Marketing Strategy' | 'Journey'

export type Insight = {
  category: string
  topic: InsightTopic
  title: string
  excerpt: string
  image: ImageName
  href: string
}

export const insightTopics: InsightTopic[] = ['Social Media', 'Content Creation', 'Marketing Strategy', 'Journey']

// Articles published on tarunmakhija.in.
export const insights: Insight[] = [
  {
    category: 'LinkedIn',
    topic: 'Social Media',
    title: '7 Strategies to Supercharge Your LinkedIn Presence and Build Authority',
    excerpt: 'LinkedIn has evolved into a potent instrument for industry leadership, professional networking, and personal branding.',
    image: 'insight-linkedin',
    href: 'https://tarunmakhija.in/linkedin-strategies-to-build-authority/',
  },
  {
    category: 'Instagram',
    topic: 'Social Media',
    title: '7 Powerful Strategies to Dominate Instagram and Skyrocket Your Growth',
    excerpt: 'Instagram has developed into a powerful tool for companies, artists, and brands looking to reach a wider audience.',
    image: 'insight-instagram',
    href: 'https://tarunmakhija.in/7-proven-instagram-strategies-for-2025/',
  },
  {
    category: 'Creator',
    topic: 'Content Creation',
    title: 'Why 2025 Is the Best Time to Become a Content Creator',
    excerpt: 'Social media platforms, AI-powered tools, and changing consumer behavior are contributing to a new creator economy.',
    image: 'insight-creator',
    href: 'https://tarunmakhija.in/content-creator-2025-guide/',
  },
  {
    category: 'WhatsApp Marketing',
    topic: 'Social Media',
    title: 'Why WhatsApp Marketing Is the Ultimate Tool to Convert Your Customers',
    excerpt: 'Brands cannot afford to undervalue WhatsApp marketing in this era of fast communication.',
    image: 'insight-whatsapp',
    href: 'https://tarunmakhija.in/why-whatsapp-marketing-is-the-ultimate-tool/',
  },
  {
    category: 'Podcast',
    topic: 'Content Creation',
    title: 'Podcast Marketing Mastery: A Strategic Guide to Launching a Podcast',
    excerpt: 'Because the podcasting industry is evolving rapidly, now is a fantastic time to launch your own.',
    image: 'insight-podcast',
    href: 'https://tarunmakhija.in/a-strategic-guide-to-launching-a-podcast-in-2025/',
  },
  {
    category: 'Digital Marketing',
    topic: 'Journey',
    title: 'From IT Engineer to Digital Marketing Mentor',
    excerpt: 'Tarun’s professional journey started in Information Technology after earning a degree in IT engineering.',
    image: 'insight-digital-marketing',
    href: 'https://tarunmakhija.in/journey-from-it-engineering-to-digital-marketing/',
  },
  {
    category: 'Campaigns',
    topic: 'Marketing Strategy',
    title: 'Campaigns That Crashed the Internet: Top 10 Marketing Wins',
    excerpt: 'Indian brands used a mix of creativity, culture, and sharp strategy to make 2024 memorable.',
    image: 'insight-campaigns',
    href: 'https://tarunmakhija.in/campaigns-that-crashed-the-internet-in-2024/',
  },
  {
    category: 'AI Tools',
    topic: 'Marketing Strategy',
    title: '25 Powerful AI Tools Shaping India’s Business Landscape',
    excerpt: 'Artificial Intelligence is evolving at lightning speed, and India is emerging as a major player.',
    image: 'insight-ai-tools',
    href: 'https://tarunmakhija.in/ai-tools-shaping-indias-business-landscape-in-2025/',
  },
  {
    category: 'Marketing Trends',
    topic: 'Marketing Strategy',
    title: '2025 Digital Marketing Trends for FMCG & DTC',
    excerpt: 'Digital marketing trends are redefining how FMCG and direct-to-consumer brands grow.',
    image: 'insight-marketing-trends',
    href: 'https://tarunmakhija.in/digital-marketing-trends-for-fmcg-dtc-for-growth/',
  },
]

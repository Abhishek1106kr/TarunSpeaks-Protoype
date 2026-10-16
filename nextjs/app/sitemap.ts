import type { MetadataRoute } from 'next'
import { caseStudies } from '../data/caseStudies'
import { absoluteUrl } from '../lib/seo'

const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/programs', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/corporate-training', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/consulting', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/speaking', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  ...caseStudies.map((study) => ({ path: `/case-studies/${study.slug}`, priority: 0.7, changeFrequency: 'monthly' as const })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(({ path, priority, changeFrequency }) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority }))
}

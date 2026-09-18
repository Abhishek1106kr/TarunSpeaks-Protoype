import type { MetadataRoute } from 'next'
import { absoluteUrl } from '../lib/seo'

const routes = ['/', '/about', '/services', '/speaking', '/insights', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === '/insights' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}

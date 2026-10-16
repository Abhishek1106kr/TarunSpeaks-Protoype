import type { Metadata } from 'next'
import { company, socials } from '../data/company'

// Falls back to the known production domain (also the canonical in the previous site's index.html)
// when NEXT_PUBLIC_SITE_URL isn't set — documented, not invented.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tarunmakhija.in').replace(/\/$/, '')

export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

// Per-page metadata with matching canonical, Open Graph and Twitter fields.
export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const ogTitle = `${title} — TarunSpeaks`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description, url: path, type: 'website', siteName: 'TarunSpeaks', ...(image ? { images: [{ url: image }] } : {}) },
    twitter: { card: 'summary_large_image', title: ogTitle, description, ...(image ? { images: [image] } : {}) },
  }
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: company.name,
  url: siteUrl,
  description: company.about,
  slogan: 'Train. Consult. Empower.',
  email: company.email.label,
  telephone: '+91-97702-23646',
  founder: { '@id': `${siteUrl}/#founder` },
  sameAs: socials.map((social) => social.href),
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#founder`,
  name: 'Tarun Makhija',
  url: absoluteUrl('/about'),
  jobTitle: 'Chief Educator & Founder',
  worksFor: { '@id': `${siteUrl}/#organization` },
  image: absoluteUrl('/images/profile/founder-portrait.webp'),
  award: ['BW Marketing 30 Under 30 (2023)'],
  sameAs: socials.map((social) => social.href),
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.name,
  url: siteUrl,
  publisher: { '@id': `${siteUrl}/#organization` },
}

export const breadcrumbJsonLd = (segments: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: segments.map((segment, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: segment.name,
    item: absoluteUrl(segment.path),
  })),
})

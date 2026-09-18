// Falls back to the known production domain (also the canonical in the previous
// site's index.html) when NEXT_PUBLIC_SITE_URL isn't set, per the migration's
// "never guess the domain" rule — this value is documented, not invented.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tarunmakhija.in').replace(/\/$/, '')

export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tarun Makhija',
  url: siteUrl,
  jobTitle: ['Digital Marketing Consultant', 'Corporate Trainer', 'Public Speaker', 'Mentor'],
  image: absoluteUrl('/images/tarun-portrait-490.webp'),
  email: 'mailto:teamtarunspeaks@gmail.com',
  telephone: '+91-97702-23646',
  sameAs: [
    'https://www.linkedin.com/in/tarunmakhija01/',
    'https://www.instagram.com/tarunmakhija01/',
    'https://twitter.com/tarunmakhija01',
    'https://www.youtube.com/@tarunmakhija01',
  ],
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tarun Makhija',
  url: siteUrl,
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

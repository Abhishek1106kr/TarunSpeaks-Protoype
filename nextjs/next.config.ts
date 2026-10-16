import type { NextConfig } from 'next'

// URLs from the previous sites (tarunmakhija.in and the Vite app), kept alive as permanent redirects so
// existing links and search results land on the closest current page. /corporate-training is a real page again.
const legacyRedirects: [string, string][] = [
  ['/digital-marketing-consultant', '/consulting'],
  ['/digitial-marketing-consultant', '/consulting'],
  ['/training', '/corporate-training'],
  ['/public-speaking', '/speaking'],
  ['/journey-from-it-engineering-to-digital-marketing', '/about'],
  ['/blog', '/insights'],
  ['/blogs', '/insights'],
]

const nextConfig: NextConfig = {
  // Silences the workspace-root inference warning: this app is nested inside
  // the (still-live) Vite project's repo, which has its own lockfile.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig

import type { NextConfig } from 'next'

// URLs from the previous sites (tarunmakhija.in and the Vite app), kept alive as permanent redirects so
// existing links and search results land on the closest current page. Article URLs now point to local pages.
const legacyRedirects: [string, string][] = [
  ['/digital-marketing-consultant', '/consulting'],
  ['/digitial-marketing-consultant', '/consulting'],
  ['/training', '/corporate-training'],
  ['/public-speaking', '/speaking'],
  ['/journey-from-it-engineering-to-digital-marketing', '/insights/journey-from-it-engineering-to-digital-marketing'],
  ['/linkedin-strategies-to-build-authority', '/insights/linkedin-strategies-to-build-authority'],
  ['/7-proven-instagram-strategies-for-2025', '/insights/7-proven-instagram-strategies-for-2025'],
  ['/content-creator-2025-guide', '/insights/content-creator-2025-guide'],
  ['/why-whatsapp-marketing-is-the-ultimate-tool', '/insights/why-whatsapp-marketing-is-the-ultimate-tool'],
  ['/a-strategic-guide-to-launching-a-podcast-in-2025', '/insights/a-strategic-guide-to-launching-a-podcast-in-2025'],
  ['/campaigns-that-crashed-the-internet-in-2024', '/insights/campaigns-that-crashed-the-internet-in-2024'],
  ['/ai-tools-shaping-indias-business-landscape-in-2025', '/insights/ai-tools-shaping-indias-business-landscape-in-2025'],
  ['/digital-marketing-trends-for-fmcg-dtc-for-growth', '/insights/digital-marketing-trends-for-fmcg-dtc-for-growth'],
  ['/blog', '/insights'],
  ['/blogs', '/insights'],
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }],
  },
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
      missing: [{ type: 'host' as const, value: 'rmdm.tarunspeaks.in' }],
    }))
  },
  // Proxy the RMDM subdomain to Netlify before matching this app's pages or files.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'rmdm.tarunspeaks.in' }],
          destination: 'https://tarunspeaks-landing.netlify.app/:path*',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
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

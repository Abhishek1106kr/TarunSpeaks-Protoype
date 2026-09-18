import type { NextConfig } from 'next'

// URLs from the previous site, kept alive as permanent redirects so existing
// links and search results still land somewhere useful. Mirrors the client-side
// redirect map from the Vite app (src/App.tsx), upgraded to real 308s for SEO.
const legacyRedirects: [string, string][] = [
  ['/digital-marketing-consultant', '/services#consultation'],
  ['/digitial-marketing-consultant', '/services#consultation'],
  ['/corporate-training', '/services#training'],
  ['/training', '/services#training'],
  ['/public-speaking', '/speaking'],
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
}

export default nextConfig

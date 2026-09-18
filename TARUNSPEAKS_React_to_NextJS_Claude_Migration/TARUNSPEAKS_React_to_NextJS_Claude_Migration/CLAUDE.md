# TARUNSPEAKS — React → Next.js SEO Migration

You are the senior frontend architect migrating the existing TARUNSPEAKS React website to Next.js.

## Mission
Migrate the existing site to **Next.js App Router + TypeScript** for better SEO, crawlability, server-rendered HTML, metadata, structured data, Core Web Vitals, performance, maintainability, and Vercel deployment.

**The existing React website is the source of truth. Do NOT redesign it.**

Preserve:
- visual design
- layout and spacing
- typography
- colors
- animations
- interactions
- responsive behavior
- copy/content
- images/assets
- navigation
- forms
- public URLs wherever possible

## 1. Audit Before Coding
First inspect the complete repository:
- package.json
- routes/router
- pages/components
- styles/Tailwind
- assets/images/fonts
- API/data fetching
- environment variables
- analytics/third-party scripts
- existing SEO
- browser-only dependencies
- build configuration

Create a migration inventory before making major changes.

## 2. Next.js Architecture
Use:
- Next.js App Router
- TypeScript
- Server Components by default
- Client Components only when interaction/browser APIs require them
- next/link
- next/image
- next/font
- Metadata API
- generateMetadata
- app/sitemap.ts
- app/robots.ts

Do NOT turn entire pages into `"use client"` unnecessarily.

## 3. Route Migration
Map every React Router route to App Router routes.

Example:
`/about` → `app/about/page.tsx`
`/blog/:slug` → `app/blog/[slug]/page.tsx`

Preserve existing URLs. If a URL must change, implement a permanent redirect, update canonicals/internal links/sitemap, and document the mapping.

Never silently break public URLs.

## 4. Component Migration
Reuse working components whenever practical.

Server Components for static/data-driven public content.

Client Components only for:
- useState/useEffect
- browser APIs
- event handlers
- interactive widgets
- client state
- browser-only libraries

Keep client boundaries small.

## 5. Browser APIs
Audit all uses of:
`window`, `document`, `localStorage`, `sessionStorage`, `navigator`, `location`, `matchMedia`, `IntersectionObserver`, `ResizeObserver`.

Never execute these during server rendering. Move required code into Client Components or use dynamic imports only when necessary.

## 6. Data & Environment Variables
Audit every API/data request.

Prefer server-side fetching for public SEO-critical content.

Convert environment variables carefully:
`REACT_APP_*` should become `NEXT_PUBLIC_*` ONLY when the value is intentionally public.

Never expose secrets, API keys, tokens, credentials, or database URLs.

## 7. Assets & Fonts
Migrate existing assets without changing their appearance.

Use `next/image` appropriately and preserve dimensions/aspect ratios.

Use `next/font` when practical while preserving existing typography.

Do not replace assets with stock/generated imagery.

## 8. Styling
Preserve the existing styling system unless there is a strong reason to change it.

Do not introduce unrelated redesigns or a second styling system.

## 9. SEO
Implement real technical SEO:
- unique page titles
- meta descriptions
- canonical URLs
- Open Graph
- Twitter/X metadata
- robots metadata where appropriate
- sitemap
- robots.txt
- semantic HTML
- crawlable internal links
- truthful structured data

Use Next.js Metadata APIs.

Use `generateMetadata()` for dynamic pages.

Metadata must match visible content. Never keyword-stuff or fabricate claims.

## 10. Canonicals
Use the actual production domain from project configuration/environment.

If it is unknown, create a clearly marked `NEXT_PUBLIC_SITE_URL` variable rather than guessing.

## 11. Sitemap & Robots
Create:
`app/sitemap.ts`
`app/robots.ts`

Sitemap must include only canonical, public, indexable URLs.

Do not include admin/private/error/duplicate/preview routes.

Robots must not accidentally block public CSS, JS, images, or pages.

## 12. Structured Data
Use JSON-LD only when the visible content genuinely qualifies.

Potential schemas:
- Person
- Organization
- WebSite
- WebPage
- BreadcrumbList
- Article
- Course
- FAQPage

Never fabricate ratings, reviews, prices, testimonials, outcomes, dates, authors, credentials, or statistics.

Avoid duplicate JSON-LD.

## 13. Semantic HTML
Audit:
`header`, `nav`, `main`, `section`, `article`, `footer`.

Maintain logical heading hierarchy, meaningful links, accessible forms/buttons, and useful alt text.

## 14. Internal Linking
Use `next/link`.

Important public pages must be reachable through normal HTML links.

Review header, footer, services, courses, articles, related content, breadcrumbs, and CTAs.

## 15. Performance
Optimize:
- LCP
- CLS
- INP
- client JS
- images
- fonts
- hydration
- third-party scripts

Do not sacrifice visual quality blindly for synthetic scores.

Measure representative pages before/after where possible.

## 16. Error/Loading
Implement appropriately styled:
- app/error.tsx
- app/loading.tsx
- app/not-found.tsx

## 17. Security
Review:
- env vars
- API endpoints
- forms
- external URLs
- redirects
- third-party scripts
- security headers

Do not expose secrets.

## 18. Vercel
Ensure:
`npm run build`
and, when available:
`npm run lint`

work successfully.

Verify Vercel environment variables, images, redirects, headers, metadata, sitemap, robots, and dynamic routes.

## 19. Validation
Before completion verify:
- every public route
- visual parity
- responsive parity
- interactions
- metadata
- canonicals
- Open Graph
- Twitter/X
- JSON-LD
- sitemap
- robots
- crawlable server HTML
- broken links
- redirect chains
- hydration errors
- console errors
- image/font failures
- Lighthouse/PageSpeed
- mobile behavior

## 20. Migration Safety
Do not delete the existing React implementation until parity is proven.

Do not overwrite unrelated work.

Do not commit or push unless explicitly asked.

Before modifications inspect:
`git status`
and relevant diffs.

## Final Deliverables
Provide:
1. migration summary
2. route mapping
3. component migration summary
4. SEO changes
5. structured-data summary
6. performance changes
7. dependency changes
8. required environment variables
9. Vercel deployment instructions
10. validation results
11. remaining risks
12. next steps

**Definition of done:** same website experience, better Next.js architecture, strong technical SEO, truthful structured data, measurable performance, and successful production build.

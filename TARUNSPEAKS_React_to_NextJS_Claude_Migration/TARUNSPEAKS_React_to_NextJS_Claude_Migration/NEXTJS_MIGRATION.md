# Migration Plan

1. Audit the current React project.
2. Document all routes, components, assets, dependencies, APIs, SEO, and browser-only code.
3. Establish Next.js App Router + TypeScript.
4. Migrate routes while preserving URLs.
5. Migrate components with minimal visual change.
6. Implement metadata, canonical URLs, Open Graph, Twitter/X, sitemap, robots, structured data, semantic HTML, and internal links.
7. Optimize images, fonts, client JavaScript, hydration, and third-party scripts.
8. Validate every route against the original.
9. Run build/lint and deploy a Vercel preview.
10. Only declare production-ready after functional, visual, SEO, and performance validation.

Do not redesign during migration.

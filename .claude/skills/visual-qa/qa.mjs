// Browser QA sweep for the Next.js site. Run from the repo root (uses the root Playwright install):
//   node .claude/skills/visual-qa/qa.mjs --base http://localhost:3100 --out <dir> [--routes /,/about] [--widths 1440,834,390] [--reduced]
// For every route × width it saves a full-page screenshot and reports console errors, page errors
// (including hydration warnings), failed requests, broken images and horizontal overflow.
import { chromium } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, arg, index, all) => {
  if (arg.startsWith('--')) pairs.push([arg.slice(2), all[index + 1]?.startsWith('--') || all[index + 1] === undefined ? 'true' : all[index + 1]])
  return pairs
}, []))

const base = args.base ?? 'http://localhost:3000'
const out = args.out ?? 'qa-output'
const routes = (args.routes ?? '/').split(',')
const widths = (args.widths ?? '1440,834,390').split(',').map(Number)
const fullPage = args.viewport !== 'true'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const report = []

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 844 : 900 },
    reducedMotion: args.reduced === 'true' ? 'reduce' : 'no-preference',
    deviceScaleFactor: 1,
  })
  for (const route of routes) {
    const page = await context.newPage()
    const issues = []
    page.on('console', (message) => { if (['error', 'warning'].includes(message.type())) issues.push(`console.${message.type()}: ${message.text().slice(0, 300)}`) })
    page.on('pageerror', (error) => issues.push(`pageerror: ${error.message.slice(0, 300)}`))
    page.on('requestfailed', (request) => issues.push(`requestfailed: ${request.url()} ${request.failure()?.errorText}`))
    page.on('response', (response) => { if (response.status() >= 400) issues.push(`http ${response.status()}: ${response.url()}`) })

    const response = await page.goto(base + route, { waitUntil: 'networkidle' })
    // Scroll through the page so lazy images load and in-view reveals fire before the screenshot.
    // behavior: 'instant' matters — the site sets `scroll-behavior: smooth`, which would turn these
    // calls into constantly interrupted smooth scrolls that never reach most sections.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.7) {
        window.scrollTo({ top: y, behavior: 'instant' })
        await new Promise((resolve) => setTimeout(resolve, 150))
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 400))
    })
    const checks = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth
      const overflowing = [...document.querySelectorAll('body *')]
        .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1 && getComputedStyle(element).position !== 'fixed')
        .filter((element) => !element.closest('[data-allow-overflow]'))
        .slice(0, 5)
        .map((element) => `${element.tagName.toLowerCase()}.${String(element.className).slice(0, 60)}`)
      const brokenImages = [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src)
      const headings = [...document.querySelectorAll('h1,h2,h3')].map((heading) => `${heading.tagName}:${heading.textContent.trim().slice(0, 50)}`)
      return {
        title: document.title,
        h1Count: document.querySelectorAll('h1').length,
        canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
        description: document.querySelector('meta[name=description]')?.content ?? null,
        horizontalOverflow: docWidth > window.innerWidth ? `${docWidth}px > ${window.innerWidth}px` : null,
        overflowing,
        brokenImages,
        headings: headings.slice(0, 40),
      }
    })
    const name = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '_')}-${width}.png`
    await page.screenshot({ path: join(out, name), fullPage })
    report.push({ route, width, status: response?.status(), ...checks, issues: [...new Set(issues)] })
    await page.close()
  }
  await context.close()
}

await browser.close()
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2))
for (const entry of report) {
  const problems = [
    entry.status !== 200 && `status ${entry.status}`,
    entry.h1Count !== 1 && `${entry.h1Count} h1`,
    entry.horizontalOverflow && `overflow ${entry.horizontalOverflow} ${entry.overflowing.join(' | ')}`,
    entry.brokenImages.length && `broken images ${entry.brokenImages.join(', ')}`,
    ...entry.issues,
  ].filter(Boolean)
  console.log(`${problems.length ? '✗' : '✓'} ${entry.route} @${entry.width} — ${entry.title}`)
  for (const problem of problems) console.log(`    ${problem}`)
}

import { test as base, expect, type Page } from '@playwright/test'

type Fixtures = { consoleErrors: string[] }

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    // Stub Google Fonts so tests are fast, deterministic, and work offline. Images are served locally.
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.fulfill({ contentType: 'text/css', body: '' }))
    await use(page)
  },
  // Fails any test that triggers a runtime exception or a console error (e.g. React warnings).
  consoleErrors: [async ({ page }, use) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
    await use(errors)
    expect(errors, 'unexpected console errors').toEqual([])
  }, { auto: true }],
})

export { expect }

// Pages other than Home are lazy-loaded: wait for the page's heading before measuring or scanning the DOM.
export const openPage = async (page: Page, path: string) => {
  await page.goto(path)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
}

export const routes = [
  { path: '/', title: 'Tarun Makhija — Digital Marketing Consultant, Corporate Trainer & Public Speaker', heading: /Consultant, Trainer & Public Speaker/ },
  { path: '/about', title: 'About — Tarun Makhija', heading: /From IT engineer to digital marketing mentor/ },
  { path: '/services', title: 'Services — Tarun Makhija', heading: /Ways to work together/ },
  { path: '/speaking', title: 'Speaking — Tarun Makhija', heading: /Let Tarun help you speak up\./ },
  { path: '/insights', title: 'Insights — Tarun Makhija', heading: /Read, learn, grow\./ },
  { path: '/contact', title: 'Contact — Tarun Makhija', heading: /Get in touch/ },
]

import { test, expect, openPage, routes } from './fixtures'

test.describe('header (desktop)', () => {
  test.skip(({ isMobile }) => isMobile, 'the desktop nav is replaced by the mobile menu on small screens')

  for (const { path, heading } of routes.slice(1, 5)) {
    const label = path.slice(1, 2).toUpperCase() + path.slice(2)
    test(`"${label}" opens ${path} and marks it as the current page`, async ({ page }) => {
      await page.goto('/')
      const link = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: label })
      await link.click()
      await expect(page).toHaveURL(new RegExp(`${path}$`))
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
      await expect(link).toHaveAttribute('aria-current', 'page')
    })
  }

  test('"Let’s Connect" opens the contact page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('banner').getByRole('link', { name: /Let.s Connect/ }).click()
    await expect(page).toHaveURL(/\/contact$/)
  })

  test('header turns solid after scrolling and clears at the top', async ({ page }) => {
    await openPage(page, '/about')
    const header = page.getByRole('banner')
    await expect(header).not.toHaveClass(/backdrop-blur/)
    await page.evaluate(() => window.scrollTo(0, 900))
    await expect(header).toHaveClass(/backdrop-blur/)
    await page.evaluate(() => window.scrollTo(0, 0))
    await expect(header).not.toHaveClass(/backdrop-blur/)
  })
})

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile-only navigation')

  test('replaces the desktop navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden()
  })

  test('opens, navigates, and closes', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Open menu' })
    await toggle.click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    const menu = page.getByRole('navigation', { name: 'Mobile' })
    await expect(menu.getByRole('link', { name: /About/ })).toBeFocused()
    await menu.getByRole('link', { name: /Speaking/ }).click()
    await expect(page).toHaveURL(/\/speaking$/)
    await expect(menu).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  test('closes on Escape and returns focus to the toggle', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  })

  test('keeps keyboard focus inside the open menu', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    const header = page.getByRole('banner')
    for (let step = 0; step < 20; step++) {
      await page.keyboard.press('Tab')
      expect(await header.evaluate((element) => element.contains(document.activeElement))).toBe(true)
    }
  })
})

test.describe('routing', () => {
  for (const { path, title, heading } of routes) {
    test(`${path} deep-links with its own title`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
      await expect(page).toHaveTitle(title)
    })
  }

  for (const [legacy, destination, sectionId] of [
    ['/digital-marketing-consultant', /\/services#consultation$/, 'consultation'],
    ['/corporate-training', /\/services#training$/, 'training'],
    ['/public-speaking', /\/speaking$/, null],
    ['/blog', /\/insights$/, null],
  ] as const) {
    test(`legacy URL ${legacy} redirects`, async ({ page }) => {
      await page.goto(legacy)
      await expect(page).toHaveURL(destination)
      if (sectionId) await expect(page.locator(`#${sectionId}`)).toBeInViewport()
    })
  }

  test('unknown URLs show a helpful 404', async ({ page }) => {
    await page.goto('/does-not-exist')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/This page has moved on\./)
    await page.getByRole('link', { name: 'Back to home' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('brand link returns home from any page', async ({ page }) => {
    await page.goto('/insights')
    await page.getByRole('link', { name: 'Tarun Makhija — home' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].heading)
  })

  for (const [link, destination, sectionId] of [
    ['Consultation', /\/services#consultation$/, 'consultation'],
    ['Career Consultation', /\/services#career$/, 'career'],
    ['Public Speaking', /\/speaking$/, null],
  ] as const) {
    test(`footer "${link}" lands on the right section`, async ({ page }) => {
      await page.goto('/')
      await page.getByRole('navigation', { name: 'Footer — Services' }).getByRole('link', { name: link, exact: true }).click()
      await expect(page).toHaveURL(destination)
      // The target page is lazy-loaded before it can scroll, so allow extra time under heavy CI load.
      if (sectionId) await expect(page.locator(`#${sectionId}`)).toBeInViewport({ timeout: 10_000 })
      else await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5)
    })
  }

  test('browser back returns to the previous page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Footer — Pages' }).getByRole('link', { name: 'Insights' }).click()
    await expect(page).toHaveURL(/\/insights$/)
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].heading)
  })

  test('service cards on the home page link to their details', async ({ page }) => {
    await page.goto('/')
    const services = page.getByRole('region', { name: /Ways we can work together/ })
    await expect(services.getByRole('link', { name: /Digital Marketing Consultation/ })).toHaveAttribute('href', '/services#consultation')
    await expect(services.getByRole('link', { name: /Corporate Training/ })).toHaveAttribute('href', '/services#training')
    await expect(services.getByRole('link', { name: /Public Speaking/ })).toHaveAttribute('href', '/speaking')
    await expect(services.getByRole('link', { name: /Career Consultation/ })).toHaveAttribute('href', '/services#career')
  })
})

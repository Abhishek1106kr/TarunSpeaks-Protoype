import { test, expect } from './fixtures'

test.describe('with motion enabled', () => {
  test.use({ reducedMotion: 'no-preference' })
  test.skip(({ isMobile }) => isMobile, 'animation behaviour is shared; desktop coverage is enough')

  test('smooth scrolling is active', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/lenis/)
  })

  test('stat counters count up when scrolled into view', async ({ page }) => {
    await page.goto('/')
    const counter = page.locator('[data-counter="25000"]').first()
    await expect(counter).toHaveText('0+')
    await counter.scrollIntoViewIfNeeded()
    await expect(counter).toHaveText('25,000+', { timeout: 8000 })
  })

  test('scroll reveals finish fully visible', async ({ page }) => {
    await page.goto('/')
    const lead = page.getByText('From a focused consultation to a room full of people ready to grow', { exact: false })
    await lead.scrollIntoViewIfNeeded()
    await expect.poll(() => lead.evaluate((element) => getComputedStyle(element).opacity), { timeout: 8000 }).toBe('1')
  })

  test('hero intro settles with the heading readable', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toHaveAccessibleName(/Consultant, Trainer & Public Speaker/)
    await expect.poll(() => page.locator('[data-hero-portrait]').evaluate((element) => getComputedStyle(element).clipPath), { timeout: 8000 }).toMatch(/inset\(0(px|%)?( 0(px|%)?)*\)|none/)
  })
})

test('reduced motion disables smooth scrolling and shows final figures immediately', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await expect(page.locator('[data-counter="25000"]').first()).toHaveText('25,000+')
})

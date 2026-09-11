import type { Page } from '@playwright/test'
import { test, expect, openPage, routes } from './fixtures'

const distinct = async (page: Page, selector: string, edge: 'top' | 'left') => {
  await page.locator(selector).first().waitFor()
  return page.locator(selector).evaluateAll((elements, side) => new Set(elements.map((element) => Math.round(element.getBoundingClientRect()[side]))).size, edge)
}

for (const { path } of routes) {
  test(`${path} has no content wider than the viewport`, async ({ page }) => {
    await openPage(page, path)
    const overflowing = await page.evaluate(() => {
      const width = document.documentElement.clientWidth
      // Content deliberately cropped by an on-screen ancestor (e.g. zoomed images in a frame) is fine.
      const clippedInView = (element: Element) => {
        for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
          if (/hidden|clip/.test(getComputedStyle(parent).overflowX)) {
            const rect = parent.getBoundingClientRect()
            return rect.left >= -1 && rect.right <= width + 1
          }
        }
        return false
      }
      return [...document.querySelectorAll<HTMLElement>('header *, main *, footer *, section *')]
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.width > 0 && rect.height > 0 && (rect.right > width + 1 || rect.left < -1) && !clippedInView(element)
        })
        .slice(0, 10)
        .map((element) => `${element.tagName.toLowerCase()}.${[...element.classList].slice(0, 3).join('.')}`)
    })
    expect(overflowing).toEqual([])
  })
}

test.describe('desktop layout', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop-only layout')

  test('home grids lay out in columns', async ({ page }) => {
    await page.goto('/')
    expect(await distinct(page, '[data-counter]', 'top')).toBeLessThanOrEqual(2) // 4 stats in one row (+ community row)
    expect(await distinct(page, '#main ul.grid > li > a[href^="/services"], #main ul.grid > li > a[href="/speaking"]', 'top')).toBe(2)
    expect(await distinct(page, '[aria-labelledby="testimonials-title"] figure', 'left')).toBe(3)
  })

  test('insights grid shows three cards per row', async ({ page }) => {
    await page.goto('/insights')
    expect(await distinct(page, 'article', 'top')).toBe(3)
  })

  test('primary buttons respond on hover', async ({ page }) => {
    await page.goto('/about')
    const button = page.getByRole('link', { name: 'Read my story' }).or(page.getByRole('banner').getByRole('link', { name: /Let.s Connect/ })).first()
    const before = await button.evaluate((element) => getComputedStyle(element).backgroundColor)
    await button.hover()
    await expect.poll(() => button.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(before)
  })

  test('mobile menu toggle is hidden', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden()
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible()
  })
})

test.describe('mobile layout', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile-only layout')

  test('cards stack into a single column', async ({ page }) => {
    await page.goto('/')
    expect(await distinct(page, '[aria-labelledby="testimonials-title"] figure', 'left')).toBe(1)
    expect(await distinct(page, '[aria-labelledby="services-title"] li', 'left')).toBe(1)
    await page.goto('/insights')
    expect(await distinct(page, 'article', 'left')).toBe(1)
  })

  test('interactive controls meet the 24px minimum target size', async ({ page }) => {
    for (const path of ['/', '/contact']) {
      await openPage(page, path)
      const small = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('a, button, input, select, textarea')]
          // Inline links inside running text and the visually hidden skip link are exempt (WCAG 2.5.8).
          .filter((element) => element.getClientRects().length > 0 && !element.closest('p') && !element.classList.contains('sr-only'))
          .map((element) => ({ element, rect: element.getBoundingClientRect() }))
          .filter(({ rect }) => rect.width < 24 || rect.height < 24)
          .map(({ element, rect }) => `${element.tagName.toLowerCase()} "${(element.getAttribute('aria-label') || element.textContent || '').trim().slice(0, 30)}" ${Math.round(rect.width)}x${Math.round(rect.height)}`))
      expect(small, path).toEqual([])
    }
  })
})

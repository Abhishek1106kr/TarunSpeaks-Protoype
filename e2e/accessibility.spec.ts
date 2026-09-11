import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect, openPage, routes } from './fixtures'

const scan = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  return violations.map(({ id, nodes }) => `${id}: ${nodes.map((node) => node.target.join(' ')).join(', ')}`)
}

const hasFocusIndicator = (element: Element) => {
  const style = getComputedStyle(element)
  return (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) || style.boxShadow !== 'none'
}

for (const { path } of routes) {
  test.describe(path, () => {
    test.beforeEach(async ({ page }) => {
      await openPage(page, path)
    })

    test('has no WCAG 2.2 A/AA violations', async ({ page }) => {
      expect(await scan(page)).toEqual([])
    })

    test('has exactly one h1', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    })

    test('every image declares alt text (empty only when decorative)', async ({ page }) => {
      const missing = await page.locator('img').evaluateAll((images) => images.filter((image) => !image.hasAttribute('alt')).map((image) => image.getAttribute('src')))
      expect(missing).toEqual([])
    })

    test('every in-page anchor points at an existing element', async ({ page }) => {
      const broken = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')!).filter((href) => !document.getElementById(href.slice(1))))
      expect(broken).toEqual([])
    })
  })
}

test('open mobile menu and chat panel have no violations', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    expect(await scan(page)).toEqual([])
    await page.keyboard.press('Escape')
  }
  await page.getByRole('button', { name: 'Open assistant chat' }).click()
  expect(await scan(page)).toEqual([])
})

test.describe('keyboard', () => {
  test.skip(({ isMobile }) => isMobile, 'keyboard navigation is a desktop concern')

  test('skip link is first and jumps to the main content', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' })).toBeFocused()
  })

  test('every focusable element on the home page shows a focus indicator', async ({ page }) => {
    await page.goto('/')
    const missing: string[] = []
    for (let step = 0; step < 120; step++) {
      await page.keyboard.press('Tab')
      const focused = await page.evaluate((check) => {
        const element = document.activeElement as HTMLElement | null
        if (!element || element === document.body) return null
        // eslint-disable-next-line no-new-func
        const visible = new Function('element', `return (${check})(element)`)(element) as boolean
        return { label: `${element.tagName.toLowerCase()} "${(element.getAttribute('aria-label') || element.textContent || '').trim().slice(0, 40)}"`, visible }
      }, hasFocusIndicator.toString())
      if (!focused) break
      if (!focused.visible) missing.push(focused.label)
    }
    expect(missing).toEqual([])
  })

  test('chat input shows a focus indicator', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Open assistant chat' }).focus()
    await page.keyboard.press('Enter')
    const input = page.getByRole('textbox', { name: 'Ask the assistant' })
    await expect(input).toBeFocused()
    expect(await input.evaluate((element) => {
      const style = getComputedStyle(element)
      return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0
    })).toBe(true)
  })
})

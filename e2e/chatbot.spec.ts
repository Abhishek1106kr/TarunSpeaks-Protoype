import type { Page } from '@playwright/test'
import { test, expect } from './fixtures'

const openChat = async (page: Page) => {
  await page.getByRole('button', { name: 'Open assistant chat' }).click()
  return page.getByRole('region', { name: 'Tarun’s assistant' })
}

const ask = async (page: Page, question: string) => {
  await page.getByRole('textbox', { name: 'Ask the assistant' }).fill(question)
  await page.getByRole('button', { name: 'Send message' }).click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('launcher is available on every page', async ({ page }) => {
  for (const path of ['/', '/services', '/contact']) {
    await page.goto(path)
    await expect(page.getByRole('button', { name: 'Open assistant chat' })).toBeVisible()
  }
})

test('opens with a greeting and focuses the input', async ({ page }) => {
  const panel = await openChat(page)
  await expect(panel.getByText(/Hi, I’m Tarun’s assistant/)).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Ask the assistant' })).toBeFocused()
})

test('closes from the header, the launcher, or Escape', async ({ page }) => {
  let panel = await openChat(page)
  await page.getByRole('button', { name: 'Close assistant', exact: true }).click()
  await expect(panel).toBeHidden()

  panel = await openChat(page)
  await page.getByRole('button', { name: 'Close assistant chat' }).click()
  await expect(panel).toBeHidden()

  panel = await openChat(page)
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(page.getByRole('button', { name: 'Open assistant chat' })).toBeFocused()
})

for (const { question, reply } of [
  { question: 'Do you offer consulting?', reply: /digital marketing consultation/ },
  { question: 'Can Tarun speak at our event?', reply: /100\+ keynote sessions/ },
  { question: 'We need training for our team', reply: /Corporate training covers/ },
  { question: 'I want career guidance', reply: /Career consultation is available/ },
  { question: 'HOW DO I BOOK A SESSION?', reply: /teamtarunspeaks@gmail\.com/ },
  { question: 'Hello there', reply: /What would you like to explore\?/ },
]) {
  test(`answers "${question}"`, async ({ page }) => {
    const panel = await openChat(page)
    await ask(page, question)
    await expect(panel.locator('[data-from="user"]').last()).toHaveText(question)
    await expect(panel.locator('[data-from="bot"]').last()).toHaveText(reply)
  })
}

test('Enter sends the message and clears the input', async ({ page }) => {
  const panel = await openChat(page)
  const input = page.getByRole('textbox', { name: 'Ask the assistant' })
  await input.fill('consulting')
  await input.press('Enter')
  await expect(panel.locator('[data-from="user"]')).toHaveText(['consulting'])
  await expect(input).toHaveValue('')
})

test('ignores empty and whitespace-only messages', async ({ page }) => {
  const panel = await openChat(page)
  await ask(page, '   ')
  await expect(panel.locator('[data-from]')).toHaveCount(1)
})

test('keeps the latest reply visible in a long conversation', async ({ page }) => {
  const panel = await openChat(page)
  for (let index = 0; index < 6; index++) await ask(page, `question ${index}`)
  await expect(panel.locator('[data-from]')).toHaveCount(13)
  await expect(panel.locator('[data-from]').last()).toBeInViewport()
})

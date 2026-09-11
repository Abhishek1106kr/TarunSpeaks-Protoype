import type { Locator, Page } from '@playwright/test'
import { test, expect } from './fixtures'

const contactForm = (page: Page) => page.getByRole('form', { name: 'Contact form' })

const fillContactForm = async (form: Locator, overrides: Record<string, string> = {}) => {
  const values: Record<string, string> = {
    'First name': 'Asha',
    'Last name': 'Verma',
    'Email address': 'asha@example.com',
    'Phone number': '+91 90000 00000',
    ...overrides,
  }
  for (const [label, value] of Object.entries(values)) await form.getByLabel(new RegExp(`^${label}`)).fill(value)
}

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('every field has a visible label', async ({ page }) => {
    const form = contactForm(page)
    for (const label of ['First name', 'Last name', 'Email address', 'Phone number', 'Company', 'Service you need', 'How did you hear about me?', 'Message']) {
      await expect(form.getByLabel(new RegExp(`^${label.replace('?', '\\?')}`))).toBeVisible()
    }
  })

  test('blocks an empty submission and focuses the first missing field', async ({ page }) => {
    const form = contactForm(page)
    await form.getByRole('button', { name: 'Send message' }).click()
    await expect(form.getByLabel(/^First name/)).toBeFocused()
    await expect(page.getByRole('status')).toBeHidden()
  })

  test('rejects an invalid email address', async ({ page }) => {
    const form = contactForm(page)
    await fillContactForm(form, { 'Email address': 'not-an-email' })
    await form.getByLabel(/^Service you need/).selectOption('Public Speaking')
    await form.getByRole('button', { name: 'Send message' }).click()
    await expect(form.getByLabel(/^Email address/)).toBeFocused()
    expect(await form.getByLabel(/^Email address/).evaluate((input: HTMLInputElement) => input.validity.typeMismatch)).toBe(true)
  })

  test('requires a service to be chosen', async ({ page }) => {
    const form = contactForm(page)
    await fillContactForm(form)
    await form.getByRole('button', { name: 'Send message' }).click()
    await expect(form.getByLabel(/^Service you need/)).toBeFocused()
  })

  test('submits with valid details and moves focus to the confirmation', async ({ page }) => {
    const form = contactForm(page)
    await fillContactForm(form)
    await form.getByLabel(/^Service you need/).selectOption('Corporate Training')
    await form.getByLabel(/^Message/).fill('Workshop for 40 people')
    await form.getByRole('button', { name: 'Send message' }).click()
    const status = page.getByRole('status')
    await expect(status.getByRole('heading', { name: 'Thanks for reaching out.' })).toBeVisible()
    await expect(status).toBeFocused()
  })
})

test.describe('newsletter', () => {
  test('footer signup validates and confirms', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    const input = footer.getByLabel('Email address')
    await input.fill('not-an-email')
    await footer.getByRole('button', { name: 'Subscribe' }).click()
    await expect(input).toBeFocused()
    await input.fill('asha@example.com')
    await footer.getByRole('button', { name: 'Subscribe' }).click()
    await expect(footer.getByText('You’re on the list.')).toBeVisible()
  })

  test('insights signup collects a name and email', async ({ page }) => {
    await page.goto('/insights')
    const section = page.getByRole('region', { name: /Newsletter signup!/ })
    await section.getByRole('button', { name: 'Subscribe' }).click()
    await expect(section.getByLabel(/^First name/)).toBeFocused()
    await section.getByLabel(/^First name/).fill('Asha')
    await section.getByLabel(/^Last name/).fill('Verma')
    await section.getByLabel(/^Email address/).fill('asha@example.com')
    await section.getByRole('button', { name: 'Subscribe' }).click()
    await expect(section.getByText('You’re on the list.')).toBeVisible()
  })
})

test.describe('insights filters', () => {
  for (const [topic, count] of [['All', 9], ['Social Media', 3], ['Content Creation', 2], ['Marketing Strategy', 3], ['Journey', 1]] as const) {
    test(`"${topic}" shows ${count} article${count === 1 ? '' : 's'}`, async ({ page }) => {
      await page.goto('/insights')
      const filter = page.getByRole('group', { name: 'Filter articles by topic' }).getByRole('button', { name: topic })
      await filter.click()
      await expect(filter).toHaveAttribute('aria-pressed', 'true')
      await expect(page.getByRole('region', { name: 'Articles' }).getByRole('article')).toHaveCount(count)
    })
  }
})

test.describe('FAQ', () => {
  test('accordion items expand and collapse', async ({ page }) => {
    await page.goto('/contact')
    const first = page.getByRole('button', { name: 'What services does Tarun offer?' })
    const second = page.getByRole('button', { name: 'Can I invite Tarun to speak at my event or institution?' })
    await expect(first).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('region', { name: 'What services does Tarun offer?' })).toBeVisible()
    await second.click()
    await expect(second).toHaveAttribute('aria-expanded', 'true')
    await expect(first).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('region', { name: 'What services does Tarun offer?' })).toBeHidden()
    await second.click()
    await expect(second).toHaveAttribute('aria-expanded', 'false')
  })
})

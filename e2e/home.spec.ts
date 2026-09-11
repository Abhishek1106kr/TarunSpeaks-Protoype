import { test, expect } from './fixtures'
import { consultingClients, trainingPartners } from '../src/data/brands'
import { journey } from '../src/data/journey'
import { engagements } from '../src/data/speaking'
import { testimonials } from '../src/data/testimonials'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('hero introduces Tarun with clear calls to action', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Consultant, Trainer & Public Speaker/)
  await expect(page.getByRole('img', { name: 'Portrait of Tarun Makhija' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Book a call' })).toHaveAttribute('href', '/contact')
  await expect(page.getByRole('link', { name: 'Invite me to speak' })).toHaveAttribute('href', '/speaking')
})

test('shows the published credibility figures', async ({ page }) => {
  const section = page.getByRole('region', { name: /Let’s unlock your full potential/ })
  for (const [value, label] of [['25,000+', 'Individuals trained'], ['1,600+', 'Training sessions delivered'], ['100+', 'Keynote sessions'], ['297+', 'Brands worked with']]) {
    await expect(section.getByText(value, { exact: true })).toBeVisible()
    await expect(section.getByText(label, { exact: true })).toBeVisible()
  }
})

test('sections appear in the editorial order', async ({ page }) => {
  const headings = await page.locator('main h2').allTextContents()
  const order = ['Let’s unlock', 'Hi, I’m Tarun', 'Ways we can', 'Brands', 'Notable stages', 'Words from people', 'Be limitless', 'From IT engineer', 'Read, learn, grow']
  const positions = order.map((start) => headings.findIndex((heading) => heading.replace(/\s+/g, ' ').startsWith(start)))
  expect(positions.every((position) => position >= 0)).toBe(true)
  expect([...positions].sort((a, b) => a - b)).toEqual(positions)
})

test('lists real brands and institutions', async ({ page }) => {
  for (const name of [trainingPartners[0], trainingPartners[2], consultingClients[0], consultingClients[3]]) {
    await expect(page.getByRole('list', { name: /Corporate trainings|Digital and branding/ }).getByText(name, { exact: true }).first()).toBeAttached()
  }
})

test('features four notable speaking engagements', async ({ page }) => {
  const section = page.getByRole('region', { name: 'Notable stages & sessions' })
  for (const engagement of engagements.slice(0, 4)) await expect(section.getByRole('heading', { name: engagement.organisation })).toBeVisible()
  await expect(section.getByRole('link', { name: 'Explore speaking' })).toHaveAttribute('href', '/speaking')
})

test('shows every testimonial with attribution', async ({ page }) => {
  const section = page.getByRole('region', { name: /Words from people/ })
  await expect(section.locator('figure')).toHaveCount(testimonials.length)
  for (const { name } of testimonials) await expect(section.getByText(name, { exact: true })).toBeVisible()
})

test('community section shows reach and channels', async ({ page }) => {
  const section = page.getByRole('region', { name: /Be limitless/ })
  await expect(section.getByText('20,00,000+', { exact: true })).toBeVisible()
  await expect(section.getByRole('heading', { name: 'Be Limitless Community' })).toBeVisible()
})

test('journey tells all four chapters', async ({ page }) => {
  const section = page.getByRole('region', { name: /From IT engineer/ })
  for (const step of journey) await expect(section.getByRole('heading', { name: step.title })).toBeVisible()
})

test('insights preview links to published articles', async ({ page }) => {
  const section = page.getByRole('region', { name: 'Read, learn, grow.' })
  const articles = section.getByRole('article')
  await expect(articles).toHaveCount(3)
  await expect(articles.first().getByRole('link')).toHaveAttribute('href', /^https:\/\/tarunmakhija\.in\//)
  await expect(articles.first().getByRole('link')).toHaveAttribute('target', '_blank')
  await expect(section.getByRole('link', { name: 'View all insights' })).toHaveAttribute('href', '/insights')
})

test('closes with a call to action', async ({ page }) => {
  const cta = page.getByRole('region', { name: /Don’t wait, upskill!/ })
  await expect(cta.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', '/contact')
})

test('contact details and socials are actionable', async ({ page }) => {
  const footer = page.getByRole('contentinfo')
  await expect(footer.getByRole('link', { name: 'Email the team' })).toHaveAttribute('href', 'mailto:teamtarunspeaks@gmail.com')
  await expect(footer.getByRole('link', { name: 'Call +91 97702 23646' })).toHaveAttribute('href', 'tel:+919770223646')
  for (const [name, href] of [
    ['LinkedIn', /linkedin\.com\/in\/tarunmakhija01/],
    ['Instagram', /instagram\.com\/tarunmakhija01/],
    ['X (Twitter)', /twitter\.com\/tarunmakhija01/],
    ['YouTube', /youtube\.com\/@tarunmakhija01/],
  ] as const) {
    await expect(footer.getByRole('link', { name: new RegExp(`^${name.replace(/[()]/g, '\\$&')}`) })).toHaveAttribute('href', href)
  }
})

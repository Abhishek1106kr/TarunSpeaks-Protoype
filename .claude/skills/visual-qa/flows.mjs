// Interaction checks for the TarunSpeaks site. Run from the repo root against a running server:
//   node .claude/skills/visual-qa/flows.mjs http://localhost:3100
// Prints one line per check (✓/✗) and exits non-zero if any check fails.
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://localhost:3000'
const results = []
const check = (name, ok, detail = '') => { results.push(ok); console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`) }

const browser = await chromium.launch()

// --- Enquiry form ---------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(`${base}/contact`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.getByText(/Please fix \d+ fields? below/).waitFor()
  const invalid = await page.locator('[aria-invalid="true"]').count()
  const focusedInvalid = await page.evaluate(() => document.activeElement?.getAttribute('aria-invalid') === 'true')
  check('Empty submit shows field errors', invalid >= 4, `${invalid} invalid fields`)
  check('Consultation call is the default request type', await page.getByLabel('Request a consultation call').isChecked())
  check('Optional details start collapsed', !(await page.locator('details:has(input[name="phone"])').evaluate((element) => element.open)))
  check('Focus moves to first invalid field', focusedInvalid)
  const described = await page.locator('[aria-invalid="true"]').first().getAttribute('aria-describedby')
  check('Errors are linked via aria-describedby', Boolean(described))

  await page.getByLabel('Full name').fill('QA Tester')
  await page.getByLabel('Work email').fill('not-an-email')
  await page.getByLabel('Organisation').fill('QA Org')
  await page.getByLabel('What would you like to discuss?').selectOption('ai')
  await page.getByLabel('The challenge, briefly').fill('Testing the enquiry flow end to end.')
  await page.waitForTimeout(2700) // honour the minimum fill time
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.getByText('valid email address').waitFor()
  check('Server rejects malformed email', true)
  check('Values survive a failed validation', (await page.getByLabel('Full name').inputValue()) === 'QA Tester')
  // Regression: React's post-action form reset used to clear the <select> after a second failed submit.
  check('Select keeps its value after repeated failures', (await page.getByLabel('What would you like to discuss?').inputValue()) === 'ai')

  await page.getByLabel('Send an enquiry').check()
  await page.getByText('Add optional details').click()
  await page.getByLabel('Phone').fill('abc')
  await page.getByLabel('Work email').fill('qa@example.com')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.getByText('Please enter a phone number').waitFor()
  check('Invalid optional phone is caught and its section stays open', await page.locator('details:has(input[name="phone"])').evaluate((element) => element.open))
  check('Request type survives a failed validation', await page.getByLabel('Send an enquiry').isChecked())
  await page.getByLabel('Phone').fill('+91 98765 43210')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  const result = page.locator('[role="alert"], [role="status"]').filter({ hasText: /(enquiry|request) has (not )?been sent/ })
  await result.first().waitFor({ timeout: 15_000 })
  const outcome = (await result.first().textContent()).includes('not been sent') ? 'not-sent' : 'sent'
  const configured = Boolean(process.env.CONTACT_WEBHOOK_URL || process.env.RESEND_API_KEY)
  check('Unconfigured delivery is reported honestly (no fake success)', configured || outcome === 'not-sent', `outcome: ${outcome}`)
  if (outcome === 'not-sent') {
    const mailto = await page.getByRole('link', { name: /Email this enquiry/ }).getAttribute('href')
    check('Fallback mailto carries the enquiry', mailto?.startsWith('mailto:') && mailto.includes('QA%20Org'))
  }
  await page.close()
}

// --- CTA prefill ---------------------------------------------------------------
{
  const page = await browser.newPage()
  await page.goto(`${base}/contact?program=ai-tools-training-for-sales-teams`, { waitUntil: 'networkidle' })
  const interest = await page.getByLabel('What would you like to discuss?').inputValue()
  const message = await page.getByLabel('The challenge, briefly').inputValue()
  check('Program CTA prefills interest and message', interest === 'ai' && message.includes('AI Tools Training for Sales Teams'), `${interest} / ${message.slice(0, 40)}`)
  await page.close()
}

// --- Mobile menu + keyboard -----------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  const toggle = page.getByRole('button', { name: 'Open menu' })
  check('Menu toggle is visible on mobile', await toggle.isVisible())
  const box = await toggle.boundingBox()
  check('Menu toggle is inside the viewport', box && box.x + box.width <= 390, `right edge ${box && Math.round(box.x + box.width)}px`)
  await toggle.click()
  const nav = page.getByRole('navigation', { name: 'Mobile' })
  await nav.waitFor()
  check('Mobile menu lists primary pages', (await nav.getByRole('link').count()) >= 8)
  check('Focus moves into the menu', await page.evaluate(() => Boolean(document.activeElement?.closest('#mobile-menu'))))
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  check('Escape closes the menu and returns focus', (await nav.count()) === 0 && await page.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'mobile-menu'))

  await page.keyboard.press('Tab') // move away from the toggle, then restart from the top
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim())
  check('First Tab lands on the skip link', first === 'Skip to content', first)
  await page.keyboard.press('Enter')
  check('Skip link moves focus to main', await page.evaluate(() => document.activeElement?.id === 'main' || location.hash === '#main'))
  await page.close()
}

// --- Reduced motion -------------------------------------------------------------
{
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((element) => getComputedStyle(element).opacity !== '1').length)
  check('Reduced motion: no content hidden waiting for scroll', hidden === 0, `${hidden} hidden`)
  await page.goto(`${base}/about`, { waitUntil: 'networkidle' }) // the Journey timeline lives on /about
  const line = await page.evaluate(() => document.querySelector('#journey-title')?.closest('section')?.querySelector('span.origin-top')?.style.transform ?? '')
  check('Reduced motion: journey line drawn in full', !line.includes('scaleY(0') , line || 'no transform')
  await context.close()
}

// --- Journey, FAQ, chatbot ----------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(`${base}/about`, { waitUntil: 'networkidle' })
  await page.locator('#journey-step-2').scrollIntoViewIfNeeded()
  await page.evaluate(() => document.getElementById('journey-step-2').scrollIntoView({ block: 'center', behavior: 'instant' }))
  await page.waitForTimeout(700)
  const current = await page.locator('nav[aria-label="Journey chapters"] [aria-current="step"]').textContent()
  check('Journey tracks the chapter in view', current?.trim() === 'Training', current?.trim())

  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  const faq = page.locator('section:has(#faq-title) details').first()
  await faq.locator('summary').click()
  check('FAQ item expands', await faq.evaluate((element) => element.open))

  await page.getByRole('button', { name: 'Open assistant chat' }).click()
  await page.getByLabel('Ask the assistant').fill('Do you run AI training?')
  await page.getByRole('button', { name: 'Send message' }).click()
  const reply = await page.locator('[data-from="bot"]').last().textContent()
  check('Chatbot answers from site facts', reply?.includes('AI') ?? false, reply?.slice(0, 50))
  await page.close()
}

// --- Client ecosystem ---------------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  const canvas = page.locator('#clients-title').locator('xpath=ancestor::section[1]')
  await canvas.scrollIntoViewIfNeeded()
  const logos = () => canvas.locator('ul img')
  check('Default view shows a curated mix', (await logos().count()) === 24, `${await logos().count()} logos`)
  await canvas.getByRole('button', { name: /Education & Training/ }).click()
  await page.waitForTimeout(700)
  check('Education filter shows all 19', (await logos().count()) === 19, `${await logos().count()} logos`)
  check('Filter state is exposed (aria-pressed)', (await canvas.getByRole('button', { name: /Education & Training/ }).getAttribute('aria-pressed')) === 'true')
  await canvas.getByRole('button', { name: /All industries/ }).click()
  await page.waitForTimeout(500)
  await canvas.getByRole('button', { name: /View all 59 organisations/ }).click()
  await page.waitForTimeout(700)
  const names = await logos().evaluateAll((images) => images.map((image) => image.alt))
  check('View all lists every approved organisation once', names.length === 59 && new Set(names).size === 59, `${names.length} / ${new Set(names).size} unique`)
  const broken = await logos().evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).length)
  check('No broken logo images', broken === 0, `${broken} broken`)
  const caseLinks = await canvas.locator('a[href^="/case-studies/"]').count()
  check('Clients with case studies link to them', caseLinks === 7, `${caseLinks} links`)
  await page.close()

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mobile.goto(`${base}/`, { waitUntil: 'networkidle' })
  const visibleOnMobile = await mobile.locator('#clients-title').locator('xpath=ancestor::section[1]').locator('ul li').evaluateAll((items) => items.filter((item) => getComputedStyle(item).display !== 'none').length)
  check('Mobile shows a shorter initial selection', visibleOnMobile === 12, `${visibleOnMobile} visible`)
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  check('No horizontal page overflow on mobile', !overflow)
  await mobile.close()
}

// --- HTTP: redirects, sitemap, robots, metadata ----------------------------------------
{
  const status = async (path) => {
    const response = await fetch(base + path, { redirect: 'manual' })
    return `${response.status} ${response.headers.get('location') ?? ''}`.trim()
  }
  check('/corporate-training is a real page', (await status('/corporate-training')).startsWith('200'))
  check('/digital-marketing-consultant → /consulting', /^30[18] .*\/consulting$/.test(await status('/digital-marketing-consultant')), await status('/digital-marketing-consultant'))
  check('/training → /corporate-training', /^30[18] .*\/corporate-training$/.test(await status('/training')))
  check('/corporate-training/ (trailing slash) resolves', /^(200|30[18])/.test(await status('/corporate-training/')), await status('/corporate-training/'))
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
  check('Sitemap lists case studies', sitemap.includes('/case-studies/nawany-group') && sitemap.includes('/programs'))
  check('robots.txt references sitemap', (await (await fetch(`${base}/robots.txt`)).text()).includes('sitemap.xml'))
  const html = await (await fetch(`${base}/case-studies/motilal-oswal`)).text()
  check('Case study has canonical, OG image and JSON-LD', html.includes('rel="canonical"') && html.includes('og:image') && html.includes('"@type":"Article"'))
  check('No review/rating schema anywhere', !/AggregateRating|"Review"/.test(html + (await (await fetch(base)).text())))
}

await browser.close()
const failed = results.filter((ok) => !ok).length
console.log(`\n${results.length - failed}/${results.length} checks passed`)
process.exit(failed ? 1 : 0)

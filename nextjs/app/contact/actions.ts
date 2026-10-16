'use server'

import { type EnquiryFields, type EnquiryState, interestOptions } from './enquiry'

const limits: Record<keyof EnquiryFields, number> = { name: 100, email: 200, organisation: 150, role: 100, interest: 40, message: 3000 }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_FILL_MS = 2500

const read = (formData: FormData, key: keyof EnquiryFields) => String(formData.get(key) ?? '').trim().slice(0, limits[key])

function validate(values: EnquiryFields) {
  const errors: Partial<Record<keyof EnquiryFields, string>> = {}
  if (!values.name) errors.name = 'Please enter your name.'
  if (!values.email) errors.email = 'Please enter your work email.'
  else if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address, like name@company.com.'
  if (!values.organisation) errors.organisation = 'Please enter your organisation.'
  if (!interestOptions.some((option) => option.value === values.interest)) errors.interest = 'Please choose what you’d like to discuss.'
  if (values.message.length < 10) errors.message = 'Please tell us a little about the challenge (at least 10 characters).'
  return errors
}

// Delivery channels, configured via server-only environment variables (see .env.example).
// Returns false when no channel is configured; throws when a configured channel fails.
async function deliver(values: EnquiryFields): Promise<boolean> {
  const interest = interestOptions.find((option) => option.value === values.interest)?.label ?? values.interest
  const subject = `New enquiry: ${interest} — ${values.organisation}`
  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organisation: ${values.organisation}`,
    `Role: ${values.role || '—'}`,
    `Interest: ${interest}`,
    '',
    values.message,
  ].join('\n')

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, text, ...values, interestLabel: interest, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`)
    return true
  }

  const { RESEND_API_KEY: apiKey, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env
  if (apiKey && to && from) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: to.split(','), reply_to: values.email, subject, text }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`Resend responded ${response.status}`)
    return true
  }

  return false
}

export async function submitEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values: EnquiryFields = {
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    organisation: read(formData, 'organisation'),
    role: read(formData, 'role'),
    interest: read(formData, 'interest'),
    message: read(formData, 'message'),
  }

  // Validate first: a person who submits too early must see their errors, never a spam-guard response.
  const errors = validate(values)
  if (Object.keys(errors).length) return { status: 'invalid', errors, values }

  // Spam guards, applied only to otherwise-valid submissions: a hidden field humans never fill, and a minimum
  // time on the form no human can beat while filling five fields. Bots get a quiet "sent" and nothing is delivered.
  const honeypot = String(formData.get('company_website') ?? '')
  const startedAt = Number(formData.get('started_at') ?? 0)
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) return { status: 'sent' }

  try {
    const delivered = await deliver(values)
    return delivered ? { status: 'sent' } : { status: 'not-sent', reason: 'unconfigured', values }
  } catch (error) {
    console.error('Enquiry delivery failed', error)
    return { status: 'not-sent', reason: 'failed', values }
  }
}

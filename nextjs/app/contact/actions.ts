'use server'

import { type EnquiryFields, type EnquiryState, interestOptions, requestOptions, teamSizeOptions, timelineOptions } from './enquiry'

const limits: Record<keyof EnquiryFields, number> = { request: 20, name: 100, email: 200, organisation: 150, role: 100, interest: 40, message: 3000, phone: 30, teamSize: 20, timeline: 20 }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^[+\d][\d\s()-]{6,}$/
const MIN_FILL_MS = 2500

const read = (formData: FormData, key: keyof EnquiryFields) => String(formData.get(key) ?? '').trim().slice(0, limits[key])
const labelOf = (options: readonly { value: string; label: string }[], value: string) => options.find((option) => option.value === value)?.label ?? ''

function validate(values: EnquiryFields) {
  const errors: Partial<Record<keyof EnquiryFields, string>> = {}
  if (!requestOptions.some((option) => option.value === values.request)) errors.request = 'Please choose how you’d like to start.'
  if (!values.name) errors.name = 'Please enter your name.'
  if (!values.email) errors.email = 'Please enter your work email.'
  else if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address, like name@company.com.'
  if (!values.organisation) errors.organisation = 'Please enter your organisation.'
  if (!interestOptions.some((option) => option.value === values.interest)) errors.interest = 'Please choose what you’d like to discuss.'
  if (values.message.length < 10) errors.message = 'Please tell us a little about the challenge (at least 10 characters).'
  if (values.phone && !phonePattern.test(values.phone)) errors.phone = 'Please enter a phone number with digits only, e.g. +91 98765 43210, or leave it blank.'
  return errors
}

// Delivery channels, configured via server-only environment variables (see .env.example).
// Returns false when no channel is configured; throws when a configured channel fails.
async function deliver(values: EnquiryFields): Promise<boolean> {
  const interest = labelOf(interestOptions, values.interest)
  const request = labelOf(requestOptions, values.request)
  const subject = `${values.request === 'consultation' ? 'Consultation request' : 'New enquiry'}: ${interest}, ${values.organisation}`
  const text = [
    `Request: ${request}`,
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organisation: ${values.organisation}`,
    `Role: ${values.role || 'Not provided'}`,
    `Interest: ${interest}`,
    `Phone: ${values.phone || 'Not provided'}`,
    `Team size: ${labelOf(teamSizeOptions, values.teamSize) || 'Not provided'}`,
    `Timeline: ${labelOf(timelineOptions, values.timeline) || 'Not provided'}`,
    '',
    values.message,
  ].join('\n')

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, text, ...values, interestLabel: interest, requestLabel: request, submittedAt: new Date().toISOString() }),
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
    request: read(formData, 'request'),
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    organisation: read(formData, 'organisation'),
    role: read(formData, 'role'),
    interest: read(formData, 'interest'),
    message: read(formData, 'message'),
    phone: read(formData, 'phone'),
    teamSize: read(formData, 'teamSize'),
    timeline: read(formData, 'timeline'),
  }

  // Validate first: a person who submits too early must see their errors, never a spam-guard response.
  const errors = validate(values)
  if (Object.keys(errors).length) return { status: 'invalid', errors, values }

  // Spam guards, applied only to otherwise-valid submissions: a hidden field humans never fill, and a minimum
  // time on the form no human can beat while filling it in. Bots get a quiet "sent" and nothing is delivered.
  const honeypot = String(formData.get('company_website') ?? '')
  const startedAt = Number(formData.get('started_at') ?? 0)
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) return { status: 'sent', request: values.request }

  try {
    const delivered = await deliver(values)
    return delivered ? { status: 'sent', request: values.request } : { status: 'not-sent', reason: 'unconfigured', values }
  } catch (error) {
    console.error('Enquiry delivery failed', error)
    return { status: 'not-sent', reason: 'failed', values }
  }
}

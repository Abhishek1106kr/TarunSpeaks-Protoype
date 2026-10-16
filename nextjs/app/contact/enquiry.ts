// Shared between the Server Action and the form: field limits and the option lists.
export const interestOptions = [
  { value: 'ai', label: 'AI capability building' },
  { value: 'training', label: 'Corporate training program' },
  { value: 'consulting', label: 'Consulting / advisory' },
  { value: 'keynote', label: 'Keynote or speaking' },
  { value: 'branding', label: 'Personal branding & LinkedIn' },
  { value: 'career', label: '1 on 1 career consultation' },
  { value: 'other', label: 'Something else' },
] as const

// Distinguishes a request to talk from a written enquiry, so the team can qualify and respond appropriately.
export const requestOptions = [
  { value: 'consultation', label: 'Request a consultation call', hint: 'Talk your requirements through with the team.' },
  { value: 'enquiry', label: 'Send an enquiry', hint: 'Share details in writing and get a reply.' },
] as const

// Optional qualifiers, collected behind progressive disclosure.
export const teamSizeOptions = [
  { value: 'under-25', label: 'Under 25 people' },
  { value: '25-100', label: '25–100 people' },
  { value: '100-500', label: '100–500 people' },
  { value: '500-plus', label: '500+ people' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

export const timelineOptions = [
  { value: 'this-month', label: 'Within a month' },
  { value: '1-3-months', label: 'In 1–3 months' },
  { value: 'later', label: 'Later this year' },
  { value: 'exploring', label: 'Exploring options' },
] as const

export type InterestValue = (typeof interestOptions)[number]['value']

export type EnquiryFields = {
  request: string
  name: string
  email: string
  organisation: string
  role: string
  interest: string
  message: string
  phone: string
  teamSize: string
  timeline: string
}

export type EnquiryState =
  | { status: 'idle' }
  | { status: 'invalid'; errors: Partial<Record<keyof EnquiryFields, string>>; values: EnquiryFields }
  | { status: 'sent'; request: string }
  // No delivery channel is configured, or delivery failed: nothing was sent. The UI must say so.
  | { status: 'not-sent'; reason: 'unconfigured' | 'failed'; values: EnquiryFields }

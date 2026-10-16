// Shared between the Server Action and the form: field limits and the interest options.
export const interestOptions = [
  { value: 'ai', label: 'AI capability building' },
  { value: 'training', label: 'Corporate training program' },
  { value: 'consulting', label: 'Consulting / advisory' },
  { value: 'keynote', label: 'Keynote or speaking' },
  { value: 'branding', label: 'Personal branding & LinkedIn' },
  { value: 'career', label: '1 on 1 career consultation' },
  { value: 'other', label: 'Something else' },
] as const

export type InterestValue = (typeof interestOptions)[number]['value']

export type EnquiryFields = {
  name: string
  email: string
  organisation: string
  role: string
  interest: string
  message: string
}

export type EnquiryState =
  | { status: 'idle' }
  | { status: 'invalid'; errors: Partial<Record<keyof EnquiryFields, string>>; values: EnquiryFields }
  | { status: 'sent' }
  // No delivery channel is configured, or delivery failed: nothing was sent. The UI must say so.
  | { status: 'not-sent'; reason: 'unconfigured' | 'failed'; values: EnquiryFields }

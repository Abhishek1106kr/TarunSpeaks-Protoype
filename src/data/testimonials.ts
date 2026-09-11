import type { ImageName } from './images.generated'

export type Testimonial = {
  name: string
  role?: string
  quote: string
  avatar?: ImageName
}

// Quotes are reproduced verbatim from tarunmakhija.in.
export const testimonials: Testimonial[] = [
  {
    name: 'Shivani Sahay',
    role: 'Marketing Specialist, Canada Mentors',
    avatar: 'avatar-shivani-sahay',
    quote: "Enthusiastic, Cheerful, highly skilled at what he does, that's how I would introduce Captain Tarun to anyone. He was my mentor in My Captain's Social media content creation course. The way he delivers his learnings to his mentees is entirely different from the rest. His passion is what makes him a great teacher.",
  },
  {
    name: 'Ruchira Mangal',
    quote: 'This was really full learning session. I have learned some new things so that was really great.',
  },
  {
    name: 'Shailesh Benedict',
    role: 'ORM Executive, ITC Limited',
    avatar: 'avatar-shailesh-benedict',
    quote: "I would love to have you as a mentor in my life, If this is the kind of impact you can create in just 2.5 hours I don't know what all I'll be able to create if you become my mentor. I agree that the session was highly underpriced I would pay at least 7-8x the amount.",
  },
  {
    name: 'Aditya Singh',
    role: 'Corporate training',
    quote: "Tarun Makhija's strategic guidance transformed our business, driving growth and innovation to new heights, I am glad that me and my team attended the corporate training",
  },
  {
    name: 'Ram Raju',
    role: 'Entrepreneur, Motilal Oswal Franchise',
    avatar: 'avatar-ram-raju',
    quote: "Today I was in your session with Motilal Oswal at Cochin. It was really a beautiful session. I really had serious thoughts when you talk about the need building a personal brand. I believe today's session helped me get to think about techniques to build audience, consistency. Thank you so much sir for coming and giving us a wonderful session.",
  },
  {
    name: 'Shreyash Phatak',
    quote: 'Just do it, Thank you for inspiring us, Tarun Makhija It was fun learning from you.',
  },
  {
    name: 'Alan Paul',
    role: 'Digital marketing consultation',
    quote: 'Tarun help me scale my business at an amazing pace. I love how quickly he understands your business',
  },
  {
    name: 'Raghav',
    quote: 'Enjoyed the session soo much. Thank you, Captain Tarun. Excited for ahead.',
  },
]

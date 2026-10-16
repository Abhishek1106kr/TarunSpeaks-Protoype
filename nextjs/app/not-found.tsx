import type { Metadata } from 'next'
import { PageIntro } from '../components/blocks/PageIntro'
import { Button } from '../components/ui/Button'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <PageIntro
      eyebrow="404"
      title="This page has moved on."
      lead={<p>The page you’re looking for doesn’t exist. These are the places most visitors are looking for:</p>}
      actions={<><Button to="/" arrow>Back to home</Button><Button to="/programs" variant="secondary">Explore Programs</Button><Button to="/case-studies" variant="quiet">View Case Studies</Button></>}
    />
  )
}

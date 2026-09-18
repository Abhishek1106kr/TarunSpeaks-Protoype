import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { ClientShell } from '../components/layout/ClientShell'
import { JsonLd } from '../components/seo/JsonLd'
import { personJsonLd, siteUrl, websiteJsonLd } from '../lib/seo'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const title = 'Tarun Makhija — Digital Marketing Consultant, Corporate Trainer & Public Speaker'
const description = 'Tarun Makhija is a digital marketing consultant, corporate trainer, public speaker and mentor who has trained 25,000+ individuals and worked with 297+ brands.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s — Tarun Makhija' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description: 'Digital marketing, personal branding and content creation — consultation, corporate training and keynotes.',
    type: 'website',
    url: siteUrl,
    images: [{ url: '/images/stage-keynote-1600.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Digital marketing, personal branding and content creation — consultation, corporate training and keynotes.',
    images: ['/images/stage-keynote-1600.webp'],
  },
  icons: { icon: '/favicon.svg' },
}

export const viewport = { themeColor: '#0B1F3A' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}

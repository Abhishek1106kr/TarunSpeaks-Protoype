import type { Metadata, Viewport } from 'next'
import { Archivo, Newsreader } from 'next/font/google'
import { Chatbot } from '../components/layout/Chatbot'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { AnalyticsListener } from '../components/motion/AnalyticsListener'
import { RevealObserver } from '../components/motion/RevealObserver'
import { JsonLd } from '../components/seo/JsonLd'
import { proofStats } from '../data/company'
import { organizationJsonLd, personJsonLd, siteUrl, websiteJsonLd } from '../lib/seo'
import './globals.css'

// Headlines: Newsreader, a news serif with an optical-size axis (large sizes get the display cut automatically).
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
})

// Text and UI: Archivo. Its width axis also carries the company profile's heavy italic signature line.
const archivo = Archivo({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const title = 'TarunSpeaks: Corporate Training, Consulting & AI Capability Building'
const description = `TarunSpeaks is a corporate training and consulting company. Practical programs in AI, sales, marketing, personal branding and leadership, with ${proofStats[0].value.toLocaleString('en-IN')}${proofStats[0].suffix} individuals trained across ${proofStats[2].value.toLocaleString('en-IN')}${proofStats[2].suffix} brands.`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | TarunSpeaks' },
  description,
  applicationName: 'TarunSpeaks',
  alternates: { canonical: '/' },
  openGraph: { title, description, type: 'website', url: '/', siteName: 'TarunSpeaks', locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title, description },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#080B10', colorScheme: 'dark' }

// Marks the document before first paint so scroll reveals only hide content when JS is running.
const jsFlag = "document.documentElement.classList.add('js')"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand focus:px-5 focus:py-3 focus:font-semibold">
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <Chatbot />
        <RevealObserver />
        <AnalyticsListener />
      </body>
    </html>
  )
}

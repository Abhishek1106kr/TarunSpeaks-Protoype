import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import HomePage from './pages/Home'

// Home ships in the main bundle; every other page loads on demand.
const AboutPage = lazy(() => import('./pages/About'))
const ContactPage = lazy(() => import('./pages/Contact'))
const InsightsPage = lazy(() => import('./pages/Insights'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))
const ServicesPage = lazy(() => import('./pages/Services'))
const SpeakingPage = lazy(() => import('./pages/Speaking'))

// URLs from the previous site, kept alive so existing links and search results still land somewhere useful.
const legacyRedirects = [
  ['digital-marketing-consultant', '/services#consultation'],
  ['digitial-marketing-consultant', '/services#consultation'],
  ['corporate-training', '/services#training'],
  ['training', '/services#training'],
  ['public-speaking', '/speaking'],
  ['blog', '/insights'],
  ['blogs', '/insights'],
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="speaking" element={<SpeakingPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="contact" element={<ContactPage />} />
        {legacyRedirects.map(([from, to]) => <Route key={from} path={from} element={<Navigate to={to} replace />} />)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

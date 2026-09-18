import type { Metadata } from 'next'
import { HomeView } from '../components/views/HomeView'

export const metadata: Metadata = {
  title: 'Tarun Makhija — Digital Marketing Consultant, Corporate Trainer & Public Speaker',
  description: 'Tarun Makhija is a digital marketing consultant, corporate trainer, public speaker and mentor who has trained 25,000+ individuals and worked with 297+ brands.',
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeView />
}

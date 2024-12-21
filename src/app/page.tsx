// app/page.tsx
import { Metadata } from 'next'
import { Header } from '@/components/landing/Header'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { TemplatesSection } from '@/components/landing/TemplatesSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'OmniStack - Enterprise Waitlist Management',
  description: 'Create beautiful, customizable waitlist pages for your product. Build anticipation and collect leads with our powerful waitlist management platform.',
  keywords: [
    'waitlist management',
    'product launch',
    'landing pages',
    'lead generation',
    'customer acquisition',
    'startup tools'
  ],
  openGraph: {
    title: 'OmniStack - Enterprise Waitlist Management',
    description: 'Create beautiful, customizable waitlist pages for your product.',
    url: 'https://omnistack.xyz',
    siteName: 'OmniStack',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OmniStack Preview'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniStack - Enterprise Waitlist Management',
    description: 'Create beautiful, customizable waitlist pages for your product.',
    images: ['/twitter-image.png'],
  }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
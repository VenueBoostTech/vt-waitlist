// app/login/page.tsx
import { AuthLayout } from '@/components/auth/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { Footer } from '@/components/landing/Footer'
import { Header } from '@/components/landing/Header'
import { HeroSection } from '@/components/landing/HeroSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { TemplatesSection } from '@/components/landing/TemplatesSection'
import { Metadata } from 'next'

// SEO
export const metadata: Metadata = {
  title: 'OmniStack | Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
       <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
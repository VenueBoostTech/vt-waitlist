import { AuthLayout } from '@/components/auth/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'
import { Footer } from '@/components/landing/Footer'
import { Header } from '@/components/landing/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OmniStack | Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
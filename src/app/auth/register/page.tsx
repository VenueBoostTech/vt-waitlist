// app/login/page.tsx
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Metadata } from 'next'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'

// SEO
export const metadata: Metadata = {
  title: 'OmniStack | Register',
  description: 'Register to your account',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
       <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}

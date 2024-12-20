// app/login/page.tsx
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Metadata } from 'next'

// SEO
export const metadata: Metadata = {
  title: 'OmniStack | Register',
  description: 'Register to your account',
}

export default function RegisterPage() {
  return <RegisterForm />
}

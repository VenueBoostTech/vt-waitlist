// app/login/page.tsx
import { LoginForm } from '@/components/auth/LoginForm'
import { Metadata } from 'next'

// SEO
export const metadata: Metadata = {
  title: 'OmniStack | Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return <LoginForm />
}
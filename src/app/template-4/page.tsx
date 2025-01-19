// app/template-1/page.tsx
import WaitlistComponentTemplateFour from '@/components/WaitlistComponentFour'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Template 4 - Waitlist OmniStack',
  description: 'Template 4'
}

export default function Template4Page() {
  return <WaitlistComponentTemplateFour />
}
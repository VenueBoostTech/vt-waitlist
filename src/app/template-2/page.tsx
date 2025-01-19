// app/template-1/page.tsx
import WaitlistComponentTemplateTwo from '@/components/WaitlistComponentTwo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Template 2 - Waitlist OmniStack',
  description: 'Template 2'
}
  
export default function Template2Page() {
  return <WaitlistComponentTemplateTwo />
}
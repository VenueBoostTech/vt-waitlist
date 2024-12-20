// app/template-1/page.tsx
import WaitlistComponentTemplateThree from '@/components/WaitlistComponentThree'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Template 3 - OmniStack',
  description: 'Template 3'
}

export default function Template3Page() {
  return <WaitlistComponentTemplateThree />
}
// app/template-1/page.tsx
import WaitlistComponentTemplateOne from '@/components/WaitlistComponentOne'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Template 1 - OmniStack',
  description: 'Template 1'
}

export default function Template1Page() {
  return <WaitlistComponentTemplateOne />
}
import { Metadata } from 'next'
import WaitlistCreate from '@/components/waitlist/WaitlistCreate'

export const metadata: Metadata = {
  title: 'Create Waitlist - Waitlist OmniStack',
  description: 'Create a new waitlist'
}

export default function CreatePage() {
  return <WaitlistCreate />
}
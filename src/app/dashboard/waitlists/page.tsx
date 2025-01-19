import { Metadata } from 'next'
import WaitlistContent from '@/components/waitlist/WaitlistContent'

export const metadata: Metadata = {
  title: 'Waitlists - Waitlist OmniStack',
  description: 'Manage your waitlists'
}

export default function WaitlistsPage() {
  return <WaitlistContent />
}
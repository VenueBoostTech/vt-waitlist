import { Metadata } from 'next'
import WaitlistContent from '@/components/waitlist/WaitlistContent'

export const metadata: Metadata = {
  title: 'Waitlists - OmniStack',
  description: 'Manage your waitlists'
}

export default function WaitlistsPage() {
  return <WaitlistContent />
}
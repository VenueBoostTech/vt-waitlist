// app/dashboard/waitlists/[id]/edit/page.tsx
import WaitlistSimpleEdit from '@/components/waitlist/WaitlistSimpleEdit'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waitlist Edit - OmniStack',
  description: 'Edit your waitlist'
}

export default function WaitlistEditPage({ params }: { params: { id: string } }) {
  return <WaitlistSimpleEdit id={params.id} />
}
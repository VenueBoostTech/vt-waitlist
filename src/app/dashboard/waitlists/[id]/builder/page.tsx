// app/dashboard/waitlists/[id]/builder/page.tsx
import WaitlistBuilderEdit from '@/components/waitlist/WaitlistBuilderEdit'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waitlist Builder - OmniStack',
  description: 'Build your waitlist'
}

interface PageProps {
  params: {
    id: string
  }
}

async function getWaitlistId(params: PageProps['params']) {
  return params.id
}

export default async function WaitlistBuilderPage({ params }: PageProps) {
  const id = await getWaitlistId(params)
  return <WaitlistBuilderEdit id={id} />
}
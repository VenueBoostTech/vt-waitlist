import { Metadata } from 'next'
import WaitlistDetails from '@/components/waitlist/WaitlistDetails'

// Metadata for the page
export const metadata: Metadata = {
  title: 'Waitlist Details - Waitlist OmniStack',
  description: 'View and manage your waitlist'
}

type PageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function WaitlistDetailsPage(props: PageProps) {
  const waitlistId = props.params.id
  
  return <WaitlistDetails id={waitlistId} />
}
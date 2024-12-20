// app/dashboard/page.tsx
import DashboardClient from '@/components/dashboard/DashboardContent'

export const metadata = {
  title: 'Dashboard - OmniStack',
  description: 'Manage your waitlists and view analytics',
}

async function getStats() {
  // You can use your prisma client here directly
  // This runs on the server
  try {
    const stats = {
      totalWaitlists: 10, // Replace with actual DB query
      totalSubscribers: 100,
      activeWaitlists: 5
    }
    return stats
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      totalWaitlists: 0,
      totalSubscribers: 0,
      activeWaitlists: 0
    }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()
  
  return <DashboardClient initialStats={stats} />
}
// app/dashboard/analytics/page.tsx
import Analytics from '@/components/dashboard/Analytics'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics - Dashboard',
  description: 'View your analytics'
}

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Overview</h1>
      <Analytics />
    </div>
  )
}
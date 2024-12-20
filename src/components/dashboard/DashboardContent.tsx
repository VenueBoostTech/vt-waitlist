// components/dashboard/DashboardContent.tsx
'use client'

import { useState } from 'react'
import { Stats } from '@/components/dashboard/Stats'
import { QuickActions } from '@/components/dashboard/QuickActions'

interface DashboardClientProps {
  initialStats: {
    totalWaitlists: number
    totalSubscribers: number
    activeWaitlists: number
  }
}

export default function DashboardContent({ initialStats }: DashboardClientProps) {
  const [stats] = useState(initialStats)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Griseld! 👋</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Here's what's happening with your waitlists today.</p>
      </div>
      
      <Stats stats={stats} />
      <QuickActions />
    </div>
  )
}
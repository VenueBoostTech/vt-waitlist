// app/dashboard/analytics/page.tsx
import Analytics from '@/components/dashboard/Analytics'
import { Metadata } from 'next'
import { cookies } from "next/headers";

async function getStats() {
  const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const response = await fetch(`${API_URL}/api/analytics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  try {
    const stats = data.data;
    return stats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalWaitlists: 0,
      totalSubscribers: 0,
      activeWaitlists: 0,
      totalRefferals: 0
    };
  }
}

export const metadata: Metadata = {
  title: 'Analytics - Dashboard',
  description: 'View your analytics'
}

export default async function AnalyticsPage() {
  const stats = await getStats();

  return (
    <div className="py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Overview</h1>
      <Analytics stats={stats} />
    </div>
  )
}
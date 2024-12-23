// app/dashboard/page.tsx
import DashboardClient from "@/components/dashboard/DashboardContent";
import { cookies } from "next/headers";
export const metadata = {
  title: "Dashboard - OmniStack",
  description: "Manage your waitlists and view analytics",
};

async function getStats() {
  const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const response = await fetch(`${API_URL}/api/dashboard`, {
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
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return <DashboardClient initialStats={stats} />;
}

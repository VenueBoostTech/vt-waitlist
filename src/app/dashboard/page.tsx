// src/app/dashboard/page.tsx
import { Suspense } from 'react';
import DashboardClient from "@/components/dashboard/DashboardContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Dashboard - Waitlist OmniStack",
  description: "Manage your waitlists and view analytics",
};

async function getStats() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/auth/login");
  }

  try {
    const stats = await prisma.$transaction([
      prisma.waitlist.count({
        where: {
          OR: [
            { userId: session.user.id },
            { clientId: session.user.id }
          ]
        }
      }),
      prisma.waitlistEntry.count({
        where: {
          waitlist: {
            OR: [
              { userId: session.user.id },
              { clientId: session.user.id }
            ]
          }
        }
      }),
      prisma.waitlist.count({
        where: {
          OR: [
            { userId: session.user.id },
            { clientId: session.user.id }
          ],
          status: "active"
        }
      })
    ]);

    return {
      totalWaitlists: stats[0],
      totalSubscribers: stats[1],
      activeWaitlists: stats[2]
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      totalWaitlists: 0,
      totalSubscribers: 0,
      activeWaitlists: 0,
    };
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const stats = await getStats();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClient initialStats={stats} />
    </Suspense>
  );
}
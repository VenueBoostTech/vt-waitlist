import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await prisma.client.findUnique({
      where: { supabaseId: session.user.id },
    });

    if (!client) {
      return new NextResponse(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const waitlists = await prisma.waitlist.findMany({
      where: { clientId: client.id },
      select: {
        id: true,
        status: true,
      },
    });
    // Filter data base on status
    const activeWaitlists = waitlists.filter(
      (waitlist) => waitlist.status === "active"
    );

    const waitlistsEntry = await prisma.waitlistEntry.count({
      where: {
        waitlistId: {
          in: waitlists.map((waitlist) => waitlist.id),
        },
      },
    });

    const waitlistsEntrys = await prisma.waitlist.findMany({
      select: {
        id: true,
        _count: {
          select: { entries: true }, // Count subscribers in each waitlist
        },
      },
    });

    const totalWaitlists = waitlistsEntrys.length;
    const totalSubscribers = waitlistsEntrys.reduce((sum, waitlistsEntrys) => sum + waitlistsEntrys._count.entries, 0);

    const averageSubscribers = totalWaitlists > 0 ? totalSubscribers / totalWaitlists : 0;


    const totalRefferals = 0;

    const waitlistsAnalytics = await prisma.waitlist.findMany({
      select: {
        name: true,
        analytics: {
          select: {
            views: true,
            signups: true, // Signups correspond to subscribers
            dailyStats: true, // Assume dailyStats contain past growth data
          },
        },
        _count: {
          select: { entries: true }, // Total subscribers
        },
      },
    });

    const topWaitlists = waitlistsAnalytics.map((waitlist) => {
      const { views, signups, dailyStats } = waitlist.analytics || { views: 0, signups: 0, dailyStats: null };
      const subscribers = waitlist._count.entries;

      const conversionRate = views > 0 ? ((subscribers / views) * 100).toFixed(1) : "0.0";

      const stats : any = dailyStats ? dailyStats : null;
      const previousSignups = stats?.previousSignups || 0;

      // Calculate growth
      const growth : number = previousSignups > 0 ? (((subscribers - previousSignups) / previousSignups) * 100) : 0.0;

      return {
        name: waitlist.name,
        subscribers,
        conversionRate: `${conversionRate}%`,
        growth: growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`,
      };
    });

    // Sort by subscribers (or any criteria)
    topWaitlists.sort((a, b) => b.subscribers - a.subscribers);



    await prisma.$disconnect();

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: {
          totalWaitlists: waitlists.length,
          totalSubscribers: waitlistsEntry,
          activeWaitlists: activeWaitlists.length,
          totalRefferals: totalRefferals,
          averageSubscribers: averageSubscribers,
          topWaitlists: topWaitlists
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    await prisma.$disconnect();
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

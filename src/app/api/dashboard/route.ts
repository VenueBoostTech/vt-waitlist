// src/app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    return NextResponse.json({
      data: {
        totalWaitlists: stats[0],
        totalSubscribers: stats[1],
        activeWaitlists: stats[2]
      }
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
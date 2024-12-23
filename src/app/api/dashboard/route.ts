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
    await prisma.$disconnect();

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: {
          totalWaitlists: waitlists.length,
          totalSubscribers: waitlistsEntry,
          activeWaitlists: activeWaitlists.length,
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

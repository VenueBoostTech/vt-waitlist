// app/api/waitlist/[id]/subscribers/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await prisma.client.findUnique({
      where: { id: session.user.id },
    });

    if (!client) {
      return new NextResponse(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // First verify the waitlist belongs to this client
    const waitlist = await prisma.waitlist.findFirst({
      where: {
        id: params.id,
        clientId: client.id,
      },
    });

    if (!waitlist) {
      return new NextResponse(JSON.stringify({ error: "Waitlist not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get subscribers with pagination
    const page = new URL(req.url).searchParams.get("page") || "1";
    const limit = new URL(req.url).searchParams.get("limit") || "10";
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const subscribers = await prisma.waitlistEntry.findMany({
      where: {
        waitlistId: params.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        referralCode: true,
        status: true,
        createdAt: true,
        referralSource: true,
        customData: true,
      },
      orderBy: {
        position: "asc",
      },
      skip,
      take: parseInt(limit),
    });

    // Get total count
    const total = await prisma.waitlistEntry.count({
      where: {
        waitlistId: params.id,
      },
    });

    await prisma.$disconnect();

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: subscribers,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
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

// Add/update subscriber
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

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

    const body = await req.json();

    if (!body.email || !body.name) {
      return new NextResponse(
        JSON.stringify({ error: "Email and name are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get current position count
    const currentPosition = await prisma.waitlistEntry.count({
      where: {
        waitlistId: params.id,
      },
    });

    const entry = await prisma.waitlistEntry.create({
      data: {
        waitlistId: params.id,
        name: body.name,
        email: body.email,
        position: currentPosition + 1,
        referralCode: nanoid(8),
        status: "active",
        customData: body.customData || {},
      },
    });

    // Update analytics
    await prisma.analytics.update({
      where: {
        waitlistId: params.id,
      },
      data: {
        signups: {
          increment: 1,
        },
      },
    });

    await prisma.$disconnect();

    return new NextResponse(JSON.stringify({ success: true, data: entry }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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

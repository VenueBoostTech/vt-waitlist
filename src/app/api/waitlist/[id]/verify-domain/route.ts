// app/api/waitlist/[id]/verify-domain/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const waitlistId = params.id;

    // Check user's subscription - only allow domain verification for paid plans
    const waitlist = await prisma.waitlist.findUnique({
      where: { id: waitlistId },
      include: {
        client: {
          include: {
            subscription: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    if (!waitlist) {
      return NextResponse.json({ error: "Waitlist not found" }, { status: 404 });
    }

    // Only allow domain verification for Advanced and Pro plans
    const productName = waitlist.client.subscription?.product.name || '';
    if (!productName.toLowerCase().includes('advanced') && !productName.toLowerCase().includes('pro')) {
      return NextResponse.json(
        { error: "Domain verification requires a paid plan" },
        { status: 403 }
      );
    }

    // Update domain verification status
    const updatedSettings = await prisma.waitlistEmailSettings.upsert({
      where: { waitlistId },
      create: {
        waitlistId,
        isDomainVerified: true
      },
      update: {
        isDomainVerified: true
      }
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify domain" },
      { status: 500 }
    );
  }
}
// app/api/waitlist/[id]/email-settings/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const waitlistId = params.id;
    
    // Get email settings
    const emailSettings = await prisma.waitlistEmailSettings.findUnique({
      where: { waitlistId },
    });

    // If no settings exist, create default settings
    if (!emailSettings) {
      const newSettings = await prisma.waitlistEmailSettings.create({
        data: {
          waitlistId,
          emailNewSignups: true,
          congratulateReferral: false,
          customOffboarding: false,
          removeHeader: false,
          isDomainVerified: false,
        },
      });
      return NextResponse.json(newSettings);
    }

    return NextResponse.json(emailSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch email settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const waitlistId = params.id;
    const body = await req.json();

    // Update email settings
    const updatedSettings = await prisma.waitlistEmailSettings.upsert({
      where: { waitlistId },
      create: {
        waitlistId,
        ...body,
      },
      update: body,
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update email settings" },
      { status: 500 }
    );
  }
}
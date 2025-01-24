import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    const waitlistSettings = await prisma.waitlistSettings.findUnique({
      where: { waitlistId },
    });

    return NextResponse.json(waitlistSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch waitlist settings" },
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

    const updatedSettings = await prisma.waitlistSettings.upsert({
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
      { error: "Failed to update waitlist settings" },
      { status: 500 }
    );
  }
}

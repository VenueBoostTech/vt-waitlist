// app/api/waitlist/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get waitlist ID
    const id = params.id;

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let where = {};
    if (session.user.role == "CLIENT") {
      const client = await prisma.client.findUnique({
        where: { id: session.user.id },
      });
      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }
      where = { clientId: client.id };
    } else {
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      where = { userId: user.id };
    }

    // Get waitlist with verification
    const waitlist = await prisma.waitlist.findFirst({
      where: {
        id: id,
        ...where,
      },
    });

    if (!waitlist) {
      return NextResponse.json(
        { error: "Waitlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: waitlist,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();

  try {
    // Get waitlist ID
    const id = params.id;

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let where = {};
    if (session.user.role == "CLIENT") {
      const client = await prisma.client.findUnique({
        where: { id: session.user.id },
      });
      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }
      where = { clientId: client.id };
    } else {
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      where = { userId: user.id };
    }
    const body = await req.json();

    // Verify ownership
    const waitlist = await prisma.waitlist.findFirst({
      where: {
        id: id,
        ...where,
      },
    });

    if (!waitlist) {
      return NextResponse.json(
        { error: "Waitlist not found" },
        { status: 404 }
      );
    }

    // Update waitlist
    const updatedWaitlist = await prisma.waitlist.update({
      where: { id: id },
      data: {
        content: body.content,
        style: body.style,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedWaitlist,
    });
  } catch (error: any) {
    console.error("Error updating waitlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const waitlist = await prisma.$transaction(async (tx) => {
        // Delete analytics records first
        await tx.analytics.deleteMany({
            where: { waitlistId: id }
        });

        // Delete the associated email settings
        await tx.waitlistEmailSettings.deleteMany({
            where: { waitlistId: id }
        });

        // Delete the waitlist settings
        await tx.waitlistSettings.deleteMany({
            where: { waitlistId: id }
        });

        // Finally delete the waitlist
        return await tx.waitlist.delete({
            where: { id: id },
        });
    });

    return NextResponse.json(waitlist);
  } catch (error) {
    return NextResponse.json(
        { error: 'Failed to delete waitlist' },
        { status: 500 }
    );
  }
}

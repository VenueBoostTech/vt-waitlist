import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return redirect("/auth/login");
    }

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

    const body = await req.json();

    if (!body?.name || !body?.subdomain || !body?.templateId) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const slug = `${body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${nanoid(6)}`;

    const waitlistData: Prisma.WaitlistCreateInput = {
      name: body.name,
      templateId: parseInt(body.templateId),
      subdomain: body.subdomain.replace(/\.+$/, ""),
      slug,
      style: {},
      client: {
        connect: { id: client.id },
      },
      status: "active",
      customization: body.customization || null,
    };
    console.log(waitlistData);
    
    const waitlist = await prisma.waitlist.create({
      data: waitlistData,
    });

    await prisma.analytics.create({
      data: {
        waitlistId: waitlist.id,
        dailyStats: {},
        utmData: {},
      },
    });

    await prisma.$disconnect();

    return new NextResponse(JSON.stringify({ success: true, data: waitlist }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    await prisma.$disconnect();
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return redirect("/auth/login");
    }

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

    const waitlists = await prisma.waitlist.findMany({
      where: { clientId: client.id },
      include: {
        _count: { select: { entries: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    await prisma.$disconnect();

    return new NextResponse(
      JSON.stringify({ success: true, data: waitlists }),
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

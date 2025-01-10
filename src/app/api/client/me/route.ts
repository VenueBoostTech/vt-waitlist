// app/api/waitlist/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
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

    // Get client
    const client = await prisma.client.findUnique({
      where: { id: session.user.id },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
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

    // Get client
    const client = await prisma.client.findUnique({
      where: { id: session.user.id },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const body = await req.json();
    // Update client
    const updatedClient = await prisma.client.update({
      where: { id: client.id },
      data: {
        name: body.name,
        companyName: body.companyName,
        phone: body.phone,
        address: body.address,
        emailDigest: body.emailDigest,
        signupEmail: body.signupEmail,
        referralsEmail: body.referralsEmail,
      },
    });

    if (!updatedClient) {
      return NextResponse.json(
        { error: "Failed to update client" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

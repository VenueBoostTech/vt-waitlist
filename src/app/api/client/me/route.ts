// app/api/waitlist/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  const cookieStore = cookies();

  try {
    // Create Supabase client
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    // Get session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get client
    const client = await prisma.client.findUnique({
      where: { supabaseId: session.user.id },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.log("Error fetching waitlist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const cookieStore = cookies();

  try {
    // Create Supabase client
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    // Get session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get client
    const client = await prisma.client.findUnique({
      where: { supabaseId: session.user.id },
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
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

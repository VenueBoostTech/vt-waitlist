// app/api/test/create-client/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const hashedPassword = await bcrypt.hash("test1234", 10);

    const client = await prisma.client.create({
      // @ts-ignore
      data: {
        name: "VisionTrack",
        email: "info@visiontrack.xyz",
        password: hashedPassword,
        supabaseId: "dc4995ab-47b1-4cb1-b3a9-6f0386845567",
        subscription: "FREE",
      },
    });

    if (client) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.json({
      id: client.id,
      name: client.name,
      email: client.email,
    });
  } catch (error) {
    console.error("Error creating test client:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

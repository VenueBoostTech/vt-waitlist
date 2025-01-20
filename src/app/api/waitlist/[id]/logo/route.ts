// app/api/waitlist/[id]/logo/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL!,
  process.env.STORAGE_SUPABASE_SERVICE_KEY!
);

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
    const formData = await req.formData();
    const file = formData.get('logo') as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate unique filename
    const extension = file.name.split('.').pop();
    const filename = `${waitlistId}/logo-${Date.now()}.${extension}`;

    // Convert File to Buffer for Supabase upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('waitlist-logos') // Make sure this bucket exists in your Supabase storage
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error('Failed to upload file to Supabase');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('waitlist-logos')
      .getPublicUrl(filename);

    // Update logo URL in database
    const updatedSettings = await prisma.waitlistEmailSettings.upsert({
      where: { waitlistId },
      create: {
        waitlistId,
        logo: publicUrl,
      },
      update: {
        logo: publicUrl,
      },
    });

    return NextResponse.json({ logoUrl: publicUrl });
  } catch (error) {
    console.error('Error uploading logo:', error);
    return NextResponse.json(
      { error: "Failed to upload logo" },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE endpoint to remove logos
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const waitlistId = params.id;
    
    // Get current settings to find logo filename
    const settings = await prisma.waitlistEmailSettings.findUnique({
      where: { waitlistId }
    });

    if (settings?.logo) {
      // Extract filename from URL
      const filename = settings.logo.split('/').pop();
      
      // Delete from Supabase Storage
      const { error: deleteError } = await supabase
        .storage
        .from('waitlist-logos')
        .remove([`${waitlistId}/${filename}`]);

      if (deleteError) {
        console.error('Supabase delete error:', deleteError);
        throw new Error('Failed to delete file from Supabase');
      }
    }

    // Update database to remove logo URL
    await prisma.waitlistEmailSettings.update({
      where: { waitlistId },
      data: { logo: null }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting logo:', error);
    return NextResponse.json(
      { error: "Failed to delete logo" },
      { status: 500 }
    );
  }
}
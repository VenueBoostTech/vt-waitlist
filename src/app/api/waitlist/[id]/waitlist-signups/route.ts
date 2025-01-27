import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const waitlistId = params.id;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const signups = await prisma.waitlistSignups.findMany({
      where: { waitlistId },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        referrals: true,
        position: true,
        joinedAt: true 
      }
    });

    // Map to match the interface
    const formattedSignups = signups.map(signup => ({
      id: signup.id,
      name: signup.name || '',
      email: signup.email,
      position: signup.position,
      joinedAt: signup.joinedAt.toISOString(),
      status: signup.status,
      referralCount: signup.referrals
    }));

    return NextResponse.json({
      data: formattedSignups,
      pagination: {
        total: signups.length,
        pages: 1,
        page: 1,
        limit
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch signups' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const waitlistId = params.id;
    const body = await request.json();

    const waitlist = await prisma.waitlist.findUnique({
      where: { id: waitlistId },
    });

    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    // Get the current highest position
    const maxPosition = await prisma.waitlistSignups.aggregate({
      where: { waitlistId },
      _max: {
        position: true
      }
    });

    const nextPosition = (maxPosition._max.position || 0) + 1;
    const signups = Array.isArray(body) ? body : [body];

    const createdSignups = await prisma.$transaction(
      signups.map((signup, index) =>
        prisma.waitlistSignups.create({
          data: {
            waitlistId,
            email: signup.email,
            name: signup.name,
            status: signup.status || 'verified',
            referrals: signup.referrals || 0,
            position: nextPosition + index,
          },
        })
      )
    );

    await prisma.analytics.update({
      where: { waitlistId },
      data: {
        signups: {
          increment: signups.length,
        },
      },
    });

    return NextResponse.json({ data: createdSignups });
  } catch (error) {
    console.error('Error creating signups:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create signups' },
      { status: 500 }
    );
  }
}
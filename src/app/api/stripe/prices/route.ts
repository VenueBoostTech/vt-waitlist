// app/api/stripe/prices/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: 'Waitlist OmniStack'  // Only get Waitlist products
        }
      },
      include: {
        prices: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}
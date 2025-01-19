// app/api/subscriptions/products/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Fetch all products with their prices
    const products = await prisma.product.findMany({
      where: {
        // Only get products that have prices
        prices: {
          some: {}
        }
      },
      include: {
        prices: {
          orderBy: {
            amount: 'asc'
          },
          select: {
            id: true,
            amount: true,
            currency: true,
            interval: true,
            stripePriceId: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format the response
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stripeProductId: product.stripeProductId,
      prices: product.prices.map(price => ({
        id: price.id,
        amount: price.amount,
        currency: price.currency,
        interval: price.interval, // 'month', 'year', etc.
        stripePriceId: price.stripePriceId
      }))
    }));

    return NextResponse.json({
      data: formattedProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
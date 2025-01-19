import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    const clientId = searchParams.get('clientId');
    const productId = searchParams.get('productId');

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;
    if (clientId) where.clientId = clientId;
    if (productId) where.productId = productId;

    // Fetch subscriptions with related data
    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        skip,
        take: limit,
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              companyName: true,
            },
          },
          client: {
            select: {
              id: true,
              name: true,
              email: true,
              companyName: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              taxCategory: true,
            },
          },
          price: {
            select: {
              amount: true,
              currency: true,
              interval: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.subscription.count({ where }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Transform the data to a cleaner format
    const formattedSubscriptions = subscriptions.map(sub => ({
      id: sub.id,
      status: sub.status,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
      user: sub.user ? {
        id: sub.user.id,
        name: sub.user.name,
        email: sub.user.email,
        companyName: sub.user.companyName,
      } : null,
      client: sub.client ? {
        id: sub.client.id,
        name: sub.client.name,
        email: sub.client.email,
        companyName: sub.client.companyName,
      } : null,
      product: {
        id: sub.product.id,
        name: sub.product.name,
        description: sub.product.description,
        taxCategory: sub.product.taxCategory,
      },
      price: {
        amount: sub.price.amount,
        currency: sub.price.currency,
        interval: sub.price.interval,
      },
    }));

    return NextResponse.json({
      data: formattedSubscriptions,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        perPage: limit,
        hasNextPage,
        hasPreviousPage,
      },
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
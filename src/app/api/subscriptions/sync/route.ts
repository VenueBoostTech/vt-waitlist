import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export async function POST() {
  try {
    // Fetch products and prices from Stripe
    const products = await stripe.products.list({ expand: ['data.default_price'] });

    for (const product of products.data) {
      // Upsert Product
      const dbProduct = await prisma.product.upsert({
        where: { stripeProductId: product.id },
        update: {
          name: product.name,
          description: product.description || '',
          updatedAt: new Date(),
        },
        create: {
          name: product.name,
          description: product.description || '',
          stripeProductId: product.id,
          taxCategory: 'SaaS - Business Use',
        },
      });

      // Upsert Prices
      if (product.default_price && product.default_price.type === 'recurring') {
        const price = product.default_price;

        await prisma.price.upsert({
          where: { stripePriceId: price.id },
          update: {
            amount: price.unit_amount! / 100,
            interval: price.recurring!.interval,
            updatedAt: new Date(),
          },
          create: {
            stripePriceId: price.id,
            amount: price.unit_amount! / 100,
            currency: price.currency,
            interval: price.recurring!.interval,
            productId: dbProduct.id,
          },
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Sync completed successfully.' 
    });
  } catch (error) {
    console.error('Error syncing with Stripe:', error);
    return NextResponse.json(
      { success: false, message: 'Error syncing with Stripe.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
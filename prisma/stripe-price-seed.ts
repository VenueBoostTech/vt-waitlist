const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Seed Products
  const products = [
    { name: 'Waitlist OmniStack - Free', taxCategory: 'SaaS - Business Use', stripeProductId: 'prod_RcKS99Tj2BubbM' },
    { name: 'Waitlist OmniStack - Advanced', taxCategory: 'SaaS - Business Use', stripeProductId: 'prod_RcKW7g30B4BH7e' },
    { name: 'Waitlist OmniStack - Pro', taxCategory: 'SaaS - Business Use', stripeProductId: 'prod_RcKUXwrhBLnY0L' },
  ];

  const createdProducts = await Promise.all(
    products.map(product =>
      prisma.product.upsert({
        where: { stripeProductId: product.stripeProductId },
        update: { name: product.name, taxCategory: product.taxCategory },
        create: product,
      })
    )
  );

  // Seed Prices
  const prices = [
    // Free Plan
    { amount: 0, currency: 'USD', interval: 'monthly', stripePriceId: 'price_1Qj5nbK9QDeYHZl0NpNeobSq', productId: createdProducts[0].id },
    { amount: 0, currency: 'USD', interval: 'yearly', stripePriceId: 'price_1Qj5tyK9QDeYHZl0yznKVX0S', productId: createdProducts[0].id },

    // Advanced Plan
    { amount: 49.99, currency: 'USD', interval: 'monthly', stripePriceId: 'price_1Qj5pVK9QDeYHZl0CNViPp0w', productId: createdProducts[1].id },
    { amount: 499.99, currency: 'USD', interval: 'yearly', stripePriceId: 'price_1Qj5tIK9QDeYHZl0cxGU4qML', productId: createdProducts[1].id },

    // Pro Plan
    { amount: 149.99, currency: 'USD', interval: 'monthly', stripePriceId: 'price_1Qj5rMK9QDeYHZl0NXvdj5Vc', productId: createdProducts[2].id },
    { amount: 1499.99, currency: 'USD', interval: 'yearly', stripePriceId: 'price_1Qj5sRK9QDeYHZl0GZs1L6Gu', productId: createdProducts[2].id },
  ];

  await prisma.price.createMany({ data: prices });

  console.log('Database seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

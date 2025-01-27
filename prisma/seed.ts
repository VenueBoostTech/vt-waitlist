// prisma/seed.ts
const { PrismaClient, UserRole } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const { createClient } = require('@supabase/supabase-js')

const prisma = new PrismaClient()

// Check environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error('Required environment variables:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing',
    key: process.env.SUPABASE_SERVICE_KEY ? 'Present' : 'Missing'
  })
  throw new Error('Missing required Supabase environment variables')
}

// Initialize Supabase client with the correct env variable name
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function createSupabaseUser(email: string, password: string) {
  const { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) {
    throw new Error(`Failed to create Supabase user: ${error.message}`)
  }

  return user.user
}


async function cleanDatabase() {
  console.log('Cleaning invalid or conflicting subscriptions...');

  // Delete subscriptions with null userId and clientId
  await prisma.subscription.deleteMany({
    where: { userId: null, clientId: null },
  });

  console.log('Database cleanup completed.');
}

async function main() {
  try {
    console.log('Starting database cleanup...');
    await cleanDatabase();

    console.log('Fetching free product...');
    const freeProduct = await prisma.product.findFirstOrThrow({
      where: { name: 'Waitlist OmniStack - Free' },
      include: { prices: { where: { interval: 'month' } } },
    });
    console.log('Found free product:', freeProduct);

    if (!freeProduct.prices[0]) {
      throw new Error('No monthly price found for free product');
    }

    console.log('Creating client...');
    const client = await prisma.client.create({
      data: {
        name: 'Demo Waitlist',
        email: 'demo-waitlist@omnistackhub.xyz',
        password: await bcrypt.hash('demo123!', 10),
        companyName: 'Demo Waitlist OS',
        supabaseId: '910e4d69-09a9-4052-8227-8a301cbd94f5',
        platforms: ['waitlist'],
        phone: '+1234567890',
        address: '123 Demo Street',
      },
    });
    console.log('Created client:', client);

    console.log('Creating admin user...');
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin Client',
        email: 'admin-client@omnistackhub.xyz',
        password: await bcrypt.hash('admin123!', 10),
        role: UserRole.ADMIN,
        supabaseId: '6e2315cb-895c-4f00-9db1-4355df1888cd',
        platforms: ['waitlist'],
        client: { connect: { id: client.id } },
        companyName: 'Demo Waitlist OS',
        phone: '+1234567890',
        address: '123 Demo Street',
      },
    });
    console.log('Created admin user:', adminUser);

    console.log('Creating subscription...');
    const subscription = await prisma.subscription.create({
      data: {
        status: 'active',
        product: { connect: { id: freeProduct.id } },
        price: { connect: { id: freeProduct.prices[0].id } },
        client: { connect: { id: client.id } },
        user: { connect: { id: adminUser.id } },
      },
    });
    console.log('Created subscription:', subscription);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
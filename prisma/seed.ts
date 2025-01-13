// prisma/seed.ts
const { PrismaClient, UserRole, SubscriptionTier } = require('@prisma/client')
const bcrypt = require('bcrypt')
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
  process.env.SUPABASE_SERVICE_KEY  // Changed from SUPABASE_SERVICE_ROLE_KEY to SUPABASE_SERVICE_KEY
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

async function main() {
  // Clean up existing data
  await prisma.waitlistEntry.deleteMany({})
  await prisma.analytics.deleteMany({})
  await prisma.waitlist.deleteMany({})
  await prisma.billingHistory.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.client.deleteMany({})

  // Create users in Supabase first
  // const supabaseClientUser = await createSupabaseUser('demo-waitlist@omnistackhub.xyz', 'demo123!')
  // const supabaseAdminUser = await createSupabaseUser('admin-client@omnistackhub.xyz', 'admin123!')
  // const supabaseSuperAdminUser = await createSupabaseUser('superadmin+waitlist@omnistackhub.xyz', 'super123!')

  // Create a dummy client
  const client = await prisma.client.create({
    data: {
      name: "Demo Waitlist",
      email: "demo-waitlist@omnistackhub.xyz",
      password: await bcrypt.hash("demo123!", 10),
      companyName: "Demo Waitlist OS",
      supabaseId: '910e4d69-09a9-4052-8227-8a301cbd94f5',
      subscription: SubscriptionTier.FREE,
      platforms: ["waitlist"],
      phone: "+1234567890",
      address: "123 Demo Street"
    }
  })

  // Create admin user connected to client
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin Client",
      email: "admin-client@omnistackhub.xyz",
      password: await bcrypt.hash("admin123!", 10),
      role: UserRole.ADMIN,
      supabaseId: '6e2315cb-895c-4f00-9db1-4355df1888cd',
      subscription: SubscriptionTier.PRO,
      platforms: ["waitlist"],
      clientId: client.id,
      companyName: "Demo Waitlist OS",
      phone: "+1234567890",
      address: "123 Demo Street"
    }
  })

  // Create superadmin user (not connected to any client)
  const superAdminUser = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "superadmin+waitlist@omnistackhub.xyz",
      password: await bcrypt.hash("super123", 10),
      role: UserRole.SUPERADMIN,
      supabaseId: '627f3c9b-4464-4fbd-94a3-ac7d89f840ad',
      subscription: SubscriptionTier.PRO,
      platforms: ["waitlist"]
    }
  })

  console.log({
    message: "Seeding completed successfully",
    data: {
      client: {
        id: client.id,
        email: client.email,
        supabaseId: client.supabaseId
      },
      adminUser: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        supabaseId: adminUser.supabaseId
      },
      superAdminUser: {
        id: superAdminUser.id,
        email: superAdminUser.email,
        role: superAdminUser.role,
        supabaseId: superAdminUser.supabaseId
      }
    }
  })
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
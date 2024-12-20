// app/api/waitlist/join/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, email, referralSource } = await req.json()

    // Validate input
    if (!name || !email || !referralSource) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email }
    })

    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Get total count for position
    const totalCount = await prisma.waitlistEntry.count()

    // Create new entry
    const entry = await prisma.waitlistEntry.create({
      data: {
        name,
        email,
        referralSource,
        referralCode: nanoid(8),
        position: totalCount + 1
      }
    })

    return NextResponse.json({
      position: entry.position,
      totalCount: totalCount + 1,
      referralLink: `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist?ref=${entry.referralCode}`
    })
  } catch (error) {
    console.error('Error in waitlist join:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
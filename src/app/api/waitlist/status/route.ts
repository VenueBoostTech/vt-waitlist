// app/api/waitlist/status/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
      const { email } = await req.json()
  
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        )
      }
  
      const entry = await prisma.waitlistEntry.findUnique({
        where: { email }
      })
  
      if (!entry) {
        return NextResponse.json(
          { error: 'Email not found in waitlist' },
          { status: 404 }
        )
      }
  
      const totalCount = await prisma.waitlistEntry.count()
  
      return NextResponse.json({
        position: entry.position,
        totalCount,
        referralLink: `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist?ref=${entry.referralCode}`
      })
    } catch (error) {
      console.error('Error in waitlist status check:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
// app/api/waitlist/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    // TODO: Get clientId from session - for now using a test ID
    // You should implement proper auth later
    const clientId = '6765512434cad05620150196'

    const waitlists = await prisma.waitlist.findMany({
      where: {
        clientId
      },
      include: {
        _count: {
          select: { entries: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // @ts-ignore
    const formattedWaitlists = waitlists.map(waitlist => ({
      id: waitlist.id,
      name: waitlist.name,
      domain: waitlist.domain,
      subdomain: waitlist.subdomain,
      entries: waitlist._count.entries,
      createdAt: waitlist.createdAt
    }))

    return NextResponse.json(formattedWaitlists)
  } catch (error) {
    console.error('Error fetching waitlists:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
    try {
      const body = await req.json()
        
      const waitlist = await prisma.waitlist.create({
        data: body
      })
  
      return NextResponse.json(waitlist)
    } catch (error) {
      console.error('Error updating waitlist:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
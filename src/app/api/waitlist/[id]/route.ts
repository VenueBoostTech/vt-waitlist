import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { extractIdFromUrl } from '@/utils/urlHelpers'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req.nextUrl.pathname)

    if (!id) {
      return NextResponse.json(
        { error: 'Waitlist ID is required' },
        { status: 400 }
      )
    }

    const waitlist = await prisma.waitlist.findUnique({
      where: { id },
      include: {
        entries: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    })

    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(waitlist)
  } catch (error) {
    console.error('Error fetching waitlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const id = extractIdFromUrl(req.nextUrl.pathname)

    if (!id) {
      return NextResponse.json(
        { error: 'Waitlist ID is required' },
        { status: 400 }
      )
    }

    const waitlist = await prisma.waitlist.update({
      where: { id },
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

export async function DELETE(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req.nextUrl.pathname)

    if (!id) {
      return NextResponse.json(
        { error: 'Waitlist ID is required' },
        { status: 400 }
      )
    }

    await prisma.waitlist.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting waitlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
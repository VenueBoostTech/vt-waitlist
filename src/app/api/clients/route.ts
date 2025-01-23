import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body?.name || !body?.email || !body?.supabaseId) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Create the client record
    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        supabaseId: body.supabaseId,
        platforms: body.platforms || ['waitlist'],
        password: '', // We don't store the actual password since Supabase handles auth
      }
    })

    return new NextResponse(
      JSON.stringify({ success: true, data: client }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error: any) {
    console.error('Error creating client:', error)
    
    // Check for duplicate key error
    if (error.code === 'P2002') {
      return new NextResponse(
        JSON.stringify({ error: 'Email or Supabase ID already exists' }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } finally {
    await prisma.$disconnect()
  }
}
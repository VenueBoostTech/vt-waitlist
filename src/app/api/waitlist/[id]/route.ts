// app/api/waitlist/[id]/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  
  try {
    // Get waitlist ID
    const id = await Promise.resolve(params.id)

    // Create Supabase client
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    
    // Get session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    // Get user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get client
    const client = await prisma.client.findUnique({
      where: { supabaseId: user.id }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    // Get waitlist with verification
    const waitlist = await prisma.waitlist.findFirst({
      where: {
        id: id,
        clientId: client.id
      }
    })

    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: waitlist
    })

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  
  try {
    // Get waitlist ID
    const id = await Promise.resolve(params.id)

    // Create Supabase client
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    
    // Get session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    // Get user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get client
    const client = await prisma.client.findUnique({
      where: { supabaseId: user.id }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    const body = await req.json()

    // Verify ownership
    const waitlist = await prisma.waitlist.findFirst({
      where: {
        id: id,
        clientId: client.id
      }
    })

    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      )
    }

    // Update waitlist
    const updatedWaitlist = await prisma.waitlist.update({
      where: { id: id },
      data: {
        content: body.content,
        style: body.style,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedWaitlist
    })

  } catch (error) {
    console.error('Error updating waitlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
// app/api/send-verification/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { VerificationEmail } from '@/lib/emails/verification-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, userName, verificationUrl } = await req.json()

    const data = await resend.emails.send({
      from: 'OmniStack <noreply@omnistack.xyz>',
      to: email,
      subject: 'Verify your email for OmniStack',
      react: VerificationEmail({ verificationUrl, userName }) as React.ReactElement,
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
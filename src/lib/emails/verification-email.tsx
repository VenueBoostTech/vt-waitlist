// lib/emails/verification-email.tsx
import { JSXElementConstructor, ReactElement } from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Preview,
  Section,
} from '@react-email/components'

interface VerificationEmailProps {
  verificationUrl: string
  userName: string
}

export const VerificationEmail = ({
  verificationUrl,
  userName,
}: VerificationEmailProps): ReactElement<JSXElementConstructor<any>> => (
  <Html>
    <Head />
    <Preview>Verify your email for VisionTrack</Preview>
    <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'system-ui' }}>
      <Container style={{ padding: '40px 0' }}>
        <Section style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
            Welcome to VisionTrack!
          </Text>
          <Text style={{ fontSize: '16px', color: '#374151', marginBottom: '24px' }}>
            Hi {userName},
          </Text>
          <Text style={{ fontSize: '16px', color: '#374151', marginBottom: '24px' }}>
            Please verify your email address by clicking the button below:
          </Text>
          <Button
            href={verificationUrl}
            style={{
              backgroundColor: '#a47764',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Verify Email
          </Button>
          <Text style={{ fontSize: '14px', color: '#6B7280', marginTop: '24px' }}>
            If you didn't create this account, you can ignore this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)
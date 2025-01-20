import { JSXElementConstructor, ReactElement } from 'react'

interface VerificationEmailProps {
  verificationUrl: string
  userName: string
}

export const VerificationEmail = ({
  verificationUrl,
  userName,
}: VerificationEmailProps): ReactElement<JSXElementConstructor<any>> => (
  <html>
    <head>
      <title>Verify your email for Waitlist OmniStack</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style={{ 
      backgroundColor: '#f6f9fc', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      padding: 0,
      width: '100%',
      WebkitTextSizeAdjust: '100%',
      // @ts-ignore
      MsTextSizeAdjust: '100%'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '40px 20px'
      }}>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '40px', 
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#111827',
            lineHeight: '1.25',
            margin: '0 0 24px'
          }}>
            Welcome to Waitlist OmniStack!
          </h1>
          
          <p style={{ 
            fontSize: '16px', 
            color: '#374151', 
            marginBottom: '24px',
            lineHeight: '1.5',
            margin: '0 0 24px'
          }}>
            Hi {userName},
          </p>
          
          <p style={{ 
            fontSize: '16px', 
            color: '#374151', 
            marginBottom: '24px',
            lineHeight: '1.5',
            margin: '0 0 24px'
          }}>
            Please verify your email address by clicking the button below:
          </p>
          
          {/* @ts-ignore */}
          <table cellPadding="0" cellSpacing="0" border="0" style={{
            marginBottom: '24px'
          }}>
            <tr>
              <td align="left">
                <a
                  href={verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#a47764',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    display: 'inline-block',
                    fontWeight: '500',
                    lineHeight: '1',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    // @ts-ignore
                    msoLineHeightRule: 'exactly',
                    MsTextSizeAdjust: '100%',
                    WebkitTextSizeAdjust: '100%'
                  }}
                >
                  Verify Email
                </a>
              </td>
            </tr>
          </table>
          
          <p style={{ 
            fontSize: '14px', 
            color: '#6B7280', 
            marginTop: '24px',
            lineHeight: '1.5',
            margin: '24px 0 0'
          }}>
            If you didn't create this account, you can ignore this email.
          </p>

          <p style={{ 
            fontSize: '14px', 
            color: '#6B7280', 
            marginTop: '24px',
            lineHeight: '1.5',
            margin: '24px 0 0'
          }}>
            If the button doesn't work, you can copy and paste this link into your browser: <br />
            <a 
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#a47764',
                textDecoration: 'underline',
                wordBreak: 'break-all'
              }}
            >
              {verificationUrl}
            </a>
          </p>
        </div>
      </div>
    </body>
  </html>
)

import './globals.css'
import { ThemeProvider } from '@/context/theme-context'

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      </body>
      </html>
  )
}
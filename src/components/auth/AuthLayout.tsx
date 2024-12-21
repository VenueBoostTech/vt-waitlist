// components/auth/AuthLayout.tsx
import { Header } from '../landing/Header'
import { Footer } from '../landing/Footer'

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
        <Footer className="mt-auto" />
      </div>
    )
}
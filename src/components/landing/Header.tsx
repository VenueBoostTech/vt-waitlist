// components/landing/Header.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Try it Live', href: '#demo' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Documentation', href: '/documentation' },
  { name: 'Blog', href: '/blog' },
]

export function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {/* Replace with your logo */}
              <div className="text-[#a47764] font-bold text-2xl">OmniStack</div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button className="bg-[#a47764] hover:bg-[#b58775]">
              <Link href="/auth/register" className="text-white hover:text-gray-900">
                Sign up
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
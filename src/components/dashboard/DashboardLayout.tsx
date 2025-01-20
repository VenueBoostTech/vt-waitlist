'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Home, List, BarChart, Settings, CreditCard } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Waitlists', href: '/dashboard/waitlists', icon: List },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  
  // Updated Supabase client initialization
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )


  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b h-16 fixed w-full top-0 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/images/logo/waitlist-logo.svg"
                alt="Waitlist"
                width={110}
                height={40}
              />
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-[#a47764] text-white">GG</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">Griseld Gerveni</p>
                    <p className="text-xs text-gray-500">info@omnistackhub.xyz</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/settings" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/billing" className="w-full">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onSelect={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white border-r transition-transform duration-200 ease-in-out pt-16 z-40`}
      >
        <nav className="mt-6 px-4">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 my-1 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#a47764] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className={`pt-16 min-h-screen ${sidebarOpen ? 'pl-64' : ''} transition-all duration-200`}>
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
// components/landing/HeroSection.tsx
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <div className={twMerge("bg-white pt-32 pb-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Quick and Easy Waitlist with{' '}
            <span className="text-[#a47764]">Built-in Referrals</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 mb-8">
            Create viral loops for your product launch with our waitlists: built-in referral and email
            marketing, analytics, leaderboards, captcha and more.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" className="bg-[#a47764] hover:bg-[#b58775]">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Try it Live
            </Button>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="font-bold text-4xl text-gray-900">30,801</div>
            <div className="text-gray-600 mt-2">Our Users</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-4xl text-gray-900">19,957,114</div>
            <div className="text-gray-600 mt-2">Total Waitlist Signups</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-4xl text-gray-900">5,880,415</div>
            <div className="text-gray-600 mt-2">Total Referrals</div>
          </div>
        </div>
      </div>
    </div>
  )
}
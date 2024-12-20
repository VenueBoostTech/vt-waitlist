// components/landing/HeroSection.tsx
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <div className={twMerge("bg-white", className)}>
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Create Beautiful Waitlists for Your Product
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Build anticipation and collect leads with customizable waitlist pages.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block bg-[#a47764] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#b58775]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
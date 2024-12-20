// components/dashboard/QuickActions.tsx
import Link from 'next/link'

export function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link 
          href="/dashboard/waitlists/create"
          className="p-4 border rounded-lg hover:border-[#a47764] group text-center"
        >
          <div className="w-12 h-12 bg-[#a47764]/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#a47764]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-[#a47764]">
            Create New Waitlist
          </h3>
        </Link>
        
        <Link 
          href="/dashboard/waitlists"
          className="p-4 border rounded-lg hover:border-[#a47764] group text-center"
        >
          <div className="w-12 h-12 bg-[#a47764]/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#a47764]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-[#a47764]">
            View All Waitlists
          </h3>
        </Link>
      </div>
    </div>
  )
}
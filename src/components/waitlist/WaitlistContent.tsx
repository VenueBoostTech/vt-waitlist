'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Waitlist {
  id: string
  name: string
  url: string
  subscribers: number
  createdAt: string
}

export default function WaitlistContent() {
  const [waitlists, setWaitlists] = useState<Waitlist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch waitlists
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Your Waitlists</h1>
        <Link
          href="/dashboard/waitlists/create"
          className="bg-[#a47764] hover:bg-[#b58775] text-white px-4 py-2 rounded-lg"
        >
          Create New Waitlist
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscribers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {waitlists.map((waitlist) => (
              <tr key={waitlist.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {waitlist.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {waitlist.url}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {waitlist.subscribers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(waitlist.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    href={`/dashboard/waitlists/${waitlist.id}`}
                    className="text-[#a47764] hover:text-[#b58775]"
                  >
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
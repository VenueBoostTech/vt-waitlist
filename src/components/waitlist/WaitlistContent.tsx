'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Waitlist {
  id: string
  name: string
  subdomain: string
  _count: {
    entries: number
  }
  createdAt: string
}

export default function WaitlistContent() {
  const [waitlists, setWaitlists] = useState<Waitlist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchWaitlists() {
      try {
        const response = await fetch('/api/waitlist')
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch waitlists')
        }

        const data = await response.json()
        setWaitlists(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load waitlists')
      } finally {
        setLoading(false)
      }
    }

    fetchWaitlists()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a47764]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    )
  }

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

      {waitlists.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">You haven't created any waitlists yet.</p>
          <Link
            href="/dashboard/waitlists/create"
            className="text-[#a47764] hover:text-[#b58775] inline-block mt-2"
          >
            Create your first waitlist →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                <tr key={waitlist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {waitlist.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a 
                      href={`https://${waitlist.subdomain}.visiontrack.xyz`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#a47764] hover:text-[#b58775]"
                    >
                      {waitlist.subdomain}.visiontrack.xyz
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {waitlist._count.entries}
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
      )}
    </div>
  )
}
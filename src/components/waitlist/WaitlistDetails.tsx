'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Link as LinkIcon, Copy, Settings, Trash } from 'lucide-react'

interface WaitlistData {
  id: string
  name: string
  subdomain: string
  subscribers: number
  createdAt: string
  template: {
    id: string
    name: string
  }
  customization: {
    colors: {
      primary: string
    }
  }
}

interface Subscriber {
  id: string
  email: string
  name: string
  position: number
  joinedAt: string
  referralCount: number
}

export default function WaitlistDetails({ id }: { id: string }) {
  const [waitlist, setWaitlist] = useState<WaitlistData | null>(null)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [waitlistRes, subscribersRes] = await Promise.all([
          fetch(`/api/waitlist/${id}`),
          fetch(`/api/waitlist/${id}/subscribers`)
        ])

        if (!waitlistRes.ok || !subscribersRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const [waitlistData, subscribersData] = await Promise.all([
          waitlistRes.json(),
          subscribersRes.json()
        ])

        setWaitlist(waitlistData)
        setSubscribers(subscribersData)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!waitlist) return <div>Waitlist not found</div>

  const waitlistUrl = `https://${waitlist.subdomain}.visiontrack.xyz`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard/waitlists" 
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">{waitlist.name}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
          <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50">
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Subscribers</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {waitlist.subscribers}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">24.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Referral Rate</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">12.8%</p>
        </div>
      </div>

      {/* URL Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Waitlist URL</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1 flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{waitlistUrl}</span>
          </div>
          <button
            onClick={() => copyToClipboard(waitlistUrl)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Subscribers</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referrals
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subscriber.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subscriber.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{subscriber.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(subscriber.joinedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subscriber.referralCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
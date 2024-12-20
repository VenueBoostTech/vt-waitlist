'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface FormData {
  name: string
  templateId: string
  subdomain: string
  customization: {
    colors: {
      primary: string
    }
  }
}

export default function WaitlistCreate() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    templateId: '1',
    subdomain: '',
    customization: {
      colors: {
        primary: '#a47764'
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create waitlist')
      }

      const data = await response.json()
      router.push(`/dashboard/waitlists/${data.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-semibold text-gray-900">Create New Waitlist</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Waitlist Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a47764] focus:border-[#a47764]"
              placeholder="Enter waitlist name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Template
            </label>
            <select
              value={formData.templateId}
              onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a47764] focus:border-[#a47764]"
              required
            >
              <option value="1">Template One</option>
              <option value="2">Template Two</option>
              <option value="3">Template Three</option>
              <option value="4">Template Four</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subdomain
            </label>
            <div className="flex rounded-lg">
              <input
                type="text"
                value={formData.subdomain}
                onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                className="flex-1 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#a47764] focus:border-[#a47764]"
                placeholder="your-waitlist"
                required
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
                .visiontrack.xyz
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Brand Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={formData.customization.colors.primary}
                onChange={(e) => setFormData({
                  ...formData,
                  customization: {
                    ...formData.customization,
                    colors: {
                      ...formData.customization.colors,
                      primary: e.target.value
                    }
                  }
                })}
                className="w-16 h-16 p-1 border border-gray-300 rounded-lg"
              />
              <span className="text-sm text-gray-500">
                This color will be used for buttons and accents
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-4">
            <Link
              href="/dashboard/waitlists"
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#a47764] hover:bg-[#b58775] text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Waitlist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
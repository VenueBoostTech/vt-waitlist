'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const dummySettings = {
  name: 'John Doe',
  email: 'john@example.com',
  companyName: 'VisionTrack Inc.',
  phone: '+1 234 567 8900',
  subscription: 'PRO',
  address: '123 Business Ave, NY 10001',
  notifyOnSignup: true,
  notifyOnReferral: true,
  emailDigest: 'weekly'
}

export default function Settings() {
  const router = useRouter()
  const [settings, setSettings] = useState(dummySettings)
  const [saving, setSaving] = useState(false)
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Account Info */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Account Information</h2>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#a47764] text-white">
              {settings.subscription}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifyOnSignup}
                onChange={(e) => setSettings({ ...settings, notifyOnSignup: e.target.checked })}
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              />
              <span className="text-sm text-gray-700">Email me when someone signs up</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifyOnReferral}
                onChange={(e) => setSettings({ ...settings, notifyOnReferral: e.target.checked })}
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              />
              <span className="text-sm text-gray-700">Email me for new referrals</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Digest
              </label>
              <select
                value={settings.emailDigest}
                onChange={(e) => setSettings({ ...settings, emailDigest: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] disabled:opacity-50"
        >
          {saving ? 'Saving Changes...' : 'Save Changes'}
        </button>

        <button
          onClick={handleSignOut}
          className="px-6 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
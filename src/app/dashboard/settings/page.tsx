// app/dashboard/settings/page.tsx
import Settings from '@/components/dashboard/Settings'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings - Dashboard',
  description: 'Manage your settings'
}

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h1>
      <Settings />
    </div>
  )
}
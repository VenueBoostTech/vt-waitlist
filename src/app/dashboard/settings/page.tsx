// app/dashboard/settings/page.tsx
import Settings from '@/components/dashboard/Settings'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings - Dashboard',
  description: 'Manage your settings'
}

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h1>
      <Settings />
    </>
  )
}
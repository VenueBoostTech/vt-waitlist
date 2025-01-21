// app/dashboard/billing/page.tsx
import Billing from '@/components/dashboard/Billing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Billing - Dashboard',
  description: 'Manage your subscription and billing'
}

export default function BillingPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Billing & Plans</h1>
      <Billing />
    </>
  )
}
'use client'

import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    features: [
      'Up to 5 waitlists',
      'Basic analytics',
      'Email notifications',
      'Standard support'
    ],
    highlight: false,
    current: false
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: '$29',
    features: [
      'Up to 20 waitlists',
      'Advanced analytics',
      'Custom domains',
      'Priority support',
      'Referral system'
    ],
    highlight: true,
    current: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    features: [
      'Unlimited waitlists',
      'Enterprise analytics',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Team collaboration'
    ],
    highlight: false,
    current: false
  }
]

const billingHistory = [
  {
    id: 1,
    date: '2024-03-21',
    amount: 29.00,
    status: 'Paid',
    plan: 'Advanced',
    invoice: 'INV-2024-001'
  },
  {
    id: 2,
    date: '2024-02-21',
    amount: 29.00,
    status: 'Paid',
    plan: 'Advanced',
    invoice: 'INV-2024-002'
  },
  {
    id: 3,
    date: '2024-01-21',
    amount: 29.00,
    status: 'Paid',
    plan: 'Advanced',
    invoice: 'INV-2024-003'
  }
]

export default function Billing() {
  const [selectedPlan, setSelectedPlan] = useState('advanced')
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (planId: string) => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div className="max-w-5xl space-y-8">
      {/* Current Plan Alert */}
      <div className="bg-[#f8f5f4] border border-[#a47764] rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-[#a47764] mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-[#a47764]">Current Plan: Advanced</h3>
          <p className="mt-1 text-sm text-gray-600">
            Your next billing date is April 21, 2024. Cancel or change your plan anytime.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-lg ${
                plan.highlight 
                  ? 'ring-2 ring-[#a47764] shadow-lg' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full bg-[#f8f5f4] text-[#a47764]">
                  Popular
                </span>
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">{plan.price}<span className="text-sm font-normal text-gray-500">/month</span></p>
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-[#a47764] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={loading || plan.current}
                  className={`mt-8 w-full px-4 py-3 rounded-lg font-medium ${
                    plan.current 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : plan.highlight
                        ? 'bg-[#a47764] text-white hover:bg-[#b58775]'
                        : 'bg-white border border-[#a47764] text-[#a47764] hover:bg-[#f8f5f4]'
                  } disabled:opacity-50`}
                >
                  {loading ? 'Processing...' : plan.current ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-6">Billing History</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingHistory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#a47764] hover:text-[#b58775]">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
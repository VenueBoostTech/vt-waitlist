// components/dashboard/Analytics.tsx
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const dummyData = {
  totalWaitlists: 12,
  totalSubscribers: 2548,
  avgConversion: 24.3,
  totalReferrals: 856,
  growthData: [
    { date: '2024-01', subscribers: 1200, referrals: 300 },
    { date: '2024-02', subscribers: 1800, referrals: 450 },
    { date: '2024-03', subscribers: 2548, referrals: 856 },
  ],
  topWaitlists: [
    { id: 1, name: 'Product Launch', subscribers: 856, conversion: 35.2, growth: 12.5 },
    { id: 2, name: 'Beta Access', subscribers: 654, conversion: 28.9, growth: 8.7 },
    { id: 3, name: 'Early Access', subscribers: 452, conversion: 25.4, growth: 6.2 },
  ]
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Total Waitlists</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{dummyData.totalWaitlists}</div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Total Subscribers</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{dummyData.totalSubscribers}</div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Average Conversion</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{dummyData.avgConversion}%</div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Total Referrals</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{dummyData.totalReferrals}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Growth Trend</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData.growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="subscribers" name="Subscribers" stroke="#a47764" />
              <Line type="monotone" dataKey="referrals" name="Referrals" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Top Performing Waitlists</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyData.topWaitlists.map((waitlist) => (
                <tr key={waitlist.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{waitlist.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{waitlist.subscribers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{waitlist.conversion}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+{waitlist.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
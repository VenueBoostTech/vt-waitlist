"use client"

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Analytics({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Total Waitlists</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalWaitlists}</div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Total Subscribers</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalSubscribers}</div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Average Conversion</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{stats?.averageSubscribers.toFixed(2)}%</div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="text-sm font-medium text-gray-500">Total Referrals</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalRefferals}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Growth Trend</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats?.growthData}>
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
              {stats?.topWaitlists?.map((waitlist) => (
                <tr key={`waitlist-${waitlist.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{waitlist.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{waitlist.subscribers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{waitlist.conversionRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+{waitlist.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
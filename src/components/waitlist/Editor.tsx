import { BarChart3, Copy, LinkIcon, Share, Users2 } from "lucide-react";
import React from "react";

const Editor = ({ waitlist }: any) => {
  if (!waitlist) return null;

  const waitlistUrl = `https://${waitlist.subdomain}.waitlist.omnistackhub.xyz`;

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Total Subscribers
            </h3>
            <span className="flex h-8 w-8 rounded-full bg-[#f8f5f4] items-center justify-center">
              <Users2 className="h-4 w-4 text-[#a47764]" />
            </span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {waitlist.subscribers}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Conversion Rate
            </h3>
            <span className="flex h-8 w-8 rounded-full bg-[#f8f5f4] items-center justify-center">
              <BarChart3 className="h-4 w-4 text-[#a47764]" />
            </span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mt-2">24.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Referral Rate</h3>
            <span className="flex h-8 w-8 rounded-full bg-[#f8f5f4] items-center justify-center">
              <Share className="h-4 w-4 text-[#a47764]" />
            </span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mt-2">12.8%</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Waitlist URL</h2>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{waitlistUrl}</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(waitlistUrl)}
            className="flex items-center space-x-2 px-4 py-3 text-[#a47764] hover:text-[#b58775] rounded-lg hover:bg-[#f8f5f4]"
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm font-medium">Copy</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            Recent Subscribers
          </h2>
          <button className="text-sm text-[#a47764] hover:text-[#b58775] font-medium">
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Joined
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Referrals
                </th>
              </tr>
            </thead>
            {/* <tbody className="bg-white divide-y divide-gray-200">
      {subscribers?.map((subscriber) => (
        <tr key={subscriber.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{subscriber.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{subscriber.email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">#{subscriber.position}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {new Date(subscriber.joinedAt).toLocaleDateString()}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{subscriber.referralCount}</div>
          </td>
        </tr>
      ))}
    </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Editor;

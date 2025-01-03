import { Copy, LinkIcon, Users2, MoreVertical, Mail, CheckCircle, XCircle } from "lucide-react";
import React from "react";

// Mock data with more test signups
const mockSignups = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@gmail.com",
    position: 1,
    joinedAt: "2024-03-20",
    status: "verified",
    referralCount: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@outlook.com",
    position: 2,
    joinedAt: "2024-03-19",
    status: "pending",
    referralCount: 3
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "mike.brown@yahoo.com",
    position: 3,
    joinedAt: "2024-03-18",
    status: "verified",
    referralCount: 2
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.w@gmail.com",
    position: 4,
    joinedAt: "2024-03-17",
    status: "verified",
    referralCount: 0
  }
];

const AllSignups = ({ waitlist }: any) => {
  if (!waitlist) return null;

  const waitlistUrl = `https://${waitlist.subdomain}.visiontrack.xyz`;
  const hasSignups = mockSignups.length > 0;

  if (!hasSignups) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-center w-12 h-12 bg-[#a47764]/10 rounded-full mb-4">
          <Users2 className="h-6 w-6 text-[#a47764]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No signups yet</h3>
        <p className="text-gray-500 mt-2 text-center max-w-md mb-6">
          Signups will appear here when they join your waitlist.
        </p>
        <button className="w-full max-w-sm px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors mb-4">
          Import users
        </button>
        <p className="text-sm text-gray-500 mb-4">or share your waitlist</p>
        <div className="flex items-center space-x-2 max-w-md w-full">
          <div className="flex-1 flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{waitlistUrl}</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(waitlistUrl)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm font-medium">Copy</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSignups.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{user.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status === 'verified' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Mail className="w-3 h-3 mr-1" />
                      )}
                      {user.status === 'verified' ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.referralCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSignups;
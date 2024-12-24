import { Users2, RotateCcw } from "lucide-react";
import React from "react";

const OffboardedSignups = ({ waitlist }: any) => {
  if (!waitlist) return null;
  
  const offboardedUsers = [
    {
      id: 1,
      name: "David Chen",
      email: "david.chen@gmail.com",
      offboardedDate: "2024-03-15",
      reason: "Already onboarded to product",
      position: 12
    },
    {
      id: 2,
      name: "Lisa Anderson",
      email: "lisa.a@yahoo.com",
      offboardedDate: "2024-03-14",
      reason: "Invalid email",
      position: 45
    },
    {
      id: 3,
      name: "Alex Thompson",
      email: "alex.t@outlook.com",
      offboardedDate: "2024-03-13",
      reason: "User requested removal",
      position: 23
    }
  ];

  if (offboardedUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-center w-12 h-12 bg-[#a47764]/10 rounded-full mb-4">
          <Users2 className="h-6 w-6 text-[#a47764]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No offboarded users</h3>
        <p className="text-gray-500 mt-2 text-center max-w-md">
          Offboarded users will appear here when you remove them from your waitlist.
        </p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offboarded Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offboardedUsers.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{user.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.offboardedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="inline-flex items-center text-[#a47764] hover:text-[#b58775] font-medium">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restore
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

export default OffboardedSignups;
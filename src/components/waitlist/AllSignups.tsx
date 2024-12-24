import { Copy, LinkIcon, Users2 } from "lucide-react";
import React from "react";

const AllSignups = ({ waitlist }: any) => {
  if (!waitlist) return null;

  const waitlistUrl = `https://${waitlist.subdomain}.visiontrack.xyz`;

  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col gap-2 items-center">
        <Users2 className="h-5 w-5 text-blue-700" />
        <h6 className="text-black">No signups yet</h6>
        <p className="text-gray-600">
          Signups will appear here when they join your waitlist.
        </p>
        <div className="flex items-center justify-center space-x-4 border border-gray-200 rounded-lg py-1.5 w-full text-blue-700 cursor-pointer">
          Import user
        </div>
        <p className="text-gray-600">or share your waitlist</p>
        <div className="flex items-center space-x-4 border border-gray-200 rounded-lg">
          <div className="flex-1 flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{waitlistUrl}</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(waitlistUrl)}
            className="flex items-center space-x-2 px-4 py-3 bg-blue-700 text-white rounded-lg"
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm font-medium">Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllSignups;

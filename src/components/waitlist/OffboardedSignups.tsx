import { Users2 } from "lucide-react";
import React from "react";

const OffboardedSignups = ({ waitlist }: any) => {
  if (!waitlist) return null;

  const waitlistUrl = `https://${waitlist.subdomain}.visiontrack.xyz`;

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[60vh]">
      <Users2 className="h-5 w-5 text-blue-700" />
      <h6 className="text-black">No offboarded user</h6>
      <p className="text-gray-600">
        Offboarded users will appear when you offboard them from your waitlist.
      </p>
    </div>
  );
};

export default OffboardedSignups;

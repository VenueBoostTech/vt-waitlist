import React from "react";

const ImportAndExport = ({ waitlist }: any) => {
  if (!waitlist) return null;

  const waitlistUrl = `https://${waitlist.subdomain}.visiontrack.xyz`;

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full mt-5">
      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 w-full">
        <div>
          <h4 className="text-black font-semibold">Export Data</h4>
          <p className="max-w-[70%] text-gray-400">
            You will recieve the data from all the Signups on this Waitlist as a
            CSV by email.
          </p>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg whitespace-nowrap h-fit">
          Export waitlist
        </button>
      </div>
      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 w-full">
        <div>
          <h4 className="text-black font-semibold">Import Data</h4>
          <p className="max-w-[70%] text-gray-400">
            Upload a CSV to import signups to your Waitlist. The CSV must
            contain an "email" column. It is optional to include a "verified"
            coloumn which will set each Signup&apos;s email verification status.
            See{" "}
            <a href="#" className="underline text-blue-700">
              here
            </a>{" "}
            for an example.
          </p>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg whitespace-nowrap h-fit">
         Upload CSV
        </button>
      </div>
    </div>
  );
};

export default ImportAndExport;

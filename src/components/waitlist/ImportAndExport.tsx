import React from "react";
import { Download, Upload, FileSpreadsheet, AlertCircle } from "lucide-react";

const ImportAndExport = ({ waitlist }: any) => {
  if (!waitlist) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 space-y-6">
        {/* Export Card */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-[#a47764]/10 rounded-lg">
                <Download className="h-5 w-5 text-[#a47764]" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Export Data</h4>
              <p className="mt-1 text-sm text-gray-500 max-w-2xl">
                You will receive the data from all the Signups on this Waitlist as a CSV by email.
              </p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors whitespace-nowrap">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Waitlist
          </button>
        </div>

        {/* Import Card */}
        <div className="flex items-start justify-between pt-2">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-[#a47764]/10 rounded-lg">
                <Upload className="h-5 w-5 text-[#a47764]" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Import Data</h4>
              <p className="mt-1 text-sm text-gray-500 max-w-2xl">
                Upload a CSV to import signups to your Waitlist. The CSV must contain an "email" column.
              </p>
              <div className="mt-3 flex items-start space-x-2 text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Optional: Include a "verified" column to set email verification status.
                  <a href="#" className="text-[#a47764] hover:text-[#b58775] ml-1 underline">
                    See example
                  </a>
                </p>
              </div>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors whitespace-nowrap">
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportAndExport;
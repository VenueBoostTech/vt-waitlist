// components/AllSignups.tsx
"use client";

import { useToast } from "@/hooks/useToast";
import {
  Copy,
  LinkIcon,
  Users2,
  MoreVertical,
  Mail,
  CheckCircle,
  Upload,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer } from "../ui/toast";

interface Signup {
  id: string;
  name: string;
  email: string;
  position: number;
  joinedAt: string;
  status: string;
  referralCount: number;
}

const AllSignups = ({ waitlist }: any) => {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!waitlist) return null;

  const waitlistUrl = `https://${waitlist.subdomain}.waitlist.omnistackhub.xyz`;
  const hasSignups = signups.length > 0;

  const fetchSignups = async () => {
    try {
      const response = await fetch(
        `/api/waitlist/${waitlist.id}/waitlist-signups?limit=50`
      );
      if (!response.ok) throw new Error("Failed to fetch signups");
      const data = await response.json();
      setSignups(data.data);
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to load signups",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/waitlist/${waitlist.id}/waitlist-signups/import`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Import failed');
      }

      addToast({
        type: "success",
        message: "Import completed successfully",
      });

      // Refresh the signups list
      fetchSignups();
    } catch (error) {
      addToast({
        type: "error",
        message: error instanceof Error ? error.message : 'Import failed',
      });
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    fetchSignups();
  }, [waitlist.id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

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
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={handleImport}
          className="hidden"
        />
        <button 
          className="w-full max-w-sm px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors mb-4"
          onClick={() => fileInputRef.current?.click()}
          disabled={importing}
        >
          <Upload className="w-4 h-4 mr-2 inline-block" />
          {importing ? 'Importing...' : 'Import users'}
        </button>
        <p className="text-sm text-gray-500 mb-4">or share your waitlist</p>
        <div className="flex items-center space-x-2 max-w-md w-full">
          <div className="flex-1 flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">
              {waitlistUrl}
            </span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(waitlistUrl);
              addToast({
                type: "success",
                message: "Link copied to clipboard",
              });
            }}
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
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">All Signups</h3>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleImport}
              className="hidden"
            />
            <button 
              className="px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors"
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
            >
              <Upload className="w-4 h-4 mr-2 inline-block" />
              {importing ? 'Importing...' : 'Import users'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {signups.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{user.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status === "verified" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Mail className="w-3 h-3 mr-1" />
                      )}
                      {user.status === "verified" ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.referralCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : ''}
                  </td>
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
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
    </>
  );
};

export default AllSignups;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit2, Settings, Search, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import * as Tab from "@radix-ui/react-tabs";
// @ts-ignore
import Editor from "./editor";
import AllSignups from "./AllSignups";
import OffboardedSignups from "./OffboardedSignups";
import ImportAndExport from "./ImportAndExport";

interface WaitlistData {
  id: string;
  name: string;
  subdomain: string;
  subscribers: number;
  createdAt: string;
  template: {
    id: string;
    name: string;
  };
}

interface Subscriber {
  id: string;
  email: string;
  name: string;
  position: number;
  joinedAt: string;
  referralCount: number;
}

export default function WaitlistDetails({ id }: { id: string }) {
  const router = useRouter();
  const [waitlist, setWaitlist] = useState<WaitlistData | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState("editor");
  const [selectedSubTab, setSelectedSubTab] = useState("allSignups");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [waitlistRes, subscribersRes] = await Promise.all([
          fetch(`/api/waitlist/${id}`),
          fetch(`/api/waitlist/${id}/subscribers`),
        ]);

        if (!waitlistRes.ok || !subscribersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [waitlistData, subscribersData] = await Promise.all([
          waitlistRes.json(),
          subscribersRes.json(),
        ]);

        setWaitlist(waitlistData.data);
        setSubscribers(subscribersData.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a47764]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/dashboard/waitlists" className="text-[#a47764] hover:text-[#b58775]">
            Return to Waitlists
          </Link>
        </div>
      </div>
    );
  }

  if (!waitlist) return null;

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/waitlists" className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">{waitlist.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/waitlists/${id}/edit`}
            className="flex items-center space-x-2 px-4 py-2 border border-[#a47764] text-[#a47764] rounded-lg hover:bg-[#a47764]/5 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Simple Edit</span>
          </Link>
          <Link
            href={`/dashboard/waitlists/${id}/builder`}
            className="flex items-center space-x-2 px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Advanced Builder</span>
          </Link>
        </div>
      </div>

      {/* Main Tabs */}
      <Tab.Root value={selectedTab} onValueChange={setSelectedTab} defaultValue="editor">
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab.Trigger
            value="editor"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab === "editor"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            General
          </Tab.Trigger>
          <Tab.Trigger
            value="signups"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab === "signups"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            Signups
          </Tab.Trigger>
          <Tab.Trigger
            value="settings"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab === "settings"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            Settings
          </Tab.Trigger>
          <Tab.Trigger
            value="analytics"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab === "analytics"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            Analytics
          </Tab.Trigger>
          <Tab.Trigger
            value="email"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab === "email"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            Email
          </Tab.Trigger>
          <Tab.Trigger
            value="automations"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab === "automations"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            Automations
          </Tab.Trigger>
        </Tab.List>

        {/* Editor Content (now General) */}
        <Tab.Content value="editor">
          <div className="mt-6">
            <Editor waitlist={waitlist} />
          </div>
        </Tab.Content>

        {/* Signups Content */}
        <Tab.Content value="signups">
          <Tab.Root value={selectedSubTab} onValueChange={setSelectedSubTab} defaultValue="allSignups">
            <div className="flex items-center justify-between mt-6">
              <Tab.List className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Tab.Trigger
                  value="allSignups"
                  className={cn(
                    "px-6 py-2.5 text-sm font-medium border-r border-gray-200",
                    selectedSubTab === "allSignups"
                      ? "bg-[#a47764] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  All Signups
                </Tab.Trigger>
                <Tab.Trigger
                  value="offboardedSignups"
                  className={cn(
                    "px-6 py-2.5 text-sm font-medium border-r border-gray-200",
                    selectedSubTab === "offboardedSignups"
                      ? "bg-[#a47764] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  Offboarded Signups
                </Tab.Trigger>
                <Tab.Trigger
                  value="importAndExport"
                  className={cn(
                    "px-6 py-2.5 text-sm font-medium",
                    selectedSubTab === "importAndExport"
                      ? "bg-[#a47764] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  Import and Export
                </Tab.Trigger>
              </Tab.List>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search Signups"
                  className="w-64 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
                />
              </div>
            </div>

            <div className="mt-6">
              <Tab.Content value="allSignups">
                <AllSignups waitlist={waitlist} />
              </Tab.Content>
              <Tab.Content value="offboardedSignups">
                <OffboardedSignups waitlist={waitlist} />
              </Tab.Content>
              <Tab.Content value="importAndExport">
                <ImportAndExport waitlist={waitlist} />
              </Tab.Content>
            </div>
          </Tab.Root>
        </Tab.Content>

        {/* Other Tabs Content */}
        <Tab.Content value="settings" className="mt-6">
          <div className="text-center text-gray-500">Settings content coming soon</div>
        </Tab.Content>
        <Tab.Content value="analytics" className="mt-6">
          <div className="text-center text-gray-500">Analytics content coming soon</div>
        </Tab.Content>
        <Tab.Content value="email" className="mt-6">
          <div className="text-center text-gray-500">Email content coming soon</div>
        </Tab.Content>
        <Tab.Content value="automations" className="mt-6">
          <div className="text-center text-gray-500">Automations content coming soon</div>
        </Tab.Content>
      </Tab.Root>
    </div>
  );
}
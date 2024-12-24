"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Edit2,
  Settings,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as Tab from "@radix-ui/react-tabs";
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
  const [selectedTab, setSelectedTab]: any = useState("editor");
  const [selectedSubTab, setSelectedSubTab]: any = useState("allSignups");

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
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
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
          <Link
            href="/dashboard/waitlists"
            className="text-[#a47764] hover:text-[#b58775]"
          >
            Return to Waitlists
          </Link>
        </div>
      </div>
    );
  }

  if (!waitlist) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/waitlists"
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">
            {waitlist.name}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href={`/dashboard/waitlists/${id}/edit`}
            className="flex items-center space-x-2 px-4 py-2 text-[#a47764] hover:text-[#b58775] text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            <span>Simple Edit</span>
          </Link>
          <Link
            href={`/dashboard/waitlists/${id}/builder`}
            className="flex items-center space-x-2 px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775]"
          >
            <Settings className="w-4 h-4" />
            <span>Advanced Builder</span>
          </Link>
        </div>
      </div>

      <Tab.Root
        value={selectedTab}
        onValueChange={setSelectedTab}
        defaultValue="editor"
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab.Trigger
            value="editor"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab == "editor"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            Editor
          </Tab.Trigger>
          <Tab.Trigger
            value="signups"
            className={cn(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
              selectedTab == "signups"
                ? "bg-white shadow"
                : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
            )}
          >
            Signups
          </Tab.Trigger>
        </Tab.List>
        <Tab.Content value="editor">
          <Editor waitlist={waitlist} />
        </Tab.Content>
        <Tab.Content value="signups">
          <Tab.Root
            value={selectedSubTab}
            onValueChange={setSelectedSubTab}
            defaultValue="allSignups"
          >
            <div className="flex items-center justify-between gap-3 mt-3">
              <Tab.List className="flex rounded-xl bg-gray-100 p-1 w-[50%]">
                <Tab.Trigger
                  value="allSignups"
                  className={cn(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
                    selectedSubTab === "allSignups"
                      ? "bg-white shadow"
                      : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
                  )}
                >
                  All Signups
                </Tab.Trigger>
                <Tab.Trigger
                  value="offboardedSignups"
                  className={cn(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
                    selectedSubTab === "offboardedSignups"
                      ? "bg-white shadow"
                      : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
                  )}
                >
                  Offboarded Signups
                </Tab.Trigger>
                <Tab.Trigger
                  value="importAndExport"
                  className={cn(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#a47764]",
                    selectedSubTab === "importAndExport"
                      ? "bg-white shadow"
                      : "text-[#a47764] hover:bg-white/[0.12] hover:text-[#b58775]"
                  )}
                >
                  Import and Export
                </Tab.Trigger>
              </Tab.List>
              <div className="flex items-center relative">
                <Search className="h-5 w-5 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search Signups"
                className="border border-gray-300 rounded-md p-2  w-[50%] outline-none pl-8"
              />
            </div>
            <Tab.Content value="allSignups">
              <AllSignups waitlist={waitlist} />
            </Tab.Content>
            <Tab.Content value="offboardedSignups">
              <OffboardedSignups waitlist={waitlist} />
            </Tab.Content>
            <Tab.Content value="importAndExport">
              <ImportAndExport waitlist={waitlist} />
            </Tab.Content>
          </Tab.Root>
        </Tab.Content>
      </Tab.Root>
    </div>
  );
}

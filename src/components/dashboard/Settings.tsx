"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function Settings() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    id: "",
    name: "",
    email: "",
    companyName: "",
    phone: "",
    subscription: "",
    address: "",
    referralsEmail: true,
    signupEmail: true,
    emailDigest: "weekly",
  });

  const [saving, setSaving] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/client/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create waitlist");
      }

      const { data } = await response.json();
      setSettings(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser().then(() => {});
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setSaving(true);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // setSaving(false);
    try {
      const response = await fetch(`/api/client/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create waitlist");
      }

      const { data } = await response.json();
      setSettings(data);

      getUser().then(() => {});
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a47764]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account Info */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Account Information
              </h2>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#a47764] text-white">
                {settings.subscription ?? 'Free'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) =>
                    setSettings({ ...settings, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.companyName || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.phone || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.signupEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, signupEmail: e.target.checked })
                  }
                  className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                />
                <span className="text-sm text-gray-700">
                  Email me when someone signs up
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.referralsEmail}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      referralsEmail: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                />
                <span className="text-sm text-gray-700">
                  Email me for new referrals
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Digest
                </label>
                <select
                  value={settings.emailDigest}
                  onChange={(e) =>
                    setSettings({ ...settings, emailDigest: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900 text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] disabled:opacity-50"
            onClick={handleSubmit}
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>

          <button
            onClick={handleSignOut}
            className="px-6 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import * as Tab from "@radix-ui/react-tabs";
import { Upload, Check } from "lucide-react";
import EmailTemplatesContent from "./EmailTemplatesContent";
import EmailBlastContent from "./EmailBlastContent";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "../ui/toast";

interface EmailSettings {
  emailNewSignups: boolean;
  congratulateReferral: boolean;
  customOffboarding: boolean;
  removeHeader: boolean;
  replyToEmail: string;
  senderEmail: string;
  senderName: string;
  logo?: string;
  domain?: string;
  isDomainVerified: boolean;
}

const EmailContent = ({ waitlistId }: { waitlistId: string }) => {
  const [selectedEmailTab, setSelectedEmailTab] = useState("settings");
  const [settings, setSettings] = useState<EmailSettings>({
    emailNewSignups: true,
    congratulateReferral: false,
    customOffboarding: false,
    removeHeader: false,
    replyToEmail: "",
    senderEmail: "",
    senderName: "",
    isDomainVerified: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetchEmailSettings();
  }, [waitlistId]);

  const fetchEmailSettings = async () => {
    try {
      const response = await fetch(
        `/api/waitlist/${waitlistId}/email-settings`
      );
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to load email settings",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (
    key: keyof EmailSettings,
    value: boolean | string
  ) => {
    try {
      setSaving(true);
      const response = await fetch(
        `/api/waitlist/${waitlistId}/email-settings`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: value }),
        }
      );

      if (!response.ok) throw new Error("Failed to update setting");

      setSettings((prev) => ({ ...prev, [key]: value }));
      addToast({
        type: "success",
        message: "Settings updated successfully",
      });
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to update settings",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSettingChange = useCallback(
    (key: keyof EmailSettings, value: boolean | string) => {
      // Update UI immediately
      setSettings((prev) => ({ ...prev, [key]: value }));

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        updateSetting(key, value);
      }, 800);
    },
    []
  );

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      setUploadingLogo(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("logo", file);

      const response = await fetch(`/api/waitlist/${waitlistId}/logo`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload logo");

      const { logoUrl } = await response.json();
      setSettings((prev) => ({ ...prev, logo: logoUrl }));

      addToast({
        type: "success",
        message: "Logo uploaded successfully",
      });
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to upload logo",
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleVerifyDomain = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `/api/waitlist/${waitlistId}/verify-domain`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const body = await response.json();
        addToast({
          type: "error",
          message: body.error ?? "Failed to verify domain",
        });
      } else {
        setSettings((prev) => ({ ...prev, isDomainVerified: true }));
        addToast({
          type: "success",
          message: "Domain verified successfully",
        });
      }
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to verify domain",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div>
      <Tab.Root
        value={selectedEmailTab}
        onValueChange={setSelectedEmailTab}
        defaultValue="settings"
      >
        {/* Email Subtabs Navigation */}
        <div className="flex items-center justify-between">
          <Tab.List className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            <Tab.Trigger
              value="settings"
              className={cn(
                "px-6 py-2.5 text-sm font-medium border-r border-gray-200",
                selectedEmailTab === "settings"
                  ? "bg-[#a47764] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              Settings
            </Tab.Trigger>
            <Tab.Trigger
              value="templates"
              className={cn(
                "px-6 py-2.5 text-sm font-medium border-r border-gray-200",
                selectedEmailTab === "templates"
                  ? "bg-[#a47764] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              Templates
            </Tab.Trigger>
            <Tab.Trigger
              value="blast"
              className={cn(
                "px-6 py-2.5 text-sm font-medium",
                selectedEmailTab === "blast"
                  ? "bg-[#a47764] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              Blast
            </Tab.Trigger>
          </Tab.List>
        </div>

        {/* Settings Tab Content */}
        <Tab.Content value="settings" className="mt-6">
          <div className="space-y-8">
            {/* Sending Rules Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Sending Rules
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">
                      Email New Waiters
                    </label>
                    <p className="text-sm text-gray-500">
                      New Waiters will receive an email with their referral link
                      and status.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNewSignups}
                    onChange={(e) =>
                      handleSettingChange("emailNewSignups", e.target.checked)
                    }
                    disabled={saving}
                    className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">
                      Congratulate on Referral
                    </label>
                    <p className="text-sm text-gray-500">
                      Send email notifications for successful referrals.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.congratulateReferral}
                    onChange={(e) =>
                      handleSettingChange(
                        "congratulateReferral",
                        e.target.checked
                      )
                    }
                    disabled={saving}
                    className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">
                      Custom Offboarding Email
                    </label>
                    <p className="text-sm text-gray-500">
                      Send customized emails when offboarding users.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.customOffboarding}
                      onChange={(e) =>
                        handleSettingChange(
                          "customOffboarding",
                          e.target.checked
                        )
                      }
                      disabled={true}
                      className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                    />
                    <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                      Upgrade
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Sender Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Custom Sender
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <a
                    onClick={handleVerifyDomain}
                    className="inline-flex items-center text-[#a47764] hover:text-[#b58775] text-sm font-medium cursor-pointer"
                  >
                    🔗 Verify your domain
                  </a>
                  {settings.isDomainVerified && (
                    <span className="inline-flex items-center text-sm text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Verified
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-1">
                    Sender Email
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={settings.senderEmail || ""}
                      onChange={(e) =>
                        handleSettingChange("senderEmail", e.target.value)
                      }
                      placeholder="notifications@yourdomain.com"
                      disabled={!settings.isDomainVerified}
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {!settings.isDomainVerified && (
                      <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                        Upgrade
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-1">
                    Sender Name
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={settings.senderName || ""}
                      onChange={(e) =>
                        handleSettingChange("senderName", e.target.value)
                      }
                      placeholder="Your Company Name"
                      disabled={!settings.isDomainVerified}
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {!settings.isDomainVerified && (
                      <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                        Upgrade
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-1">
                    Logo
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex items-center gap-4">
                    {settings.logo ? (
                      <img
                        src={settings.logo}
                        alt="Logo"
                        className="h-12 w-12 object-contain rounded border border-gray-200"
                      />
                    ) : (
                      <div className="h-12 w-12 flex items-center justify-center rounded border border-gray-200 bg-gray-50">
                        <Upload className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingLogo || !settings.isDomainVerified}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      {uploadingLogo ? "Uploading..." : "Upload Logo"}
                    </button>
                    {!settings.isDomainVerified && (
                      <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                        Upgrade
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab.Content>

        {/* Templates Tab Content */}
        <Tab.Content value="templates" className="mt-6">
          <EmailTemplatesContent />
        </Tab.Content>

        {/* Blast Tab Content */}
        <Tab.Content value="blast" className="mt-6">
          <EmailBlastContent />
        </Tab.Content>
      </Tab.Root>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default EmailContent;

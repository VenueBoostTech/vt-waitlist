"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "../ui/toast";
import router from "next/router";

interface WaitlistSettings {
  waitlistId: string;
  waitlistUrl: string;
  waitlistName: string;
  spotsSkippedOnReferral: string;
  hideSignupCount: boolean;
  rankByReferrals: boolean;
  closed: boolean;
  captchaEnabled: boolean;
  hideReferralLink: boolean;
  signupDataUpdate: boolean;
  requiredSignupContact: string;
  requireName: boolean;
  redirectOnSubmit: boolean;
  redirectUrl: string;
  emailNewSignups: boolean;
  congratulateReferral: boolean;
  customOffboarding: boolean;
  leaderboard: boolean;
  leaderboardSize: number;
  customVerificationRedirect?: string;
  domain?: string;
  noFreePersonalEmails?: boolean;
}

const SettingsContent = ({ waitlistId }: { waitlistId: string }) => {
  const [loading, setLoading] = useState(false);
  const [waitlistSettings, setWaitlistSettings] = useState<WaitlistSettings>({
    waitlistId: waitlistId,
    waitlistUrl: "https://omnistackhub.xyz",
    waitlistName: "gri-1",
    spotsSkippedOnReferral: "3",
    hideSignupCount: false,
    rankByReferrals: false,
    closed: false,
    captchaEnabled: false,
    hideReferralLink: false,
    signupDataUpdate: false,
    requiredSignupContact: "email",
    requireName: false,
    redirectOnSubmit: false,
    redirectUrl: "",
    emailNewSignups: true,
    congratulateReferral: false,
    customOffboarding: false,
    leaderboard: false,
    leaderboardSize: 5,
    customVerificationRedirect: "",
    domain: "",
    noFreePersonalEmails: false,
  });
  const { toasts, addToast, removeToast } = useToast();
  const debounceTimerRef = React.useRef<NodeJS.Timeout>();
  const [isSubscription, setIsSubscription] = useState(false);

  useEffect(() => {
    fetchWaitlistSettings();
    getUser();
  }, [waitlistId]);

  const fetchWaitlistSettings = async () => {
    try {
      const response = await fetch(
        `/api/waitlist/${waitlistId}/waitlist-settings`
      );
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      setWaitlistSettings(data);
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to load waitlist settings",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/client/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to get user");
      }

      const { data } = await response.json();
      setIsSubscription(data.subscription.status === "active" || false);
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to load user",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = async (key: string, value: any) => {
    setWaitlistSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    try {
      const response = await fetch(
        `/api/waitlist/${waitlistId}/waitlist-settings`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: value }),
        }
      );

      if (!response.ok) throw new Error("Failed to update setting");

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
      setLoading(false);
    }
  };

  const handleDebouncedSettingChange = useCallback(
    (key: keyof WaitlistSettings, value: boolean | string | number) => {
      // Update UI immediately
      setWaitlistSettings((prev) => ({ ...prev, [key]: value }));

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        handleSettingChange(key, value);
      }, 800);
    },
    []
  );

  const handleDeleteWaitlist = async () => {
    try {
      const response = await fetch(`/api/waitlist/${waitlistId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete waitlist");
      router.push("/dashboard/waitlists");
    } catch (error) {
      console.error("Error deleting waitlist:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* General Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">General</h2>
        <div className="space-y-6">
          {/* Waitlist ID */}
          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Waitlist ID
            </label>
            <p className="text-sm text-gray-500 mb-2">
              The public ID for your Waitlist
            </p>
            <input
              type="text"
              disabled
              value={waitlistSettings?.waitlistId}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-600"
            />
          </div>

          {/* Waitlist URL */}
          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Waitlist URL
            </label>
            <p className="text-sm text-gray-500 mb-2">
              If you're using a Waitlist no-code widget or the API, then write
              the exact URL where you will host your waitlist. Leave it blank if
              you're going to use a hosted page from us.
            </p>
            <input
              type="url"
              value={waitlistSettings?.waitlistUrl}
              onChange={(e) =>
                handleDebouncedSettingChange("waitlistUrl", e.target.value)
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
            />
          </div>

          {/* Waitlist Name */}
          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Waitlist Name
            </label>
            <p className="text-sm text-gray-500 mb-2">
              This shows up to Signups in the no-code widget, when they sign up,
              and in any emails.
            </p>
            <input
              type="text"
              value={waitlistSettings?.waitlistName}
              onChange={(e) =>
                handleDebouncedSettingChange("waitlistName", e.target.value)
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
            />
          </div>

          {/* Spots Skipped on Referral */}
          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Spots Skipped on Referral
            </label>
            <p className="text-sm text-gray-500 mb-2">
              When one Signup refers another, then let the first Signup skip
              ahead in the waitlist. This setting specifies how many spots to
              move ahead by.
            </p>
            <input
              type="number"
              value={waitlistSettings?.spotsSkippedOnReferral}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "spotsSkippedOnReferral",
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block font-medium text-gray-900 mb-1">
                  Hide Signup Count
                </label>
                <p className="text-sm text-gray-500">
                  Do not show the total number of signups, or a signup's
                  priority, in the widget or in emails.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                  checked={waitlistSettings?.hideSignupCount}
                  onChange={(e) =>
                    handleDebouncedSettingChange(
                      "hideSignupCount",
                      e.target.checked
                    )
                  }
                  disabled={!isSubscription}
                />
                {!isSubscription && (
                  <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                    Upgrade
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block font-medium text-gray-900 mb-1">
                  Rank by Referrals
                </label>
                <p className="text-sm text-gray-500">
                  If enabled, the signups will be ranked purely on the number of
                  referrals
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                  checked={waitlistSettings?.rankByReferrals}
                  onChange={(e) =>
                    handleDebouncedSettingChange(
                      "rankByReferrals",
                      e.target.checked
                    )
                  }
                  disabled={!isSubscription}
                />
                {!isSubscription && (
                  <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                    Upgrade
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block font-medium text-gray-900 mb-1">
                  Closed
                </label>
                <p className="text-sm text-gray-500">
                  Check the checkbox to close the Waitlist. No signups or
                  verifications will be permitted while the Waitlist is closed.
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                checked={waitlistSettings?.closed}
                onChange={(e) =>
                  handleDebouncedSettingChange("closed", e.target.checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block font-medium text-gray-900 mb-1">
                  Enable Captcha
                </label>
                <p className="text-sm text-gray-500">
                  Check the checkbox to require any users to pass a CAPTCHA
                  before signing up for the Waitlist.
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                checked={waitlistSettings?.captchaEnabled}
                onChange={(e) =>
                  handleDebouncedSettingChange(
                    "captchaEnabled",
                    e.target.checked
                  )
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block font-medium text-gray-900 mb-1">
                  Hide Referral Link
                </label>
                <p className="text-sm text-gray-500">
                  Check the checkbox to hide the referral link from the user
                  after signup.
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                checked={waitlistSettings?.hideReferralLink}
                onChange={(e) =>
                  handleDebouncedSettingChange(
                    "hideReferralLink",
                    e.target.checked
                  )
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block font-medium text-gray-900 mb-1">
                  Signup Data Update
                </label>
                <p className="text-sm text-gray-500">
                  Enable this setting to allow users to overwrite their existing
                  submission data with a new one.
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                checked={waitlistSettings?.signupDataUpdate}
                onChange={(e) =>
                  handleDebouncedSettingChange(
                    "signupDataUpdate",
                    e.target.checked
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collect Info Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Collect Info
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Required Signup Contact
            </label>
            <p className="text-sm text-gray-500 mb-2">
              We collect email addresses by default on the widget, but you may
              also collect phone numbers.
            </p>
            <select
              value={waitlistSettings?.requiredSignupContact}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "requiredSignupContact",
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Require Name
              </label>
              <p className="text-sm text-gray-500">
                First and last names will be required for new Signups, both via
                API and no-code widget.
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              checked={waitlistSettings?.requireName}
              onChange={(e) =>
                handleDebouncedSettingChange("requireName", e.target.checked)
              }
            />
          </div>
        </div>
      </div>

      {/* Redirection Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Redirection
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Redirect On Submit
              </label>
              <p className="text-sm text-gray-500">
                Whenever a user signup on your waitlist, they'll be
                automatically redirected to the provided URL below
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              checked={waitlistSettings?.redirectOnSubmit}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "redirectOnSubmit",
                  e.target.checked
                )
              }
            />
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Redirect URL
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Users will be automatically redirected to this URL if 'Redirect on
              Submit' is enabled
            </p>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
              value={waitlistSettings?.redirectUrl}
              onChange={(e) =>
                handleDebouncedSettingChange("redirectUrl", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Email Verification Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Email Verification
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Verify Signups by Email
              </label>
              <p className="text-sm text-gray-500">
                New Signups on your Waitlist will receive a verification email.
                Verification status will be shown in any CSV export.
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              checked={waitlistSettings?.emailNewSignups}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "emailNewSignups",
                  e.target.checked
                )
              }
            />
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Custom Verification Redirect
            </label>
            <p className="text-sm text-gray-500 mb-2">
              If you're using Signup email verification, redirect them to this
              URL (must include http/https) after verification. Leave blank to
              default to your Waitlist's URL.
            </p>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
              value={waitlistSettings?.customVerificationRedirect || ""}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "customVerificationRedirect",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Permitted Domain
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Only allow emails with a specific domain to sign up, like
              columbia.edu or example.com.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="columbia.edu"
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
                value={waitlistSettings?.domain || ""}
                onChange={(e) =>
                  handleDebouncedSettingChange("domain", e.target.value)
                }
                disabled={!isSubscription}
              />
              {!isSubscription && (
                <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                  Upgrade
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                No Free/Personal Emails
              </label>
              <p className="text-sm text-gray-500">
                Allow only business/organizational emails. Do not allow signups
                from free/personal email hosts like gmail, yahoo, outlook.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                checked={waitlistSettings?.noFreePersonalEmails || false}
                onChange={(e) =>
                  handleDebouncedSettingChange(
                    "noFreePersonalEmails",
                    e.target.checked
                  )
                }
                disabled={!isSubscription}
              />
              {!isSubscription && (
                <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                  Upgrade
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Send Email Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Send Email</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Email New Signups
              </label>
              <p className="text-sm text-gray-500">
                New Signups on your Waitlist will receive an email containing
                their referral link and Waitlist status.
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              checked={waitlistSettings?.emailNewSignups}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "emailNewSignups",
                  e.target.checked
                )
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Congratulate on Referral
              </label>
              <p className="text-sm text-gray-500">
                By turning this on, Signups will receive an email notification
                when they successfully refer others.
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              checked={waitlistSettings?.congratulateReferral}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "congratulateReferral",
                  e.target.checked
                )
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Send Custom Offboarding Email
              </label>
              <p className="text-sm text-gray-500">
                When you offboard a Signup, send them an email. If enabled, you
                must customize this in the Email tab! Non-customized offboarding
                emails will not be sent.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                checked={waitlistSettings?.customOffboarding}
                onChange={(e) =>
                  handleDebouncedSettingChange(
                    "customOffboarding",
                    e.target.checked
                  )
                }
                disabled={!isSubscription}
              />
              {!isSubscription && (
                <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
                  Upgrade
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Leaderboard
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Leaderboard
              </label>
              <p className="text-sm text-gray-500">
                Show a leaderboard of top Signups on the widget.
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
              checked={waitlistSettings?.leaderboard}
              onChange={(e) =>
                handleDebouncedSettingChange("leaderboard", e.target.checked)
              }
            />
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-1">
              Leaderboard Size (API Only)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              The total number of Signups that are returned via the leaderboard
              endpoint.
            </p>
            <input
              type="number"
              value={waitlistSettings?.leaderboardSize}
              onChange={(e) =>
                handleDebouncedSettingChange(
                  "leaderboardSize",
                  parseInt(e.target.value)
                )
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
            />
          </div>
        </div>
      </div>

      {/* Delete Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Delete</h2>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Delete Waitlist
              </label>
              <p className="text-sm text-gray-500">
                All of the data for this waitlist will be permanently removed
                from our servers. This action cannot be undone.
              </p>
            </div>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              onClick={handleDeleteWaitlist}
            >
              Delete Waitlist
            </button>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default SettingsContent;

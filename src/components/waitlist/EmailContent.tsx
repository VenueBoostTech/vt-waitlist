import React, { useState } from "react";
import { cn } from "@/lib/utils";
import * as Tab from "@radix-ui/react-tabs";
import { Upload } from "lucide-react";
import EmailTemplatesContent from "./EmailTemplatesContent";
import EmailBlastContent from "./EmailBlastContent";

const EmailContent = () => {
  const [selectedEmailTab, setSelectedEmailTab] = useState("settings");

  return (
    <div>
      <Tab.Root value={selectedEmailTab} onValueChange={setSelectedEmailTab} defaultValue="settings">
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
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Sending Rules</h2>
              <div className="space-y-6">
                {/* Email New Waiters */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Email New Waiters</label>
                    <p className="text-sm text-gray-500">
                      New Waiters on your Waitlist will receive an email containing their referral link and Waitlist status.
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    defaultChecked
                    className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]" 
                  />
                </div>

                {/* Congratulate on Referral */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Congratulate on Referral</label>
                    <p className="text-sm text-gray-500">
                      By turning this on, waiters will receive an email notification when they successfully refer others.
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]" 
                  />
                </div>

                {/* Send Custom Offboarding Email */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Send Custom Offboarding Email</label>
                    <p className="text-sm text-gray-500">
                      When you offboard a Waiter, send them an email. If enabled, you must customize this in the Email tab! Non-customized offboarding emails will not be sent.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]" 
                    />
                    <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">Upgrade</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Settings Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Template Settings</h2>
              <div className="space-y-6">
                {/* Reply-to Email */}
                <div>
                  <label className="block font-medium text-gray-900 mb-1">Reply-to Email</label>
                  <p className="text-sm text-gray-500 mb-2">
                    If users respond to your custom email template or blast, this is where we send the email.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      placeholder="signup_support@getwaitlist.com"
                      disabled
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
                    />
                    <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">Upgrade</span>
                  </div>
                </div>

                {/* Remove Email Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Remove Email Header</label>
                    <p className="text-sm text-gray-500">
                      If checked, the email header (logo) will be completely removed from outgoing emails.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]" 
                    />
                    <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">Upgrade</span>
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block font-medium text-gray-900 mb-1">Logo</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Add a custom logo to the emails you send out
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-500 bg-gray-50">
                      Upload Logo
                    </button>
                    <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">Upgrade</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Sender Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Custom Sender</h2>
              <div className="space-y-6">
                {/* // TODO: do we need input here? */}
                {/* Verify Domain Link */}
                <div>
                  <a href="#" className="text-[#a47764] hover:text-[#b58775] text-sm font-medium">
                    🔗 Verify your domain
                  </a>
                </div>

                {/* Sender Email */}
                <div>
                  <label className="block font-medium text-gray-900 mb-1">Sender Email</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Change the email address that your emails are sent from.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      placeholder="maya@getwaitlist.com"
                      disabled
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
                    />
                    <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">Upgrade</span>
                  </div>
                </div>

                {/* Sender Name */}
                <div>
                  <label className="block font-medium text-gray-900 mb-1">Sender Name</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Change the name that appears in the emails that are sent.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Maya Kyler"
                      disabled
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
                    />
                    <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">Upgrade</span>
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
    </div>
  );
};

export default EmailContent;
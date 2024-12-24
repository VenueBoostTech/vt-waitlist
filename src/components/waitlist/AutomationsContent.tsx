import React from "react";
import { MessageSquare, Webhook } from "lucide-react";

const AutomationsContent = () => {
  return (
    <div className="space-y-8">
      {/* Zapier Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Zapier</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium text-gray-900 mb-1">Enable Zapier</label>
              <p className="text-sm text-gray-500">Trigger Zapier hooks on User Signup and Offboarding.</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]" />
              <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">Upgrade</span>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-1">Zapier Key</label>
            <p className="text-sm text-gray-500 mb-2">Please use this key to connect with Zapier. The key will show up if you have Zapier activated.</p>
            <input
              type="text"
              disabled
              placeholder="Zapier key will appear here when enabled"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Webhooks Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Webhooks</h2>
        <div className="space-y-6">
          <div>
            <label className="block font-medium text-gray-900 mb-1">Webhook URL</label>
            <p className="text-sm text-gray-500 mb-2">Trigger webhook callbacks on User Signup and Offboarding. Remember to include http or https.</p>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
            />
          </div>
        </div>
      </div>

      {/* Custom Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Custom</h2>
        <div className="space-y-6">
          {/* Slack Integration */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              {/* Slack Icon */}
              <div className="flex-shrink-0">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
                    fill="#2EB67D"
                  />
                </svg>
              </div>
              <div>
                <label className="block font-medium text-gray-900 mb-1">Slack</label>
                <p className="text-sm text-gray-500">Get a notification in Slack every time a user signs up</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#4A154B] text-white rounded-lg hover:bg-[#611f64] transition-colors">
              Connect with Slack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationsContent;
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import * as Tab from "@radix-ui/react-tabs";

const EmailTemplatesContent = () => {
  const [selectedTemplateType, setSelectedTemplateType] = React.useState("signup");

  // Template defaults for each type
  const templateDefaults = {
    signup: {
      subject: "Your referral link for the {waitlist_name} Waitlist",
      previewText: "Thank you for signing up!",
      header: "Thank you for signing up!",
      subheader: "{waitlist_name}",
      mainBodyText: "<p>Welcome! You are #{priority} out of {total_signups_currently} on the Waitlist. Share your unique referral link to move up in line:</p><p><a href='{referral_link}'>{referral_link}</a></p>",
      subBodyText: "You can check your status in line here:</p><p><a href='{waitlist_url_location}'>{waitlist_url_location}</a>"
    },
    referral: {
      subject: "Congratulations! Someone signed up to a Waitlist using your Referral Link",
      previewText: "You've moved up in line! You are now #{priority} out of {total_signups_currently} on the Waitlist.",
      header: "Nice work!",
      subheader: "{waitlist_name}",
      mainBodyText: "<p>Well done! Someone signed up to {waitlist_name} with your referral code. You are now #{priority} out of {total_signups_currently} on the Waitlist. Share your unique referral link to move up in line:</p><p><a href='{referral_link}'>{referral_link}</a></p>",
      subBodyText: "Enter a secondary body text"
    },
    verification: {
      subject: "Please verify yourself on the {waitlist_name} Waitlist",
      previewText: "Please confirm that we have the correct email address for you.",
      header: "Verify your Email",
      subheader: "{waitlist_name}",
      mainBodyText: "<p>To confirm it's really you, please click the button below or copy the link into your browser. This link is valid for 24 hours.</p><p>If you did not sign up for a waitlist, feel free to ignore this message.</p>",
      subBodyText: "<p><a href='{verification_link}'>{verification_link}</a></p>"
    },
    offboarding: {
      subject: "You're off the {waitlist_name} Waitlist!",
      previewText: "Congratulations! Time for the next step.",
      header: "Next Steps",
      subheader: "{waitlist_name}",
      mainBodyText: "<p>Enter your custom next steps here! <a href='google.com'>example link</a></p>",
      subBodyText: "Enter a secondary body text"
    }
  };

  const [formValues, setFormValues] = useState(templateDefaults[selectedTemplateType]);

  // Variables help box content
  const variablesInfo = [
    "{priority}: 22",
    "{total_signups_currently}: 0",
    "{referral_link}: https://visiontrack.xyz?ref_id=123456",
    "{waitlist_name}: gri-1",
    "{waitlist_url_location}: https://visiontrack.xyz",
    "{verification_link}: https://api.omnistack.xyz/verified?ver_id=12345"
  ];

  // Update form when template type changes
  useEffect(() => {
    setFormValues(templateDefaults[selectedTemplateType]);
  }, [selectedTemplateType]);

  const getPreviewContent = (type) => {
    switch (type) {
      case 'signup':
        return {
          title: formValues.header || "Thank you for signing up!",
          content: (
            <>
              <p className="text-gray-600">
                Welcome! You are #22 out of 0 on the Waitlist. Share your unique referral link to move up in line:
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                https://visiontrack.xyz?ref_id=12345
              </a>
              <p className="text-gray-600">You can check your status in line here:</p>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                https://visiontrack.xyz
              </a>
            </>
          )
        };
      case 'referral':
        return {
          title: formValues.header || "Nice work!",
          content: (
            <>
              <p className="text-gray-600">
                Well done! Someone signed up to gri-1 with your referral code. You are now #22 out of 0 on the Waitlist. Share your unique referral link to move up in line:
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                https://visiontrack.xyz?ref_id=12345
              </a>
            </>
          )
        };
      case 'verification':
        return {
          title: formValues.header || "Verify your Email",
          content: (
            <>
              <p className="text-gray-600">
                To confirm it's really you, please click the button below or copy the link into your browser. This link is valid for 24 hours.
              </p>
              <p className="text-gray-600">If you did not sign up for a waitlist, feel free to ignore this message.</p>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                https://api.omnistack.xyz/verified?ver_id=12345
              </a>
            </>
          )
        };
      case 'offboarding':
        return {
          title: formValues.header || "Next Steps",
          content: (
            <>
              <p className="text-gray-600">
                Enter your custom next steps here! <a href="#" className="text-blue-600 hover:text-blue-800">example link</a>
              </p>
            </>
          )
        };
      default:
        return {
          title: "",
          content: null
        };
    }
  };

  const handleInputChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const previewContent = getPreviewContent(selectedTemplateType);

  return (
    <div className="flex">
      {/* Left Side - Template Editor */}
      <div className="w-1/2 pr-6">
        {/* Variables Help Box */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Use these variables in your email</h3>
          <div className="space-y-1">
            {variablesInfo.map((variable, index) => (
              <div key={index} className="text-sm text-blue-700 font-mono">{variable}</div>
            ))}
          </div>
        </div>

        {/* Template Types Tabs */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customize Templates</h2>
          <Tab.Root value={selectedTemplateType} onValueChange={setSelectedTemplateType}>
            <Tab.List className="flex border-b border-gray-200">
              <Tab.Trigger
                value="signup"
                className={cn(
                  "px-6 py-2 text-sm font-medium border-b-2 -mb-px",
                  selectedTemplateType === "signup"
                    ? "border-[#a47764] text-[#a47764]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Signup
              </Tab.Trigger>
              <Tab.Trigger
                value="referral"
                className={cn(
                  "px-6 py-2 text-sm font-medium border-b-2 -mb-px",
                  selectedTemplateType === "referral"
                    ? "border-[#a47764] text-[#a47764]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Referral
              </Tab.Trigger>
              <Tab.Trigger
                value="verification"
                className={cn(
                  "px-6 py-2 text-sm font-medium border-b-2 -mb-px",
                  selectedTemplateType === "verification"
                    ? "border-[#a47764] text-[#a47764]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Verification
              </Tab.Trigger>
              <Tab.Trigger
                value="offboarding"
                className={cn(
                  "px-6 py-2 text-sm font-medium border-b-2 -mb-px",
                  selectedTemplateType === "offboarding"
                    ? "border-[#a47764] text-[#a47764]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Offboarding
              </Tab.Trigger>
            </Tab.List>

            {/* Template Type Content */}
            <div className="mt-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
                      value={formValues.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Preview Text</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
                      value={formValues.previewText}
                      onChange={(e) => handleInputChange('previewText', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Header</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
                      value={formValues.header}
                      onChange={(e) => handleInputChange('header', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Subheader</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764]"
                      value={formValues.subheader}
                      onChange={(e) => handleInputChange('subheader', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Main Body Text</label>
                    <textarea
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] min-h-[100px]"
                      value={formValues.mainBodyText}
                      onChange={(e) => handleInputChange('mainBodyText', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-900 mb-1">Sub Body Text</label>
                    <textarea
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] min-h-[100px]"
                      value={formValues.subBodyText}
                      onChange={(e) => handleInputChange('subBodyText', e.target.value)}
                    />
                  </div>

                  {selectedTemplateType === 'verification' && (
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block font-medium text-gray-900 mb-1">Disable Verification CTA</label>
                        <p className="text-sm text-gray-500">When enabled, the verification button will be removed from the email</p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#a47764] focus:ring-[#a47764]"
                      />
                    </div>
                  )}

                  <button className="flex items-center justify-center px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors w-full">
                    Save Email Customization
                  </button>
                </div>
              </div>
            </div>
          </Tab.Root>
        </div>
      </div>

      {/* Right Side - Email Preview */}
      <div className="w-1/2 pl-6 border-l border-gray-200">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500">gri-1</p>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{previewContent.title}</h1>
            {previewContent.content}
            <div className="border-t border-gray-200 pt-4 mt-6">
              <p className="text-sm text-gray-500">
                Need Help? Reply to this email, or write to signup.support@omnistack.xyz
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Sent by OmniStack. 222 East 44th Street New York, NY 10017.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Unsubscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesContent;
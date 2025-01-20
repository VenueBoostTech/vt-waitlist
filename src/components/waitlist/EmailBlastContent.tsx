import React, { useState } from "react";

const EmailBlastContent = () => {
  const [formValues, setFormValues] = useState({
    subject: "Your Subject Line",
    previewText: "Your Custom Preview Text.",
    header: "Your Header",
    subheader: "{waitlist_name}",
    mainBodyText: "<p>Enter your custom message here! This email will go to all your signups. <a href='google.com'>example link</a></p>",
    subBodyText: "Enter a secondary body text"
  });

  // Variables help box content
  const variablesInfo = [
    "{priority}: 22",
    "{total_signups_currently}: 0",
    "{referral_link}: https://omnistackhub.xyz?ref_id=123456",
    "{waitlist_name}: gri-1",
    "{waitlist_url_location}: https://omnistackhub.xyz",
    "{verification_link}: https://api.omnistackhub.xyz/verified?ver_id=12345"
  ];

  const handleInputChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex">
      {/* Left Side - Form */}
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

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Email Blast</h2>

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

            <button className="flex items-center justify-center px-4 py-2 bg-[#a47764] text-white rounded-lg hover:bg-[#b58775] transition-colors w-full">
              Send Email Blast
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Email Preview */}
      <div className="w-1/2 pl-6 border-l border-gray-200">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500">gri-1</p>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{formValues.header}</h1>
            <p className="text-gray-600">
              Enter your custom message here! This email will go to all your signups. <a href="#" className="text-blue-600 hover:text-blue-800">example link</a>
            </p>
            <p className="text-gray-600">{formValues.subBodyText}</p>
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

export default EmailBlastContent;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface FormData {
  name: string;
  templateId: string;
  subdomain: string;
  customization: {
    colors: {
      primary: string;
    };
  };
  slug?: string;
  spots_referral: number;
  email_signups: boolean;
  verify_email: boolean;
  content: {
    title: string;
    subtitle: string;
    form: {
      title: string;
      subtitle: string;
      fields: {
        type: string;
        label: string;
        placeholder: string;
        required: boolean;
      }[];
      submitButton: {
        text: string;
        style: {
          backgroundColor: string;
        };
      };
    };
  };
}

const validateSubdomain = (subdomain: string) => {
  const regex = /^[a-z0-9-]+$/;
  return regex.test(subdomain);
};

export default function WaitlistCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subdomainError, setSubdomainError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    templateId: "1",
    subdomain: "",
    customization: {
      colors: {
        primary: "#a47764",
      },
    },
    spots_referral: 0,
    email_signups: false,
    verify_email: false,
    content: {
      title: "Join Our Waitlist",
      subtitle: "Be the first to know when we launch",
      form: {
        title: "Sign Up Now",
        subtitle: "Enter your details to join the waitlist",
        fields: [
          {
            type: "text",
            label: "Full Name",
            placeholder: "Enter your name",
            required: true,
          },
          {
            type: "email",
            label: "Email",
            placeholder: "Enter your email",
            required: true,
          },
        ],
        submitButton: {
          text: "Join Waitlist",
          style: {
            backgroundColor: "#a47764",
          },
        },
      },
    },
  });

  const handleSubdomainChange = (value: string) => {
    const subdomain = value.toLowerCase();

    if (!validateSubdomain(subdomain) && subdomain !== "") {
      setSubdomainError(
        "Only lowercase letters, numbers, and hyphens are allowed"
      );
    } else {
      setSubdomainError("");
    }

    setFormData({ ...formData, subdomain });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subdomainError) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create waitlist");
      }

      const data = await response.json();
      router.push(`/dashboard/waitlists/${data.data.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setLoading(false);
    }
  };

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
            Create New Waitlist
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waitlist Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
              placeholder="Enter waitlist name"
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <select
              value={formData.templateId}
              onChange={(e) =>
                setFormData({ ...formData, templateId: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
              required
            >
              <option value="1">
                Simple - Basic waitlist with email capture
              </option>
              <option value="2">
                Professional - Features and benefits layout
              </option>
              <option value="3">Referral - Built-in referral system</option>
              <option value="4">Enterprise - Custom fields and branding</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              You can customize the template after creation
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subdomain
            </label>
            <div className="flex rounded-lg">
              <input
                type="text"
                value={formData.subdomain}
                onChange={(e) => handleSubdomainChange(e.target.value)}
                className={`flex-1 px-4 py-3 border border-r-0 border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900 ${
                  subdomainError ? "border-red-300" : ""
                }`}
                placeholder="your-waitlist"
                required
                pattern="[a-z0-9-]+"
                minLength={3}
                maxLength={63}
              />
              <span className="px-4 py-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
                .waitlist.omnistackhub.xyz
              </span>
            </div>
            {subdomainError && (
              <p className="mt-1 text-sm text-red-600">{subdomainError}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              This will be your waitlist's URL. Only lowercase letters, numbers,
              and hyphens.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Spots Skipped on Referral
            </label>
            <input
              type="number"
              defaultValue={formData.spots_referral}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  spots_referral: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
              placeholder="Enter number of spots skipped on referral"
              required
            />
          </div>

          <div className="flex gap-5">
            <div className="space-y-1 flex gap-1">
              <input
                type="checkbox"
                checked={formData.email_signups}
                style={{ width: "16px", height: "16px" }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email_signups: e.target.checked,
                  })
                }
                className="mt-1"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email New Signups
              </label>
            </div>

            <div className="space-y-1 flex gap-1">
              <input
                type="checkbox"
                checked={formData.verify_email}
                style={{ width: "16px", height: "16px" }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    verify_email: e.target.checked,
                  })
                }
                className="mt-1"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verify Signups by Email
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={formData.customization.colors.primary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customization: {
                      ...formData.customization,
                      colors: {
                        ...formData.customization.colors,
                        primary: e.target.value,
                      },
                    },
                  })
                }
                className="w-16 h-16 p-1 border border-gray-300 rounded-lg"
              />
              <span className="text-sm text-gray-500">
                This color will be used for buttons and accents
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-4">
            <Link
              href="/dashboard/waitlists"
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !!subdomainError}
              className="bg-[#a47764] hover:bg-[#b58775] text-white px-6 py-3 rounded-lg disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                "Create Waitlist"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

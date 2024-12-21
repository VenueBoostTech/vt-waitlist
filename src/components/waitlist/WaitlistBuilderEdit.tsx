'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { TemplateBuilder } from '@/components/builder/TemplateBuilder';

interface WaitlistBuilderEditProps {
  id: string;
}

export default function WaitlistBuilderEdit({ id }: WaitlistBuilderEditProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [waitlist, setWaitlist] = useState<any>(null);

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await fetch(`/api/waitlist/${id}`);
        if (!response.ok) throw new Error('Failed to fetch waitlist');
        const data = await response.json();
        setWaitlist(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load waitlist');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWaitlist();
    }
  }, [id]);

  const handleSave = async (content: any) => {
    try {
      const response = await fetch(`/api/waitlist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          style: content.style
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update waitlist');
      }
      
      router.push(`/dashboard/waitlists/${id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save changes');
    }
  };

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
          <Link href={`/dashboard/waitlists/${id}`} className="text-[#a47764] hover:text-[#b58775]">
            Return to Waitlist
          </Link>
        </div>
      </div>
    );
  }

  if (!waitlist) return null;

  // Default template one style content
  const templateOneContent = {
    header: {
      title: waitlist.name || "Transform Video into Business Intelligence",
      subtitle: "Build anticipation and collect leads with customizable waitlist pages.",
      alignment: 'left',
      showSubtitle: true,
    },
    features: [
      {
        id: '1',
        title: "Enterprise-Grade Intelligence",
        description: "Transform your surveillance into actionable insights with powerful AI-driven analytics, custom reporting, and mobile access for real-time decision making. 🎯",
        icon: "chart"
      },
      {
        id: '2',
        title: "Industry-Specific Solutions",
        description: "Tailored video intelligence for Commercial Real Estate, Manufacturing, Multi-family Residential, and Retail operations with specialized features for each sector. 🏢",
        icon: "building"
      },
      {
        id: '3',
        title: "Advanced Security & Integration",
        description: "Enterprise-grade security with end-to-end encryption and seamless integration with your existing systems and workflows. 🔒",
        icon: "shield"
      }
    ],
    form: {
      title: "Get Early Access",
      subtitle: "Join leading enterprises transforming their video surveillance into business intelligence 🚀",
      fields: [
        {
          id: '1',
          type: "text",
          label: "Full Name",
          placeholder: "Your full name...",
          required: true
        },
        {
          id: '2',
          type: "email",
          label: "Email",
          placeholder: "Work email address...",
          required: true
        },
        {
          id: '3',
          type: "select",
          label: "How did you hear about us?",
          placeholder: "Select an option",
          required: true,
          options: ["Google", "Twitter", "Friend", "Other"]
        }
      ],
      submitButton: {
        text: "Request Early Access",
        style: {
          backgroundColor: waitlist.customization?.colors?.primary || "#a47764"
        }
      },
      successMessage: "Thanks for joining! Share with friends to move up the waitlist."
    },
    style: {
      colors: {
        primary: waitlist.customization?.colors?.primary || "#a47764",
        text: "#111827",
        background: "#ffffff"
      },
      spacing: "relaxed",
      borderRadius: "lg",
      font: "font-manrope"
    },
    stats: {
      show: true,
      items: [
        { label: "Enterprise Clients", value: "500+" },
        { label: "Cameras Managed", value: "50K+" }
      ]
    },
    avatars: {
      show: true,
      count: 7
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href={`/dashboard/waitlists/${id}`}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span>Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-200 mx-4" />
              <h1 className="text-lg font-medium text-gray-900">
                Visual Builder: {waitlist.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/dashboard/waitlists/${id}/edit`}
                className="text-[#a47764] hover:text-[#b58775] font-medium"
              >
                Switch to Simple Editor
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <button
                onClick={() => router.push(`/dashboard/waitlists/${id}`)}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            <TemplateBuilder
              initialContent={waitlist.content || templateOneContent}
              onSave={handleSave}
            />
          </div>
        </main>

        {/* Preview Panel */}
        <aside className="hidden lg:block w-96 border-l bg-white overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Preview</h3>
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                Live
              </span>
            </div>
            <div className="w-full aspect-[9/16] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Preview will update as you make changes
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
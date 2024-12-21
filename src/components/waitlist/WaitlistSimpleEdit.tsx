'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface WaitlistSimpleEditProps {
  id: string;
}

export default function WaitlistSimpleEdit({ id }: WaitlistSimpleEditProps) {
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
        
        // If there's no content or style, set defaults
        const waitlistData = data.data;
        if (!waitlistData.content) {
          waitlistData.content = {
            title: waitlistData.name || "Join Our Waitlist",
            subtitle: "Be the first to know when we launch",
            form: {
              title: "Sign Up Now",
              subtitle: "Enter your details to join the waitlist",
              fields: [
                {
                  type: "text",
                  label: "Full Name",
                  placeholder: "Enter your name",
                  required: true
                },
                {
                  type: "email",
                  label: "Email",
                  placeholder: "Enter your email",
                  required: true
                }
              ],
              submitButton: {
                text: "Join Waitlist",
                style: {
                  backgroundColor: waitlistData.customization?.colors?.primary || "#a47764"
                }
              },
              successMessage: "Thanks for joining! We'll keep you updated."
            }
          };
        }
        if (!waitlistData.style) {
          waitlistData.style = {
            colors: waitlistData.customization?.colors || { primary: "#a47764" },
            spacing: "default",
            borderRadius: "default"
          };
        }
        
        setWaitlist(waitlistData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load waitlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`/api/waitlist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: waitlist.content,
          style: waitlist.style
        }),
      });

      if (!response.ok) throw new Error('Failed to update waitlist');
      
      router.push(`/dashboard/waitlists/${id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save changes');
      setLoading(false);
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

  return (
    <div className="space-y-6">
      {/* Header stays the same */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/dashboard/waitlists/${id}`}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Waitlist: {waitlist.name}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href={`/dashboard/waitlists/${id}/builder`}
            className="text-[#a47764] hover:text-[#b58775] font-medium"
          >
            Switch to Visual Builder →
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* Basic Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Settings</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waitlist Name
                  </label>
                  <input
                    type="text"
                    value={waitlist.name}
                    onChange={(e) => setWaitlist({ ...waitlist, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subdomain
                  </label>
                  <div className="flex rounded-lg">
                    <input
                      type="text"
                      value={waitlist.subdomain}
                      onChange={(e) => setWaitlist({ ...waitlist, subdomain: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                    />
                    <span className="px-4 py-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
                      .visiontrack.xyz
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Domain
                  </label>
                  <input
                    type="text"
                    value={waitlist.domain || ''}
                    onChange={(e) => setWaitlist({ ...waitlist, domain: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                    placeholder="e.g., waitlist.yourdomain.com"
                  />
                </div>
              </div>
            </div>

            {/* Content Settings */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Content Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Heading
                  </label>
                  <input
                    type="text"
                    value={waitlist.content.title}
                    onChange={(e) => setWaitlist({
                      ...waitlist,
                      content: { ...waitlist.content, title: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <textarea
                    value={waitlist.content.subtitle}
                    onChange={(e) => setWaitlist({
                      ...waitlist,
                      content: { ...waitlist.content, subtitle: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={waitlist.content.form.title}
                    onChange={(e) => setWaitlist({
                      ...waitlist,
                      content: {
                        ...waitlist.content,
                        form: { ...waitlist.content.form, title: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Subtitle
                  </label>
                  <textarea
                    value={waitlist.content.form.subtitle}
                    onChange={(e) => setWaitlist({
                      ...waitlist,
                      content: {
                        ...waitlist.content,
                        form: { ...waitlist.content.form, subtitle: e.target.value }
                      }
                    })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Style Settings */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Style Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={waitlist.style.colors.primary}
                      onChange={(e) => setWaitlist({
                        ...waitlist,
                        style: {
                          ...waitlist.style,
                          colors: { ...waitlist.style.colors, primary: e.target.value }
                        }
                      })}
                      className="h-10 w-20 p-1 rounded-lg border border-gray-300 bg-white"
                    />
                    <span className="text-sm text-gray-500">Choose the main accent color</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spacing
                  </label>
                  <select
                    value={waitlist.style.spacing}
                    onChange={(e) => setWaitlist({
                      ...waitlist,
                      style: { ...waitlist.style, spacing: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                  >
                    <option value="compact">Compact</option>
                    <option value="default">Default</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Border Radius
                  </label>
                  <select
                    value={waitlist.style.borderRadius}
                    onChange={(e) => setWaitlist({
                      ...waitlist,
                      style: { ...waitlist.style, borderRadius: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-gray-900"
                  >
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="default">Default</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end space-x-4">
            <Link
              href={`/dashboard/waitlists/${id}`}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#a47764] hover:bg-[#b58775] text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
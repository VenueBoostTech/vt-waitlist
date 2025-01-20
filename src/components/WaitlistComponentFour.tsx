'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

type ViewState = 'join' | 'check' | 'success';

interface SuccessData {
  position: number;
  totalCount: number;
  referralLink: string;
}


const features = [
  {
    title: "Enterprise-Grade Intelligence",
    description: "Transform your surveillance into actionable insights with powerful AI-driven analytics, custom reporting, and mobile access for real-time decision making. 🎯"
  },
  {
    title: "Industry-Specific Solutions",
    description: "Tailored video intelligence for Commercial Real Estate, Manufacturing, Multi-family Residential, and Retail operations with specialized features for each sector. 🏢"
  },
  {
    title: "Advanced Security & Integration",
    description: "Enterprise-grade security with end-to-end encryption and seamless integration with your existing systems and workflows. 🔒"
  }
];

export default function WaitlistComponentTemplateFour() {
  const [theme, setTheme] = useState('light');
  const [viewState, setViewState] = useState<ViewState>('join');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    referralSource: ''
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const [stickyMenu, setStickyMenu] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setStickyMenu(window.scrollY > 0);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const handleJoin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    // Validate all required fields
    if (!formData.name || !formData.email || !formData.referralSource) {
      throw new Error('Please fill in all fields');
    }

    // Validate email format
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      throw new Error('Invalid email address');
    }

    const response = await fetch('/api/waitlist/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to join waitlist');
    }

    setSuccessData(data);
    setViewState('success');
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Something went wrong');
  } finally {
    setLoading(false);
    }
  };
  
  // Update the handleStatusCheck function
  const handleStatusCheck = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await fetch('/api/waitlist/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to check status');
    }

    setSuccessData(data);
    setViewState('success');
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Email not found in waitlist');
  } finally {
    setLoading(false);
  }
};

  const copyToClipboard = () => {
    if (successData?.referralLink) {
      navigator.clipboard.writeText(successData.referralLink);
    }
  };

  const renderSuccessView = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
        <div className="text-center space-y-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-[#111827] dark:text-white">
            Successfully joined the waitlist!
          </h2>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Position</div>
              <div className="text-3xl font-bold text-[#111827] dark:text-white">{successData?.position}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">People on Waitlist</div>
              <div className="text-3xl font-bold text-[#111827] dark:text-white">{successData?.totalCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const renderForm = () => (
    <div className="w-full max-w-md">
      {viewState === 'join' ? (
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="text"
            placeholder="Your full name..."
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-[#111827] dark:text-white bg-white dark:bg-gray-800 placeholder:text-[#9CA3AF] dark:placeholder:text-gray-500"
            disabled={loading}
          />
  
          <input
            type="email"
            placeholder="Work email address..."
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] dark:bg-gray-700 border-0 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-gray-500"
            disabled={loading}
          />
  
          <select
            value={formData.referralSource}
            onChange={(e) => setFormData(prev => ({ ...prev, referralSource: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-[#111827] dark:text-white bg-white dark:bg-gray-800 placeholder:text-[#9CA3AF] dark:placeholder:text-gray-500"
            disabled={loading}
          >
            <option value="">Where did you find out about us?</option>
            {[
              "Coworker",
              "Facebook",
              "Friend",
              "Google",
              "Instagram",
              "Twitter",
              "Newsletter",
              "News",
              "None of the above"
            ].map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
  
          {error && (
            <div className="mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}
  
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#a47764] hover:bg-[#b58775] dark:hover:bg-[#936853] text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Processing...
              </>
            ) : (
              'Request Early Access'
            )}
          </button>
  
          <p className="mt-4 text-sm text-center text-[#6B7280] dark:text-gray-400">
            Already on the waitlist?{' '}
            <button
              type="button"  // Important to prevent form submission
              onClick={() => setViewState('check')}
              className="text-[#a47764] hover:text-[#b58775] dark:hover:text-[#936853] font-medium"
            >
              Check your position
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleStatusCheck} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-[#111827] dark:text-white bg-white dark:bg-gray-800 placeholder:text-[#9CA3AF] dark:placeholder:text-gray-500"
            disabled={loading}
          />
  
          {error && (
            <div className="mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}
  
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#a47764] hover:bg-[#b58775] dark:hover:bg-[#936853] text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Checking...
              </>
            ) : (
              'Check Status'
            )}
          </button>
  
          <p className="mt-4 text-sm text-center text-[#6B7280] dark:text-gray-400">
            Haven't signed up yet?{' '}
            <button
              type="button"  // Important to prevent form submission
              onClick={() => setViewState('join')}
              className="text-[#a47764] hover:text-[#b58775] dark:hover:text-[#936853] font-medium"
            >
              Join Now
            </button>
          </p>
        </form>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen antialiased font-manrope flex flex-col ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
       {/* Header */}
       <header className={`fixed left-0 top-0 z-999 w-full transition-all duration-300 ease-in-out ${
  stickyMenu ? "bg-white dark:bg-gray-900 py-4 shadow-md xl:py-4" : "bg-white dark:bg-gray-900 py-4 shadow-md xl:py-4"
}`}>
  <div className="relative mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
    <div className="flex items-center justify-between">
      <Link href="/">
        <Image
          src={theme === 'dark' ? "/images/logo/logo-light.svg" : "/images/logo/logo.svg"}
          alt="Waitlist OmniStack"
          width={150}
          height={40}
        />
      </Link>

      <button
        onClick={toggleTheme}
        className="p-4 text-[#6B7280] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </div>
  </div>
</header>
  
     {/* Main content */}
    <main className="max-w-[1200px] mx-auto px-8 py-12 pt-24"> {/* Added pt-24 for header space */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column - Always visible */}
          <div className="space-y-12">
            <h1 className="text-[40px] leading-[1.2] font-bold text-[#111827] dark:text-white">
              Transform Video into Business Intelligence
            </h1>
  
            <div className="space-y-10">
              {features.map((feature, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#a47764] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-xl text-[#111827] dark:text-white">{feature.title}</h3>
                  </div>
                  <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed pl-9">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
  
          {/* Right Column */}
          <div className="flex flex-col items-center lg:pt-2">
            {/* Title section */}
            <div className="text-center mb-8">
              <h2 className="text-[32px] font-bold text-[#111827] dark:text-white mb-3">
                {viewState === 'success' ? 'You\'re In!' : viewState === 'join' ? 'Get Early Access' : 'Check Your Status'}
              </h2>
              <p className="text-[#6B7280] dark:text-gray-400">
                {viewState === 'success' 
                  ? 'Share with friends to move up the waitlist'
                  : viewState === 'join'
                    ? 'Join leading enterprises transforming their video surveillance into business intelligence 🚀'
                    : 'See your position on the waitlist and invite friends to move up'}
              </p>
            </div>
  
            {/* Stats Group - Always visible */}
            <div className="w-full mb-8">
              <div className="text-center mb-8">
                <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                  <div className="text-[#111827] dark:text-white">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-[#6B7280] dark:text-gray-400">Enterprise Clients</div>
                  </div>
                  <div className="text-[#111827] dark:text-white">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm text-[#6B7280] dark:text-gray-400">Cameras Managed</div>
                  </div>
                </div>
              </div>
              
              {/* Avatar Group */}
              <div className="flex justify-center -space-x-3">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                  >
                    {i === 3 ? (
                      <div className="w-full h-full rounded-full bg-[#a47764] flex items-center justify-center text-white font-medium">
                        R
                      </div>
                    ) : (
                      <div className={`w-full h-full rounded-full bg-[#f3efed] dark:bg-[#8b6553]`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
  
            {/* Form OR Success View */}
            {viewState === 'success' ? renderSuccessView() : renderForm()}
          </div>
        </div>
      </main>
    <footer className="border-t dark:border-gray-800 py-8 mt-auto">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 flex items-center justify-between">
        <Image
          src={theme === 'dark' ? "/images/logo/logo-light.svg" : "/images/logo/logo.svg"}
          alt="Waitlist OmniStack"
          width={250}
          height={130}
        />
        <div className="text-sm text-[#6B7280] dark:text-gray-400">
          © {new Date().getFullYear()} Waitlist OmniStack. All rights reserved.
        </div>
      </div>
    </footer>
    </div>
  );
}
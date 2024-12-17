'use client'

import React, { useState, useEffect } from 'react';

const features = [
  {
    title: "Have the right conversation, every time.",
    description: "Powerful features such as public sharing and message recall lets you organize communications in a visual way, with easy search and quick access to all relevant information. 🎯"
  },
  {
    title: "Ask your questions instantly. OmniStack an answer.",
    description: "Define the visual direction of the website and translate the wireframes into high-fidelity designs that successfully communicate your company's brand and product or service. 🔥"
  },
  {
    title: "Safe and secure environment.",
    description: "There is no fear of being scammed by anyone! Extra care is taken in protecting our users so they can complete the learning process in a safe manner with full transparency. 🔒"
  }
];

export default function WaitlistComponent() {
  const [theme, setTheme] = useState('light');
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!formData.name || !formData.email) {
        throw new Error('Please fill in all fields');
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        throw new Error('Invalid email address');
      }

      setMessage('Successfully joined the waitlist! Check your email.');
      setMessageType('success');
      setFormData({ name: '', email: '' });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
      setMessageType('error');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <div className={`min-h-screen antialiased font-manrope ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-1">
          <a href="/" className="text-sm font-normal text-[#6B7280] dark:text-gray-400">Boilerplate</a>
          <span className="text-[#6B7280] dark:text-gray-400">/</span>
          <a href="/careers" className="text-sm font-normal text-[#6B7280] dark:text-gray-400">Waitlist</a>
        </div>
        <div className="flex items-center">
          <span className="text-[#6B7280] dark:text-gray-400 mr-1">@</span>
          <span className="text-[#111827] dark:text-white">OmniStack.</span>
        </div>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center px-3 py-1.5 text-sm text-[#6B7280] dark:text-gray-400 bg-[#F9FAFB] dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'light' ? (
            <>
              <svg className="mr-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Light
            </>
          ) : (
            <>
              <svg className="mr-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              Dark
            </>
          )}
        </button>
      </nav>

      <main className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column */}
          <div className="space-y-12">
            <h1 className="text-[40px] leading-[1.2] font-bold text-[#111827] dark:text-white">
              Decentralized all-in-one community platform.
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
          <div className="flex flex-col items-center lg:pt-12">
            <div className="text-center mb-8">
              <h2 className="text-[32px] font-bold text-[#111827] dark:text-white mb-3">
                Join our journey and get early access
              </h2>
              <p className="text-[#6B7280] dark:text-gray-400">
                Join our extensive waitlist today to spark connection<br/>
                and get notified when we launch 🎉
              </p>
            </div>

            {/* Avatar Group */}
            <div className="flex -space-x-3 mb-8">
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

            {/* Form */}
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tell us your name..."
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-[#111827] dark:text-white bg-white dark:bg-gray-800 placeholder:text-[#9CA3AF] dark:placeholder:text-gray-500"
                  disabled={loading}
                />

                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] dark:bg-gray-700 border-0 focus:outline-none focus:ring-1 focus:ring-[#a47764] focus:border-[#a47764] text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-gray-500"
                  disabled={loading}
                />

                {message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    messageType === 'success'
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {message}
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
                    <>
                      Continue
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-sm text-center text-[#6B7280] dark:text-gray-400">
                  By clicking "continue" you agree to our{' '}
                  <a href="#" className="text-[#a47764] hover:text-[#b58775] dark:hover:text-[#936853]">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#a47764] hover:text-[#b58775] dark:hover:text-[#936853]">Terms of Use</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
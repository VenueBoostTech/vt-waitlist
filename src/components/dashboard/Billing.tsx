'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Check, AlertCircle, Loader2, Info, ChevronDown, ChevronUp } from 'lucide-react';

// Static plan features with more detail
const planFeatures = {
  'Waitlist OmniStack - Free': {
    tagline: "Perfect for solo creators and small projects",
    features: [
      'Up to 5 waitlists',
      'Basic analytics',
      'Email notifications',
      'Standard support',
      'Community access'
    ]
  },
  'Waitlist OmniStack - Advanced': {
    tagline: "Most popular for growing businesses",
    features: [
      'Up to 20 waitlists',
      'Advanced analytics',
      'Custom domains',
      'Priority support',
      'Referral system',
      'API access (1000 requests/day)',
      'Custom email templates'
    ]
  },
  'Waitlist OmniStack - Pro': {
    tagline: "For enterprises and high-scale operations",
    features: [
      'Unlimited waitlists',
      'Enterprise analytics',
      'Custom branding',
      'Premium API access',
      'Dedicated support',
      'Team collaboration',
      'SLA guarantees',
      'Custom integrations',
      'Advanced security features'
    ]
  }
};

// FAQ content
const faqs = [
  {
    question: "How does billing work?",
    answer: "You'll be billed either monthly or annually, depending on your chosen billing cycle. You can change plans or cancel at any time."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, with prorated charges for upgrades."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans come with a 14-day free trial. No credit card required for the free plan."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, including Visa, Mastercard, and American Express. Enterprise customers can arrange for wire transfers."
  }
];

export default function Billing() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Sort function for plans
  const planOrder = {
    'Waitlist OmniStack - Free': 1,
    'Waitlist OmniStack - Advanced': 2,
    'Waitlist OmniStack - Pro': 3
  };

  useEffect(() => {
    fetchPricesAndSubscription();
  }, []);

  const fetchPricesAndSubscription = async () => {
    try {
      const [pricesRes, subRes] = await Promise.all([
        fetch('/api/stripe/prices'),
        fetch('/api/stripe/subscription')
      ]);

      const { data: products } = await pricesRes.json();
      const subData = await subRes.json();

      const waitlistProducts = products
        .filter(p => p.name.includes('Waitlist OmniStack'))
        .sort((a, b) => planOrder[a.name as keyof typeof planOrder] - planOrder[b.name as keyof typeof planOrder]);

      setPrices(waitlistProducts);
      setCurrentSubscription(subData.subscription);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (priceId: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await fetch('/api/stripe/cancel-subscription', {
        method: 'POST'
      });
      await fetchPricesAndSubscription();
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Plans & Pricing</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Current Plan Alert */}
      {currentSubscription && (
        <div className="bg-white border border-[#a47764] rounded-xl p-6 flex items-start space-x-4 shadow-sm max-w-3xl mx-auto">
          <AlertCircle className="h-5 w-5 text-[#a47764] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Current Plan: <span className="text-[#a47764]">{currentSubscription.product.name.replace('Waitlist OmniStack - ', '')}</span>
              </h3>
              <div className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Active
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Your next billing date is {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
            </p>
            {currentSubscription.status === 'active' && (
              <button
                onClick={handleCancel}
                className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Cancel subscription
              </button>
            )}
          </div>
        </div>
      )}

      {/* Billing Interval Toggle */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setSelectedInterval('month')}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            selectedInterval === 'month'
              ? 'bg-[#a47764] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Monthly billing
        </button>
        <button
          onClick={() => setSelectedInterval('year')}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            selectedInterval === 'year'
              ? 'bg-[#a47764] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Annual billing
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
            Save 20%
          </span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {prices.map((product) => {
          const price = product.prices.find(p => 
            p.interval.toLowerCase() === selectedInterval.toLowerCase()
          );
          if (!price) return null;

          const isAdvanced = product.name.includes('Advanced');
          const featuresList = planFeatures[product.name as keyof typeof planFeatures].features;
          const tagline = planFeatures[product.name as keyof typeof planFeatures].tagline;

          return (
            <div
              key={product.id}
              className={`relative rounded-2xl bg-white transition-all duration-300 hover:shadow-xl ${
                isAdvanced 
                  ? 'ring-2 ring-[#a47764] shadow-lg scale-105 border-0' 
                  : 'border border-gray-200 shadow-sm hover:border-[#a47764]'
              }`}
            >
              {isAdvanced && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#a47764] text-white text-sm font-medium rounded-full shadow-sm">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name.replace('Waitlist OmniStack - ', '')}
                  </h3>
                  <p className="text-gray-600 text-sm">{tagline}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${price.amount}
                    </span>
                    <span className="text-gray-500 text-sm">
                      /{selectedInterval === 'month' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {selectedInterval === 'year' && (
                    <p className="mt-2 text-sm text-green-600">
                      Save ${((price.amount * 12) * 0.2).toFixed(2)} per year
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {featuresList.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-[#a47764] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleUpgrade(price.stripePriceId)}
                  disabled={loading || currentSubscription?.price?.id === price.id}
                  className={`w-full py-4 rounded-lg font-medium transition-all ${
                    currentSubscription?.price?.id === price.id
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : isAdvanced
                        ? 'bg-[#a47764] text-white hover:bg-[#b58775] shadow-md hover:shadow-lg'
                        : 'bg-white border-2 border-[#a47764] text-[#a47764] hover:bg-[#f8f5f4]'
                  } disabled:opacity-50`}
                >
                  {loading
                    ? 'Processing...'
                    : currentSubscription?.price?.id === price.id
                    ? 'Current Plan'
                    : product.name.includes('Free') 
                      ? 'Get Started'
                      : 'Upgrade Now'}
                </button>
                
                {product.name.includes('Free') && (
                  <p className="mt-3 text-xs text-center text-gray-500">
                    No credit card required
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQs Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openFaqIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openFaqIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Banner */}
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Need help choosing a plan?
        </h3>
        <p className="text-gray-600 mb-4">
          Our team is happy to help you find the perfect plan for your needs.
        </p>
        <a
          href="mailto:support@visiontrack.xyz"
          className="inline-flex items-center text-[#a47764] hover:text-[#b58775] font-medium"
        >
          Contact Support
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
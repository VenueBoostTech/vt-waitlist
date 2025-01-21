"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "../ui/toast";
// Static plan features with more detail
const planFeatures: any = {
  "Waitlist OmniStack - Free": {
    tagline: "Perfect for solo creators and small projects",
    features: [
      "Up to 5 waitlists",
      "Basic analytics",
      "Email notifications",
      "Standard support",
      "Community access",
    ],
  },
  "Waitlist OmniStack - Advanced": {
    tagline: "Most popular for growing businesses",
    features: [
      "Up to 20 waitlists",
      "Advanced analytics",
      "Custom domains",
      "Priority support",
      "Referral system",
      "API access (1000 requests/day)",
      "Custom email templates",
    ],
  },
  "Waitlist OmniStack - Pro": {
    tagline: "For enterprises and high-scale operations",
    features: [
      "Unlimited waitlists",
      "Enterprise analytics",
      "Custom branding",
      "Premium API access",
      "Dedicated support",
      "Team collaboration",
      "SLA guarantees",
      "Custom integrations",
      "Advanced security features",
    ],
  },
};

// Enhanced FAQ data
const faqs = [
  {
    question: "How does billing work?",
    answer:
      "You'll be billed either monthly or annually, depending on your chosen billing cycle. You can change plans or cancel at any time.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, with prorated charges for upgrades.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all paid plans come with a 14-day free trial. No credit card required for the free plan.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, Mastercard, and American Express. Enterprise customers can arrange for wire transfers.",
  },
  {
    question: "What happens when I upgrade?",
    answer:
      "When you upgrade, you'll be charged prorated amount for the remainder of your billing cycle. Your new features will be available immediately.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for all paid plans. Contact our support team to process your refund.",
  },
];

// Sample transaction history data
const transactionHistory = [
  {
    date: "2024-01-15",
    description: "Monthly Subscription - Advanced Plan",
    amount: 49.99,
    status: "Completed",
  },
  {
    date: "2024-01-01",
    description: "Plan Upgrade - Pro",
    amount: 25.0,
    status: "Completed",
  },
  {
    date: "2023-12-15",
    description: "Monthly Subscription - Basic Plan",
    amount: 29.99,
    status: "Completed",
  },
  {
    date: "2023-12-01",
    description: "Add-on: API Access",
    amount: 10.0,
    status: "Completed",
  },
  {
    date: "2023-11-15",
    description: "Monthly Subscription - Basic Plan",
    amount: 29.99,
    status: "Completed",
  },
];

export default function Billing() {
  // disable session
  //const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [selectedInterval, setSelectedInterval] = useState("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Add these state variables to your component:
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add these calculations:
  const totalPages = Math.ceil(transactionHistory.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedTransactions = transactionHistory.slice(startIndex, endIndex);

  const planOrder: { [key: string]: number } = {
    "Waitlist OmniStack - Free": 1,
    "Waitlist OmniStack - Advanced": 2,
    "Waitlist OmniStack - Pro": 3,
  };

  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    fetchPricesAndSubscription();
  }, []);

  const fetchPricesAndSubscription = async () => {
    try {
      const [pricesRes, subRes] = await Promise.all([
        fetch("/api/stripe/prices"),
        fetch("/api/stripe/subscription"),
      ]);

      const { data: products } = await pricesRes.json();
      const subData = await subRes.json();

      const waitlistProducts = products
        .filter((p: any) => p.name.includes("Waitlist OmniStack"))
        .sort((a: any, b: any) => planOrder[a.name] - planOrder[b.name]);

      setPrices(waitlistProducts);
      setCurrentSubscription(subData.subscription);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (priceId: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      if (!url) {
        throw new Error("Failed to create checkout session");
      }
      window.location.href = url;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      addToast({
        type: "error",
        message: "Failed to process upgrade. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await fetch("/api/stripe/cancel-subscription", {
        method: "POST",
      });
      await fetchPricesAndSubscription();
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="">
        {/* Page Header with Subscription Info */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="relative flex items-center justify-between p-4 border-b">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#a47764]" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Pricing Plans
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Choose the perfect plan for your needs. All plans include 14-day
                free trial.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedInterval("monthly")}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  selectedInterval === "month"
                    ? "bg-[#a47764] text-white"
                    : "border text-gray-600 hover:border-[#a47764]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedInterval("yearly")}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all flex items-center ${
                  selectedInterval === "year"
                    ? "bg-[#a47764] text-white"
                    : "border text-gray-600 hover:border-[#a47764]"
                }`}
              >
                Annual
                <span className="ml-1.5 text-xs py-0.5 px-1.5 bg-green-100 text-green-700 rounded">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {currentSubscription && (
            <div className="p-4 bg-[#f8f5f4] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Current Plan:</span>
                <span className="text-sm font-medium text-[#a47764]">
                  {currentSubscription.product.name.replace(
                    "Waitlist OmniStack - ",
                    ""
                  )}
                </span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                  Active
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Next billing:{" "}
                  {new Date(
                    currentSubscription.currentPeriodEnd
                  ).toLocaleDateString()}
                </span>
                {currentSubscription.status === "active" && (
                  <button
                    onClick={handleCancel}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Cancel subscription
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {prices.map((product: any) => {
            const price = product.prices.find(
              (p: any) =>
                p.interval.toLowerCase() === selectedInterval.toLowerCase()
            );
            if (!price) return null;

            const isAdvanced = product.name.includes("Advanced");
            const featuresList = planFeatures[product.name].features;
            const tagline = planFeatures[product.name].tagline;

            return (
              <div
                key={product.id}
                className={`relative rounded-2xl bg-white transition-all duration-300 mt-14 ${
                  isAdvanced
                    ? "ring-2 ring-[#a47764] shadow-xl scale-105 border-0"
                    : "border border-gray-200 shadow-lg hover:shadow-xl"
                }`}
              >
                {isAdvanced && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#a47764] text-white text-sm font-medium rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name.replace("Waitlist OmniStack - ", "")}
                    </h3>
                    <p className="text-gray-600 text-sm">{tagline}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${price.amount}
                      </span>
                      <span className="text-gray-500 text-sm">
                        /{selectedInterval === "month" ? "mo" : "yr"}
                      </span>
                    </div>
                    {selectedInterval === "year" && (
                      <p className="mt-2 text-sm text-green-600 font-medium">
                        Save ${(price.amount * 12 * 0.2).toFixed(2)} per year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 flex-grow">
                    {featuresList.map((feature: string, i: number) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-[#a47764] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleUpgrade(price.stripePriceId)}
                      disabled={
                        loading || currentSubscription?.price?.id === price.id
                      }
                      className={`w-full py-4 rounded-lg font-medium transition-all ${
                        currentSubscription?.price?.id === price.id
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isAdvanced
                            ? "bg-[#a47764] text-white hover:bg-[#b58775] shadow-md hover:shadow-lg"
                            : "bg-white border-2 border-[#a47764] text-[#a47764] hover:bg-[#f8f5f4]"
                      } disabled:opacity-50`}
                    >
                      {loading
                        ? "Processing..."
                        : currentSubscription?.price?.id === price.id
                          ? "Current Plan"
                          : product.name.includes("Free")
                            ? "Get Started"
                            : "Upgrade Now"}
                    </button>

                    {product.name.includes("Free") && (
                      <p className="mt-3 text-xs text-center text-gray-500">
                        No credit card required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced FAQ and Transaction History Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Left Column - Transaction History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Transaction History
          </h2>

          {/* Transaction History Table with Pagination */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#a47764] focus:border-transparent"
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                value={rowsPerPage}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {transaction.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right whitespace-nowrap">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            transaction.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, transactionHistory.length)} of{" "}
                {transactionHistory.length} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === number
                        ? "bg-[#a47764] text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - FAQs */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <button
                  className="w-full py-4 text-left flex items-center justify-between hover:text-[#a47764]"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Support Banner */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need help choosing a plan?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is ready to assist you in finding the perfect plan for
              your needs. Get in touch with us today!
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:support@omnistackhub.xyz"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-[#a47764] text-white hover:bg-[#b58775] transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </a>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-[#a47764] text-[#a47764] hover:bg-[#f8f5f4] transition-colors duration-200"
              >
                Schedule a Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
          <div className="bg-gray-50 p-8 flex flex-col justify-center items-center">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Enterprise Support
              </h4>
              <p className="text-gray-600">
                Looking for custom solutions? Our enterprise team is here to
                help with tailored plans and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

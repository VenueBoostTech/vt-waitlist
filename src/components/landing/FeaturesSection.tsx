// components/landing/FeaturesSection.tsx
import { Code2, Brush, BarChart3, Share2, Zap, Mail } from 'lucide-react'

const features = [
  {
    icon: Share2,
    title: 'Built-in Referrals',
    description: 'We create referral links that your users can share with others to move up on the Waitlist.'
  },
  {
    icon: Code2,
    title: 'API and No-Code Options',
    description: 'Integrate with Squarespace, Webflow, Typedream, Wix, and many website builders, as well as our API for custom launches.'
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'See detailed insights on signups (devices, locations, etc.), pageviews, referral channels, and block spam.'
  },
  {
    icon: Zap,
    title: 'Integrations',
    description: 'Use Zapier to integrate with over 5,000 apps, including Notion, Airtable, Slack, Discord, and more.'
  },
  {
    icon: Mail,
    title: 'Custom Emails',
    description: 'Send emails from your domain, with your text and logo, while using our referral links and business logic.'
  },
  {
    icon: Brush,
    title: 'No-Code Widgets',
    description: 'Design your no-code waitlist widget in minutes. Copy and paste to your favorite platform.'
  }
]

export function FeaturesSection() {
  return (
    <div className="py-24 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-[#a47764] font-semibold mb-2">Fully Featured</div>
          <h2 className="text-3xl font-bold text-gray-900">
            Enterprise-grade and highly customizable
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We've built the most feature-rich, customizable waitlisting tool to help you
            launch your next product. Configure your signup form, pre-launch
            experience, email marketing, and referral settings exactly as you want it.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="relative">
                <div className="mb-4">
                  <Icon className="h-6 w-6 text-[#a47764]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
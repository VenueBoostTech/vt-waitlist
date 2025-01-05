// components/landing/Footer.tsx
import Link from 'next/link'

const footerLinks = {
  'Waitlist': [
    'Features',
    'Try it Live ',
    'Documentation',
    'Pricing'
  ],
  'Company': ['Blog', 'Twitter', 'Email', 'LinkedIn'],
  'Site': ['Privacy', 'Terms', 'Uptime Status', 'Sitemap'],
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-[#a47764] text-2xl font-bold">
              OmniStack
            </Link>
            <p className="mt-4 text-gray-600 max-w-xs">
              Viral pre-launch referral marketing software.
              Use your fans to launch the next big thing!
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-gray-600 hover:text-gray-900">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-center">
            © {currentYear} OmniStack LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
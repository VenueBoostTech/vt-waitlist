// components/landing/TemplatesSection.tsx
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { templates } from '@/data/templates'

interface TemplatesSectionProps {
  className?: string
}

export function TemplatesSection({ className }: TemplatesSectionProps) {
  return (
    <div className={twMerge("py-24 bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Beautiful Templates
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src="/api/placeholder/400/320"
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-2 text-gray-600">
                  {template.description}
                </p>
                <div className="mt-4">
                  <Link
                    href={template.path}
                    className="text-[#a47764] hover:text-[#b58775] font-medium"
                  >
                    Preview Template →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
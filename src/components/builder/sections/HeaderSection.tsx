// src/components/builder/sections/HeaderSection.tsx
'use client'

import { useBuilder } from '../context/BuilderContext'

interface HeaderContent {
  title: string
  subtitle: string
  alignment?: 'left' | 'center' | 'right'
  showSubtitle?: boolean
}

export function HeaderSection() {
  const { content, style, activeSection, setActiveSection, updateSection } = useBuilder()
  const isActive = activeSection === 'header'
  const headerContent = content.header as HeaderContent

  const getTextColor = () => style.colors.text
  const getBackgroundColor = () => style.colors.background
  
  const getBorderRadiusClass = () => {
    switch (style.borderRadius) {
      case 'none': return ''
      case 'small': return 'rounded'
      case 'large': return 'rounded-xl'
      default: return 'rounded-lg'
    }
  }

  const getAlignmentClass = () => {
    switch (headerContent?.alignment) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  if (!isActive) {
    return (
      <div 
        className={`group relative p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${getBorderRadiusClass()} ${getAlignmentClass()}`}
        style={{ backgroundColor: getBackgroundColor() }}
        onClick={() => setActiveSection('header')}
      >
        {/* Edit Overlay */}
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors rounded-lg flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium text-gray-900">
            Click to edit
          </span>
        </div>

        <h1 
          className="text-4xl font-bold tracking-tight"
          style={{ color: getTextColor() }}
        >
          {headerContent?.title || 'Add a title...'}
        </h1>
        {(headerContent?.showSubtitle ?? true) && (
          <p 
            className="mt-4 text-xl"
            style={{ color: getTextColor(), opacity: 0.8 }}
          >
            {headerContent?.subtitle || 'Add a subtitle...'}
          </p>
        )}
      </div>
    )
  }

  return (
    <div 
      className={`p-6 shadow-lg ring-2 ring-blue-500 ${getBorderRadiusClass()} ${getAlignmentClass()}`}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <input
        type="text"
        value={headerContent?.title}
        onChange={(e) => updateSection('header', { title: e.target.value })}
        className="w-full text-4xl font-bold tracking-tight bg-transparent border-0 focus:ring-0 p-0 placeholder-gray-400"
        style={{ color: getTextColor() }}
        placeholder="Enter title..."
      />
      {(headerContent?.showSubtitle ?? true) && (
        <textarea
          value={headerContent?.subtitle}
          onChange={(e) => updateSection('header', { subtitle: e.target.value })}
          className="w-full mt-4 text-xl bg-transparent border-0 focus:ring-0 p-0 resize-none placeholder-gray-400"
          style={{ color: getTextColor(), opacity: 0.8 }}
          placeholder="Enter subtitle..."
          rows={2}
        />
      )}

      {/* Section Edit Controls */}
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setActiveSection(null)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <span className="sr-only">Close section editor</span>
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
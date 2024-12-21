// components/builder/TemplateBuilder.tsx
'use client'

import { useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { HeaderSection } from './sections/HeaderSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { FormSection } from './sections/FormSection'
import { Toolbar } from './Toolbar'

interface TemplateContent {
  header: {
    title: string
    subtitle: string
  }
  features: Array<{
    title: string
    description: string
    icon?: string
  }>
  form: {
    title: string
    subtitle: string
    fields: Array<{
      type: string
      label: string
      placeholder: string
      required: boolean
      options?: string[]
    }>
    submitButton: {
      text: string
      style: Record<string, string>
    }
  }
  style: {
    colors: {
      primary: string
      background?: string
      text?: string
    }
    spacing?: string
    borderRadius?: string
  }
}

interface TemplateBuilderProps {
  initialContent: TemplateContent
  onSave: (content: TemplateContent) => Promise<void>
}

export function TemplateBuilder({ initialContent, onSave }: TemplateBuilderProps) {
  const [content, setContent] = useState(initialContent)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleSectionUpdate = (sectionId: string, newData: any) => {
    setContent(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        ...newData
      }
    }))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      // Handle reordering if needed
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Preview Panel */}
      <div className="flex-1 p-8 overflow-auto">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="max-w-4xl mx-auto space-y-8">
            <HeaderSection 
              content={content.header}
              isActive={activeSection === 'header'}
              onClick={() => setActiveSection('header')}
              onUpdate={(data) => handleSectionUpdate('header', data)}
            />
            
            <FeaturesSection
              features={content.features}
              isActive={activeSection === 'features'}
              onClick={() => setActiveSection('features')}
              onUpdate={(data) => handleSectionUpdate('features', data)}
            />

            <FormSection
              form={content.form}
              isActive={activeSection === 'form'}
              onClick={() => setActiveSection('form')}
              onUpdate={(data) => handleSectionUpdate('form', data)}
            />
          </div>
        </DndContext>
      </div>

      {/* Toolbar */}
      <Toolbar
        content={content}
        activeSection={activeSection}
        onStyleChange={(style) => handleSectionUpdate('style', style)}
        onSave={() => onSave(content)}
      />
    </div>
  )
}
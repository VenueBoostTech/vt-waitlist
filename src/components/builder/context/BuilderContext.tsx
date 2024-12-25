// src/components/builder/context/BuilderContext.tsx
import { createContext, useContext, useState } from 'react'

interface BuilderContextType {
  content: any
  activeSection: string | null
  style: {
    colors: {
      primary: string
      text: string
      background: string
    }
    spacing: 'compact' | 'default' | 'relaxed'
    borderRadius: 'none' | 'small' | 'default' | 'large'
    font: string
  }
  setActiveSection: (section: string | null) => void
  updateSection: (sectionId: string, data: any) => void
  updateStyle: (style: any) => void
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined)

export function BuilderProvider({ children, initialContent }: { children: React.ReactNode, initialContent: any }) {
  const [content, setContent] = useState(initialContent)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [style, setStyle] = useState({
    colors: {
      primary: '#0F172A',
      text: '#111827',
      background: '#ffffff'
    },
    spacing: 'default',
    borderRadius: 'default',
    font: 'font-sans'
  })

  const updateSection = (sectionId: string, data: any) => {
    setContent(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        ...data
      }
    }))
  }

  const updateStyle = (newStyle: any) => {
    setStyle(prev => ({
      ...prev,
      ...newStyle,
      colors: {
        ...prev.colors,
        ...(newStyle.colors || {})
      }
    }))
  }

  return (
    <BuilderContext.Provider 
      value={{
        content,
        activeSection,
        style,
        setActiveSection,
        updateSection,
        updateStyle
      }}
    >
      {children}
    </BuilderContext.Provider>
  )
}

export function useBuilder() {
  const context = useContext(BuilderContext)
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider')
  }
  return context
}
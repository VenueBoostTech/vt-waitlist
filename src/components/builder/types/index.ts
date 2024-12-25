// src/components/builder/types/index.ts
export interface Style {
    colors: {
      primary: string
      text: string
      background: string
    }
    spacing: 'compact' | 'default' | 'relaxed'
    borderRadius: 'none' | 'small' | 'default' | 'large'
    font: string
  }
  
  export interface HeaderContent {
    title: string
    subtitle: string
    alignment?: 'left' | 'center' | 'right'
    showSubtitle?: boolean
  }
  
  export interface Feature {
    id: string
    title: string
    description: string
    icon?: string
  }
  
  export interface FormField {
    id: string
    type: string
    label: string
    placeholder: string
    required: boolean
    options?: string[]
  }
  
  export interface FormContent {
    title: string
    subtitle: string
    fields: FormField[]
    submitButton: {
      text: string
      style: Record<string, string>
    }
    fieldStyle?: 'minimal' | 'outlined' | 'filled'
    buttonWidth?: 'full' | 'auto'
  }
  
  export interface TemplateContent {
    header: HeaderContent
    features: Feature[]
    form: FormContent
    style: Style
  }
  
  export type SectionType = 'header' | 'features' | 'form'
  
  export interface Section {
    id: string
    type: SectionType
    content: HeaderContent | Feature[] | FormContent
  }
  
  export interface BuilderContextType {
    content: TemplateContent
    activeSection: string | null
    style: Style
    setActiveSection: (section: string | null) => void
    updateSection: (sectionId: string, data: any) => void
    updateStyle: (style: Partial<Style>) => void
  }
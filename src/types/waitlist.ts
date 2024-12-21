// types/waitlist.ts

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface ButtonConfig {
  text: string
  style?: Record<string, any>
}

export interface FormField {
  type: string
  label: string
  placeholder: string
  required: boolean
  options: string[]
}

export interface FormConfig {
  title: string
  subtitle: string
  fields: FormField[]
  submitButton: ButtonConfig
  successMessage: string
}

export interface TemplateContent {
  title: string
  subtitle: string
  features: Feature[]
  form: FormConfig
}
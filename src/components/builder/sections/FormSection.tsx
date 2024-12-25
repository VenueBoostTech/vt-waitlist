'use client'

import { useBuilder } from '../context/BuilderContext'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import type { FormContent, FormField } from '../types'

interface FormFieldEditorProps {
  field: FormField
  index: number
  onUpdate: (index: number, updates: Partial<FormField>) => void
  onDelete: (index: number) => void
}

function FormFieldEditor({ field, index, onUpdate, onDelete }: FormFieldEditorProps) {
  const { style } = useBuilder()
  const getTextColor = () => style.colors.text

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
          <select
            value={field.type}
            onChange={(e) => onUpdate(index, { type: e.target.value })}
            className="block w-40 rounded-md border-gray-300"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="select">Select</option>
            <option value="textarea">Text Area</option>
          </select>
        </div>
        <button
          onClick={() => onDelete(index)}
          className="p-1.5 text-red-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <input
        type="text"
        value={field.label}
        onChange={(e) => onUpdate(index, { label: e.target.value })}
        className="block w-full rounded-md border-gray-300"
        placeholder="Field label..."
      />

      <input
        type="text"
        value={field.placeholder}
        onChange={(e) => onUpdate(index, { placeholder: e.target.value })}
        className="block w-full rounded-md border-gray-300"
        placeholder="Placeholder text..."
      />

      {field.type === 'select' && (
        <div>
          <input
            type="text"
            value={field.options?.join(', ') || ''}
            onChange={(e) => onUpdate(index, {
              options: e.target.value.split(',').map(o => o.trim())
            })}
            className="block w-full rounded-md border-gray-300"
            placeholder="Options (comma-separated)..."
          />
        </div>
      )}

      <label className="flex items-center">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onUpdate(index, { required: e.target.checked })}
          className="rounded border-gray-300 text-blue-600"
        />
        <span className="ml-2 text-sm" style={{ color: getTextColor() }}>Required</span>
      </label>
    </div>
  )
}

export function FormSection() {
  const { content, style, activeSection, setActiveSection, updateSection } = useBuilder()
  const formContent = content.form as FormContent
  const isActive = activeSection === 'form'

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

  const handleFieldUpdate = (index: number, updates: Partial<FormField>) => {
    const newFields = [...formContent.fields]
    newFields[index] = { ...newFields[index], ...updates }
    updateSection('form', { fields: newFields })
  }

  const handleFieldDelete = (index: number) => {
    const newFields = formContent.fields.filter((_, i) => i !== index)
    updateSection('form', { fields: newFields })
  }

  const handleAddField = (type: string) => {
    const newField: FormField = {
      id: `field-${formContent.fields.length + 1}`,
      type,
      label: '',
      placeholder: '',
      required: false
    }
    updateSection('form', { 
      fields: [...formContent.fields, newField]
    })
  }

  if (!isActive) {
    return (
      <div
        className={`p-6 bg-white ${getBorderRadiusClass()} shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
        style={{ backgroundColor: getBackgroundColor() }}
        onClick={() => setActiveSection('form')}
      >
        <h2 
          className="text-2xl font-bold"
          style={{ color: getTextColor() }}
        >
          {formContent.title || 'Add form title...'}
        </h2>
        <p 
          className="mt-2"
          style={{ color: getTextColor(), opacity: 0.8 }}
        >
          {formContent.subtitle || 'Add form subtitle...'}
        </p>
        <div className="mt-6 space-y-4">
          {formContent.fields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label className="block text-sm font-medium" style={{ color: getTextColor() }}>
                {field.label || 'Untitled Field'}
              </label>
              {field.type === 'select' ? (
                <select className="mt-1 block w-full rounded-md border-gray-300">
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              )}
            </div>
          ))}
          <button
            className="w-full p-2 rounded-md text-white"
            style={{ backgroundColor: style.colors.primary }}
          >
            {formContent.submitButton.text}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 bg-white ${getBorderRadiusClass()} shadow-lg ring-2 ring-blue-500`}>
      <input
        type="text"
        value={formContent.title}
        onChange={(e) => updateSection('form', { title: e.target.value })}
        className="w-full text-2xl font-bold border-0 focus:ring-0 p-0"
        style={{ color: getTextColor() }}
        placeholder="Form title..."
      />
      <textarea
        value={formContent.subtitle}
        onChange={(e) => updateSection('form', { subtitle: e.target.value })}
        className="w-full mt-2 border-0 focus:ring-0 p-0 resize-none"
        style={{ color: getTextColor(), opacity: 0.8 }}
        placeholder="Form subtitle..."
        rows={2}
      />

      <div className="mt-6 space-y-6">
        {formContent.fields.map((field, index) => (
          <FormFieldEditor
            key={field.id}
            field={field}
            index={index}
            onUpdate={handleFieldUpdate}
            onDelete={handleFieldDelete}
          />
        ))}

        <div className="flex gap-2">
          <button
            onClick={() => handleAddField('text')}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 hover:border-gray-400"
          >
            Add Text Field
          </button>
          <button
            onClick={() => handleAddField('email')}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 hover:border-gray-400"
          >
            Add Email Field
          </button>
          <button
            onClick={() => handleAddField('select')}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 hover:border-gray-400"
          >
            Add Select Field
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium mb-2">Submit Button</h3>
          <input
            type="text"
            value={formContent.submitButton.text}
            onChange={(e) => updateSection('form', {
              submitButton: { ...formContent.submitButton, text: e.target.value }
            })}
            className="block w-full rounded-md border-gray-300"
            placeholder="Button text..."
          />
        </div>
      </div>
    </div>
  )
}
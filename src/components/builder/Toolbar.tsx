'use client'

import { useState } from 'react'
import { useBuilder } from './context/BuilderContext'
import { Palette, Layout, Type, Save, Loader2 } from 'lucide-react'

interface ToolbarProps {
  onSave: () => Promise<void>
  isLoading?: boolean
}

export function Toolbar({ onSave, isLoading }: ToolbarProps) {
  const { content, activeSection, style, updateSection, updateStyle } = useBuilder()
  const [activeTab, setActiveTab] = useState<'style' | 'layout' | 'typography'>('style')

  const renderStyleTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Colors</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Primary Color</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={style.colors.primary}
                onChange={(e) => updateStyle({
                  colors: { ...style.colors, primary: e.target.value }
                })}
                className="h-8 w-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={style.colors.primary}
                onChange={(e) => updateStyle({
                  colors: { ...style.colors, primary: e.target.value }
                })}
                className="flex-1 rounded-md border-gray-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Text Color</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={style.colors.text}
                onChange={(e) => updateStyle({
                  colors: { ...style.colors, text: e.target.value }
                })}
                className="h-8 w-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={style.colors.text}
                onChange={(e) => updateStyle({
                  colors: { ...style.colors, text: e.target.value }
                })}
                className="flex-1 rounded-md border-gray-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Background</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={style.colors.background}
                onChange={(e) => updateStyle({
                  colors: { ...style.colors, background: e.target.value }
                })}
                className="h-8 w-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={style.colors.background}
                onChange={(e) => updateStyle({
                  colors: { ...style.colors, background: e.target.value }
                })}
                className="flex-1 rounded-md border-gray-300 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Spacing & Borders</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Section Spacing</label>
            <select
              value={style.spacing}
              onChange={(e) => updateStyle({ spacing: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="compact">Compact</option>
              <option value="default">Default</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Border Radius</label>
            <select
              value={style.borderRadius}
              onChange={(e) => updateStyle({ borderRadius: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="none">None</option>
              <option value="small">Small</option>
              <option value="default">Default</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLayoutTab = () => (
    <div className="space-y-6">
      {activeSection === 'header' && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Header Layout</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Text Alignment</label>
              <select
                value={content.header.alignment}
                onChange={(e) => updateSection('header', { alignment: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Show Subtitle</label>
              <input
                type="checkbox"
                checked={content.header.showSubtitle}
                onChange={(e) => updateSection('header', { showSubtitle: e.target.checked })}
                className="mt-1 rounded border-gray-300 text-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {activeSection === 'features' && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Features Layout</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Display Style</label>
              <select
                value={content.features.layout}
                onChange={(e) => updateSection('features', { layout: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300"
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
                <option value="cards">Cards</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Show Icons</label>
              <input
                type="checkbox"
                checked={content.features.showIcons}
                onChange={(e) => updateSection('features', { showIcons: e.target.checked })}
                className="mt-1 rounded border-gray-300 text-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {activeSection === 'form' && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Form Layout</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Field Style</label>
              <select
                value={content.form.fieldStyle}
                onChange={(e) => updateSection('form', { fieldStyle: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300"
              >
                <option value="minimal">Minimal</option>
                <option value="outlined">Outlined</option>
                <option value="filled">Filled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Button Width</label>
              <select
                value={content.form.buttonWidth}
                onChange={(e) => updateSection('form', { buttonWidth: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300"
              >
                <option value="full">Full Width</option>
                <option value="auto">Auto Width</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderTypographyTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Font Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Font Family</label>
            <select
              value={style.font}
              onChange={(e) => updateStyle({ font: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="font-sans">Sans Serif</option>
              <option value="font-serif">Serif</option>
              <option value="font-mono">Monospace</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-96 border-l bg-white p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {[
            { id: 'style', icon: Palette, label: 'Style' },
            { id: 'layout', icon: Layout, label: 'Layout' },
            { id: 'typography', icon: Type, label: 'Typography' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-[#a47764] text-[#a47764]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'style' && renderStyleTab()}
          {activeTab === 'layout' && renderLayoutTab()}
          {activeTab === 'typography' && renderTypographyTab()}
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#a47764] text-white px-4 py-2 rounded-lg hover:bg-[#a47764]/90 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>
    </div>
  )
}
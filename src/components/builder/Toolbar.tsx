// components/builder/Toolbar.tsx
interface ToolbarProps {
    content: any
    activeSection: string | null
    onStyleChange: (style: any) => void
    onSectionUpdate: (sectionId: string, data: any) => void
    onSave: () => void
  }
  
  export function Toolbar({ content, activeSection, onStyleChange, onSectionUpdate, onSave }: ToolbarProps) {
    const renderSectionControls = () => {
      switch (activeSection) {
        case 'header':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Text Alignment</label>
                <select
                  value={content.header.alignment}
                  onChange={(e) => onSectionUpdate('header', { alignment: e.target.value })}
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
                  onChange={(e) => onSectionUpdate('header', { showSubtitle: e.target.checked })}
                  className="mt-1"
                />
              </div>
            </div>
          );
  
        case 'features':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Layout</label>
                <select
                  value={content.features.layout}
                  onChange={(e) => onSectionUpdate('features', { layout: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300"
                >
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Show Icons</label>
                <input
                  type="checkbox"
                  checked={content.features.showIcons}
                  onChange={(e) => onSectionUpdate('features', { showIcons: e.target.checked })}
                  className="mt-1"
                />
              </div>
            </div>
          );
  
        case 'form':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Field Style</label>
                <select
                  value={content.form.fieldStyle}
                  onChange={(e) => onSectionUpdate('form', { fieldStyle: e.target.value })}
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
                  onChange={(e) => onSectionUpdate('form', { buttonWidth: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300"
                >
                  <option value="full">Full Width</option>
                  <option value="auto">Auto Width</option>
                </select>
              </div>
            </div>
          );
  
        default:
          return null;
      }
    };
  
    return (
      <div className="w-80 border-l bg-white p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Global Style Controls */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Style</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Primary Color</label>
                <input
                  type="color"
                  value={content.style.colors.primary}
                  onChange={(e) => onStyleChange({
                    colors: { ...content.style.colors, primary: e.target.value }
                  })}
                  className="mt-1 w-full"
                />
              </div>
  
              <div>
                <label className="block text-sm text-gray-700">Spacing</label>
                <select
                  value={content.style.spacing}
                  onChange={(e) => onStyleChange({ spacing: e.target.value })}
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
                  value={content.style.borderRadius}
                  onChange={(e) => onStyleChange({ borderRadius: e.target.value })}
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
  
          {/* Section-specific Controls */}
          {activeSection && (
            <div>
              <h3 className="text-sm font-medium text-gray-900">Section Settings</h3>
              <div className="mt-4">{renderSectionControls()}</div>
            </div>
          )}
  
          {/* Save Button */}
          <button
            onClick={onSave}
            className="w-full bg-[#a47764] text-white px-4 py-2 rounded-lg hover:bg-[#b58775]"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
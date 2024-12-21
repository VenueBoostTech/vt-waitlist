
// components/builder/sections/FormSection.tsx
interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

interface FormSectionProps {
  form: {
    title: string;
    subtitle: string;
    fields: FormField[];
    submitButton: {
      text: string;
      style: Record<string, string>;
    };
  };
  isActive: boolean;
  onClick: () => void;
  onUpdate: (data: any) => void;
}

export function FormSection({ form, isActive, onClick, onUpdate }: FormSectionProps) {
  const addField = (type: string) => {
    const newField: FormField = {
      id: `field-${form.fields.length + 1}`,
      type,
      label: '',
      placeholder: '',
      required: true,
    };
    onUpdate({
      fields: [...form.fields, newField],
    });
  };

  if (!isActive) {
    return (
      <div 
        className="p-6 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        <h2 className="text-2xl font-bold">{form.title}</h2>
        <p className="mt-2 text-gray-600">{form.subtitle}</p>
        <div className="mt-6 space-y-4">
          {form.fields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select className="mt-1 block w-full rounded-md border-gray-300">
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
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
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-md"
          >
            {form.submitButton.text}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow ring-2 ring-blue-500">
      <input
        type="text"
        value={form.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        className="w-full text-2xl font-bold border-0 focus:ring-0 p-0"
        placeholder="Form title..."
      />
      <textarea
        value={form.subtitle}
        onChange={(e) => onUpdate({ subtitle: e.target.value })}
        className="w-full mt-2 text-gray-600 border-0 focus:ring-0 p-0 resize-none"
        placeholder="Form subtitle..."
      />
      
      <div className="mt-6 space-y-6">
        {form.fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center">
              <select
                value={field.type}
                onChange={(e) => {
                  const newFields = [...form.fields];
                  newFields[index] = { ...field, type: e.target.value };
                  onUpdate({ fields: newFields });
                }}
                className="block w-40 rounded-md border-gray-300"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="select">Select</option>
              </select>
              <button
                onClick={() => {
                  const newFields = form.fields.filter((_, i) => i !== index);
                  onUpdate({ fields: newFields });
                }}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
            
            <input
              type="text"
              value={field.label}
              onChange={(e) => {
                const newFields = [...form.fields];
                newFields[index] = { ...field, label: e.target.value };
                onUpdate({ fields: newFields });
              }}
              className="block w-full rounded-md border-gray-300"
              placeholder="Field label..."
            />
            
            <input
              type="text"
              value={field.placeholder}
              onChange={(e) => {
                const newFields = [...form.fields];
                newFields[index] = { ...field, placeholder: e.target.value };
                onUpdate({ fields: newFields });
              }}
              className="block w-full rounded-md border-gray-300"
              placeholder="Placeholder text..."
            />
            
            {field.type === 'select' && (
              <div>
                <input
                  type="text"
                  value={field.options?.join(', ') || ''}
                  onChange={(e) => {
                    const newFields = [...form.fields];
                    newFields[index] = {
                      ...field,
                      options: e.target.value.split(',').map((o) => o.trim()),
                    };
                    onUpdate({ fields: newFields });
                  }}
                  className="block w-full rounded-md border-gray-300"
                  placeholder="Options (comma-separated)..."
                />
              </div>
            )}
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => {
                  const newFields = [...form.fields];
                  newFields[index] = { ...field, required: e.target.checked };
                  onUpdate({ fields: newFields });
                }}
                className="rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">Required</span>
            </label>
          </div>
        ))}
        
        <div className="flex space-x-2">
          <button
            onClick={() => addField('text')}
            className="text-primary-600"
          >
            Add Text Field
          </button>
          <button
            onClick={() => addField('email')}
            className="text-primary-600"
          >
            Add Email Field
          </button>
          <button
            onClick={() => addField('select')}
            className="text-primary-600"
          >
            Add Select Field
          </button>
        </div>
        
        <div className="mt-4 p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium mb-2">Submit Button</h3>
          <input
            type="text"
            value={form.submitButton.text}
            onChange={(e) => onUpdate({
              submitButton: { ...form.submitButton, text: e.target.value }
            })}
            className="block w-full rounded-md border-gray-300"
            placeholder="Button text..."
          />
        </div>
      </div>
    </div>
  );
}
// components/builder/sections/FeaturesSection.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  isActive: boolean;
  onClick: () => void;
  onUpdate: (data: any) => void;
  onReorder: (newFeatures: Feature[]) => void;
}

export function FeaturesSection({ features, isActive, onClick, onUpdate, onReorder }: FeaturesSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: 'features' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isActive) {
    return (
      <div 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-6 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="space-y-3">
              {feature.icon && (
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xl">{feature.icon}</span>
                </div>
              )}
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow ring-2 ring-blue-500">
      {features.map((feature, index) => (
        <div key={feature.id} className="mb-6 last:mb-0">
          <input
            type="text"
            value={feature.title}
            onChange={(e) => {
              const newFeatures = [...features];
              newFeatures[index] = { ...feature, title: e.target.value };
              onUpdate({ features: newFeatures });
            }}
            className="w-full text-lg font-semibold border-0 focus:ring-0 p-0"
            placeholder="Feature title..."
          />
          <textarea
            value={feature.description}
            onChange={(e) => {
              const newFeatures = [...features];
              newFeatures[index] = { ...feature, description: e.target.value };
              onUpdate({ features: newFeatures });
            }}
            className="w-full mt-2 text-gray-600 border-0 focus:ring-0 p-0 resize-none"
            placeholder="Feature description..."
          />
          <button
            onClick={() => {
              const newFeatures = features.filter((_, i) => i !== index);
              onUpdate({ features: newFeatures });
            }}
            className="mt-2 text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          const newFeatures = [
            ...features,
            {
              id: `feature-${features.length + 1}`,
              title: '',
              description: '',
            },
          ];
          onUpdate({ features: newFeatures });
        }}
        className="mt-4 text-primary-600"
      >
        Add Feature
      </button>
    </div>
  );
}
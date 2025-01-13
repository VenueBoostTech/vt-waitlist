// src/components/builder/TemplateBuilder.tsx
"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useRef, useState } from "react";
import { BuilderProvider } from "./context/BuilderContext";
import { HeaderSection } from "./sections/HeaderSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FormSection } from "./sections/FormSection";
import { Toolbar } from "./Toolbar";

interface TemplateContent {
  header: {
    title: string;
    subtitle: string;
    alignment?: "left" | "center" | "right";
    showSubtitle?: boolean;
  };
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
  }>;
  form: {
    title: string;
    subtitle: string;
    fields: Array<{
      id: string;
      type: string;
      label: string;
      placeholder: string;
      required: boolean;
      options?: string[];
    }>;
    submitButton: {
      text: string;
      style: Record<string, string>;
    };
    fieldStyle?: "minimal" | "outlined" | "filled";
    buttonWidth?: "full" | "auto";
  };
  style: {
    colors: {
      primary: string;
      background?: string;
      text?: string;
    };
    spacing?: "compact" | "default" | "relaxed";
    borderRadius?: "none" | "small" | "default" | "large";
    font?: string;
  };
}

interface Section {
  id: string;
  type: "header" | "features" | "form";
  component: React.ComponentType;
}

interface TemplateBuilderProps {
  initialContent: TemplateContent;
  onSave: (content: TemplateContent) => Promise<void>;
  onChange?: (content: TemplateContent) => void;
}

export function TemplateBuilder({
  initialContent,
  onSave,
  onChange,
}: TemplateBuilderProps) {
  // Define available sections
  const sections: Section[] = useMemo(
    () => [
      { id: "header", type: "header", component: HeaderSection },
      { id: "features", type: "features", component: FeaturesSection },
      { id: "form", type: "form", component: FormSection },
    ],
    []
  );
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle drag & drop of sections
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Handle section reordering
      // This will be implemented when we add the features section
    }
  };

  // Handle save with loading and error states
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await onSave(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BuilderProvider
      initialContent={initialContent}
      onChange={(content) => {
        setContent(content);
      }}
    >
      <div className="flex min-h-screen bg-gray-50">
        {/* Main Content Area */}
        <div className="flex-1 pr-8 pl-1 pb-1 overflow-auto">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Sections */}
                {sections.map((section) => {
                  const Component = section.component;
                  return <Component key={section.id} />;
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Toolbar */}
        <Toolbar
          onSave={handleSave}
          isLoading={loading}
          onChange={onChange}
          setContent={setContent}
        />
      </div>
    </BuilderProvider>
  );
}

// Export type for use in other components
export type { TemplateContent };

"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBuilder } from "../context/BuilderContext";
import {
  GripVertical,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { Feature, HeaderContent } from "../types";

interface SortableFeatureProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  onUpdate: (index: number, updates: Partial<Feature>) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

function FeatureCard({
  feature,
  index,
  isActive,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: SortableFeatureProps) {
  const { style } = useBuilder();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: feature.id });
  const { content } =
    useBuilder();
  const headerContent = content.header as HeaderContent;

  const getTextColor = () => style.colors.text;
  const getBorderRadiusClass = () => {
    switch (style.borderRadius) {
      case "none":
        return "";
      case "small":
        return "rounded";
      case "large":
        return "rounded-xl";
      default:
        return "rounded-lg";
    }
  };
  const getBackgroundColor = () => style.colors.background;
  const getAlignmentClass = () => {
    switch (headerContent?.alignment) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!isActive) {
    return (
      <div
        ref={setNodeRef}
        style={{ backgroundColor: getBackgroundColor() }}
        className={`p-6 ${getBorderRadiusClass()} ${getAlignmentClass()} shadow-sm hover:shadow-md transition-all`}
      >
        <div className="flex items-center gap-4">
          {feature.icon && (
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${style.colors.primary}15` }}
            >
              <span
                className="text-2xl"
                style={{ color: style.colors.primary }}
              >
                {feature.icon}
              </span>
            </div>
          )}
          <div>
            <h3
              className="text-xl font-semibold"
              style={{ color: getTextColor() }}
            >
              {feature.title || "Add a title..."}
            </h3>
            <p
              className="mt-2 text-base"
              style={{ color: getTextColor(), opacity: 0.8 }}
            >
              {feature.description || "Add a description..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={sortableStyle}
      className={`group bg-white p-6 ${getBorderRadiusClass()} shadow-lg ring-2 ring-blue-500`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600"
            onClick={() => onMoveDown(index)}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-grow space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-grow">
              <input
                type="text"
                value={feature.title}
                onChange={(e) => onUpdate(index, { title: e.target.value })}
                className="w-full text-xl font-semibold bg-transparent border-0 focus:ring-0 p-0"
                style={{ color: getTextColor() }}
                placeholder="Feature title..."
              />
              <textarea
                value={feature.description}
                onChange={(e) =>
                  onUpdate(index, { description: e.target.value })
                }
                className="w-full text-base bg-transparent border-0 focus:ring-0 p-0 resize-none"
                style={{ color: getTextColor(), opacity: 0.8 }}
                placeholder="Feature description..."
                rows={2}
              />
            </div>
            <button
              type="button"
              onClick={() => onDelete(index)}
              className="p-1.5 text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{ color: getTextColor() }}
            >
              Icon (emoji or symbol)
            </label>
            <input
              type="text"
              value={feature.icon || ""}
              onChange={(e) => onUpdate(index, { icon: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter an emoji or symbol..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const {
    content,
    style,
    activeSection,
    setActiveSection,
    updateSection,
  }: any = useBuilder();
  const features = content.features as Feature[];
  const isActive = activeSection === "features";

  const getLayoutClass = () => {
    if (!isActive && style.layout === "grid") {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
    }
    return "space-y-8";
  };

  const handleFeatureUpdate = (index: number, updates: Partial<Feature>) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], ...updates };
    updateSection("features", newFeatures);
  };

  const handleFeatureDelete = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    updateSection("features", newFeatures);
  };

  const handleAddFeature = () => {
    const newFeature: Feature = {
      id: `feature-${features.length + 1}`,
      title: "",
      description: "",
      icon: "✨",
    };
    updateSection("features", [...features, newFeature]);
  };

  const handleMoveFeature = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === features.length - 1)
    ) {
      return;
    }

    const newFeatures = [...features];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newFeatures[index], newFeatures[newIndex]] = [
      newFeatures[newIndex],
      newFeatures[index],
    ];
    updateSection("features", newFeatures);
  };

  return (
    <div
      onClick={() => !isActive && setActiveSection("features")}
      className={`relative ${!isActive ? "cursor-pointer" : ""}`}
    >
      {!isActive && (
        <div className="absolute inset-0 bg-gray-900/0 hover:bg-gray-900/5 transition-colors rounded-lg flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium text-gray-900">
            Click to edit features
          </span>
        </div>
      )}

      <div className={getLayoutClass()}>
        {features?.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
            isActive={isActive}
            onUpdate={handleFeatureUpdate}
            onDelete={handleFeatureDelete}
            onMoveUp={(index) => handleMoveFeature(index, "up")}
            onMoveDown={(index) => handleMoveFeature(index, "down")}
          />
        ))}
      </div>

      {isActive && (
        <button
          type="button"
          onClick={handleAddFeature}
          className="mt-8 flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Feature
        </button>
      )}
    </div>
  );
}

// src/components/builder/context/BuilderContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

interface BuilderContextType {
  content: any;
  activeSection: string | null;
  style: {
    colors: {
      primary: string;
      text: string;
      background: string;
    };
    spacing: "compact" | "default" | "relaxed";
    borderRadius: "none" | "small" | "default" | "large";
    font: string;
  };
  setActiveSection: (section: string | null) => void;
  updateSection: (sectionId: string, data: any) => void;
  updateStyle: (style: any) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);
const debounce: any = (func: any, delay: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function BuilderProvider({
  children,
  initialContent,
  onChange,
}: {
  children: React.ReactNode;
  initialContent: any;
  onChange?: (content: any) => void;
}) {
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [style, setStyle]: any = useState({
    colors: {
      primary: "#0F172A",
      text: "#111827",
      background: "#ffffff",
    },
    spacing: "default",
    borderRadius: "default",
    font: "font-sans",
  });

  const handler = debounce(() => {
    onChange?.(content);
  }, 800); // Adjust delay as needed

  useEffect(() => {
    handler();
    return () => {
      clearTimeout(handler);
    };
  }, [content]);

  const updateSection = (sectionId: string, data: any) => {
    console.log("🚀 ~ updateSection ~ data:", data)
    setContent((prev: any) => ({
      ...prev,
      [sectionId]: data,
    }));
  };

  const updateStyle = (newStyle: any) => {
    setStyle((prev: any) => ({
      ...prev,
      ...newStyle,
      colors: {
        ...prev.colors,
        ...(newStyle.colors || {}),
      },
    }));
  };

  return (
    <BuilderContext.Provider
      value={{
        content,
        activeSection,
        style,
        setActiveSection,
        updateSection,
        updateStyle,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}

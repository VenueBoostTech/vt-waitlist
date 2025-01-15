"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, Edit2, Eye } from "lucide-react";
import { TemplateBuilder } from "@/components/builder/TemplateBuilder";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "../../hooks/useToast";
import { useSaveState } from "../../hooks/useSaveState";
import { ExitDialog } from "../../components/dialogs/ExitDialog";
import { ShortcutsDialog } from "../../components/dialogs/ShortcutsDialog";

type TabType = "edit" | "preview";

export default function WaitlistBuilderEdit({ id }: { id: string }) {
  const router = useRouter();
  const { addToast } = useToast();
  const { saveState, setSaving, setSuccess } = useSaveState();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [waitlist, setWaitlist] = useState<any>(null);
  const [autoSave, setAutoSave] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const autoSaveDebounceRef = useRef<NodeJS.Timeout>();

  // Fetch waitlist data
  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await fetch(`/api/waitlist/${id}`);
        if (!response.ok) throw new Error("Failed to fetch waitlist");
        const data = await response.json();
        setWaitlist(data.data);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load waitlist";
        setError(message);
        addToast({ type: "error", message });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWaitlist();
  }, [id, addToast]);

  // Handle save
  const handleSave = async (content: any) => {
    try {
      setSaving();
      const response = await fetch(`/api/waitlist/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, style: content.style }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update waitlist");
      }

      setSuccess("Changes saved successfully!");
      setHasUnsavedChanges(false);

      // Refresh the iframe after successful save
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save changes";
      setError(message);
      addToast({ type: "error", message });
    }
  };

  // Handle content updates and auto-save
  const handleContentUpdate = (content: any) => {
    setHasUnsavedChanges(true);
    if (autoSave) {
      if (autoSaveDebounceRef.current) {
        clearTimeout(autoSaveDebounceRef.current);
      }
      autoSaveDebounceRef.current = setTimeout(() => handleSave(content), 2000);
    }
  };

  // Handle exit
  const handleExit = () => {
    if (hasUnsavedChanges) {
      setShowExitDialog(true);
    } else {
      router.push(`/dashboard/waitlists/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="bg-white border-b animate-pulse">
          <div className="h-16" />
        </div>
        <div className="flex-1 p-8">
          <div className="h-24 bg-white rounded-lg animate-pulse mb-4" />
          <div className="h-48 bg-white rounded-lg animate-pulse mb-4" />
          <div className="h-64 bg-white rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href={`/dashboard/waitlists/${id}`} className="text-blue-600 hover:text-blue-700">
            Return to Waitlist
          </Link>
        </div>
      </div>
    );
  }

  if (!waitlist) return null;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleExit}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-200 mx-4" />
              <h1 className="text-lg font-medium text-gray-900">
                Visual Builder: {waitlist.name}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                {saveState.lastSaved && (
                  <span className="text-sm text-gray-500">
                    Last saved {formatDistanceToNow(saveState.lastSaved, { addSuffix: true })}
                  </span>
                )}
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`text-sm font-medium ${
                    autoSave ? "text-[#a47764]" : "text-gray-500"
                  }`}
                >
                  Auto-save {autoSave ? "on" : "off"}
                </button>
              </div>

              <div className="h-6 w-px bg-gray-200" />

              <button
                onClick={() => setShowShortcuts(true)}
                className="text-[#a47764] hover:text-[#a47764]/90 font-medium"
              >
                Shortcuts
              </button>

              <button
                onClick={handleExit}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-t">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                activeTab === "edit"
                  ? "border-[#a47764] text-[#a47764]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Editor
              </div>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                activeTab === "preview"
                  ? "border-[#a47764] text-[#a47764]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Edit Mode */}
        <div className={`h-full transition-all duration-300 ${
          activeTab === "edit" ? "block" : "hidden"
        }`}>
          <div className="h-full p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <TemplateBuilder
                initialContent={waitlist.content}
                onSave={handleSave}
                onChange={handleContentUpdate}
              />
            </div>
          </div>
        </div>

        {/* Preview Mode */}
        <div className={`h-full bg-white transition-all duration-300 ${
          activeTab === "preview" ? "block" : "hidden"
        }`}>
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <iframe
                ref={iframeRef}
                src={`/api/preview/${id}`}
                className="w-full h-full border-0"
                title="Page preview"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showExitDialog && (
        <ExitDialog
          onCancel={() => setShowExitDialog(false)}
          onConfirm={() => {
            setShowExitDialog(false);
            router.push(`/dashboard/waitlists/${id}`);
          }}
        />
      )}

      {showShortcuts && <ShortcutsDialog onClose={() => setShowShortcuts(false)} />}

      {/* Save indicator */}
      {saveState.status === "saving" && (
        <div className="fixed bottom-4 left-4 z-50 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm flex items-center gap-2">
          <Save className="w-3 h-3 animate-spin" />
          <span>Saving...</span>
        </div>
      )}
    </div>
  );
}
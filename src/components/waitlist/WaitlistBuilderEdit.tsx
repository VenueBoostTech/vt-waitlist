"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save } from "lucide-react";
import { TemplateBuilder } from "@/components/builder/TemplateBuilder";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "../../hooks/useToast";
import { useSaveState } from "../../hooks/useSaveState";
import { ExitDialog } from "../../components/dialogs/ExitDialog";
import { ShortcutsDialog } from "../../components/dialogs/ShortcutsDialog";

interface WaitlistBuilderEditProps {
  id: string;
}

export default function WaitlistBuilderEdit({ id }: WaitlistBuilderEditProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const { saveState, setSaving, setSuccess }: any = useSaveState();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [waitlist, setWaitlist] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(true);
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
        const message =
          error instanceof Error ? error.message : "Failed to load waitlist";
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
      const message =
        error instanceof Error ? error.message : "Failed to save changes";
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (waitlist?.content) handleSave(waitlist.content);
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setShowShortcuts(true);
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [waitlist]);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="bg-white border-b animate-pulse">
          <div className="h-16" />
        </div>
        <div className="flex-1 flex p-8 space-x-8">
          <div className="flex-1">
            <div className="h-24 bg-white rounded-lg animate-pulse mb-4" />
            <div className="h-48 bg-white rounded-lg animate-pulse mb-4" />
            <div className="h-64 bg-white rounded-lg animate-pulse" />
          </div>
          <div className="w-80 bg-white animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link
            href={`/dashboard/waitlists/${id}`}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Waitlist
          </Link>
        </div>
      </div>
    );
  }

  if (!waitlist) return null;

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
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
                      Last saved{" "}
                      {formatDistanceToNow(saveState.lastSaved, {
                        addSuffix: true,
                      })}
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

                <Link
                  href={`/dashboard/waitlists/${id}/edit`}
                  className="text-[#a47764] hover:text-[#a47764]/90 font-medium"
                >
                  Switch to Simple Editor
                </Link>

                <button
                  onClick={handleExit}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden pt-8">
          <main className="flex-1 overflow-y-auto pr-8">
            <div className="max-w-7xl mx-auto">
              <TemplateBuilder
                initialContent={waitlist.content}
                onSave={handleSave}
                onChange={handleContentUpdate}
              />
            </div>
          </main>

          {/* Preview Panel */}
          <aside className="hidden lg:block w-96 border-l bg-white overflow-y-auto p-6">
            {/* <div className="p-8"> */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Preview</h3>
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-[#a47764] cursor-pointer">
                Live
              </span>
            </div>
            <div className="w-full aspect-[9/16] bg-gray-50 rounded-lg overflow-hidden">
              {!previewLoading ? (
                <div className="w-full h-full animate-pulse" />
              ) : (
                <iframe
                  ref={iframeRef}
                  src={`/api/preview/${id}`}
                  className="w-full h-full border-0"
                  title="Page preview"
                />
              )}
            </div>
            {/* </div> */}
          </aside>
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

      {showShortcuts && (
        <ShortcutsDialog onClose={() => setShowShortcuts(false)} />
      )}

      {/* Save indicator */}
      {saveState.status === "saving" && (
        <div className="fixed bottom-4 left-4 z-50 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm flex items-center gap-2">
          <Save className="w-3 h-3 animate-spin" />
          <span>Saving...</span>
        </div>
      )}
    </>
  );
}

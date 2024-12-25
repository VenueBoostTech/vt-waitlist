// components/dialogs/ExitDialog.tsx
interface ExitDialogProps {
    onCancel: () => void
    onConfirm: () => void
  }
  
  export function ExitDialog({ onCancel, onConfirm }: ExitDialogProps) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Unsaved Changes
          </h3>
          <p className="text-gray-500 mb-6">
            You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Leave anyway
            </button>
          </div>
        </div>
      </div>
    )
  }
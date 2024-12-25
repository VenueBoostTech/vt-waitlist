// components/ui/Toast.tsx
import { XIcon, CheckCircle, AlertCircle, Save } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  id: string
  type: ToastType
  message: string
  onClose: (id: string) => void
}

export function Toast({ id, type, message, onClose }: ToastProps) {
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-600 border-green-200'
      case 'error':
        return 'bg-red-50 text-red-600 border-red-200'
      case 'info':
        return 'bg-blue-50 text-blue-600 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      case 'info':
        return <Save className="w-5 h-5 animate-spin" />
    }
  }

  return (
    <div
      className={`
        px-4 py-3 rounded-lg shadow-lg flex items-center gap-3
        transition-all duration-300 border
        ${getToastStyles()}
      `}
    >
      {getIcon()}
      <span className="font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-auto hover:opacity-75"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, onClose }: {
  toasts: Array<{ id: string; type: ToastType; message: string }>
  onClose: (id: string) => void
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}
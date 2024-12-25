// hooks/useSaveState.ts
import { useState, useRef, useCallback } from 'react'
import { ToastType } from '../components/ui/toast'

interface SaveState {
  status: 'idle' | 'saving' | 'success' | 'error'
  message?: string
  timestamp?: Date
}

interface Toast {
  id: string
  type: ToastType
  message: string
}

export function useSaveState() {
  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' })
  const [toasts, setToasts] = useState<Toast[]>([])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout>()

  const addToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, type, message }])

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const setSaving = useCallback(() => {
    setSaveState({ status: 'saving', timestamp: new Date() })
    addToast('info', 'Saving changes...', 2000)
  }, [addToast])

  const setSuccess = useCallback((message: string) => {
    const now = new Date()
    setSaveState({ status: 'success', message, timestamp: now })
    setLastSaved(now)
    addToast('success', message)

    setTimeout(() => {
      setSaveState({ status: 'idle' })
    }, 1500)
  }, [addToast])

  const setError = useCallback((message: string) => {
    setSaveState({ status: 'error', message, timestamp: new Date() })
    addToast('error', message, 5000)
  }, [addToast])

  return {
    saveState,
    toasts,
    lastSaved,
    setSaving,
    setSuccess,
    setError,
    removeToast
  }
}
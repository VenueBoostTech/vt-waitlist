// components/ui/Toast.tsx
import { useEffect } from 'react';
import { XCircle, CheckCircle, Info } from 'lucide-react';
import { ToastType } from '@/hooks/useToast';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onRemove: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />
};

const backgrounds = {
  success: 'bg-green-50',
  error: 'bg-red-50',
  info: 'bg-blue-50'
};

export function Toast({ id, type, message, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`${backgrounds[type]} p-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
      {icons[type]}
      <p className="text-gray-900">{message}</p>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }: { toasts: any[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
import { useState } from 'react';
import { Toast } from 'src/components/CMS/Common/Toast/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'success', duration: number = 3000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts([...toasts, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
};


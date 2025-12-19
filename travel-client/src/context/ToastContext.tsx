import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import ToastContainer from 'src/components/CMS/Common/ToastContainer/ToastContainer';
import { Toast } from 'src/components/CMS/Common/Toast/Toast';

interface ToastContextValue {
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useAppToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useAppToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success', duration: number = 3000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};


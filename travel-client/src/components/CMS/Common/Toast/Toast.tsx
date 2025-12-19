import React, { useEffect } from 'react';
import './Toast.scss';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-xmark-circle';
      case 'warning':
        return 'fa-triangle-exclamation';
      default:
        return 'fa-info-circle';
    }
  };

  return (
    <div className={`toast toast--${toast.type} toast--show`}>
      <div className="toast__icon">
        <i className={`fa-solid ${getIcon()}`}></i>
      </div>
      <div className="toast__content">
        <p className="toast__message">{toast.message}</p>
      </div>
      <button className="toast__close" onClick={() => onRemove(toast.id)}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Toast;


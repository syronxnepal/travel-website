import React, { useEffect } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
  showCloseButton = true
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className={`modal__content modal__content--${size} ${className}`}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          {showCloseButton && (
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          )}
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

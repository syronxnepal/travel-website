import React from 'react';
import './DeleteConfirmation.scss';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  type?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  type = 'item'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="delete-confirmation-overlay" onClick={onClose}>
      <div className="delete-confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-confirmation-modal__icon">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h3 className="delete-confirmation-modal__title">{title}</h3>
        <p className="delete-confirmation-modal__message">{message}</p>
        {itemName && (
          <div className="delete-confirmation-modal__item">
            <i className="fa-solid fa-arrow-right"></i>
            <span className="delete-confirmation-modal__item-name">{itemName}</span>
          </div>
        )}
        <p className="delete-confirmation-modal__warning">
          This action cannot be undone.
        </p>
        <div className="delete-confirmation-modal__actions">
          <button className="btn btn-secondary" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirm}>
            <i className="fa-solid fa-trash"></i>
            Delete {type}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;


import './DeleteConfirmationModal.css'

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title = 'Delete Item', message = 'Are you sure you want to delete this item? This action cannot be undone.', loading }) {
  if (!isOpen) return null

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-modal">
        <div className="delete-confirmation-modal__icon">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="delete-confirmation-modal__actions">
          <button className="btn btn--outline" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal

import { useEffect } from 'react'
import './Modal.css'

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`modal modal--${size}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__content">
        <div className="modal__header">
          {title && <h3 className="modal__title">{title}</h3>}
          <button className="modal__close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}

export default Modal

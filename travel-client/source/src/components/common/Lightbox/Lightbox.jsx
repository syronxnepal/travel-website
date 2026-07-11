import { useEffect } from 'react'
import { getImageUrl } from '../../../utils/helpers'
import './Lightbox.css'

// Full-screen image viewer with prev/next navigation (click, arrow buttons,
// or left/right/escape keys). `images` is the full list being browsed;
// `index` is which one is open (null/undefined = closed).
function Lightbox({ images, index, onClose, onNavigate }) {
  const isOpen = index !== null && index !== undefined

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, index, images, onClose, onNavigate])

  if (!isOpen) return null

  const item = images[index]
  const hasMultiple = images.length > 1

  function goPrev(e) {
    e.stopPropagation()
    onNavigate((index - 1 + images.length) % images.length)
  }

  function goNext(e) {
    e.stopPropagation()
    onNavigate((index + 1) % images.length)
  }

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <i className="fa-solid fa-xmark"></i>
      </button>

      {hasMultiple && (
        <button className="lightbox__nav lightbox__nav--prev" onClick={goPrev} aria-label="Previous image">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      )}

      <img
        src={getImageUrl(item.image || item.url)}
        alt={item.title || item.caption || ''}
        className="lightbox__img"
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple && (
        <button className="lightbox__nav lightbox__nav--next" onClick={goNext} aria-label="Next image">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      )}

      <div className="lightbox__footer">
        {item.title && <p className="lightbox__caption">{item.title}</p>}
        {hasMultiple && <span className="lightbox__count">{index + 1} / {images.length}</span>}
      </div>
    </div>
  )
}

export default Lightbox

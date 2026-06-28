import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../../context/WishlistContext'
import { getImageUrl } from '../../../utils/helpers'
import './WishlistPanel.css'

const TYPE_LABELS = { trek: 'Trek', tour: 'Tour', shortTour: 'Short Tour', blog: 'Blog' }
const TYPE_PATHS = { trek: '/trekking', tour: '/tours', shortTour: '/short-tours', blog: '/blogs' }

function WishlistPanel({ onClose }) {
  const { wishlist, removeFromWishlist, toggleWishlist } = useWishlist()
  const navigate = useNavigate()

  function goToItem(item) {
    const id = item._id || item.id
    const path = `${TYPE_PATHS[item.type] || '/trekking'}/${id}`
    onClose()
    navigate(path)
  }

  function viewAll() {
    onClose()
    navigate('/wishlist')
  }

  function clearAll() {
    wishlist.forEach((item) => removeFromWishlist(item.id, item.type))
  }

  return (
    <div className="wl-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="wl-panel">
        <div className="wl-panel__header">
          <div className="wl-panel__title">
            <i className="fa-solid fa-heart"></i>
            <span>My Wishlist</span>
            <em>({wishlist.length})</em>
          </div>
          <button className="wl-panel__close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="wl-panel__body">
          {wishlist.length === 0 ? (
            <div className="wl-panel__empty">
              <i className="fa-regular fa-heart"></i>
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={`${item.type}-${item.id}`} className="wl-item">
                <button className="wl-item__remove" onClick={() => removeFromWishlist(item.id, item.type)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>

                <button className="wl-item__img-btn" onClick={() => goToItem(item)}>
                  {item.image
                    ? <img src={getImageUrl(item.image)} alt={item.title} />
                    : <div className="wl-item__img-placeholder"><i className="fa-solid fa-image"></i></div>
                  }
                  {item.type && (
                    <span className={`wl-item__badge wl-item__badge--${item.type}`}>
                      {TYPE_LABELS[item.type] || item.type}
                    </span>
                  )}
                </button>

                <div className="wl-item__body">
                  <button className="wl-item__title" onClick={() => goToItem(item)}>
                    {item.title}
                  </button>
                  {item.location && (
                    <div className="wl-item__location">
                      <i className="fa-solid fa-location-dot"></i> {item.location}
                    </div>
                  )}
                  {item.price && (
                    <div className="wl-item__price">
                      {item.originalPrice && item.originalPrice !== item.price && (
                        <span className="wl-item__price-original">${item.originalPrice}</span>
                      )}
                      <span className="wl-item__price-current">${Number(item.price).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="wl-panel__footer">
            <button className="wl-panel__clear" onClick={clearAll}>
              <i className="fa-solid fa-trash"></i> Clear All
            </button>
            <button className="wl-panel__view-all" onClick={viewAll}>
              View All Items
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPanel

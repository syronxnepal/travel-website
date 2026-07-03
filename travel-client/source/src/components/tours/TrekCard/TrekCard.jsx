import { Link } from 'react-router-dom'
import { useWishlist } from '../../../context/WishlistContext'
import { getImageUrl } from '../../../utils/helpers'
import './TrekCard.css'

function TrekCard({ trek }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const itemId = trek._id || trek.id
  const isWishlisted = isInWishlist(itemId, 'trek')
  const isRealItem = /^\d+$/.test(String(itemId))

  function handleWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({ id: itemId, type: 'trek', title: trek.title, image: trek.image, price: trek.price })
  }

  return (
    <Link to={isRealItem ? `/trekking/${itemId}` : '/trekking'} className="trek-card">
      <img
        src={getImageUrl(trek.image) || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'}
        alt={trek.title}
        className="trek-card__image"
        loading="lazy"
      />
      <div className="trek-card__overlay" />

      <button className={`trek-card__wishlist${isWishlisted ? ' trek-card__wishlist--active' : ''}`} onClick={handleWishlist}>
        <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart`}></i>
      </button>

      <div className="trek-card__info">
        <h3 className="trek-card__title">{trek.title}</h3>
        <div className="trek-card__meta">
          {trek.duration && (
            <span className="trek-card__duration">
              <i className="fa-regular fa-clock"></i> {trek.duration}
            </span>
          )}
          {trek.price && (
            <span className="trek-card__price">{Number(trek.price).toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default TrekCard

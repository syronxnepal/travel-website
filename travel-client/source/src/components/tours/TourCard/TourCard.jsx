import { Link } from 'react-router-dom'
import { useWishlist } from '../../../context/WishlistContext'
import { getImageUrl, truncate } from '../../../utils/helpers'
import './TourCard.css'

function StarRating({ value = 0, count }) {
  const stars = Math.round(value)
  return (
    <span className="tour-card__stars">
      {[1,2,3,4,5].map((i) => (
        <i key={i} className={`fa-${i <= stars ? 'solid' : 'regular'} fa-star`}></i>
      ))}
      {count !== undefined && <span className="tour-card__rating-count"> {value} ({count})</span>}
    </span>
  )
}

function TourCard({ tour, type = 'tour' }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const itemId = tour._id || tour.id
  const isWishlisted = isInWishlist(itemId, type)

  const detailPath =
    type === 'trek' ? `/trekking/${itemId}` :
    type === 'short-tour' ? `/short-tour/${itemId}` :
    `/tour/${itemId}`

  function handleWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({ id: itemId, type, title: tour.title, image: tour.image, price: tour.price })
  }

  return (
    <Link to={detailPath} className="tour-card">
      <div className="tour-card__image-wrap">
        <img
          src={getImageUrl(tour.image) || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=280&fit=crop'}
          alt={tour.title}
          className="tour-card__image"
          loading="lazy"
        />
        <button className={`tour-card__wishlist${isWishlisted ? ' tour-card__wishlist--active' : ''}`} onClick={handleWishlist}>
          <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>

      <div className="tour-card__body">
        <div className="tour-card__meta-row">
          {tour.location && (
            <span className="tour-card__meta-item tour-card__meta-item--location">
              <span className="tour-card__dot tour-card__dot--red"></span>
              {tour.location}
            </span>
          )}
          {(tour.duration || tour.nights) && (
            <span className="tour-card__meta-item tour-card__meta-item--duration">
              <span className="tour-card__dot tour-card__dot--orange"></span>
              {tour.duration || tour.nights}
            </span>
          )}
        </div>

        <h3 className="tour-card__title">{tour.title}</h3>

        <div className="tour-card__footer">
          <StarRating value={tour.rating || 4.5} count={tour.reviewCount} />
          {tour.price && (
            <span className="tour-card__price">
              From <strong>{Number(tour.price).toLocaleString()}</strong>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default TourCard

import React from 'react';
import { Link } from 'react-router-dom';
import './WishlistSlider.scss';

interface WishlistItem {
  id: string;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  image: string;
  type: 'trek' | 'tour' | 'short-tour';
  duration: string;
  rating: number;
  reviewCount: number;
}

interface WishlistSliderProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: WishlistItem[];
  onRemoveItem: (id: string) => void;
}

const WishlistSlider: React.FC<WishlistSliderProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem
}) => {
  const getItemPath = (type: string, id: string) => {
    switch (type) {
      case 'trek':
        return `/trekking/${id}`;
      case 'tour':
        return `/tour/${id}`;
      case 'short-tour':
        return `/short-tour/${id}`;
      default:
        return '/';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'trek':
        return 'Trek';
      case 'tour':
        return 'Tour';
      case 'short-tour':
        return 'Short Tour';
      default:
        return 'Item';
    }
  };


  return (
    <>
      {/* Backdrop */}
      <div 
        className={`wishlist-slider__backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className={`wishlist-slider ${isOpen ? 'active' : ''}`}>
        <div className="wishlist-slider__header">
          <h3 className="wishlist-slider__title">
            <i className="fa-solid fa-heart"></i>
            My Wishlist
            <span className="wishlist-slider__count">({wishlistItems.length})</span>
          </h3>
          <button 
            className="wishlist-slider__close"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="wishlist-slider__content">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-slider__empty">
              <i className="fa-solid fa-heart-broken"></i>
              <h4>Your wishlist is empty</h4>
              <p>Start adding items to your wishlist to see them here</p>
              <Link to="/tours" className="wishlist-slider__explore-btn" onClick={onClose}>
                Explore Tours
              </Link>
            </div>
          ) : (
            <div className="wishlist-slider__items">
              {wishlistItems.map((item) => (
                <Link 
                  key={item.id} 
                  to={getItemPath(item.type, item.id)}
                  className="wishlist-slider__item"
                  onClick={onClose}
                >
                  <div className="wishlist-slider__item-image">
                    <img src={item.image} alt={item.title} />
                    <div className="wishlist-slider__item-type">
                      {getTypeLabel(item.type)}
                    </div>
                    <button
                      className="wishlist-slider__item-remove"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      aria-label={`Remove ${item.title} from wishlist`}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="wishlist-slider__item-content">
                    <h4 className="wishlist-slider__item-title">{item.title}</h4>
                    <p className="wishlist-slider__item-location">
                      <i className="fa-solid fa-location-dot"></i>
                      {item.location}
                    </p>
                    
                    <div className="wishlist-slider__item-price">
                      <span className="wishlist-slider__price-current">{item.price}</span>
                      {item.originalPrice && (
                        <span className="wishlist-slider__price-original">{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="wishlist-slider__footer">
            <button className="wishlist-slider__clear-btn">
              <i className="fa-solid fa-trash"></i>
              Clear All
            </button>
            <Link to="/wishlist" className="wishlist-slider__view-all-btn" onClick={onClose}>
              View All Items
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistSlider;

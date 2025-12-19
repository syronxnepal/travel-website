import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TourCard.scss';

interface TourCardProps {
  tour: {
    id: number;
    title: string;
    location: string;
    duration: string;
    rating: number;
    reviewCount: number;
    price: string;
    image: string;
    category: string;
    description?: string;
  };
  isShortTour?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({ tour, isShortTour = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="fa-solid fa-star active"></i>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fa-solid fa-star-half-stroke active"></i>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="fa-regular fa-star"></i>
      );
    }

    return stars;
  };

        return (
            <Link to={isShortTour ? `/short-tour/${tour.id}` : `/tour/${tour.id}`} className="tour-card">
      <div className="tour-card__image">
        <img src={tour.image} alt={tour.title} />
        <button 
          className={`tour-card__favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>
      
      <div className="tour-card__content">
        <div className="tour-card__top">
        <div className="tour-card__location">
          <i className="fa-solid fa-location-dot"></i>
          <span>{tour.location}</span>
        </div>
        
        <div className="tour-card__duration">
          <i className="fa-solid fa-clock"></i>
          <span>{tour.duration}</span>
        </div>
        </div>
        
        <h3 className="tour-card__title">{tour.title}</h3>
{/*         
        {tour.description && (
          <p className="tour-card__description">{tour.description}</p>
        )} */}
        <div className="tour-card__bottom">
        
        <div className="tour-card__rating">
          <div className="tour-card__stars">
            {renderStars(tour.rating)}
          </div>
          <span className="tour-card__rating-text">
            {tour.rating} ({tour.reviewCount})
          </span>
        </div>
        
        <div className="tour-card__price">
          From {tour.price}
        </div>
          
        </div>
      </div>
    </Link>
  );
};

export default TourCard;

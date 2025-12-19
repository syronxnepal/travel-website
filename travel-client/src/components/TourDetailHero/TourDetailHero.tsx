import React from 'react';
import { Link } from 'react-router-dom';
import './TourDetailHero.scss';

interface Tour {
  id: number;
  image: string;
  location: string;
  duration: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
  category: string;
  description: string;
  highlights: string[];
}

interface Props {
  tour: Tour;
}

const TourDetailHero: React.FC<Props> = ({ tour }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fa-solid fa-star active"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fa-solid fa-star-half-stroke active"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className="tour-detail-hero">
      <div className="tour-detail-hero__image">
        <img src={tour.image} alt={tour.title} />
        <div className="tour-detail-hero__overlay">
          <div className="tour-detail-hero__breadcrumb">
            <Link to="/tours" className="tour-detail-hero__breadcrumb-link">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Tours
            </Link>
          </div>
        </div>
      </div>

      <div className="tour-detail-hero__content">
        <div className="container">
          <div className="tour-detail-hero__info">
            <div className="tour-detail-hero__category">
              <i className="fa-solid fa-tag"></i>
              {tour.category}
            </div>
            
            <h1 className="tour-detail-hero__title">{tour.title}</h1>
            
            <div className="tour-detail-hero__location">
              <i className="fa-solid fa-location-dot"></i>
              {tour.location}
            </div>

            <div className="tour-detail-hero__meta">
              <div className="tour-detail-hero__rating">
                <div className="tour-detail-hero__stars">
                  {renderStars(tour.rating)}
                </div>
                <span className="tour-detail-hero__rating-text">
                  {tour.rating} ({tour.reviewCount} reviews)
                </span>
              </div>

              <div className="tour-detail-hero__duration">
                <i className="fa-solid fa-clock"></i>
                {tour.duration}
              </div>
            </div>

            <div className="tour-detail-hero__highlights">
              <h3>Key Highlights</h3>
              <ul>
                {tour.highlights.map((highlight, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-check"></i>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tour-detail-hero__price">
              <span className="tour-detail-hero__price-label">Starting from</span>
              <span className="tour-detail-hero__price-value">{tour.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailHero;

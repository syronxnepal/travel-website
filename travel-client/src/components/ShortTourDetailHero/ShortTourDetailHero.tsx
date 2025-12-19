import React from 'react';
import { Link } from 'react-router-dom';
import './ShortTourDetailHero.scss';

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

const ShortTourDetailHero: React.FC<Props> = ({ tour }) => {

  return (
    <div className="short-tour-detail-hero">
      <div className="short-tour-detail-hero__image">
        <img src={tour.image} alt={tour.title} />
        <div className="short-tour-detail-hero__overlay">
          <div className="short-tour-detail-hero__breadcrumb">
            <Link to="/short-tours" className="short-tour-detail-hero__breadcrumb-link">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Short Tours
            </Link>
          </div>
        </div>
      </div>

      <div className="short-tour-detail-hero__content">
        <div className="container">
          <div className="short-tour-detail-hero__info">
            <div className="short-tour-detail-hero__badges">
              <div className="short-tour-detail-hero__badge short-tour-detail-hero__badge--category">
                <i className="fa-solid fa-tag"></i>
                {tour.category}
              </div>
              <div className="short-tour-detail-hero__badge short-tour-detail-hero__badge--duration">
                <i className="fa-solid fa-clock"></i>
                {tour.duration}
              </div>
              <div className="short-tour-detail-hero__badge short-tour-detail-hero__badge--rating">
                <i className="fa-solid fa-star"></i>
                {tour.rating}
              </div>
            </div>
            
            <h1 className="short-tour-detail-hero__title">{tour.title}</h1>
            
            <div className="short-tour-detail-hero__location">
              <i className="fa-solid fa-map-marker-alt"></i>
              {tour.location}
            </div>

            <div className="short-tour-detail-hero__description">
              <p>{tour.description}</p>
            </div>

            <div className="short-tour-detail-hero__highlights">
              <h3>Quick Highlights</h3>
              <div className="short-tour-detail-hero__highlights-grid">
                {tour.highlights.slice(0, 4).map((highlight, index) => (
                  <div key={index} className="short-tour-detail-hero__highlight">
                    <i className="fa-solid fa-check"></i>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="short-tour-detail-hero__price">
              <div className="short-tour-detail-hero__price-main">
                <span className="short-tour-detail-hero__price-value">{tour.price}</span>
                <span className="short-tour-detail-hero__price-unit">per person</span>
              </div>
              <div className="short-tour-detail-hero__price-details">
                <span>Instant confirmation</span>
                <span>Free cancellation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortTourDetailHero;

import React from 'react';
import './DetailHero.scss';

interface DetailHeroProps {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  duration: string;
  difficulty: string;
  price: string;
  originalPrice?: string | null;
  discount?: string | null;
  image: string;
  category?: string;
  type: 'tour' | 'short-tour' | 'trek';
}

const DetailHero: React.FC<DetailHeroProps> = ({
  title,
  location,
  rating,
  reviewCount,
  duration,
  difficulty,
  price,
  originalPrice,
  discount,
  image,
  category,
  type,
}) => {
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


  const getTypeIcon = () => {
    switch (type) {
      case 'trek':
        return 'fa-mountain';
      case 'tour':
        return 'fa-map-marked-alt';
      case 'short-tour':
        return 'fa-clock';
      default:
        return 'fa-map';
    }
  };

  return (
    <div className="detail-hero">
      <div className="detail-hero__image">
        <img src={image} alt={title} />
        <div className="detail-hero__overlay">

        </div>
      </div>

      <div className="detail-hero__content">
        <div className="container">
        
          <div className="detail-hero__breadcrumb">
            <span>Home</span>
            <span className="detail-hero__separator">/</span>
            <span>Trekking</span>
            <span className="detail-hero__separator ">/</span>
            <span className="detail-hero__bread-title">Annapurna Circuit Trek</span>
            </div>
          <div className="detail-hero__info">
            <div className="detail-hero__badges">
              {category && (
                <div className="detail-hero__badge detail-hero__badge--category">
                  <i className="fa-solid fa-tag"></i>
                  {category}
                </div>
              )}
              <div className="detail-hero__badge detail-hero__badge--type">
                <i className={`fa-solid ${getTypeIcon()}`}></i>
                {type === 'short-tour' ? 'Short Tour' : type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            </div>

            <h1 className="detail-hero__title">{title}</h1>

            <div className="detail-hero__location">
              <i className="fa-solid fa-location-dot"></i>
              {location}
            </div>

            <div className="detail-hero__meta">
              <div className="detail-hero__rating">
                <div className="detail-hero__stars">
                  {renderStars(rating)}
                </div>
                <span className="detail-hero__rating-text">
                  {rating} ({reviewCount} reviews)
                </span>
              </div>

              <div className="detail-hero__duration">
                <i className="fa-solid fa-clock"></i>
                {duration}
              </div>

              <div className="detail-hero__difficulty">
                <i className="fa-solid fa-signal"></i>
                {difficulty}
              </div>
            </div>

            <div className="detail-hero__price">
              <div className="detail-hero__price-main">
                <span className="detail-hero__price-value">{price}</span>
                {originalPrice && (
                  <span className="detail-hero__price-original">{originalPrice}</span>
                )}
                {discount && (
                  <span className="detail-hero__discount">{discount} OFF</span>
                )}
              </div>
              <div className="detail-hero__price-details">
                <span>per person</span>
                <span>Instant confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHero;

import React from 'react';
import './TrekDetailHero.scss';

interface TrekDetailHeroProps {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  duration: string;
  difficulty: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image?: string;
}

const TrekDetailHero: React.FC<TrekDetailHeroProps> = ({
  image,
  title,
  location,
  // rating,
  // reviewCount,
  // duration,
  // difficulty,
  // price,
  // originalPrice,
  // discount
}) => {
  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <svg key={i} className="trek-detail-hero__star trek-detail-hero__star--filled" viewBox="0 0 24 24">
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  //       </svg>
  //     );
  //   }

  //   if (hasHalfStar) {
  //     stars.push(
  //       <svg key="half" className="trek-detail-hero__star trek-detail-hero__star--half" viewBox="0 0 24 24">
  //         <defs>
  //           <linearGradient id="half-star">
  //             <stop offset="50%" stopColor="currentColor"/>
  //             <stop offset="50%" stopColor="transparent"/>
  //           </linearGradient>
  //         </defs>
  //         <path fill="url(#half-star)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  //       </svg>
  //     );
  //   }

  //   const emptyStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(
  //       <svg key={`empty-${i}`} className="trek-detail-hero__star trek-detail-hero__star--empty" viewBox="0 0 24 24">
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  //       </svg>
  //     );
  //   }

  //   return stars;
  // };

  return (
    <div className="trek-detail-hero" style={{backgroundImage: `url(${image})`}}>
      <div className="trek-detail-hero__container">
        <div className="trek-detail-hero__breadcrumb">
          <span>Home</span>
          <span className="trek-detail-hero__separator">/</span>
          <span>Trekking</span>
          <span className="trek-detail-hero__separator ">/</span>
          <span className='breadcrumb-title'>{title}</span>
        </div>

        <div className="trek-detail-hero__content">
          <div className="trek-detail-hero__main">
            <h1 className="trek-detail-hero__title">{title}</h1>
            
            <div className="trek-detail-hero__meta">
              {/* <div className="trek-detail-hero__rating">
                <div className="trek-detail-hero__stars">
                  {renderStars(rating)}
                </div>
                <span className="trek-detail-hero__rating-text">{rating}</span>
                <span className="trek-detail-hero__review-count">({reviewCount} reviews)</span>
              </div> */}
              
              <div className="trek-detail-hero__location">
                <svg className="trek-detail-hero__location-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>{location}</span>
              </div>
            </div>

            {/* <div className="trek-detail-hero__stats">
              <div className="trek-detail-hero__stat">
                <svg className="trek-detail-hero__stat-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="trek-detail-hero__stat-label">Duration</span>
                <span className="trek-detail-hero__stat-value">{duration}</span>
              </div>
              
              <div className="trek-detail-hero__stat">
                <svg className="trek-detail-hero__stat-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="trek-detail-hero__stat-label">Difficulty</span>
                <span className="trek-detail-hero__stat-value">{difficulty}</span>
              </div>
              
              <div className="trek-detail-hero__stat">
                <svg className="trek-detail-hero__stat-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="trek-detail-hero__stat-label">Group Size</span>
                <span className="trek-detail-hero__stat-value">2-12</span>
              </div>
            </div> */}
          </div>

          <div className="trek-detail-hero__right">
            <div className="right-box">
              <div className="icon">
                <i className="fa-solid fa-clock"></i>
              </div>
                <div className="details">
                  <div className="title">Duration</div>
                  <div className="info">4 Hours</div>
                </div>
            </div>
              <div className="right-box">
              <div className="icon">
                                <i className="fa-solid fa-clock"></i>

              </div>
                <div className="details">
                  <div className="title">Group Size</div>
                  <div className="info">4- 8</div>
                </div>
            </div>
              <div className="right-box">
              <div className="icon">
                                <i className="fa-solid fa-clock"></i>

              </div>
                <div className="details">
                  <div className="title">TOur Type</div>
                  <div className="info">Medium</div>
                </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetailHero;

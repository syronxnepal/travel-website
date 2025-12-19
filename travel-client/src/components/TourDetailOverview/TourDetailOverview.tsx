import React from 'react';
import './TourDetailOverview.scss';

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

const TourDetailOverview: React.FC<Props> = ({ tour }) => {
  return (
    <div className="tour-detail-overview">
      <div className="tour-detail-overview__header">
        <h2 className="tour-detail-overview__title">Tour Overview</h2>
        <div className="tour-detail-overview__badge">
          <i className="fa-solid fa-star"></i>
          <span>Featured Tour</span>
        </div>
      </div>

      <div className="tour-detail-overview__content">
        <div className="tour-detail-overview__description">
          <p>{tour.description}</p>
        </div>

        <div className="tour-detail-overview__features">
          <div className="tour-detail-overview__feature">
            <div className="tour-detail-overview__feature-icon">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div className="tour-detail-overview__feature-content">
              <h4>Duration</h4>
              <p>{tour.duration}</p>
            </div>
          </div>

          <div className="tour-detail-overview__feature">
            <div className="tour-detail-overview__feature-icon">
              <i className="fa-solid fa-map-marker-alt"></i>
            </div>
            <div className="tour-detail-overview__feature-content">
              <h4>Location</h4>
              <p>{tour.location}</p>
            </div>
          </div>

          <div className="tour-detail-overview__feature">
            <div className="tour-detail-overview__feature-icon">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="tour-detail-overview__feature-content">
              <h4>Group Size</h4>
              <p>Small groups (max 12 people)</p>
            </div>
          </div>

          <div className="tour-detail-overview__feature">
            <div className="tour-detail-overview__feature-icon">
              <i className="fa-solid fa-signal"></i>
            </div>
            <div className="tour-detail-overview__feature-content">
              <h4>Difficulty</h4>
              <p>Easy to Moderate</p>
            </div>
          </div>
        </div>

        <div className="tour-detail-overview__highlights">
          <h3>What's Included</h3>
          <div className="tour-detail-overview__highlights-grid">
            <div className="tour-detail-overview__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Professional English-speaking guide</span>
            </div>
            <div className="tour-detail-overview__highlight">
              <i className="fa-solid fa-check"></i>
              <span>All entrance fees and permits</span>
            </div>
            <div className="tour-detail-overview__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Transportation during the tour</span>
            </div>
            <div className="tour-detail-overview__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Lunch at local restaurant</span>
            </div>
            <div className="tour-detail-overview__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Hotel pickup and drop-off</span>
            </div>
            <div className="tour-detail-overview__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Small group experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailOverview;

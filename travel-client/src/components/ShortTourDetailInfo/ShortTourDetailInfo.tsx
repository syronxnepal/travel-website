import React from 'react';
import './ShortTourDetailInfo.scss';

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

const ShortTourDetailInfo: React.FC<Props> = ({ tour }) => {
  return (
    <div className="short-tour-detail-info">
      <div className="short-tour-detail-info__header">
        <h2 className="short-tour-detail-info__title">Tour Information</h2>
        <div className="short-tour-detail-info__badge">
          <i className="fa-solid fa-bolt"></i>
          <span>Quick Escape</span>
        </div>
      </div>

      <div className="short-tour-detail-info__content">
        <div className="short-tour-detail-info__description">
          <p>{tour.description}</p>
        </div>

        <div className="short-tour-detail-info__features">
          <div className="short-tour-detail-info__feature">
            <div className="short-tour-detail-info__feature-icon">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div className="short-tour-detail-info__feature-content">
              <h4>Duration</h4>
              <p>{tour.duration}</p>
            </div>
          </div>

          <div className="short-tour-detail-info__feature">
            <div className="short-tour-detail-info__feature-icon">
              <i className="fa-solid fa-map-marker-alt"></i>
            </div>
            <div className="short-tour-detail-info__feature-content">
              <h4>Location</h4>
              <p>{tour.location}</p>
            </div>
          </div>

          <div className="short-tour-detail-info__feature">
            <div className="short-tour-detail-info__feature-icon">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="short-tour-detail-info__feature-content">
              <h4>Group Size</h4>
              <p>Small groups (max 8 people)</p>
            </div>
          </div>

          <div className="short-tour-detail-info__feature">
            <div className="short-tour-detail-info__feature-icon">
              <i className="fa-solid fa-signal"></i>
            </div>
            <div className="short-tour-detail-info__feature-content">
              <h4>Difficulty</h4>
              <p>Easy</p>
            </div>
          </div>
        </div>

        <div className="short-tour-detail-info__highlights">
          <h3>What's Included</h3>
          <div className="short-tour-detail-info__highlights-grid">
            <div className="short-tour-detail-info__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Professional guide</span>
            </div>
            <div className="short-tour-detail-info__highlight">
              <i className="fa-solid fa-check"></i>
              <span>All entrance fees</span>
            </div>
            <div className="short-tour-detail-info__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Transportation</span>
            </div>
            <div className="short-tour-detail-info__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Snacks & water</span>
            </div>
            <div className="short-tour-detail-info__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Hotel pickup</span>
            </div>
            <div className="short-tour-detail-info__highlight">
              <i className="fa-solid fa-check"></i>
              <span>Small group experience</span>
            </div>
          </div>
        </div>

        <div className="short-tour-detail-info__schedule">
          <h3>Tour Schedule</h3>
          <div className="short-tour-detail-info__schedule-item">
            <div className="short-tour-detail-info__schedule-time">9:00 AM</div>
            <div className="short-tour-detail-info__schedule-content">
              <h4>Hotel Pickup</h4>
              <p>We'll pick you up from your hotel</p>
            </div>
          </div>
          <div className="short-tour-detail-info__schedule-item">
            <div className="short-tour-detail-info__schedule-time">9:30 AM</div>
            <div className="short-tour-detail-info__schedule-content">
              <h4>First Stop</h4>
              <p>Visit the main attraction</p>
            </div>
          </div>
          <div className="short-tour-detail-info__schedule-item">
            <div className="short-tour-detail-info__schedule-time">11:00 AM</div>
            <div className="short-tour-detail-info__schedule-content">
              <h4>Second Stop</h4>
              <p>Explore local culture</p>
            </div>
          </div>
          <div className="short-tour-detail-info__schedule-item">
            <div className="short-tour-detail-info__schedule-time">12:30 PM</div>
            <div className="short-tour-detail-info__schedule-content">
              <h4>Lunch Break</h4>
              <p>Enjoy local cuisine</p>
            </div>
          </div>
          <div className="short-tour-detail-info__schedule-item">
            <div className="short-tour-detail-info__schedule-time">2:00 PM</div>
            <div className="short-tour-detail-info__schedule-content">
              <h4>Final Stop</h4>
              <p>Last attraction visit</p>
            </div>
          </div>
          <div className="short-tour-detail-info__schedule-item">
            <div className="short-tour-detail-info__schedule-time">3:00 PM</div>
            <div className="short-tour-detail-info__schedule-content">
              <h4>Hotel Drop-off</h4>
              <p>Return to your hotel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortTourDetailInfo;

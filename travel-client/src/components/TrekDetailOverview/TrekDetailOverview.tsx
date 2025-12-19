import React from 'react';
import './TrekDetailOverview.scss';

interface TrekDetailOverviewProps {
  description: string;
  highlights: string[];
  included: string[];
  excluded: string[];
}

const TrekDetailOverview: React.FC<TrekDetailOverviewProps> = ({
  description,
  highlights,
  included,
  excluded
}) => {
  return (
    <div className="trek-detail-overview">
      <div className="trek-detail-overview__container">
        <div className="trek-detail-overview__main">
          <div className="trek-detail-overview__section">
            <h2 className="trek-detail-overview__title">Overview</h2>
            <div className="trek-detail-overview__description">
              {description}
            </div>
          </div>

          <div className="trek-detail-overview__section">
            <h3 className="trek-detail-overview__subtitle">Highlights</h3>
            <ul className="trek-detail-overview__highlights">
              {highlights.map((highlight, index) => (
                <li key={index} className="trek-detail-overview__highlight">
                  <svg className="trek-detail-overview__check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="trek-detail-overview__sidebar">
          <div className="trek-detail-overview__included">
            <h3 className="trek-detail-overview__subtitle">
              <svg className="trek-detail-overview__icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.3 0 2.52.28 3.64.8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              What's Included
            </h3>
            <ul className="trek-detail-overview__list">
              {included.map((item, index) => (
                <li key={index} className="trek-detail-overview__list-item">
                  <svg className="trek-detail-overview__check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="trek-detail-overview__excluded">
            <h3 className="trek-detail-overview__subtitle">
              <svg className="trek-detail-overview__icon" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              What's Not Included
            </h3>
            <ul className="trek-detail-overview__list">
              {excluded.map((item, index) => (
                <li key={index} className="trek-detail-overview__list-item">
                  <svg className="trek-detail-overview__cross-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetailOverview;

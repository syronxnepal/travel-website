import React from 'react';
import './DetailOverview.scss';

interface DetailOverviewProps {
  description: string;
  highlights: string[];
  included: string[];
  excluded: string[];
}

const DetailOverview: React.FC<DetailOverviewProps> = ({ 
  description, 
  highlights, 
  included, 
  excluded
}) => {
  return (
    <div className="detail-overview">
      <div className="detail-overview__container">
        <div className="detail-overview__left">
          <div className="detail-overview__card">
            <h2 className="detail-overview__title">Overview</h2>
            <p className="detail-overview__description">{description}</p>
          </div>

          <div className="detail-overview__card">
            <h2 className="detail-overview__title">Highlights</h2>
            <ul className="detail-overview__highlights">
              {highlights.map((highlight, index) => (
                <li key={index} className="detail-overview__highlight">
                  <i className="fa-solid fa-check detail-overview__check-icon"></i>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="detail-overview__right">
          <div className="detail-overview__card">
            <h2 className="detail-overview__title">
              <i className="fa-solid fa-check-circle detail-overview__title-icon"></i>
              What's Included
            </h2>
            <ul className="detail-overview__included">
              {included.map((item, index) => (
                <li key={index} className="detail-overview__included-item">
                  <i className="fa-solid fa-check detail-overview__check-icon"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-overview__card">
            <h2 className="detail-overview__title">
              <i className="fa-solid fa-times-circle detail-overview__title-icon"></i>
              What's Not Included
            </h2>
            <ul className="detail-overview__excluded">
              {excluded.map((item, index) => (
                <li key={index} className="detail-overview__excluded-item">
                  <i className="fa-solid fa-times detail-overview__times-icon"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOverview;
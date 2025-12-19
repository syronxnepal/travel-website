import React from 'react';
import './DetailInfo.scss';

interface DetailInfoProps {
  tourInfo: any;
  type: 'tour' | 'short-tour' | 'trek';
}

const DetailInfo: React.FC<DetailInfoProps> = ({ tourInfo, type }) => {
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


  // Default info items if tourInfo is empty
  const defaultInfo = [
    {
      icon: 'fa-users',
      title: 'Group Size',
      value: type === 'short-tour' ? 'Small groups (max 8 people)' : 'Small groups (max 12 people)'
    },
    {
      icon: 'fa-signal',
      title: 'Difficulty',
      value: type === 'trek' ? 'Moderate' : 'Easy'
    },
    {
      icon: 'fa-clock',
      title: 'Duration',
      value: type === 'short-tour' ? 'Half day' : 'Full day'
    },
    {
      icon: 'fa-calendar',
      title: 'Best Time',
      value: 'Year round'
    }
  ];

  const infoItems = tourInfo && Object.keys(tourInfo).length > 0 ? tourInfo : defaultInfo;

  return (
    <div className="detail-info">
      <div className="detail-info__header">
        <h2 className="detail-info__title">Tour Information</h2>
        <div className="detail-info__badge">
          <i className={`fa-solid ${getTypeIcon()}`}></i>
          <span>{type === 'short-tour' ? 'Quick Info' : 'Essential Info'}</span>
        </div>
      </div>

      <div className="detail-info__content">
        <div className="detail-info__features">
          {Array.isArray(infoItems) ? infoItems.map((item, index) => (
            <div key={index} className="detail-info__feature">
              <div className="detail-info__feature-icon">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <div className="detail-info__feature-content">
                <h4>{item.title}</h4>
                <p>{item.value}</p>
              </div>
            </div>
          )) : Object.entries(infoItems).map(([key, value], index) => (
            <div key={index} className="detail-info__feature">
              <div className="detail-info__feature-icon">
                <i className="fa-solid fa-info-circle"></i>
              </div>
              <div className="detail-info__feature-content">
                <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                <p>{String(value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;

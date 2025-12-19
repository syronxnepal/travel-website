import React from 'react';
import './TrekDetailInfo.scss';

interface TrekDetailInfoProps {
  tourInfo: {
    duration: string;
    difficulty: string;
    groupSize: string;
    maxAge: string;
    language: string[];
    paymentMethod: string[];
    transportation: string[];
    walkingHours: string;
    meals: string[];
    activities: string[];
    tourType: string;
    destination: string;
    roomLocation?: string;
    seatAvailability?: string;
    wifi?: string;
    guest?: string;
  };
}

const TrekDetailInfo: React.FC<TrekDetailInfoProps> = ({ tourInfo }) => {
  const infoItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Duration',
      value: tourInfo.duration
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Difficulty',
      value: tourInfo.difficulty
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Group Size',
      value: tourInfo.groupSize
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Max Age',
      value: tourInfo.maxAge
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2"/>
          <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2"/>
          <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Language',
      value: tourInfo.language.join(', ')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Payment Method',
      value: tourInfo.paymentMethod.join(', ')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M16 3h5v5" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 3H3v5" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 3l-8.828 7.828A4 4 0 0 0 11 13.7V22" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Transportation',
      value: tourInfo.transportation.join(', ')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3 8-8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.3 0 2.52.28 3.64.8" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Walking Hours',
      value: tourInfo.walkingHours
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2"/>
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Meals',
      value: tourInfo.meals.join(', ')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Activities',
      value: tourInfo.activities.join(', ')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Tour Type',
      value: tourInfo.tourType
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Destination',
      value: tourInfo.destination
    }
  ];

  // Add optional fields if they exist
  if (tourInfo.roomLocation) {
    infoItems.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Room Location',
      value: tourInfo.roomLocation
    });
  }

  if (tourInfo.seatAvailability) {
    infoItems.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Seat Availability',
      value: tourInfo.seatAvailability
    });
  }

  if (tourInfo.wifi) {
    infoItems.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="2"/>
          <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="2"/>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="20" x2="12.01" y2="20" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'WiFi',
      value: tourInfo.wifi
    });
  }

  if (tourInfo.guest) {
    infoItems.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Guest',
      value: tourInfo.guest
    });
  }

  return (
    <div className="trek-detail-info">
      <div className="trek-detail-info__container">
        <h2 className="trek-detail-info__title">Tour Information</h2>
        <div className="trek-detail-info__grid">
          {infoItems.map((item, index) => (
            <div key={index} className="trek-detail-info__item">
              <div className="trek-detail-info__icon">
                {item.icon}
              </div>
              <div className="trek-detail-info__content">
                <span className="trek-detail-info__label">{item.label}</span>
                <span className="trek-detail-info__value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrekDetailInfo;

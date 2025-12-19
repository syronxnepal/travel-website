import React, { useState } from 'react';
import './TrekDetailItinerary.scss';

interface DayPlan {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation?: string;
  highlights?: string[];
}

interface TrekDetailItineraryProps {
  itinerary: DayPlan[];
  title?: string;
}

const TrekDetailItinerary: React.FC<TrekDetailItineraryProps> = ({ 
  itinerary, 
  title = "Tour Plan" 
}) => {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [expandAll, setExpandAll] = useState(false);

  const toggleDay = (day: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const toggleExpandAll = () => {
    if (expandAll) {
      setExpandedDays(new Set());
      setExpandAll(false);
    } else {
      setExpandedDays(new Set(itinerary.map(day => day.day)));
      setExpandAll(true);
    }
  };

  const isDayExpanded = (day: number) => {
    return expandedDays.has(day);
  };

  return (
    <div className="trek-detail-itinerary">
      <div className="trek-detail-itinerary__container">
        <div className="trek-detail-itinerary__header">
          <h2 className="trek-detail-itinerary__title">{title}</h2>
          <button 
            className="trek-detail-itinerary__expand-btn"
            onClick={toggleExpandAll}
          >
            {expandAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className="trek-detail-itinerary__timeline">
          {itinerary.map((day) => (
            <div key={day.day} className="trek-detail-itinerary__day">
              <div className="trek-detail-itinerary__day-header">
                <div className="trek-detail-itinerary__day-number">
                  <span>Day {day.day}</span>
                </div>
                <div className="trek-detail-itinerary__day-content">
                  <h3 className="trek-detail-itinerary__day-title">{day.title}</h3>
                  <p className="trek-detail-itinerary__day-description">{day.description}</p>
                </div>
                <button 
                  className={`trek-detail-itinerary__toggle-btn ${
                    isDayExpanded(day.day) ? 'trek-detail-itinerary__toggle-btn--expanded' : ''
                  }`}
                  onClick={() => toggleDay(day.day)}
                  aria-expanded={isDayExpanded(day.day)}
                  aria-label={`${isDayExpanded(day.day) ? 'Collapse' : 'Expand'} day ${day.day} details`}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {isDayExpanded(day.day) && (
                <div className="trek-detail-itinerary__day-details">
                  {day.activities.length > 0 && (
                    <div className="trek-detail-itinerary__section">
                      <h4 className="trek-detail-itinerary__section-title">
                        <svg className="trek-detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M9 11l3 3 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.3 0 2.52.28 3.64.8" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Activities
                      </h4>
                      <ul className="trek-detail-itinerary__activities">
                        {day.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="trek-detail-itinerary__activity">
                            <svg className="trek-detail-itinerary__activity-icon" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {day.meals.length > 0 && (
                    <div className="trek-detail-itinerary__section">
                      <h4 className="trek-detail-itinerary__section-title">
                        <svg className="trek-detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2"/>
                          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Meals
                      </h4>
                      <div className="trek-detail-itinerary__meals">
                        {day.meals.map((meal, mealIndex) => (
                          <span key={mealIndex} className="trek-detail-itinerary__meal">
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {day.accommodation && (
                    <div className="trek-detail-itinerary__section">
                      <h4 className="trek-detail-itinerary__section-title">
                        <svg className="trek-detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Accommodation
                      </h4>
                      <p className="trek-detail-itinerary__accommodation">{day.accommodation}</p>
                    </div>
                  )}

                  {day.highlights && day.highlights.length > 0 && (
                    <div className="trek-detail-itinerary__section">
                      <h4 className="trek-detail-itinerary__section-title">
                        <svg className="trek-detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Highlights
                      </h4>
                      <ul className="trek-detail-itinerary__highlights">
                        {day.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="trek-detail-itinerary__highlight">
                            <svg className="trek-detail-itinerary__highlight-icon" viewBox="0 0 24 24" fill="none">
                              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrekDetailItinerary;

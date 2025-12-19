import React, { useState } from 'react';
import './DetailItinerary.scss';

interface DayPlan {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals?: string[];
  accommodation?: string;
  highlights?: string[];
}

interface DetailItineraryProps {
  itinerary: any[];
  type: 'tour' | 'short-tour' | 'trek';
}

const DetailItinerary: React.FC<DetailItineraryProps> = ({ itinerary, type }) => {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [expandAll, setExpandAll] = useState(false);

  // Default itinerary if none provided
  const defaultItinerary: DayPlan[] = [
    {
      day: 1,
      title: type === 'short-tour' ? "Morning Experience" : "Day 1: Arrival & Orientation",
      description: type === 'short-tour' 
        ? "Start your quick escape with a morning exploration of the main attractions."
        : "Begin your adventure with arrival and comprehensive orientation tour.",
      activities: type === 'short-tour' 
        ? ["Hotel pickup", "Main attraction visit", "Local experience", "Return to hotel"]
        : ["Hotel pickup and briefing", "Visit to main city square", "Local market exploration", "Traditional lunch"],
      meals: type === 'short-tour' ? ["Snacks included"] : ["Breakfast", "Lunch", "Dinner"],
      accommodation: type === 'short-tour' ? undefined : "3-star hotel in city center",
      highlights: type === 'short-tour' 
        ? ["Quick experience", "Local insights", "Photo opportunities"]
        : ["Cultural immersion", "Local cuisine", "Historical sites"]
    },
    {
      day: 2,
      title: type === 'short-tour' ? "Afternoon Adventure" : "Day 2: Main Attractions",
      description: type === 'short-tour'
        ? "Continue your exploration with afternoon activities and cultural experiences."
        : "Explore the most famous attractions and landmarks with your knowledgeable guide.",
      activities: type === 'short-tour'
        ? ["Cultural site visit", "Local interaction", "Snack break", "Final attraction"]
        : ["Museum visits", "Historical monument tours", "Scenic viewpoint stops", "Cultural performance"],
      meals: type === 'short-tour' ? ["Light refreshments"] : ["Breakfast", "Lunch", "Dinner"],
      accommodation: type === 'short-tour' ? undefined : "3-star hotel in city center",
      highlights: type === 'short-tour'
        ? ["Cultural insights", "Local connections", "Memorable moments"]
        : ["Historical significance", "Photo opportunities", "Cultural insights"]
    }
  ];

  const finalItinerary: DayPlan[] = itinerary && itinerary.length > 0 ? itinerary : defaultItinerary;

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
      setExpandedDays(new Set(finalItinerary.map(day => day.day)));
      setExpandAll(true);
    }
  };

  const isDayExpanded = (day: number) => {
    return expandedDays.has(day);
  };

  const getTitle = () => {
    switch (type) {
      case 'short-tour':
        return 'Tour Schedule';
      case 'trek':
        return 'Tour Plan';
      default:
        return 'Itinerary';
    }
  };

  return (
    <div className="detail-itinerary">
      <div className="detail-itinerary__container">
        <div className="detail-itinerary__header">
          <h2 className="detail-itinerary__title">{getTitle()}</h2>
          <button 
            className="detail-itinerary__expand-btn"
            onClick={toggleExpandAll}
          >
            {expandAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className="detail-itinerary__timeline">
          {finalItinerary.map((day) => (
            <div key={day.day} className="detail-itinerary__day">
              <div className="detail-itinerary__day-header">
                <div className="detail-itinerary__day-number">
                  <span>{type === 'short-tour' ? `Step ${day.day}` : `Day ${day.day}`}</span>
                </div>
                <div className="detail-itinerary__day-content">
                  <h3 className="detail-itinerary__day-title">{day.title}</h3>
                  <p className="detail-itinerary__day-description">{day.description}</p>
                </div>
                <button 
                  className={`detail-itinerary__toggle-btn ${
                    isDayExpanded(day.day) ? 'detail-itinerary__toggle-btn--expanded' : ''
                  }`}
                  onClick={() => toggleDay(day.day)}
                  aria-expanded={isDayExpanded(day.day)}
                  aria-label={`${isDayExpanded(day.day) ? 'Collapse' : 'Expand'} ${type === 'short-tour' ? 'step' : 'day'} ${day.day} details`}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {isDayExpanded(day.day) && (
                <div className="detail-itinerary__day-details">
                  {day.activities.length > 0 && (
                    <div className="detail-itinerary__section">
                      <h4 className="detail-itinerary__section-title">
                        <svg className="detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M9 11l3 3 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.3 0 2.52.28 3.64.8" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Activities
                      </h4>
                      <ul className="detail-itinerary__activities">
                        {day.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="detail-itinerary__activity">
                            <svg className="detail-itinerary__activity-icon" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {day.meals && day.meals.length > 0 && (
                    <div className="detail-itinerary__section">
                      <h4 className="detail-itinerary__section-title">
                        <svg className="detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2"/>
                          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Meals
                      </h4>
                      <div className="detail-itinerary__meals">
                        {day.meals.map((meal, mealIndex) => (
                          <span key={mealIndex} className="detail-itinerary__meal">
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {day.accommodation && (
                    <div className="detail-itinerary__section">
                      <h4 className="detail-itinerary__section-title">
                        <svg className="detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Accommodation
                      </h4>
                      <p className="detail-itinerary__accommodation">{day.accommodation}</p>
                    </div>
                  )}

                  {day.highlights && day.highlights.length > 0 && (
                    <div className="detail-itinerary__section">
                      <h4 className="detail-itinerary__section-title">
                        <svg className="detail-itinerary__section-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Highlights
                      </h4>
                      <ul className="detail-itinerary__highlights">
                        {day.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="detail-itinerary__highlight">
                            <svg className="detail-itinerary__highlight-icon" viewBox="0 0 24 24" fill="none">
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

export default DetailItinerary;

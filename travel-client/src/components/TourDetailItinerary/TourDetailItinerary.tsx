import React, { useState } from 'react';
import './TourDetailItinerary.scss';

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

const TourDetailItinerary: React.FC<Props> = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const itinerary = [
    {
      day: 1,
      title: "Arrival & City Orientation",
      time: "9:00 AM - 12:00 PM",
      description: "Meet your guide at the hotel and begin with a comprehensive city orientation tour. Visit the main landmarks and get familiar with the local culture.",
      activities: [
        "Hotel pickup and briefing",
        "Visit to main city square",
        "Local market exploration",
        "Traditional lunch at local restaurant"
      ],
      highlights: ["Cultural immersion", "Local cuisine", "Historical sites"]
    },
    {
      day: 2,
      title: "Main Attractions Tour",
      time: "8:00 AM - 5:00 PM",
      description: "Explore the most famous attractions and landmarks. Learn about the history and significance of each location from your knowledgeable guide.",
      activities: [
        "Museum visits",
        "Historical monument tours",
        "Scenic viewpoint stops",
        "Cultural performance (if available)"
      ],
      highlights: ["Historical significance", "Photo opportunities", "Cultural insights"]
    },
    {
      day: 3,
      title: "Local Experiences & Departure",
      time: "10:00 AM - 2:00 PM",
      description: "Experience authentic local life through hands-on activities and cultural exchanges. Perfect ending to your memorable tour.",
      activities: [
        "Craft workshop participation",
        "Local family visit",
        "Traditional cooking class",
        "Farewell lunch"
      ],
      highlights: ["Hands-on experience", "Local connections", "Memorable moments"]
    }
  ];

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="tour-detail-itinerary">
      <div className="tour-detail-itinerary__header">
        <h2 className="tour-detail-itinerary__title">Tour Itinerary</h2>
        <p className="tour-detail-itinerary__subtitle">
          Detailed day-by-day breakdown of your tour experience
        </p>
      </div>

      <div className="tour-detail-itinerary__content">
        {itinerary.map((day) => (
          <div 
            key={day.day} 
            className={`tour-detail-itinerary__day ${
              expandedDay === day.day ? 'expanded' : ''
            }`}
          >
            <div 
              className="tour-detail-itinerary__day-header"
              onClick={() => toggleDay(day.day)}
            >
              <div className="tour-detail-itinerary__day-number">
                Day {day.day}
              </div>
              <div className="tour-detail-itinerary__day-info">
                <h3 className="tour-detail-itinerary__day-title">{day.title}</h3>
                <p className="tour-detail-itinerary__day-time">{day.time}</p>
              </div>
              <div className="tour-detail-itinerary__day-toggle">
                <i className={`fa-solid fa-chevron-${expandedDay === day.day ? 'up' : 'down'}`}></i>
              </div>
            </div>

            {expandedDay === day.day && (
              <div className="tour-detail-itinerary__day-content">
                <p className="tour-detail-itinerary__day-description">
                  {day.description}
                </p>

                <div className="tour-detail-itinerary__activities">
                  <h4>Activities</h4>
                  <ul>
                    {day.activities.map((activity, activityIndex) => (
                      <li key={activityIndex}>
                        <i className="fa-solid fa-check"></i>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tour-detail-itinerary__highlights">
                  <h4>Key Highlights</h4>
                  <div className="tour-detail-itinerary__highlights-tags">
                    {day.highlights.map((highlight, highlightIndex) => (
                      <span key={highlightIndex} className="tour-detail-itinerary__highlight-tag">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourDetailItinerary;

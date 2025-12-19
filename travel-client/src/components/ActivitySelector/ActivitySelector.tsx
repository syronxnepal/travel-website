import React, { useState } from 'react';
import type { Activity } from '../../assets/DummyData/CustomPackageData';
import './ActivitySelector.scss';

interface ActivitySelectorProps {
  activities: Activity[];
  selectedActivities: string[];
  onSelectionChange: (activityIds: string[]) => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  activities,
  selectedActivities,
  onSelectionChange
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredActivities = activities.filter(activity => 
    filterType === 'all' || activity.type === filterType
  );

  const handleActivityToggle = (activityId: string) => {
    if (selectedActivities.includes(activityId)) {
      onSelectionChange(selectedActivities.filter(id => id !== activityId));
    } else {
      onSelectionChange([...selectedActivities, activityId]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trek':
        return 'fa-mountain';
      case 'tour':
        return 'fa-map-marked-alt';
      case 'adventure':
        return 'fa-rocket';
      case 'cultural':
        return 'fa-landmark';
      default:
        return 'fa-map';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trek':
        return 'var(--primary-color)';
      case 'tour':
        return 'var(--secondary-color)';
      case 'adventure':
        return 'var(--accent-color)';
      case 'cultural':
        return '#8b5cf6';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div className="activity-selector">
      <div className="activity-selector__header">
        <h3 className="activity-selector__title">Choose Your Activities</h3>
        <p className="activity-selector__subtitle">
          Select the activities you want to include in your package
        </p>
        
        <div className="activity-selector__filters">
          <button
            className={`activity-selector__filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Activities
          </button>
          <button
            className={`activity-selector__filter-btn ${filterType === 'trek' ? 'active' : ''}`}
            onClick={() => setFilterType('trek')}
          >
            Treks
          </button>
          <button
            className={`activity-selector__filter-btn ${filterType === 'tour' ? 'active' : ''}`}
            onClick={() => setFilterType('tour')}
          >
            Tours
          </button>
          <button
            className={`activity-selector__filter-btn ${filterType === 'adventure' ? 'active' : ''}`}
            onClick={() => setFilterType('adventure')}
          >
            Adventure
          </button>
          <button
            className={`activity-selector__filter-btn ${filterType === 'cultural' ? 'active' : ''}`}
            onClick={() => setFilterType('cultural')}
          >
            Cultural
          </button>
        </div>
      </div>
      
      <div className="activity-selector__grid">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className={`activity-selector__card ${
              selectedActivities.includes(activity.id) ? 'selected' : ''
            }`}
            onClick={() => handleActivityToggle(activity.id)}
          >
            <div className="activity-selector__image">
              <img src={activity.image} alt={activity.name} />
              <div className="activity-selector__overlay">
                <div className="activity-selector__checkbox">
                  <i className={`fa-${selectedActivities.includes(activity.id) ? 'solid' : 'regular'} fa-circle-check`}></i>
                </div>
              </div>
              <div className="activity-selector__type-badge" style={{ backgroundColor: getTypeColor(activity.type) }}>
                <i className={`fa-solid ${getTypeIcon(activity.type)}`}></i>
                <span>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
              </div>
            </div>
            
            <div className="activity-selector__content">
              <h4 className="activity-selector__name">{activity.name}</h4>
              <p className="activity-selector__description">{activity.description}</p>
              
              <div className="activity-selector__details">
                <div className="activity-selector__detail">
                  <i className="fa-solid fa-clock"></i>
                  <span>{activity.duration}</span>
                </div>
                <div className="activity-selector__detail">
                  <i className="fa-solid fa-signal"></i>
                  <span>{activity.difficulty}</span>
                </div>
                <div className="activity-selector__detail">
                  <i className="fa-solid fa-users"></i>
                  <span>{activity.groupSize.min}-{activity.groupSize.max} people</span>
                </div>
              </div>
              
              <div className="activity-selector__highlights">
                <h5>Highlights:</h5>
                <ul>
                  {activity.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="activity-selector__price">
                ${activity.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySelector;

import React from 'react';
import type { Destination } from '../../assets/DummyData/CustomPackageData';
import './DestinationSelector.scss';

interface DestinationSelectorProps {
  destinations: Destination[];
  selectedDestinations: string[];
  onSelectionChange: (destinationIds: string[]) => void;
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  destinations,
  selectedDestinations,
  onSelectionChange
}) => {
  const handleDestinationToggle = (destinationId: string) => {
    if (selectedDestinations.includes(destinationId)) {
      onSelectionChange(selectedDestinations.filter(id => id !== destinationId));
    } else {
      onSelectionChange([...selectedDestinations, destinationId]);
    }
  };

  return (
    <div className="destination-selector">
      <h3 className="destination-selector__title">Choose Your Destinations</h3>
      <p className="destination-selector__subtitle">
        Select one or more destinations for your custom package
      </p>
      
      <div className="destination-selector__grid">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className={`destination-selector__card ${
              selectedDestinations.includes(destination.id) ? 'selected' : ''
            }`}
            onClick={() => handleDestinationToggle(destination.id)}
          >
            <div className="destination-selector__image">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-selector__overlay">
                <div className="destination-selector__checkbox">
                  <i className={`fa-${selectedDestinations.includes(destination.id) ? 'solid' : 'regular'} fa-circle-check`}></i>
                </div>
              </div>
            </div>
            
            <div className="destination-selector__content">
              <h4 className="destination-selector__name">{destination.name}</h4>
              <p className="destination-selector__country">{destination.country}</p>
              <p className="destination-selector__description">{destination.description}</p>
              
              <div className="destination-selector__details">
                <div className="destination-selector__detail">
                  <i className="fa-solid fa-clock"></i>
                  <span>{destination.duration}</span>
                </div>
                <div className="destination-selector__detail">
                  <i className="fa-solid fa-signal"></i>
                  <span>{destination.difficulty}</span>
                </div>
                <div className="destination-selector__detail">
                  <i className="fa-solid fa-calendar"></i>
                  <span>{destination.bestTime}</span>
                </div>
              </div>
              
              <div className="destination-selector__highlights">
                <h5>Highlights:</h5>
                <ul>
                  {destination.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="destination-selector__price">
                From ${destination.price}/day
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationSelector;

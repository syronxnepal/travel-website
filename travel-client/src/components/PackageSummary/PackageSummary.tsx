import React from 'react';
import type { CustomPackage } from '../../assets/DummyData/CustomPackageData';
import './PackageSummary.scss';

interface PackageSummaryProps {
  packageData: CustomPackage;
  onOptionToggle: (optionId: string) => void;
  onRequestQuote: () => void;
}

const PackageSummary: React.FC<PackageSummaryProps> = ({
  packageData,
  onOptionToggle,
  onRequestQuote
}) => {
  const calculateTotalPrice = () => {
    let total = 0;
    
    // Add destination costs
    packageData.destinations.forEach(dest => {
      total += dest.price * packageData.duration;
    });
    
    // Add activity costs
    packageData.activities.forEach(activity => {
      total += activity.price;
    });
    
    // Add selected options costs
    packageData.options.forEach(option => {
      if (packageData.options.some(opt => opt.id === option.id)) {
        total += option.price * packageData.groupSize * packageData.duration;
      }
    });
    
    return total;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="package-summary">
      <div className="package-summary__header">
        <h3 className="package-summary__title">Your Custom Package</h3>
        <div className="package-summary__price">
          <span className="package-summary__price-label">Total Price:</span>
          <span className="package-summary__price-value">${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="package-summary__content">
        <div className="package-summary__section">
          <h4 className="package-summary__section-title">
            <i className="fa-solid fa-map-marker-alt"></i>
            Destinations ({packageData.destinations.length})
          </h4>
          <div className="package-summary__items">
            {packageData.destinations.map((destination) => (
              <div key={destination.id} className="package-summary__item">
                <div className="package-summary__item-content">
                  <h5 className="package-summary__item-name">{destination.name}</h5>
                  <p className="package-summary__item-details">
                    {destination.country} • {destination.duration} • {destination.difficulty}
                  </p>
                </div>
                <div className="package-summary__item-price">
                  ${destination.price}/day
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="package-summary__section">
          <h4 className="package-summary__section-title">
            <i className="fa-solid fa-mountain"></i>
            Activities ({packageData.activities.length})
          </h4>
          <div className="package-summary__items">
            {packageData.activities.map((activity) => (
              <div key={activity.id} className="package-summary__item">
                <div className="package-summary__item-content">
                  <h5 className="package-summary__item-name">{activity.name}</h5>
                  <p className="package-summary__item-details">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • {activity.duration} • {activity.difficulty}
                  </p>
                </div>
                <div className="package-summary__item-price">
                  ${activity.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="package-summary__section">
          <h4 className="package-summary__section-title">
            <i className="fa-solid fa-cog"></i>
            Package Options
          </h4>
          <div className="package-summary__options">
            {packageData.options.map((option) => (
              <div key={option.id} className="package-summary__option">
                <label className="package-summary__option-label">
                  <input
                    type="checkbox"
                    checked={packageData.options.some(opt => opt.id === option.id)}
                    onChange={() => onOptionToggle(option.id)}
                    className="package-summary__option-checkbox"
                  />
                  <div className="package-summary__option-content">
                    <h5 className="package-summary__option-name">{option.name}</h5>
                    <p className="package-summary__option-description">{option.description}</p>
                  </div>
                  <div className="package-summary__option-price">
                    ${option.price}/person/day
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="package-summary__section">
          <h4 className="package-summary__section-title">
            <i className="fa-solid fa-info-circle"></i>
            Package Details
          </h4>
          <div className="package-summary__details">
            <div className="package-summary__detail">
              <span className="package-summary__detail-label">Group Size:</span>
              <span className="package-summary__detail-value">{packageData.groupSize} people</span>
            </div>
            <div className="package-summary__detail">
              <span className="package-summary__detail-label">Duration:</span>
              <span className="package-summary__detail-value">{packageData.duration} days</span>
            </div>
            <div className="package-summary__detail">
              <span className="package-summary__detail-label">Start Date:</span>
              <span className="package-summary__detail-value">
                {packageData.startDate ? new Date(packageData.startDate).toLocaleDateString() : 'Not set'}
              </span>
            </div>
            <div className="package-summary__detail">
              <span className="package-summary__detail-label">End Date:</span>
              <span className="package-summary__detail-value">
                {packageData.endDate ? new Date(packageData.endDate).toLocaleDateString() : 'Not set'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="package-summary__actions">
        <button
          className="package-summary__btn package-summary__btn--primary"
          onClick={onRequestQuote}
          disabled={packageData.destinations.length === 0 || packageData.activities.length === 0}
        >
          <i className="fa-solid fa-envelope"></i>
          Request Quote
        </button>
        <button className="package-summary__btn package-summary__btn--secondary">
          <i className="fa-solid fa-download"></i>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PackageSummary;

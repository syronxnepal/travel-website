import React, { useState } from 'react';
import PageHero from '../../components/PageHero/PageHero';
import PackageSummary from '../../components/PackageSummary/PackageSummary';
import Footer from '../../components/Footer/Footer';
import { destinations, activities, packageOptions } from '../../assets/DummyData/CustomPackageData';
import type { CustomPackage } from '../../assets/DummyData/CustomPackageData';
import './CustomPackagesPage.scss';

const CustomPackagesPage: React.FC = () => {
  const [packageData, setPackageData] = useState<CustomPackage>({
    id: '',
    destinations: [],
    activities: [],
    options: packageOptions.filter(opt => opt.required),
    groupSize: 2,
    duration: 7,
    startDate: '',
    endDate: '',
    totalPrice: 0,
    status: 'draft',
    createdAt: new Date().toISOString()
  });

  const [expandedSections, setExpandedSections] = useState({
    destinations: true,
    activities: false,
    details: false,
    options: false
  });

  const handleDestinationChange = (destinationIds: string[]) => {
    const selectedDestinations = destinations.filter(dest => destinationIds.includes(dest.id));
    setPackageData(prev => ({
      ...prev,
      destinations: selectedDestinations
    }));
  };

  const handleActivityChange = (activityIds: string[]) => {
    const selectedActivities = activities.filter(activity => activityIds.includes(activity.id));
    setPackageData(prev => ({
      ...prev,
      activities: selectedActivities
    }));
  };

  const handleOptionToggle = (optionId: string) => {
    setPackageData(prev => ({
      ...prev,
      options: prev.options.some(opt => opt.id === optionId)
        ? prev.options.filter(opt => opt.id !== optionId)
        : [...prev.options, packageOptions.find(opt => opt.id === optionId)!]
    }));
  };

  const handleRequestQuote = () => {
    // Here you would typically send the package data to your backend
    console.log('Requesting quote for package:', packageData);
    alert('Quote request submitted! We will contact you within 24 hours.');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
    <div className="custom-packages-page">
      <PageHero
        title="Create Your Custom Package"
        subtitle="DESIGN YOUR DREAM TRIP"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Custom Packages', isActive: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
      />

      <div className="custom-packages-page__main">
        <div className="container">
          <div className="custom-packages-page__content">
            <div className="custom-packages-page__form">
              {/* Destinations Section */}
              <div className="custom-packages-page__section">
                <div 
                  className="custom-packages-page__section-header"
                  onClick={() => toggleSection('destinations')}
                >
                  <div className="custom-packages-page__section-title">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    <h3>Choose Destinations</h3>
                    <span className="custom-packages-page__count">
                      {packageData.destinations.length} selected
                    </span>
                  </div>
                  <i className={`fa-solid fa-chevron-${expandedSections.destinations ? 'up' : 'down'}`}></i>
                </div>
                
                {expandedSections.destinations && (
                  <div className="custom-packages-page__section-content">
                    <div className="custom-packages-page__grid">
                      {destinations.map((destination) => (
                        <div
                          key={destination.id}
                          className={`custom-packages-page__card ${
                            packageData.destinations.some(d => d.id === destination.id) ? 'selected' : ''
                          }`}
                          onClick={() => {
                            const isSelected = packageData.destinations.some(d => d.id === destination.id);
                            if (isSelected) {
                              handleDestinationChange(packageData.destinations.filter(d => d.id !== destination.id).map(d => d.id));
                            } else {
                              handleDestinationChange([...packageData.destinations.map(d => d.id), destination.id]);
                            }
                          }}
                        >
                            <div className="custom-packages-page__card-checkbox">
                              <i className={`fa-${packageData.destinations.some(d => d.id === destination.id) ? 'solid' : 'regular'} fa-circle-check`}></i>
                            </div>
                          <div className="custom-packages-page__card-image">
                            <img src={destination.image} alt={destination.name} />
                          </div>
                          <div className="custom-packages-page__card-content">
                            <h4>{destination.name}</h4>
                            <div className="custom-packages-page__card-meta">
                            {/* <div className="custom-packages-page__card-price">
                              From ${destination.price}/day
                            </div> */}
                            <div className="custom-packages-page__card-country">
                              <span><i className="fa-solid fa-location-dot"></i></span>
                              {destination.country}
                            </div>
                            </div>
                          </div>
                          {/* <div className="custom-packages-page__card-content">
                            <p>{destination.country}</p>
                            <div className="custom-packages-page__card-details">
                              <span><i className="fa-solid fa-clock"></i> {destination.duration}</span>
                              <span><i className="fa-solid fa-signal"></i> {destination.difficulty}</span>
                            </div>
                          </div> */}
                        
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Activities Section */}
              <div className="custom-packages-page__section">
                <div 
                  className="custom-packages-page__section-header"
                  onClick={() => toggleSection('activities')}
                >
                  <div className="custom-packages-page__section-title">
                    <i className="fa-solid fa-mountain"></i>
                    <h3>Select Activities</h3>
                    <span className="custom-packages-page__count">
                      {packageData.activities.length} selected
                    </span>
                  </div>
                  <i className={`fa-solid fa-chevron-${expandedSections.activities ? 'up' : 'down'}`}></i>
                </div>
                
                {expandedSections.activities && (
                  <div className="custom-packages-page__section-content">
                    <div className="custom-packages-page__grid">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className={`custom-packages-page__card ${
                            packageData.activities.some(a => a.id === activity.id) ? 'selected' : ''
                          }`}
                          onClick={() => {
                            const isSelected = packageData.activities.some(a => a.id === activity.id);
                            if (isSelected) {
                              handleActivityChange(packageData.activities.filter(a => a.id !== activity.id).map(a => a.id));
                            } else {
                              handleActivityChange([...packageData.activities.map(a => a.id), activity.id]);
                            }
                          }}
                        >
                             <div className="custom-packages-page__card-checkbox">
                              <i 
                              className={`fa-${packageData.activities.some(d => d.id === activity.id) ? 'solid' : 'regular'} fa-circle-check`}></i>
                            </div>
                          <div className="custom-packages-page__card-image">
                            <img src={activity.image} alt={activity.name} />
                            <div className="custom-packages-page__card-checkbox">
                              <i className={`fa-${packageData.activities.some(a => a.id === activity.id) ? 'solid' : 'regular'} fa-circle-check`}></i>
                            </div>
                            <div 
                              className="custom-packages-page__card-badge"
                              style={{ backgroundColor: getTypeColor(activity.type) }}
                            >
                              <i className={`fa-solid ${getTypeIcon(activity.type)}`}></i>
                              <span>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
                            </div>
                          </div>
                          <div className="custom-packages-page__card-content">
                            <h4>{activity.name}</h4>
                            {/* <p>{activity.description}</p> */}
                            <div className="custom-packages-page__card-bottom">
                            <div className="custom-packages-page__card-details">
                              <span><i className="fa-solid fa-clock"></i> {activity.duration}</span>
                              <span><i className="fa-solid fa-signal"></i> {activity.difficulty}</span>
                              <span><i className="fa-solid fa-users"></i> {activity.groupSize.min}-{activity.groupSize.max} people</span>
                            </div>
                            <div className="custom-packages-page__card-price">
                              ${activity.price}
                            </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Package Details Section */}
              <div className="custom-packages-page__section">
                <div 
                  className="custom-packages-page__section-header"
                  onClick={() => toggleSection('details')}
                >
                  <div className="custom-packages-page__section-title">
                    <i className="fa-solid fa-info-circle"></i>
                    <h3>Package Details</h3>
                  </div>
                  <i className={`fa-solid fa-chevron-${expandedSections.details ? 'up' : 'down'}`}></i>
                </div>
                
                {expandedSections.details && (
                  <div className="custom-packages-page__section-content">
                    <div className="custom-packages-page__details-grid">
                      <div className="custom-packages-page__field">
                        <label>
                          <i className="fa-solid fa-users"></i>
                          Group Size
                        </label>
                        <div className="custom-packages-page__input-group">
                          <button onClick={() => setPackageData(prev => ({ ...prev, groupSize: Math.max(1, prev.groupSize - 1) }))}>
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            value={packageData.groupSize}
                            onChange={(e) => setPackageData(prev => ({ ...prev, groupSize: Math.max(1, parseInt(e.target.value) || 1) }))}
                            min="1"
                            max="50"
                          />
                          <button onClick={() => setPackageData(prev => ({ ...prev, groupSize: Math.min(50, prev.groupSize + 1) }))}>
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div className="custom-packages-page__field">
                        <label>
                          <i className="fa-solid fa-calendar-days"></i>
                          Duration (Days)
                        </label>
                        <div className="custom-packages-page__input-group">
                          <button onClick={() => setPackageData(prev => ({ ...prev, duration: Math.max(1, prev.duration - 1) }))}>
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            value={packageData.duration}
                            onChange={(e) => setPackageData(prev => ({ ...prev, duration: Math.max(1, parseInt(e.target.value) || 1) }))}
                            min="1"
                            max="30"
                          />
                          <button onClick={() => setPackageData(prev => ({ ...prev, duration: Math.min(30, prev.duration + 1) }))}>
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div className="custom-packages-page__field">
                        <label>
                          <i className="fa-solid fa-calendar"></i>
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={packageData.startDate}
                          onChange={(e) => setPackageData(prev => ({ ...prev, startDate: e.target.value }))}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="custom-packages-page__field">
                        <label>
                          <i className="fa-solid fa-calendar-check"></i>
                          End Date
                        </label>
                        <input
                          type="date"
                          value={packageData.endDate}
                          onChange={(e) => setPackageData(prev => ({ ...prev, endDate: e.target.value }))}
                          min={packageData.startDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Package Options Section */}
              <div className="custom-packages-page__section">
                <div 
                  className="custom-packages-page__section-header"
                  onClick={() => toggleSection('options')}
                >
                  <div className="custom-packages-page__section-title">
                    <i className="fa-solid fa-cog"></i>
                    <h3>Package Options</h3>
                    <span className="custom-packages-page__count">
                      {packageData.options.length} selected
                    </span>
                  </div>
                  <i className={`fa-solid fa-chevron-${expandedSections.options ? 'up' : 'down'}`}></i>
                </div>
                
                {expandedSections.options && (
                  <div className="custom-packages-page__section-content">
                    <div className="custom-packages-page__options">
                      {packageOptions.map((option) => (
                        <div key={option.id} className="custom-packages-page__option">
                          <label>
                            <input
                              type="checkbox"
                              checked={packageData.options.some(opt => opt.id === option.id)}
                              onChange={() => handleOptionToggle(option.id)}
                            />
                            <div className="custom-packages-page__option-content">
                              <h5>{option.name}</h5>
                              <p>{option.description}</p>
                            </div>
                            <div className="custom-packages-page__option-price">
                              ${option.price}/person/day
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="custom-packages-page__summary">
              <PackageSummary
                packageData={packageData}
                onOptionToggle={handleOptionToggle}
                onRequestQuote={handleRequestQuote}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomPackagesPage;


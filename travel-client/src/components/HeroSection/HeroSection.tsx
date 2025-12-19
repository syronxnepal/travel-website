import React, { useState } from 'react';
import HeroCarousel from '../HeroCarousel/HeroCarousel';
import './HeroSection.scss';

const HeroSection: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    persons: 1
  });

  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  // Popular destinations data
  const destinations = [
    'Everest Base Camp',
    'Annapurna Circuit', 
    'Kathmandu Valley',
    'Pokhara',
    'Chitwan National Park',
    'Bhaktapur',
    'Patan',
    'Lumbini',
    'Manaslu Trek',
    'Langtang Valley'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchData.destination || !searchData.startDate || !searchData.endDate) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Searching for:', searchData);
    // Handle search logic here - could redirect to search results page
    // navigate(`/search?destination=${searchData.destination}&start=${searchData.startDate}&end=${searchData.endDate}`);
  };

  const handleDestinationSelect = (destination: string) => {
    setSearchData({...searchData, destination});
    setIsDestinationOpen(false);
  };

  const handlePersonsChange = (change: number) => {
    const newPersons = searchData.persons + change;
    if (newPersons >= 1 && newPersons <= 20) {
      setSearchData({...searchData, persons: newPersons});
    }
  };


  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
      title: 'Embark on journeys not just destinations with our trips.',
      subtitle: 'Plan better with unique travel experiences.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      title: 'Discover the world\'s most beautiful destinations.',
      subtitle: 'Create memories that last a lifetime.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop',
      title: 'Adventure awaits around every corner.',
      subtitle: 'Experience the thrill of exploration.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      title: 'Your perfect getaway starts here.',
      subtitle: 'Let us help you plan your dream vacation.'
    }
  ];

  return (
    <section className="hero">
      <HeroCarousel 
        slides={carouselSlides}
        autoPlay={true}
        autoPlayInterval={6000}
      />
      
      <div className="hero__search-overlay">
      <div className="container">
          <form className="hero__search" onSubmit={handleSearch}>
            <div className="hero__search-field hero__search-field--destination">
                <label htmlFor="destination">Where to?</label>
              <div className="hero__destination-dropdown">
                <input
                  type="text"
                  id="destination"
                  placeholder="Search for a place"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                  onFocus={() => setIsDestinationOpen(true)}
                  onBlur={() => setTimeout(() => setIsDestinationOpen(false), 200)}
                  autoComplete="off"
                />
                <button 
                  type="button" 
                  className="hero__dropdown-arrow"
                  onClick={() => setIsDestinationOpen(!isDestinationOpen)}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                
                {isDestinationOpen && (
                  <div className="hero__destination-options">
                    {destinations.map((dest, index) => (
                      <div
                        key={index}
                        className="hero__destination-option"
                        onClick={() => handleDestinationSelect(dest)}
                      >
                        {dest}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </div>
              
            <div className="hero__search-field hero__search-field--dates">
              <label htmlFor="startDate">When</label>
              <div className="hero__date-inputs">
                <input
                  type="date"
                  id="startDate"
                  value={searchData.startDate}
                  onChange={(e) => setSearchData({...searchData, startDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
                <span className="hero__date-separator">to</span>
                <input
                  type="date"
                  id="endDate"
                  value={searchData.endDate}
                  onChange={(e) => setSearchData({...searchData, endDate: e.target.value})}
                  min={searchData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="hero__search-field hero__search-field--persons">
              <label htmlFor="persons">Persons</label>
              <div className="hero__persons-input">
                <button 
                  type="button" 
                  className="hero__persons-btn hero__persons-btn--minus"
                  onClick={() => handlePersonsChange(-1)}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <input
                  type="number"
                  id="persons"
                  value={searchData.persons}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    if (value >= 1 && value <= 20) {
                      setSearchData({...searchData, persons: value});
                    }
                  }}
                  min="1"
                  max="20"
                />
                <button 
                  type="button" 
                  className="hero__persons-btn hero__persons-btn--plus"
                  onClick={() => handlePersonsChange(1)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            
            <button type="submit" className="hero__search-btn">
             <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

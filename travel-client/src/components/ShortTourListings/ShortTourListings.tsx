import React, { useState } from 'react';
import './ShortTourListings.scss';
import TourCard from '../TourCard/TourCard';
import { shortTourData } from '../../assets/DummyData/TourData';

const ShortTourListings: React.FC = () => {
  const [sortBy, setSortBy] = useState('recently-added');
  const [viewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="short-tour-listings">
      <div className="short-tour-listings__header">
        {/* <div className="short-tour-listings__search">
          <div className="short-tour-listings__search-container">
            <i className="fa-solid fa-search"></i>
            <input 
              type="text" 
              placeholder="Search short tours..." 
              className="short-tour-listings__search-input"
            />
          </div>
        </div> */}
        
        <div className="short-tour-listings__controls">
          <div className="short-tour-listings__sort">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="short-tour-listings__sort-select"
            >
              <option value="recently-added">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>
          
          {/* <div className="short-tour-listings__view-toggle">
            <button 
              className={`short-tour-listings__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <i className="fa-solid fa-th"></i>
            </button>
            <button 
              className={`short-tour-listings__view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div> */}
        </div>
      </div>

      <div className={`short-tour-listings__grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {shortTourData.map((tour) => (
          <TourCard key={tour.id} tour={tour} isShortTour={true} />
        ))}
      </div>

      {/* <div className="short-tour-listings__pagination">
        <button className="short-tour-listings__page-btn active">1</button>
        <button className="short-tour-listings__page-btn">2</button>
        <button className="short-tour-listings__page-btn">3</button>
        <button className="short-tour-listings__page-btn">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div> */}
    </div>
  );
};

export default ShortTourListings;

import React, { useState } from 'react';
import './TourListings.scss';
import TourCard from '../TourCard/TourCard';
import { tourData } from '../../assets/DummyData/TourData';

const TourListings: React.FC = () => {
  const [sortBy, setSortBy] = useState('recently-added');
  const [viewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="tour-listings">
      <div className="tour-listings__header">
        {/* <div className="tour-listings__search">
          <div className="tour-listings__search-container">
            <i className="fa-solid fa-search"></i>
            <input 
              type="text" 
              placeholder="Search tours..." 
              className="tour-listings__search-input"
            />
          </div>
        </div> */}
        
        <div className="tour-listings__controls">
          <div className="tour-listings__sort">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="tour-listings__sort-select"
            >
              <option value="recently-added">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>
          
          {/* <div className="tour-listings__view-toggle">
            <button 
              className={`tour-listings__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <i className="fa-solid fa-th"></i>
            </button>
            <button 
              className={`tour-listings__view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div> */}
        </div>
      </div>

      <div className={`tour-listings__grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {tourData.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {/* <div className="tour-listings__pagination">
        <button className="tour-listings__page-btn active">1</button>
        <button className="tour-listings__page-btn">2</button>
        <button className="tour-listings__page-btn">3</button>
        <button className="tour-listings__page-btn">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div> */}
    </div>
  );
};

export default TourListings;

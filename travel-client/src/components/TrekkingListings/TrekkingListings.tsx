import React, { useState } from 'react';
import './TrekkingListings.scss';
import TrekCard from '../TrekCard/Index';
import {  trekData } from '../../assets/DummyData/TrekData';

const TrekkingListings: React.FC = () => {
  const [sortBy, setSortBy] = useState('recently-added');



  return (
    <div className="trekking-listings">
      <div className="trekking-listings__header">
        <div className="trekking-listings__search">
          <div className="trekking-listings__search-container">
            <i className="fa-solid fa-search"></i>
            <input 
              type="text" 
              placeholder="Q Search" 
              className="trekking-listings__search-input"
            />
          </div>
        </div>
        
        <div className="trekking-listings__controls">
          <div className="trekking-listings__sort">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="trekking-listings__sort-select"
            >
              <option value="recently-added">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
{/*           
          <div className="trekking-listings__view-toggle">
            <button 
              className={`trekking-listings__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <i className="fa-solid fa-th"></i>
            </button>
            <button 
              className={`trekking-listings__view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div> */}
        </div>
      </div>

      <div className={`trekking-listings__grid`}>
        {trekData.map((tour) => (
          <TrekCard key={tour.id} tour={tour} />
    
        ))}
      </div>

      {/* <div className="trekking-listings__pagination">
        <button className="trekking-listings__page-btn active">1</button>
        <button className="trekking-listings__page-btn">2</button>
        <button className="trekking-listings__page-btn">3</button>
        <button className="trekking-listings__page-btn">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div> */}
    </div>
  );
};

export default TrekkingListings;

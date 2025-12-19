import React, { useState } from 'react';
import PageHero from '../../components/PageHero/PageHero';
import TourFilters from '../../components/TourFilters/TourFilters';
import ShortTourListings from '../../components/ShortTourListings/ShortTourListings';
import Footer from '../../components/Footer/Footer';
import FilterSlider from '../../components/FilterSlider/FilterSlider';
import FilterFAB from '../../components/FilterFAB/FilterFAB';
import './ShortToursPage.scss';

const ShortToursPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  return (
    <div className="short-tours-page">
      <PageHero
        title="Short Tours & Day Trips"
        subtitle="QUICK ESCAPES"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Short Tours', isActive: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
      />
      
      <div className="short-tours-page__main">
        <div className="container">
          <div className="short-tours-page__content">
            <div className="short-tours-page__filters">
              <TourFilters />
            </div>
            <ShortTourListings />
          </div>
        </div>
      </div>
      
      <Footer />

      {/* Filter FAB for mobile/tablet */}
      <FilterFAB onClick={openFilter} />

      {/* Filter Slider for mobile/tablet */}
      <FilterSlider 
        isOpen={isFilterOpen} 
        onClose={closeFilter}
        title="Short Tour Filters"
      >
        <TourFilters />
      </FilterSlider>
    </div>
  );
};

export default ShortToursPage;

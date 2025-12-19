import React, { useState } from 'react';
import PageHero from '../../components/PageHero/PageHero';
import TourFilters from '../../components/TourFilters/TourFilters';
import TourListings from '../../components/TourListings/TourListings';
import Footer from '../../components/Footer/Footer';
import FilterSlider from '../../components/FilterSlider/FilterSlider';
import FilterFAB from '../../components/FilterFAB/FilterFAB';
import './ToursPage.scss';

const ToursPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  return (
    <div className="tours-page">
      <PageHero
        title="Discover Amazing Tours"
        subtitle="EXPLORE THE WORLD"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Tours', isActive: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
      />
      
      <div className="tours-page__main">
        <div className="container">
          <div className="tours-page__content">
            <div className="tours-page__filters">
              <TourFilters />
            </div>
            <TourListings />
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
        title="Tour Filters"
      >
        <TourFilters />
      </FilterSlider>
    </div>
  );
};

export default ToursPage;

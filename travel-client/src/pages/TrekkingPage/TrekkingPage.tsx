import React, { useState } from 'react';
import PageHero from '../../components/PageHero/PageHero';
import TrekkingFilters from '../../components/TrekkingFilters/TrekkingFilters';
import TrekkingListings from '../../components/TrekkingListings/TrekkingListings';
import TrekkingCTA from '../../components/TrekkingCTA/TrekkingCTA';
import Footer from '../../components/Footer/Footer';
import FilterSlider from '../../components/FilterSlider/FilterSlider';
import FilterFAB from '../../components/FilterFAB/FilterFAB';
import './TrekkingPage.scss';

const TrekkingPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  return (
    <div className="trekking-page">
      <PageHero
        title="Trekking Adventures"
        subtitle="EXPLORE THE HIMALAYAS"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Trekking', isActive: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
      />
      
      <div className="trekking-page__main">
        <div className="container">
          <div className="trekking-page__content">
            <div className="trekking-page__filters">
              <TrekkingFilters />
            </div>
            <TrekkingListings />
          </div>
        </div>
      </div>
      
      {/* <TrekkingTourTypes /> */}
      <TrekkingCTA />
      <Footer />

      {/* Filter FAB for mobile/tablet */}
      <FilterFAB onClick={openFilter} />

      {/* Filter Slider for mobile/tablet */}
      <FilterSlider 
        isOpen={isFilterOpen} 
        onClose={closeFilter}
        title="Trekking Filters"
      >
        <TrekkingFilters />
      </FilterSlider>
    </div>
  );
};

export default TrekkingPage;

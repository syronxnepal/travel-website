import React from 'react';
import './TopToursAndShortTours.scss';
import SectionHeading from '../SectionHeading/Index';
import Button from '../Button/Index';
import TourCard from '../TourCard/TourCard';
import { tourData, shortTourData } from '../../assets/DummyData/TourData';

const TopToursAndShortTours: React.FC = () => {
  // Get top 2 tours and top 2 short tours
  const topTours = tourData.slice(0, 2);
  const topShortTours = shortTourData.slice(0, 2);
  
  // Combine them into a single array for display
  const toursAndShortTours = [
    ...topTours.map(tour => ({ ...tour, type: 'tour' })),
    ...topShortTours.map(tour => ({ ...tour, type: 'short-tour' }))
  ];

  return (
    <section className="top-tours-and-short-tours section">
      <div className="container">
        <div className="inner">
          <div className="section-header-outer">
            <SectionHeading topTitle='Top Tours & Short Tours' title='Explore Our Top Tours & Short Tours' iconclassName="fa-solid fa-plane" />
            <div className="section-right-button">
              <Button text='View More' type='main-button' isLink link='/tours' />
            </div>
          </div>
          <div className="top-tours-and-short-tours__grid">
            {toursAndShortTours.map((item) => (
              <TourCard 
                key={item.id} 
                tour={item} 
                isShortTour={item.type === 'short-tour'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopToursAndShortTours;

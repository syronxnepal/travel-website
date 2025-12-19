import React from 'react';
import './TopTreks.scss';
import SectionHeading from '../SectionHeading/Index';
import Button from '../Button/Index';
import TrekCard from '../TrekCard/Index';
import {  trekData } from '../../assets/DummyData/TrekData';


const TopTreks: React.FC = () => {

  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="star full">
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  //       </svg>
  //     );
  //   }

  //   if (hasHalfStar) {
  //     stars.push(
  //       <svg key="half" viewBox="0 0 24 24" fill="currentColor" className="star half">
  //         <defs>
  //           <linearGradient id="halfStar">
  //             <stop offset="50%" stopColor="currentColor" />
  //             <stop offset="50%" stopColor="#e5e7eb" />
  //           </linearGradient>
  //         </defs>
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#halfStar)" />
  //       </svg>
  //     );
  //   }

  //   const emptyStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(
  //       <svg key={`empty-${i}`} viewBox="0 0 24 24" fill="#e5e7eb" className="star empty">
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  //       </svg>
  //     );
  //   }

  //   return stars;
  // };

  return (
    <section className="top-treks section">
      <div className="container">
        <div className="inner">
          <div className="section-header-outer">
          <SectionHeading topTitle='Trek With Us' title='Explore Our Top Trekking Destinations' iconclassName="fa-solid fa-map-pin" />
          <div className="section-right-button">
          <Button text='View More' type='main-button' isLink link='/trekking' />
        </div>
          </div>
          <div className="top-treks__grid">
            {trekData.map((trek) => (
              <TrekCard tour={trek} key={trek.id} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default TopTreks;

import React from 'react';
import './TrekkingHero.scss';

const TrekkingHero: React.FC = () => {
  return (
    <section className="trekking-hero">
      <div className="trekking-hero__background">
        <div className="trekking-hero__overlay"></div>
      </div>
      
      <div className="container">
        <div className="trekking-hero__content">
          <div className="trekking-hero__breadcrumb">
            <span className="trekking-hero__breadcrumb-item">Home</span>
            <span className="trekking-hero__breadcrumb-separator">/</span>
            <span className="trekking-hero__breadcrumb-item active">All Trekking</span>
          </div>
          
          <h1 className="trekking-hero__title">All Trekking</h1>
        </div>
      </div>
    </section>
  );
};

export default TrekkingHero;

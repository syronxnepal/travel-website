import React from 'react';
import './AboutHero.scss';

const AboutHero: React.FC = () => {
  return (
    <section className="about-hero">
      <div className="about-hero__background">
        <div className="about-hero__overlay"></div>
      </div>
      
      <div className="container">
        <div className="about-hero__content">
          <div className="about-hero__breadcrumb">
            <span className="about-hero__breadcrumb-item">Home</span>
            <span className="about-hero__breadcrumb-separator">/</span>
            <span className="about-hero__breadcrumb-item active">About Page</span>
          </div>
          
          <h1 className="about-hero__title">About Page</h1>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

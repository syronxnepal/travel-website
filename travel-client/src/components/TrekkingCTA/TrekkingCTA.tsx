import React from 'react';
import './TrekkingCTA.scss';

const TrekkingCTA: React.FC = () => {
  return (
    <section className="trekking-cta">
      <div className="trekking-cta__background">
        <div className="trekking-cta__overlay"></div>
      </div>
      
      <div className="container">
        <div className="trekking-cta__content">
          <div className="trekking-cta__left">
            <div className="trekking-cta__badge">
              <i className="fa-solid fa-plane"></i>
              <span>SPECIAL OFFER FOR YOU</span>
            </div>
            
            <h2 className="trekking-cta__title">
              Let's Make Your Travel Dreams Come True
            </h2>
            
            <p className="trekking-cta__description">
              Discover amazing trekking destinations with our expert guides. 
              Get exclusive discounts and create unforgettable memories in the 
              world's most beautiful mountain ranges.
            </p>
            
            <button className="trekking-cta__btn btn btn--secondary">
              Start Booking
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          
          <div className="trekking-cta__right">
            <div className="trekking-cta__image">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop" 
                alt="Happy traveler" 
              />
              <div className="trekking-cta__discount-bubble">
                <span>50% Discount</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrekkingCTA;

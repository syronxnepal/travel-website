import React from 'react';
import './DestinationExperts.scss';
import SectionHeading from '../SectionHeading/Index';
import Button from '../Button/Index';

const DestinationExperts: React.FC = () => {
  return (
    <section className="destination-experts section">
      <div className="container">
        <div className="inner">
  
        <div className="destination-experts__content">
          <div className="destination-experts__image">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" 
              alt="Destination Expert" 
            />
          </div>
          
          <div className="destination-experts__text">
                                             <SectionHeading topTitle='Reach Us' title='We are available 24/7'  iconclassName="fa-solid fa-phone" />

            <p className="destination-experts__description">
              Our customer service team is available 24/7 via chat, email and whatsapp.
            </p>
           <Button  text='Contact Us' type='main-button' isLink link='#' />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationExperts;

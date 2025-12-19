import React from 'react';
import './ContactHero.scss';

const ContactHero: React.FC = () => {
  return (
    <section className="contact-hero">
      <div className="contact-hero__background">
        <div className="contact-hero__overlay"></div>
      </div>
      
      <div className="container">
        <div className="contact-hero__content">
          <div className="contact-hero__breadcrumb">
            <span className="contact-hero__breadcrumb-item">Home</span>
            <span className="contact-hero__breadcrumb-separator">/</span>
            <span className="contact-hero__breadcrumb-item active">Contact Us</span>
          </div>
          
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__subtitle">GET INTOUCH</p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

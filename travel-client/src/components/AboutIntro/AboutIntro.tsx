import React from 'react';
import './AboutIntro.scss';
import SectionHeading from '../SectionHeading/Index';

const AboutIntro: React.FC = () => {
  const features = [
    "Many variations of lorem",
    "Many variations of lorem", 
    "Expert many variations teacher"
  ];

  return (
    <section className="about-intro section">
      <div className="container">
        <div className="about-intro__content">
          <div className="about-intro__left">
            <SectionHeading 
              topTitle="GET TO KNOW US" 
              title="Experience the World with Our Company" 
              iconclassName="fa-solid fa-globe"
            />
            
            <div className="about-intro__description">
              <p>
                We understand that every journey has unique needs. Therefore, we offer customized travel packages 
                designed according to your preferences and budget. Our experienced team ensures that your travel 
                experience is seamless, memorable, and tailored to your specific requirements.
              </p>
            </div>

            <div className="about-intro__features">
              {features.map((feature, index) => (
                <div key={index} className="about-intro__feature">
                  <div className="about-intro__check">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* <div className="about-intro__cta">
              <button className="btn btn--primary">
                Explore More
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div> */}
          </div>

          <div className="about-intro__right">
            <div className="about-intro__image-grid">
              <div className="about-intro__image about-intro__image--main">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" 
                  alt="Travel experience" 
                />
                <div className="about-intro__image-overlay">
                  <div className="about-intro__rating">
                    <div className="about-intro__stars">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <span>4.5 Rating</span>
                  </div>
                  <h4>All Trips</h4>
                  <p>Some Amazing Text</p>
                </div>
              </div>
              
              <div className="about-intro__image about-intro__image--small about-intro__image--top">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=150&fit=crop" 
                  alt="Adventure begins" 
                />
                <div className="about-intro__image-text">
                  <i className="fa-solid fa-plane"></i>
                  <span>The Adventure Begins</span>
                </div>
              </div>
              
              <div className="about-intro__image about-intro__image--small about-intro__image--bottom">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop" 
                  alt="Beach resort" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;

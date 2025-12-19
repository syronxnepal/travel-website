import React from 'react';
import './AboutFeatures.scss';
import SectionHeading from '../SectionHeading/Index';

const AboutFeatures: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: <i className="fa-solid fa-certificate"></i>,
      title: "Professional & Certified",
      description: "Our team consists of certified travel professionals with years of experience in the industry."
    },
    {
      id: 2,
      icon: <i className="fa-solid fa-wallet"></i>,
      title: "Best Price Guarantee",
      description: "We offer competitive prices and guarantee the best value for your money."
    },
    {
      id: 3,
      icon: <i className="fa-solid fa-laptop"></i>,
      title: "Get Instant Tour Bookings",
      description: "Book your tours instantly with our user-friendly online platform."
    },
    {
      id: 4,
      icon: <i className="fa-solid fa-flag"></i>,
      title: "Experienced Guide",
      description: "Our experienced guides ensure you have the best possible travel experience."
    }
  ];

  return (
    <section className="about-features section">
      <div className="container">
        <div className="about-features__content">
          <div className="about-features__left">
            <SectionHeading 
              topTitle="WHY CHOOSE US" 
              title="Why You Should Choose Our Company" 
              iconclassName="fa-solid fa-star"
            />
            
            <div className="about-features__description">
              <p>
                Trevana combines years of experience with a commitment to excellence, ensuring your journey 
                is both exciting and seamless. We provide personalized service and attention to detail that 
                makes every trip unforgettable.
              </p>
            </div>

            <div className="about-features__cta">
              <button className="btn btn--primary">
                Explore More
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="about-features__right">
            <div className="about-features__grid">
              {features.map((feature) => (
                <div key={feature.id} className="about-features__feature">
                  <div className="about-features__icon">
                    {feature.icon}
                  </div>
                  <h3 className="about-features__title">{feature.title}</h3>
                  <p className="about-features__description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-features__images">
          <div className="about-features__image about-features__image--large">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop" 
              alt="Team members" 
            />
          </div>
          <div className="about-features__image about-features__image--small">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" 
              alt="Happy travelers" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;

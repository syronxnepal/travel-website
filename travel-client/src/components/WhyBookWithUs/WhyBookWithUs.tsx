import React from 'react';
import './WhyBookWithUs.scss';
import SectionHeading from '../SectionHeading/Index';

const WhyBookWithUs: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: <i className="fa-solid fa-phone-volume"></i>,
      title: '24/7 customer support',
      description: 'No matter the timezone, we\'re here to help.'
    },
    {
      id: 2,
      icon: <i className="fa-solid fa-money-bill-wheat"></i>,
      title: 'Earn rewards',
      description: 'Explore, earn, redeem, and repeat with our loyalty program.'
    },
    {
      id: 3,
      icon: <i className="fa-solid fa-magnifying-glass-location"></i>,
      title: 'Millions of reviews',
      description: 'Plan and book with confidence using reviews from fellow travelers.'
    },
    {
      id: 4,
      icon: <i className="fa-solid fa-calendar-days"></i>,
      title: 'Plan your way',
      description: 'Flexible cancellation and pay later with no extra cost.'
    },
    {
      id: 5,
      icon: <i className="fa-solid fa-heart-pulse"></i>,
      title: 'Insurance Coverage',
      description: 'Find a better price? We\'ll match it.'
    },
    {
      id: 5,
      icon: <i className="fa-solid fa-face-laugh-beam"></i>,
      title: 'Happy Memories',
      description: 'Find a better price? We\'ll match it.'
    }
  ];

  return (
    <section className="why-book section">
      <div className="container">
          <SectionHeading center topTitle='Choose US' title='Why Book With Us' iconclassName="fa-solid fa-map-pin" />

        <div className="inne">
          <div className="left">
            <div className="why-book__grid">
              {features.map((feature) => (
                <div key={feature.id} className="why-book__feature">
                  <div className="why-book__icon">
                    {feature.icon}
                  </div>
                  <h3 className="why-book__title">{feature.title}</h3>
                  {/* <p className="why-book__description">{feature.description}</p> */}
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="right-box">
              <div className="top">
                <span className="top-icon">
                  <i className="fa-solid fa-plane-departure"></i>
                </span>
                <div className="top-texts">
                  <h3>Adventure With Us</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima repellat at maiores illum,</p>
                </div>
              </div>
              <div className="right-options">
                <div className="option">
                  <span className="icon">
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                  </span>
                  <span className="text">Tours</span>
                </div>
                <div className="option">
                  <span className="icon">
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                  </span>
                  <span className="text">Destinations</span>
                </div>
              </div>
            </div>
            <div className="right-image">
              <img src="https://www.shutterstock.com/image-photo/big-group-happy-tourists-having-600nw-2416663047.jpg" alt="" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyBookWithUs;

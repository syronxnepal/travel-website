import React from 'react';
import './AboutStats.scss';

const AboutStats: React.FC = () => {
  const stats = [
    {
      id: 1,
      number: "168K+",
      label: "Happy Travelers"
    },
    {
      id: 2,
      number: "99%",
      label: "Satisfaction Rate"
    },
    {
      id: 3,
      number: "20+",
      label: "Years of Experience"
    },
    {
      id: 4,
      number: "15K+",
      label: "Destinations"
    }
  ];

  return (
    <section className="about-stats">
      <div className="about-stats__background">
        <div className="about-stats__overlay"></div>
      </div>
      
      <div className="container">
        <div className="about-stats__content">
          <h2 className="about-stats__title">
            We're Here To Take You To The Places You'll Love
          </h2>
          
          <div className="about-stats__grid">
            {stats.map((stat) => (
              <div key={stat.id} className="about-stats__stat">
                <div className="about-stats__number">{stat.number}</div>
                <div className="about-stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;

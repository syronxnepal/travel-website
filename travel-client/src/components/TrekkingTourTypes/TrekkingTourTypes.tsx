import React from 'react';
import './TrekkingTourTypes.scss';
import SectionHeading from '../SectionHeading/Index';

const TrekkingTourTypes: React.FC = () => {
  const tourTypes = [
    {
      id: 1,
      number: "02",
      icon: <i className="fa-solid fa-sailboat"></i>,
      title: "Windsurfing",
      description: "Lorem Ipsum has been industry standard.",
      isActive: true
    },
    {
      id: 2,
      number: "03",
      icon: <i className="fa-solid fa-parachute-box"></i>,
      title: "Paragliding",
      description: "Lorem Ipsum has been industry standard.",
      isActive: false
    },
    {
      id: 3,
      number: "04",
      icon: <i className="fa-solid fa-deer"></i>,
      title: "Wildlife",
      description: "Lorem Ipsum has been industry standard.",
      isActive: false
    },
    {
      id: 4,
      number: "05",
      icon: <i className="fa-solid fa-plane"></i>,
      title: "Hang Gliding",
      description: "Lorem Ipsum has been industry standard.",
      isActive: false
    },
    {
      id: 5,
      number: "06",
      icon: <i className="fa-solid fa-home"></i>,
      title: "Homestay",
      description: "Lorem Ipsum has been industry standard.",
      isActive: false
    }
  ];

  return (
    <section className="trekking-tour-types section">
      <div className="container">
        <SectionHeading 
          topTitle="+ SERVICE" 
          title="Choose Our Tour Types & Enjoy Now" 
          center
          iconclassName="fa-solid fa-mountain"
        />

        <div className="trekking-tour-types__grid">
          {tourTypes.map((tourType) => (
            <div 
              key={tourType.id} 
              className={`trekking-tour-types__card ${tourType.isActive ? 'active' : ''}`}
            >
              <div className="trekking-tour-types__number">{tourType.number}</div>
              <div className="trekking-tour-types__icon">{tourType.icon}</div>
              <h3 className="trekking-tour-types__title">{tourType.title}</h3>
              <p className="trekking-tour-types__description">{tourType.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekkingTourTypes;

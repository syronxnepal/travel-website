import React from 'react';
import './ContactInfo.scss';

const ContactInfo: React.FC = () => {
  const contactDetails = [
    {
      id: 1,
      icon: <i className="fa-solid fa-location-dot"></i>,
      title: "Address",
      value: "229 Queensberry Street, North Mel. Australia."
    },
    {
      id: 2,
      icon: <i className="fa-solid fa-envelope"></i>,
      title: "Email Address",
      value: "support@example.com"
    },
    {
      id: 3,
      icon: <i className="fa-solid fa-phone"></i>,
      title: "Phone No",
      value: "+123 456 789 963"
    },
    {
      id: 4,
      icon: <i className="fa-solid fa-clock"></i>,
      title: "Contactable Hours",
      value: "Mon-Sun: 12 Hours"
    }
  ];

  return (
    <section className="contact-info section">
      <div className="container">
        <div className="contact-info__content">
          <div className="contact-info__grid">
            {contactDetails.map((detail) => (
              <div key={detail.id} className="contact-info__item">
                <div className="contact-info__icon">
                  {detail.icon}
                </div>
                <div className="contact-info__details">
                  <h3 className="contact-info__title">{detail.title}</h3>
                  <p className="contact-info__value">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;

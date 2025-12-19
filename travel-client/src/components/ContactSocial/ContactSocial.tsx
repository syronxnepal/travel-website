import React from 'react';
import './ContactSocial.scss';

const ContactSocial: React.FC = () => {
  const socialLinks = [
    {
      id: 1,
      name: 'Facebook',
      icon: <i className="fa-brands fa-facebook"></i>,
      url: '#'
    },
    {
      id: 2,
      name: 'Instagram',
      icon: <i className="fa-brands fa-instagram"></i>,
      url: '#'
    },
    {
      id: 3,
      name: 'Twitter',
      icon: <i className="fa-brands fa-twitter"></i>,
      url: '#'
    },
    {
      id: 4,
      name: 'Pinterest',
      icon: <i className="fa-brands fa-pinterest"></i>,
      url: '#'
    },
    {
      id: 5,
      name: 'TikTok',
      icon: <i className="fa-brands fa-tiktok"></i>,
      url: '#'
    }
  ];

  return (
    <section className="section contact-social">
      <div className="container">
        <div className="contact-social__content">
          <h2 className="contact-social__title">Follow Us:</h2>
          <div className="contact-social__links">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="contact-social__link"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSocial;

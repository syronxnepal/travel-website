import React from 'react';
import './AboutTeam.scss';
import SectionHeading from '../SectionHeading/Index';

const AboutTeam: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jessica Brown",
      position: "Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Yoni Albert",
      position: "Supporter",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    }
  ];

  return (
    <section className="about-team section">
      <div className="container">
        <SectionHeading 
          topTitle="OUR GUIDE" 
          title="Meet Our Experience Guide" 
          center
          iconclassName="fa-solid fa-users"
        />

        <div className="about-team__content">
          <div className="about-team__members">
            {teamMembers.map((member) => (
              <div key={member.id} className="about-team__member">
                <div className="about-team__image">
                  <img src={member.image} alt={member.name} />
                  <div className="about-team__overlay">
                    <div className="about-team__social">
                      <a href={member.social.facebook} className="about-team__social-link">
                        <i className="fa-brands fa-facebook"></i>
                      </a>
                      <a href={member.social.twitter} className="about-team__social-link">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a href={member.social.instagram} className="about-team__social-link">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a href={member.social.linkedin} className="about-team__social-link">
                        <i className="fa-brands fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="about-team__info">
                  <h3 className="about-team__name">{member.name}</h3>
                  <p className="about-team__position">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-team__sponsors">
          <div className="about-team__sponsor">
            <img src="https://via.placeholder.com/120x40/007bff/ffffff?text=envato" alt="Envato" />
          </div>
          <div className="about-team__sponsor">
            <img src="https://via.placeholder.com/120x40/28a745/ffffff?text=envato" alt="Envato" />
          </div>
          <div className="about-team__sponsor">
            <img src="https://via.placeholder.com/120x40/dc3545/ffffff?text=envato" alt="Envato" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;

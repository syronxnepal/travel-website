import React from 'react';
import './ContactIntro.scss';
import SectionHeading from '../SectionHeading/Index';
import ContactForm from '../ContactForm/ContactForm';

const ContactIntro: React.FC = () => {
  // const teamMembers = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  //   },
  //   {
  //     id: 3,
  //     name: "Emily Davis",
  //     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  //   },
  //   {
  //     id: 4,
  //     name: "David Wilson",
  //     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  //   }
  // ];

  return (
    <section className="contact-intro section">
      <div className="container">
        <div className="contact-intro__content">
          <div className="contact-intro__left">
            <SectionHeading 
              topTitle="CONTACT US" 
              title="Want to Talk to Us?" 
              iconclassName="fa-solid fa-users"
            />
            
            <div className="contact-intro__description">
              <p>
                Our dedicated support team is always ready to assist you with any questions or issues, 
                
              </p>
            </div>

           <div className="social-icon-container">
              <div className="social-box">
                <div className="icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="details">
                  <div className="title">Phone</div>
                  <div className="info">+977 9800000000</div>
                </div>
              </div>
              <div className="social-box">
              <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="details">
                <div className="title">Address</div>
                <div className="info">Sydney, Australia</div>
              </div>
            </div>
            <div className="social-box">
              <div className="icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="details">
                <div className="title">Email</div>
                <div className="info">info@mymail.com</div>
              </div>
            </div>
            <div className="social-box">
              <div className="icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div className="details">
                <div className="title">Conttactable Hours</div>
                <div className="info">Mon- Sun, 91m - 6pm</div>
              </div>
            </div>
           </div>
          </div>

          <div className="contact-intro__right">
           <ContactForm />
            </div>
          </div>
        </div>
    </section>
  );
};

export default ContactIntro;

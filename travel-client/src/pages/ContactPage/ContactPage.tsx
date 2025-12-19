import React from 'react';
import PageHero from '../../components/PageHero/PageHero';
import ContactIntro from '../../components/ContactIntro/ContactIntro';
import ContactSocial from '../../components/ContactSocial/ContactSocial';
import Footer from '../../components/Footer/Footer';
import './ContactPage.scss';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <PageHero
        title="Contact Us"
        subtitle="GET IN TOUCH"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact Us', isActive: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
      />
      <ContactIntro />
      {/* <ContactInfo /> */}
      <ContactSocial />
      {/* <ContactForm /> */}
      <Footer />
    </div>
  );
};

export default ContactPage;

import React from 'react';
import PageHero from '../../components/PageHero/PageHero';
import AboutIntro from '../../components/AboutIntro/AboutIntro';
// import AboutFeatures from '../../components/AboutFeatures/AboutFeatures';
// import AboutTeam from '../../components/AboutTeam/AboutTeam';
// import AboutStats from '../../components/AboutStats/AboutStats';
// import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';
import './AboutPage.scss';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <PageHero
        title="About Us"
        subtitle="GET TO KNOW US"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us', isActive: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
      />
      <AboutIntro />
      {/* 
      <AboutFeatures />
      <AboutStats />
      <AboutTeam />
      <Testimonials /> */}
      <Footer />
    </div>
  );
};

export default AboutPage;

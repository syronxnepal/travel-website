import React from 'react';
import PageHero from '../../components/PageHero/PageHero';
import './OurStoryPage.scss';
import Footer from '../../components/Footer/Footer';

const OurStoryPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Our Story', path: '/our-story' }
  ];

  return (
    <>
    <div className="our-story-page">
      <PageHero
        title="Our Story"
        subtitle="Discover the journey that brought us here"
        breadcrumbs={breadcrumbs}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop"
      />
      
      <div className="our-story-page__main">
        <div className="container">
          <div className="our-story-page__content">
            <div className="our-story-page__section">
              <h2>How It All Began</h2>
              <p>
                Our journey started in 2010 when our founder, Sarah Johnson, embarked on her first trek to Everest Base Camp. 
                What began as a personal adventure quickly transformed into a passion for sharing the beauty and culture of Nepal 
                with travelers from around the world.
              </p>
              <p>
                After years of exploring the Himalayas and understanding the unique needs of travelers, Sarah founded Travel Adventures 
                with a simple mission: to create authentic, sustainable, and unforgettable travel experiences that connect people with 
                the natural beauty and rich culture of Nepal.
              </p>
            </div>

            <div className="our-story-page__section">
              <h2>Our Mission</h2>
              <p>
                We believe that travel has the power to transform lives, build bridges between cultures, and create lasting memories. 
                Our mission is to provide exceptional travel experiences that are not only memorable but also responsible and sustainable.
              </p>
              <div className="our-story-page__values">
                <div className="our-story-page__value">
                  <h3>Authenticity</h3>
                  <p>We provide genuine experiences that showcase the real Nepal, its people, and its culture.</p>
                </div>
                <div className="our-story-page__value">
                  <h3>Sustainability</h3>
                  <p>We are committed to responsible tourism that benefits local communities and preserves the environment.</p>
                </div>
                <div className="our-story-page__value">
                  <h3>Excellence</h3>
                  <p>We strive for the highest standards in everything we do, from planning to execution.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
            <Footer />
            </>
  );
};

export default OurStoryPage;

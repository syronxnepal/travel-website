import React from 'react';
import PageHero from '../../components/PageHero/PageHero';
import './WhyChooseUsPage.scss';
import Footer from '../../components/Footer/Footer';

const WhyChooseUsPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Why Choose Us', path: '/why-choose-us' }
  ];

  const features = [
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Safety First',
      description: 'We prioritize your safety with certified guides, quality equipment, and comprehensive insurance coverage for all our adventures.'
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Expert Local Guides',
      description: 'Our experienced local guides have intimate knowledge of the terrain, culture, and best practices for safe and enjoyable adventures.'
    },
    {
      icon: 'fa-solid fa-leaf',
      title: 'Sustainable Tourism',
      description: 'We are committed to responsible tourism that benefits local communities and preserves the natural environment for future generations.'
    },
    {
      icon: 'fa-solid fa-star',
      title: 'Exceptional Service',
      description: 'From planning to execution, we provide personalized service and attention to detail that exceeds expectations.'
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Local Partnerships',
      description: 'We work closely with local communities, ensuring your travel directly benefits the people and places you visit.'
    },
    {
      icon: 'fa-solid fa-clock',
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to assist you before, during, and after your adventure.'
    }
  ];

  // const testimonials = [
  //   {
  //     name: 'Emily Chen',
  //     location: 'New York, USA',
  //     rating: 5,
  //     text: 'The Everest Base Camp trek was absolutely incredible. The guides were knowledgeable, the equipment was top-notch, and the experience was life-changing.'
  //   },
  //   {
  //     name: 'James Wilson',
  //     location: 'London, UK',
  //     rating: 5,
  //     text: 'Travel Adventures made our Nepal trip unforgettable. Their attention to detail and commitment to sustainable tourism really impressed us.'
  //   },
  //   {
  //     name: 'Maria Rodriguez',
  //     location: 'Barcelona, Spain',
  //     rating: 5,
  //     text: 'The cultural tour was amazing! Our guide Priya shared so much knowledge about local traditions. Highly recommend this company.'
  //   }
  // ];

  return (
    <>
    <div className="why-choose-us-page">
      <PageHero
        title="Why Choose Us"
        subtitle="Discover what makes us the preferred choice for your Nepal adventure"
        breadcrumbs={breadcrumbs}
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
      />
      
      <div className="why-choose-us-page__main">
        <div className="container">
          <div className="why-choose-us-page__content">
            <div className="why-choose-us-page__intro">
              <h2>What Sets Us Apart</h2>
              <p>
                With over a decade of experience in adventure tourism, we have built a reputation for excellence, 
                safety, and unforgettable experiences. Here's why thousands of travelers choose us for their Nepal adventures.
              </p>
            </div>

            <div className="why-choose-us-page__features">
              {features.map((feature, index) => (
                <div key={index} className="why-choose-us-page__feature">
                  <div className="why-choose-us-page__feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>

           
          </div>
        </div>
      </div>

    </div>
      <Footer />
      </>
  );
};

export default WhyChooseUsPage;

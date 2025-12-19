import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import TopTreks from '../../components/TopTreks/TopTreks';
import WhyBookWithUs from '../../components/WhyBookWithUs/WhyBookWithUs';
import DestinationExperts from '../../components/DestinationExperts/DestinationExperts';
import TopToursAndShortTours from '../../components/TopToursAndShortTours/TopToursAndShortTours';
import Testimonials from '../../components/Testimonials/Testimonials';
import BlogSection from '../../components/BlogSection/BlogSection';
import GallerySection from '../../components/GallerySection/GallerySection';
import Footer from '../../components/Footer/Footer';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <HeroSection />
      <TopTreks />
      <TopToursAndShortTours />
      <WhyBookWithUs />
      <Testimonials />
      <BlogSection />
      <GallerySection />
      <DestinationExperts />
      <Footer />
    </div>
  );
};

export default HomePage;

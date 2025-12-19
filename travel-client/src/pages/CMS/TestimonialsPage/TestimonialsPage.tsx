import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import TestimonialsCMS from 'src/components/CMS/TestimonialsCMS/TestimonialsCMS';
import 'src/pages/CMS/CMSPage.scss';

const TestimonialsPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-quote-left"></i>
            Testimonials
          </h2>
          <p className="cms-page__description">
            Manage customer testimonials and reviews
          </p>
        </div>
        <div className="cms-page__content">
          <TestimonialsCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default TestimonialsPage;

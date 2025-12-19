import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import WhyBookWithUsCMS from 'src/components/CMS/WhyBookWithUsCMS/WhyBookWithUsCMS';
import 'src/pages/CMS/CMSPage.scss';

const WhyBookWithUsPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-star"></i>
            Why Book With Us
          </h2>
          <p className="cms-page__description">
            Manage features and benefits section
          </p>
        </div>
        <div className="cms-page__content">
          <WhyBookWithUsCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default WhyBookWithUsPage;

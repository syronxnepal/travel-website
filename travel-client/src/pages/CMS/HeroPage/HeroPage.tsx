import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import HeroCMS from 'src/components/CMS/HeroCMS/HeroCMS';
import 'src/pages/CMS/CMSPage.scss';

const HeroPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-home"></i>
            Hero Section
          </h2>
          <p className="cms-page__description">
            Manage hero banner, search form, and main call-to-action
          </p>
        </div>
        <div className="cms-page__content">
          <HeroCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default HeroPage;

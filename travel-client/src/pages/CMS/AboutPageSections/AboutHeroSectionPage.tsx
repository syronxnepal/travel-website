import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import 'src/pages/CMS/CMSPage.scss';
import 'src/pages/CMS/HomePageSections/HomePageSections.scss';

const AboutHeroSectionPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="section-cms">
          <div className="section-cms__header">
            <h3>About Page - Hero Section</h3>
            <p>Configure the hero section for the About page</p>
          </div>
          
          <div className="section-cms__content">
            <div className="section-cms__placeholder">
              <i className="fa-solid fa-home"></i>
              <h4>Hero Section Configuration</h4>
              <p>This section will allow you to manage the hero section for your About page.</p>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

export default AboutHeroSectionPage;


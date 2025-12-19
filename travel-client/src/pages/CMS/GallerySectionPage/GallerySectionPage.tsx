import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import GallerySectionCMS from 'src/components/CMS/GallerySectionCMS/GallerySectionCMS';
import 'src/pages/CMS/CMSPage.scss';

const GallerySectionPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-images"></i>
            Gallery Section
          </h2>
          <p className="cms-page__description">
            Manage photo gallery and featured images
          </p>
        </div>
        <div className="cms-page__content">
          <GallerySectionCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default GallerySectionPage;

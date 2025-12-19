import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import TopToursAndShortToursCMS from 'src/components/CMS/TopToursAndShortToursCMS/TopToursAndShortToursCMS';
import 'src/pages/CMS/CMSPage.scss';

const ToursPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-plane"></i>
            Tours
          </h2>
          <p className="cms-page__description">
            Manage tours and short tours, mark them as featured
          </p>
        </div>
        <div className="cms-page__content">
          <TopToursAndShortToursCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default ToursPage;

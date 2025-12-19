import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import TopTreksCMS from 'src/components/CMS/TopTreksCMS/TopTreksCMS';
import 'src/pages/CMS/CMSPage.scss';

const TreksPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-mountain"></i>
            Treks
          </h2>
          <p className="cms-page__description">
            Manage trekking destinations and mark them as featured
          </p>
        </div>
        <div className="cms-page__content">
          <TopTreksCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default TreksPage;

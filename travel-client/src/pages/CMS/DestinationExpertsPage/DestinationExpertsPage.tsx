import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DestinationExpertsCMS from 'src/components/CMS/DestinationExpertsCMS/DestinationExpertsCMS';
import 'src/pages/CMS/CMSPage.scss';

const DestinationExpertsPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-users"></i>
            Destination Experts
          </h2>
          <p className="cms-page__description">
            Manage expert profiles and team information
          </p>
        </div>
        <div className="cms-page__content">
          <DestinationExpertsCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default DestinationExpertsPage;

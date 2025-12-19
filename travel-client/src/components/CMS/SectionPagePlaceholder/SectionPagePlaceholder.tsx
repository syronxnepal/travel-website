import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import 'src/pages/CMS/CMSPage.scss';
import 'src/pages/CMS/HomePageSections/HomePageSections.scss';

interface SectionPagePlaceholderProps {
  pageName: string;
  sectionName: string;
  icon: string;
  description: string;
}

const SectionPagePlaceholder: React.FC<SectionPagePlaceholderProps> = ({ 
  pageName, 
  sectionName, 
  icon, 
  description 
}) => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="section-cms">
          <div className="section-cms__header">
            <h3>{sectionName}</h3>
            <p>{description}</p>
          </div>
          
          <div className="section-cms__content">
            <div className="section-cms__placeholder">
              <i className={`fa-solid ${icon}`}></i>
              <h4>{sectionName} Configuration</h4>
              <p>This section will allow you to manage the {sectionName.toLowerCase()} for your {pageName}.</p>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

export default SectionPagePlaceholder;


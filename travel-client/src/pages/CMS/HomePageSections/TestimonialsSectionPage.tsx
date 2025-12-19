import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import 'src/pages/CMS/HomePageSections/HomePageSections.scss';

const TestimonialsSectionPageContent: React.FC = () => {
  const { performAction } = useCRUD();
  const [formData, setFormData] = useState({
    topTitle: 'Testimonials',
    heading: 'What Our Customers Say'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    performAction(
      () => console.log('Saving:', formData),
      'Settings saved successfully!',
      'success'
    );
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="section-cms">
          <div className="section-cms__header">
            <h3>Testimonials Section - Top Title & Heading</h3>
            <p>Configure the top title and heading for the Testimonials section on the homepage</p>
          </div>
          
          <div className="section-cms__content">
            <form className="section-cms__form" onSubmit={handleSave}>
              <FormField
                label="Top Title"
                name="topTitle"
                type="text"
                value={formData.topTitle}
                onChange={(value) => setFormData({ ...formData, topTitle: value })}
                placeholder="Enter top title"
                required
              />
              
              <FormField
                label="Heading"
                name="heading"
                type="textarea"
                value={formData.heading}
                onChange={(value) => setFormData({ ...formData, heading: value })}
                placeholder="Enter heading"
                rows={3}
                required
              />
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-save"></i>
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

const TestimonialsSectionPage: React.FC = () => {
  return (
    <CRUDProvider>
      <TestimonialsSectionPageContent />
    </CRUDProvider>
  );
};

export default TestimonialsSectionPage;

// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import './ContactPageSections.scss';

interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
}

const ContactInfoPageContent: React.FC = () => {
  const { performAction } = useCRUD();
  
  const [detailSection, setDetailSection] = useState({
    topTitle: 'Contact Us',
    heading: 'Get in Touch'
  });
  
  const [formSection, setFormSection] = useState({
    topTitle: 'Send Us a Message',
    heading: 'We\'d Love to Hear From You'
  });
  
  const [contactInfo, setContactInfo] = useState({
    email: 'info@travelexample.com',
    address: '123 Main Street, Kathmandu, Nepal',
    contactHours: 'Monday - Friday: 9:00 AM - 6:00 PM'
  });
  
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([
    {
      id: '1',
      platform: 'Facebook',
      url: 'https://facebook.com/travelexample'
    },
    {
      id: '2',
      platform: 'Instagram',
      url: 'https://instagram.com/travelexample'
    },
    {
      id: '3',
      platform: 'Twitter',
      url: 'https://twitter.com/travelexample'
    }
  ]);
  
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState<SocialMediaLink | null>(null);
  const [socialFormData, setSocialFormData] = useState<Partial<SocialMediaLink>>({});

  const platformOptions = [
    'Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube', 
    'Pinterest', 'TikTok', 'WhatsApp', 'Telegram', 'Viber'
  ];

  const socialColumns = [
    {
      key: 'platform',
      label: 'Platform',
      render: (value: string) => (
        <div className="contact-info__cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'url',
      label: 'URL',
      render: (value: string) => (
        <div className="contact-info__cell">
          <a href={value} target="_blank" rel="noopener noreferrer" className="contact-info__link">
            {value}
          </a>
        </div>
      )
    }
  ];

  const handleAddSocialLink = () => {
    setEditingSocialLink(null);
    setSocialFormData({});
    setIsSocialModalOpen(true);
  };

  const handleEditSocialLink = (link: SocialMediaLink) => {
    setEditingSocialLink(link);
    setSocialFormData(link);
    setIsSocialModalOpen(true);
  };

  const handleDeleteSocialLink = (link: SocialMediaLink) => {
    performAction(
      () => setSocialLinks(socialLinks.filter(l => l.id !== link.id)),
      'Social media link deleted successfully',
      'success'
    );
  };

  const handleSaveSocialLink = () => {
    if (editingSocialLink) {
      performAction(
        () => {
          setSocialLinks(socialLinks.map(link =>
            link.id === editingSocialLink.id
              ? { ...socialFormData as SocialMediaLink }
              : link
          ));
          setIsSocialModalOpen(false);
          setEditingSocialLink(null);
          setSocialFormData({});
        },
        'Social media link updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newLink: SocialMediaLink = {
            id: Date.now().toString(),
            platform: socialFormData.platform || '',
            url: socialFormData.url || ''
          };
          setSocialLinks([...socialLinks, newLink]);
          setIsSocialModalOpen(false);
          setEditingSocialLink(null);
          setSocialFormData({});
        },
        'Social media link added successfully',
        'success'
      );
    }
  };

  const handleSaveSection = (sectionName: string) => {
    performAction(
      () => {
        console.log(`${sectionName} saved`);
      },
      `${sectionName} saved successfully`,
      'success'
    );
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="contact-info">
          <div className="contact-info__header">
            <h3>Contact Page - Information</h3>
            <p>Manage contact details, social media links, and form sections</p>
          </div>

          {/* Detail Section Header */}
          <div className="contact-info__card">
            <div className="contact-info__card-header">
              <h4>Detail Section Header</h4>
            </div>
            <div className="contact-info__form">
              <FormField
                label="Top Title"
                name="detailTopTitle"
                type="text"
                value={detailSection.topTitle}
                onChange={(value) => setDetailSection({ ...detailSection, topTitle: value })}
                placeholder="Enter top title"
              />
              <FormField
                label="Heading"
                name="detailHeading"
                type="text"
                value={detailSection.heading}
                onChange={(value) => setDetailSection({ ...detailSection, heading: value })}
                placeholder="Enter heading"
              />
              <button 
                className="btn btn-primary" 
                onClick={() => handleSaveSection('Detail section')}
              >
                Save Detail Section
              </button>
            </div>
          </div>

          {/* Form Section Header */}
          <div className="contact-info__card">
            <div className="contact-info__card-header">
              <h4>Form Section Header</h4>
            </div>
            <div className="contact-info__form">
              <FormField
                label="Top Title"
                name="formTopTitle"
                type="text"
                value={formSection.topTitle}
                onChange={(value) => setFormSection({ ...formSection, topTitle: value })}
                placeholder="Enter top title"
              />
              <FormField
                label="Heading"
                name="formHeading"
                type="text"
                value={formSection.heading}
                onChange={(value) => setFormSection({ ...formSection, heading: value })}
                placeholder="Enter heading"
              />
              <button 
                className="btn btn-primary" 
                onClick={() => handleSaveSection('Form section')}
              >
                Save Form Section
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info__card">
            <div className="contact-info__card-header">
              <h4>Contact Information</h4>
            </div>
            <div className="contact-info__form">
              <FormField
                label="Email"
                name="email"
                type="email"
                value={contactInfo.email}
                onChange={(value) => setContactInfo({ ...contactInfo, email: value })}
                placeholder="Enter email address"
              />
              <FormField
                label="Address"
                name="address"
                type="text"
                value={contactInfo.address}
                onChange={(value) => setContactInfo({ ...contactInfo, address: value })}
                placeholder="Enter address"
              />
              <FormField
                label="Contact Hours"
                name="contactHours"
                type="text"
                value={contactInfo.contactHours}
                onChange={(value) => setContactInfo({ ...contactInfo, contactHours: value })}
                placeholder="Enter contact hours"
              />
              <button 
                className="btn btn-primary" 
                onClick={() => handleSaveSection('Contact information')}
              >
                Save Contact Information
              </button>
            </div>
          </div>

          {/* Social Media Links Table */}
          <div className="contact-info__card">
            <div className="contact-info__card-header">
              <h4>Social Media Links</h4>
            </div>
            <div className="contact-info__content">
              <DataTable
                data={socialLinks}
                columns={socialColumns}
                onAdd={handleAddSocialLink}
                onEdit={handleEditSocialLink}
                onDelete={handleDeleteSocialLink}
                searchable
                emptyMessage="No social media links yet"
              />
            </div>
          </div>

          {/* Social Media Link Modal */}
          <Modal
            isOpen={isSocialModalOpen}
            onClose={() => setIsSocialModalOpen(false)}
            title={editingSocialLink ? 'Edit Social Media Link' : 'Add Social Media Link'}
            size="md"
          >
            <div className="contact-info__form">
              <FormField
                label="Platform"
                name="platform"
                type="select"
                value={socialFormData.platform || ''}
                onChange={(value) => setSocialFormData({ ...socialFormData, platform: value })}
                options={platformOptions}
                required
              />
              <FormField
                label="URL"
                name="url"
                type="text"
                value={socialFormData.url || ''}
                onChange={(value) => setSocialFormData({ ...socialFormData, url: value })}
                placeholder="Enter social media URL"
                required
              />
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsSocialModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveSocialLink}>
                  {editingSocialLink ? 'Update' : 'Add'} Link
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const ContactInfoPage: React.FC = () => {
  return (
    <CRUDProvider>
      <ContactInfoPageContent />
    </CRUDProvider>
  );
};

export default ContactInfoPage;


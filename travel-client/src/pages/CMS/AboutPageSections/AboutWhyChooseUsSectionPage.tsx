import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import './AboutPageSections.scss';

interface WhyChooseUsItem {
  id: string;
  heading: string;
  paragraph: string;
  icon: string;
}

const AboutWhyChooseUsSectionPageContent: React.FC = () => {
  const { performAction } = useCRUD();
  const [sectionData, setSectionData] = useState({
    heading: 'Why Choose Us',
    paragraph: 'Discover what makes us the perfect travel companion for your adventures.'
  });
  
  const [whyChooseUsItems, setWhyChooseUsItems] = useState<WhyChooseUsItem[]>([
    {
      id: '1',
      heading: 'Expert Guides',
      paragraph: 'Our experienced guides ensure safe and memorable adventures.',
      icon: 'fa-users'
    },
    {
      id: '2',
      heading: 'Best Prices',
      paragraph: 'Competitive pricing with no hidden fees.',
      icon: 'fa-dollar-sign'
    },
    {
      id: '3',
      heading: '24/7 Support',
      paragraph: 'Round-the-clock customer support for your peace of mind.',
      icon: 'fa-headset'
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WhyChooseUsItem | null>(null);
  const [formData, setFormData] = useState<Partial<WhyChooseUsItem>>({});

  const iconOptions = [
    { value: 'fa-users', label: 'Users' },
    { value: 'fa-dollar-sign', label: 'Dollar Sign' },
    { value: 'fa-shield-alt', label: 'Shield' },
    { value: 'fa-heart', label: 'Heart' },
    { value: 'fa-star', label: 'Star' },
    { value: 'fa-clock', label: 'Clock' },
    { value: 'fa-headset', label: 'Headset' },
    { value: 'fa-award', label: 'Award' },
    { value: 'fa-globe', label: 'Globe' },
    { value: 'fa-mountain', label: 'Mountain' },
    { value: 'fa-plane', label: 'Plane' },
    { value: 'fa-hotel', label: 'Hotel' }
  ];

  const columns = [
    {
      key: 'icon',
      label: 'Icon',
      width: '80px',
      render: (_: string, item: WhyChooseUsItem) => (
        <div className="why-choose-us__icon-cell">
          <i className={`fa-solid ${item.icon}`}></i>
        </div>
      )
    },
    {
      key: 'heading',
      label: 'Heading',
      render: (value: string) => (
        <div className="why-choose-us__cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'paragraph',
      label: 'Paragraph',
      render: (value: string) => (
        <div className="why-choose-us__cell">
          {value.length > 60 ? `${value.substring(0, 60)}...` : value}
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: WhyChooseUsItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: WhyChooseUsItem) => {
    performAction(
      () => setWhyChooseUsItems(whyChooseUsItems.filter(i => i.id !== item.id)),
      'Item deleted successfully',
      'success'
    );
  };

  const handleSaveItem = () => {
    if (editingItem) {
      performAction(
        () => {
          setWhyChooseUsItems(whyChooseUsItems.map(item =>
            item.id === editingItem.id
              ? { ...formData as WhyChooseUsItem }
              : item
          ));
          setIsModalOpen(false);
          setEditingItem(null);
          setFormData({});
        },
        'Item updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newItem: WhyChooseUsItem = {
            id: Date.now().toString(),
            heading: formData.heading || '',
            paragraph: formData.paragraph || '',
            icon: formData.icon || 'fa-star'
          };
          setWhyChooseUsItems([...whyChooseUsItems, newItem]);
          setIsModalOpen(false);
          setEditingItem(null);
          setFormData({});
        },
        'Item added successfully',
        'success'
      );
    }
  };

  const handleSaveSection = () => {
    performAction(
      () => {
        console.log('Section saved:', sectionData);
      },
      'Section saved successfully',
      'success'
    );
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="about-section">
          <div className="about-section__header">
            <h3>About Page - Why Choose Us Section</h3>
            <p>Manage the why choose us section for your About page</p>
          </div>

          {/* Section Header */}
          <div className="about-section__card">
            <div className="about-section__card-header">
              <h4>Section Header</h4>
            </div>
            <div className="about-section__form">
              <FormField
                label="Heading"
                name="heading"
                type="text"
                value={sectionData.heading}
                onChange={(value) => setSectionData({ ...sectionData, heading: value })}
                placeholder="Enter section heading"
              />
              <FormField
                label="Paragraph"
                name="paragraph"
                type="textarea"
                value={sectionData.paragraph}
                onChange={(value) => setSectionData({ ...sectionData, paragraph: value })}
                placeholder="Enter section paragraph"
                rows={4}
              />
              <button className="btn btn-primary" onClick={handleSaveSection}>
                Save Section Header
              </button>
            </div>
          </div>

          {/* Why Choose Us Items Table */}
          <div className="about-section__card">
            <div className="about-section__card-header">
              <h4>Why Choose Us Items</h4>
            </div>
            <div className="about-section__content">
              <DataTable
                data={whyChooseUsItems}
                columns={columns}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchable
                emptyMessage="No items yet"
              />
            </div>
          </div>

          {/* Add/Edit Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingItem ? 'Edit Item' : 'Add New Item'}
            size="md"
          >
            <div className="about-section__form">
              <FormField
                label="Icon"
                name="icon"
                type="select"
                value={formData.icon || 'fa-star'}
                onChange={(value) => setFormData({ ...formData, icon: value })}
                options={iconOptions}
                required
              />
              <FormField
                label="Heading"
                name="heading"
                type="text"
                value={formData.heading || ''}
                onChange={(value) => setFormData({ ...formData, heading: value })}
                placeholder="Enter item heading"
                required
              />
              <FormField
                label="Paragraph"
                name="paragraph"
                type="textarea"
                value={formData.paragraph || ''}
                onChange={(value) => setFormData({ ...formData, paragraph: value })}
                placeholder="Enter item paragraph"
                rows={4}
                required
              />
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveItem}>
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const AboutWhyChooseUsSectionPage: React.FC = () => {
  return (
    <CRUDProvider>
      <AboutWhyChooseUsSectionPageContent />
    </CRUDProvider>
  );
};

export default AboutWhyChooseUsSectionPage;


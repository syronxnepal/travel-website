// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import 'src/pages/CMS/HomePageSections/HomePageSections.scss';

interface HeroSliderItem {
  id: string;
  image: string;
  title: string;
  paragraph: string;
  order: number;
}

const HeroSectionPageContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [sliderItems, setSliderItems] = useState<HeroSliderItem[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      title: 'Discover Amazing Adventures',
      paragraph: 'Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.',
      order: 1
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeroSliderItem | null>(null);
  const [formData, setFormData] = useState<Partial<HeroSliderItem>>({});

  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '120px',
      render: (value: string) => (
        <div className="hero-slider-cell__image">
          <img src={value} alt="Hero" />
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title'
    },
    {
      key: 'paragraph',
      label: 'Paragraph',
      render: (value: string) => (
        <div className="hero-slider-cell__paragraph">
          {value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </div>
      )
    },
    {
      key: 'order',
      label: 'Order',
      width: '80px'
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: HeroSliderItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: HeroSliderItem) => {
    showDeleteConfirmation(item, () => {
      performAction(
        () => setSliderItems(sliderItems.filter(i => i.id !== item.id)),
        'Slider item deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (editingItem) {
      performAction(
        () => {
          setSliderItems(sliderItems.map(item => 
            item.id === editingItem.id 
              ? { ...formData as HeroSliderItem }
              : item
          ));
          setIsModalOpen(false);
          setEditingItem(null);
          setFormData({});
        },
        'Slider item updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newItem: HeroSliderItem = {
            id: Date.now().toString(),
            image: formData.image || '',
            title: formData.title || '',
            paragraph: formData.paragraph || '',
            order: sliderItems.length + 1
          };
          setSliderItems([...sliderItems, newItem]);
          setIsModalOpen(false);
          setEditingItem(null);
          setFormData({});
        },
        'Slider item added successfully',
        'success'
      );
    }
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="hero-section-cms">
          <div className="hero-section-cms__header">
            <h3>Hero Section - Slider Management</h3>
            <p>Manage the hero section slider items for the homepage</p>
          </div>
          
          <div className="hero-section-cms__content">
            <DataTable
              data={sliderItems}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No slider items added yet"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingItem ? 'Edit Slider Item' : 'Add Slider Item'}
            size="lg"
          >
            <div className="hero-section-cms__form">
              <ImageUpload
                label="Slider Image"
                name="image"
                value={formData.image || ''}
                onChange={(value) => setFormData({ ...formData, image: value })}
                placeholder="Upload or enter image URL"
              />
              
              <FormField
                label="Title"
                name="title"
                type="text"
                value={formData.title || ''}
                onChange={(value) => setFormData({ ...formData, title: value })}
                placeholder="Enter slider title"
                required
              />
              
              <FormField
                label="Paragraph"
                name="paragraph"
                type="textarea"
                value={formData.paragraph || ''}
                onChange={(value) => setFormData({ ...formData, paragraph: value })}
                placeholder="Enter slider paragraph"
                rows={4}
                required
              />
              
              <FormField
                label="Display Order"
                name="order"
                type="number"
                value={formData.order || sliderItems.length + 1}
                onChange={(value) => setFormData({ ...formData, order: parseInt(value) })}
                placeholder="Enter display order"
                required
                min="1"
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingItem ? 'Update' : 'Add'} Slider
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const HeroSectionPage: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Slider Item',
        message: 'Are you sure you want to delete this slider item?',
        type: 'slider item'
      }}
    >
      <HeroSectionPageContent />
    </CRUDProvider>
  );
};

export default HeroSectionPage;




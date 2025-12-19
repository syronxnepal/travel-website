import React, { useState } from 'react';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import 'src/components/CMS/HeroCMS/HeroCMS.scss';

interface HeroData {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  searchPlaceholder: string;
  destinations: string[];
  isActive: boolean;
}

const HeroCMS: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData[]>([
    {
      id: '1',
      title: 'Discover Amazing Places',
      subtitle: 'Find your next adventure with our curated travel experiences',
      backgroundImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop',
      searchPlaceholder: 'Where do you want to go?',
      destinations: ['Nepal', 'India', 'Bhutan', 'Tibet'],
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeroData | null>(null);
  const [formData, setFormData] = useState<Partial<HeroData>>({});

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value: string, item: HeroData) => (
        <div className="hero-cms__title-cell">
          <strong>{value}</strong>
          <span className="hero-cms__status">
            {item.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      )
    },
    {
      key: 'subtitle',
      label: 'Subtitle',
      render: (value: string) => (
        <div className="hero-cms__subtitle-cell">
          {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </div>
      )
    },
    {
      key: 'destinations',
      label: 'Destinations',
      render: (value: string[]) => (
        <div className="hero-cms__destinations-cell">
          {value.slice(0, 3).map((dest, index) => (
            <span key={index} className="hero-cms__destination-tag">
              {dest}
            </span>
          ))}
          {value.length > 3 && (
            <span className="hero-cms__destination-more">
              +{value.length - 3} more
            </span>
          )}
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: HeroData) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: HeroData) => {
    if (window.confirm('Are you sure you want to delete this hero section?')) {
      setHeroData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      setHeroData(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      // Add new item
      const newItem: HeroData = {
        id: Date.now().toString(),
        title: formData.title || '',
        subtitle: formData.subtitle || '',
        backgroundImage: formData.backgroundImage || '',
        searchPlaceholder: formData.searchPlaceholder || '',
        destinations: formData.destinations || [],
        isActive: formData.isActive || false
      };
      setHeroData(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  const handleDestinationChange = (value: string) => {
    const destinations = value.split(',').map(d => d.trim()).filter(d => d);
    setFormData(prev => ({ ...prev, destinations }));
  };

  return (
    <div className="hero-cms">
      <div className="hero-cms__header">
        <h3>Hero Section Management</h3>
        <p>Manage your homepage hero banner content, including title, subtitle, background image, and search destinations.</p>
      </div>

      <DataTable
        data={heroData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hero sections configured"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Hero Section' : 'Add Hero Section'}
        size="lg"
      >
        <div className="hero-cms__form">
          <div className="hero-cms__form-row">
            <FormField
              label="Title"
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              placeholder="Enter hero title"
              required
            />
          </div>

          <div className="hero-cms__form-row">
            <FormField
              label="Subtitle"
              name="subtitle"
              type="textarea"
              value={formData.subtitle || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, subtitle: value }))}
              placeholder="Enter hero subtitle"
              rows={3}
              required
            />
          </div>

          <div className="hero-cms__form-row">
            <FormField
              label="Search Placeholder"
              name="searchPlaceholder"
              type="text"
              value={formData.searchPlaceholder || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, searchPlaceholder: value }))}
              placeholder="Enter search placeholder text"
              required
            />
          </div>

          <div className="hero-cms__form-row">
            <FormField
              label="Destinations"
              name="destinations"
              type="text"
              value={formData.destinations?.join(', ') || ''}
              onChange={handleDestinationChange}
              placeholder="Enter destinations separated by commas"
              helpText="Separate multiple destinations with commas"
              required
            />
          </div>

          <div className="hero-cms__form-row">
            <label className="hero-cms__image-label">Background Image</label>
            <ImageUpload
              value={formData.backgroundImage || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, backgroundImage: value as string }))}
              placeholder="Upload hero background image"
              aspectRatio="16/9"
            />
          </div>

          <div className="hero-cms__form-row">
            <FormField
              label="Active"
              name="isActive"
              type="checkbox"
              value={formData.isActive || false}
              onChange={(value) => setFormData(prev => ({ ...prev, isActive: value }))}
            />
          </div>

          <div className="hero-cms__form-actions">
            <button
              className="hero-cms__btn hero-cms__btn--secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="hero-cms__btn hero-cms__btn--primary"
              onClick={handleSave}
            >
              {editingItem ? 'Update' : 'Save'} Hero Section
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HeroCMS;

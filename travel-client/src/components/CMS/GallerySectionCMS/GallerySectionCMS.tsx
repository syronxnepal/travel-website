import React, { useState } from 'react';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import 'src/components/CMS/GallerySectionCMS/GallerySectionCMS.scss';

interface GalleryImageData {
  id: string;
  title: string;
  alt: string;
  location: string;
  category: string;
  image: string;
  size: 'small' | 'medium' | 'large' | 'tall';
  isActive: boolean;
}

const GallerySectionCMS: React.FC = () => {
  const [galleryData, setGalleryData] = useState<GalleryImageData[]>([
    {
      id: '1',
      title: 'Tropical Paradise',
      alt: 'Beautiful tropical beach with palm trees',
      location: 'Maldives',
      category: 'Beaches',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ba6f06fd8?w=800',
      size: 'large',
      isActive: true
    },
    {
      id: '2',
      title: 'Himalayan Adventure',
      alt: 'Snow-capped Himalayan mountains',
      location: 'Nepal',
      category: 'Mountains',
      image: 'https://images.unsplash.com/photo-1502657873112-803269d1506a?w=800',
      size: 'medium',
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImageData | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryImageData>>({});

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'tall', label: 'Tall' }
  ];
  
  const categories = [
    { value: 'Trekking', label: 'Trekking' },
    { value: 'Tours', label: 'Tours' },
    { value: 'Culture', label: 'Culture' },
    { value: 'Wildlife', label: 'Wildlife' },
    { value: 'Landscapes', label: 'Landscapes' },
    { value: 'Beaches', label: 'Beaches' },
    { value: 'Mountains', label: 'Mountains' },
    { value: 'Cities', label: 'Cities' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Adventure', label: 'Adventure' }
  ];

  const columns = [
    {
      key: 'title',
      label: 'Image',
      render: (value: string, item: GalleryImageData) => (
        <div className="gallery-section-cms__image-cell">
          <div className="gallery-section-cms__image-preview">
            <img src={item.image} alt={value} />
          </div>
          <div className="gallery-section-cms__image-info">
            <strong>{value}</strong>
            <span className="gallery-section-cms__image-category">
              <i className="fa-solid fa-tag"></i>
              {item.category}
            </span>
            <div className="gallery-section-cms__image-badges">
              <span className={`gallery-section-cms__badge gallery-section-cms__badge--${item.size}`}>
                {item.size}
              </span>
              <span className={`gallery-section-cms__badge ${item.isActive ? 'active' : 'inactive'}`}>
                {item.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'size',
      label: 'Size',
      render: (value: string) => (
        <span className={`gallery-section-cms__size-badge gallery-section-cms__size-badge--${value}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: GalleryImageData) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: GalleryImageData) => {
    if (window.confirm('Are you sure you want to delete this gallery image?')) {
      setGalleryData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setGalleryData(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: GalleryImageData = {
        id: Date.now().toString(),
        title: formData.title || '',
        alt: formData.alt || formData.title || '',
        location: formData.location || '',
        category: formData.category || '',
        image: formData.image || '',
        size: formData.size || 'medium',
        isActive: formData.isActive || false
      };
      setGalleryData(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="gallery-section-cms">
      <div className="gallery-section-cms__header">
        <h3>Gallery Section Management</h3>
        <p>Manage photo gallery and featured images for your homepage.</p>
      </div>

      <DataTable
        data={galleryData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No gallery images configured"
        searchable
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Gallery Image' : 'Add Gallery Image'}
        size="md"
      >
        <div className="gallery-section-cms__form">
          <div className="gallery-section-cms__form-row">
            <FormField
              label="Image Title"
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              placeholder="Enter image title"
              required
            />
          </div>

          <div className="gallery-section-cms__form-row">
            <FormField
              label="Alt Text"
              name="alt"
              type="text"
              value={formData.alt || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, alt: value }))}
              placeholder="Enter alt text for accessibility"
              required
              helpText="Descriptive text for screen readers and SEO"
            />
          </div>

          <div className="gallery-section-cms__form-row">
            <FormField
              label="Location"
              name="location"
              type="text"
              value={formData.location || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
              placeholder="Enter location (e.g., Kathmandu, Nepal)"
              required
            />
          </div>

          <div className="gallery-section-cms__form-row gallery-section-cms__form-row--two-col">
            <FormField
              label="Category"
              name="category"
              type="select"
              value={formData.category || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              options={categories}
              required
            />
            <FormField
              label="Size"
              name="size"
              type="select"
              value={formData.size || 'medium'}
              onChange={(value) => setFormData(prev => ({ ...prev, size: value as 'small' | 'medium' | 'large' | 'tall' }))}
              options={sizeOptions}
              required
            />
          </div>

          <div className="gallery-section-cms__form-row">
            <label className="gallery-section-cms__image-label">Gallery Image</label>
            <ImageUpload
              value={formData.image || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, image: value as string }))}
              placeholder="Upload gallery image"
              aspectRatio="4/3"
            />
          </div>

          <div className="gallery-section-cms__form-row">
            <FormField
              label="Active"
              name="isActive"
              type="checkbox"
              value={formData.isActive || false}
              onChange={(value) => setFormData(prev => ({ ...prev, isActive: value }))}
            />
          </div>

          <div className="gallery-section-cms__form-actions">
            <button
              className="gallery-section-cms__btn gallery-section-cms__btn--secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="gallery-section-cms__btn gallery-section-cms__btn--primary"
              onClick={handleSave}
            >
              {editingItem ? 'Update' : 'Save'} Image
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GallerySectionCMS;

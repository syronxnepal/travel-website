// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface ShortTour {
  id: string;
  image: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: string;
  rating: string;
  reviewCount: number;
  description: string;
  highlights?: string[];
  featured: boolean;
}

const ShortTourManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [shortTours, setShortTours] = useState<ShortTour[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400',
      title: 'City Sightseeing Tour',
      location: 'Paris',
      category: 'Cultural',
      duration: '3 hours',
      price: '$50',
      rating: '4.7',
      reviewCount: 67,
      description: 'Explore the best of Paris in a comprehensive city tour.',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
      featured: true
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      title: 'Museum & Art Gallery Tour',
      location: 'London',
      category: 'Cultural',
      duration: '4 hours',
      price: '$60',
      rating: '4.6',
      reviewCount: 45,
      description: 'Discover world-class art and history in London\'s finest museums.',
      highlights: ['British Museum', 'Tate Modern', 'National Gallery'],
      featured: false
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1535034987458-41a30d3eb93e?w=400',
      title: 'Local Food & Culture Tour',
      location: 'Tokyo',
      category: 'Cultural',
      duration: '5 hours',
      price: '$80',
      rating: '4.8',
      reviewCount: 89,
      description: 'Taste authentic Japanese cuisine while exploring Tokyo\'s vibrant districts.',
      highlights: ['Local food', 'Street food', 'Cultural experience'],
      featured: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<ShortTour | null>(null);
  const [formData, setFormData] = useState<Partial<ShortTour>>({});

  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: () => (
        <div className="short-tour-cms__image-cell">
          <div className="short-tour-cms__image-placeholder">
            <i className="fa-solid fa-clock"></i>
          </div>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="short-tour-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'category',
      label: 'Category',
      width: '120px',
      render: (value: string) => (
        <div className="short-tour-cms__category-cell">
          <span className={`short-tour-cms__category short-tour-cms__category--${value.toLowerCase()}`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      width: '100px'
    },
    {
      key: 'price',
      label: 'Price',
      width: '120px'
    },
    {
      key: 'featured',
      label: 'Featured',
      width: '100px',
      render: (_: boolean, item: ShortTour) => (
        <div className="short-tour-cms__featured-cell">
          <span className={`short-tour-cms__featured-badge ${item.featured ? 'featured' : 'regular'}`}>
            {item.featured ? 'Featured' : 'Regular'}
          </span>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      width: '100px',
      render: (value: string, item: ShortTour) => (
        <div className="short-tour-cms__rating">
          <div className="short-tour-cms__stars">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star ${i < Math.floor(parseFloat(value)) ? 'active' : ''}`}
              ></i>
            ))}
          </div>
          <span className="short-tour-cms__review-count">({item.reviewCount || 0})</span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingTour(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (tour: ShortTour) => {
    setEditingTour(tour);
    setFormData({ ...tour });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (tour: ShortTour) => {
    showDeleteConfirmation(tour, () => {
      performAction(
        () => setShortTours(shortTours.filter(t => t.id !== tour.id)),
        'Short tour deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (editingTour) {
      performAction(
        () => {
          setShortTours(shortTours.map(tour => 
            tour.id === editingTour.id 
              ? { ...formData as ShortTour }
              : tour
          ));
          setIsModalOpen(false);
          setEditingTour(null);
          setFormData({});
        },
        'Short tour updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newTour: ShortTour = {
            id: Date.now().toString(),
            image: formData.image || '',
            title: formData.title || '',
            location: formData.location || '',
            category: formData.category || 'Cultural',
            duration: formData.duration || '',
            price: formData.price || '',
            rating: formData.rating || '4.5',
            reviewCount: formData.reviewCount || 0,
            description: formData.description || '',
            highlights: formData.highlights || [],
            featured: formData.featured || false
          };
          setShortTours([...shortTours, newTour]);
          setIsModalOpen(false);
          setEditingTour(null);
          setFormData({});
        },
        'Short tour added successfully',
        'success'
      );
    }
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>Short Tour Management</h3>
              <p>Manage all short tours with full control over details, pricing, and featured status</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={shortTours}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No short tours found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingTour ? 'Edit Short Tour' : 'Add New Short Tour'}
            size="lg"
          >
            <div className="cms-section__form">
              <ImageUpload
                label="Short Tour Image"
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
                placeholder="Enter short tour title"
                required
              />
              
              <FormField
                label="Location"
                name="location"
                type="text"
                value={formData.location || ''}
                onChange={(value) => setFormData({ ...formData, location: value })}
                placeholder="Enter location"
                required
              />
              
              <FormField
                label="Category"
                name="category"
                type="select"
                value={formData.category || 'Cultural'}
                onChange={(value) => setFormData({ ...formData, category: value })}
                options={[
                  { value: 'Cultural', label: 'Cultural' },
                  { value: 'Nature', label: 'Nature' },
                  { value: 'Adventure', label: 'Adventure' },
                  { value: 'Historical', label: 'Historical' }
                ]}
                required
              />
              
              <FormField
                label="Duration"
                name="duration"
                type="text"
                value={formData.duration || ''}
                onChange={(value) => setFormData({ ...formData, duration: value })}
                placeholder="e.g., 3 hours"
                required
              />
              
              <FormField
                label="Price"
                name="price"
                type="text"
                value={formData.price || ''}
                onChange={(value) => setFormData({ ...formData, price: value })}
                placeholder="e.g., $50"
                required
              />
              
              <FormField
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating || '4.5'}
                onChange={(value) => setFormData({ ...formData, rating: value.toString() })}
                placeholder="e.g., 4.7"
                min="1"
                max="5"
                step="0.1"
                required
              />
              
              <FormField
                label="Review Count"
                name="reviewCount"
                type="number"
                value={formData.reviewCount?.toString() || '0'}
                onChange={(value) => setFormData({ ...formData, reviewCount: parseInt(value) || 0 })}
                placeholder="e.g., 67"
                min="0"
                required
              />
              
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description || ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Enter short tour description"
                rows={4}
                required
              />
              
              <FormField
                label="Highlights (Comma-separated)"
                name="highlights"
                type="textarea"
                value={formData.highlights?.join(', ') || ''}
                onChange={(value) => {
                  const highlights = value.split(',').map(h => h.trim()).filter(h => h.length > 0);
                  setFormData({ ...formData, highlights });
                }}
                placeholder="e.g., Eiffel Tower, Louvre Museum, Notre-Dame"
                rows={3}
                helpText="Enter highlights separated by commas"
              />
              
              <FormField
                label="Featured"
                name="featured"
                type="checkbox"
                value={formData.featured ? 'true' : 'false'}
                onChange={(value) => setFormData({ ...formData, featured: value === 'true' })}
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingTour ? 'Update' : 'Add'} Short Tour
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const ShortTourManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Short Tour',
        message: 'Are you sure you want to delete this short tour?',
        type: 'short tour'
      }}
    >
      <ShortTourManagementContent />
    </CRUDProvider>
  );
};

export default ShortTourManagement;


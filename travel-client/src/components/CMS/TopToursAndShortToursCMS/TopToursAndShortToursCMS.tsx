// @ts-nocheck
import React, { useState } from 'react';
import 'src/components/CMS/TopToursAndShortToursCMS/TopToursAndShortToursCMS.scss';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import Modal from 'src/components/CMS/Common/Modal/Modal';

interface TourData {
  id: string;
  title: string;
  location: string;
  duration: string;
  category: string;
  price: string;
  rating: string;
  type: 'Tour' | 'Short Tour';
  featured: boolean;
}

const TopToursAndShortToursCMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tours' | 'short-tours'>('tours');
  
  const [tours, setTours] = useState<TourData[]>([
    {
      id: '1',
      title: 'National Sea Life Centre',
      location: 'Birmingham',
      duration: '0-3 hours',
      category: 'Cultural',
      price: '$25',
      rating: '4.5',
      type: 'Tour',
      featured: true
    },
    {
      id: '2',
      title: 'Sea Cave Kayaking',
      location: 'Astoria',
      duration: '3 days',
      category: 'Adventure',
      price: '$219',
      rating: '4.5',
      type: 'Tour',
      featured: true
    },
    {
      id: '3',
      title: 'Cultural Heritage Walk',
      location: 'Kathmandu',
      duration: '4 hours',
      category: 'Cultural',
      price: '$35',
      rating: '4.8',
      type: 'Tour',
      featured: false
    }
  ]);

  const [shortTours, setShortTours] = useState<TourData[]>([
    {
      id: '7',
      title: 'Kathmandu City Highlights',
      location: 'Kathmandu',
      duration: '1 day',
      category: 'Cultural',
      price: '$45',
      rating: '4.4',
      type: 'Short Tour',
      featured: true
    },
    {
      id: '8',
      title: 'Pokhara Day Trip',
      location: 'Pokhara',
      duration: '1 day',
      category: 'Nature',
      price: '$55',
      rating: '4.6',
      type: 'Short Tour',
      featured: true
    },
    {
      id: '9',
      title: 'Bhaktapur Heritage Walk',
      location: 'Bhaktapur',
      duration: '4 hours',
      category: 'Historical',
      price: '$30',
      rating: '4.7',
      type: 'Short Tour',
      featured: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TourData | null>(null);
  const [formData, setFormData] = useState<Partial<TourData>>({});

  const categoryOptions = [
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Historical', label: 'Historical' },
    { value: 'Religious', label: 'Religious' },
    { value: 'Wildlife', label: 'Wildlife' }
  ];

  const getCurrentData = () => {
    return activeTab === 'tours' ? tours : shortTours;
  };

  const getCurrentSetter = () => {
    return activeTab === 'tours' ? setTours : setShortTours;
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: (_: any, item: TourData) => (
        <div className="tours-cms__image-cell">
          <div className="tours-cms__image-placeholder">
            <i className={item.type === 'Tour' ? 'fa-solid fa-mountain' : 'fa-solid fa-clock'}></i>
          </div>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="tours-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      width: '120px',
      render: (value: string) => (
        <div className="tours-cms__category-cell">
          <span className={`tours-cms__category tours-cms__category--${value.toLowerCase()}`}>
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
      render: (_: boolean, item: TourData) => (
        <div className="tours-cms__featured-cell">
          <span className={`tours-cms__featured-badge ${item.featured ? 'featured' : 'regular'}`}>
            {item.featured ? 'Featured' : 'Regular'}
          </span>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      width: '100px',
      render: (value: string) => (
        <div className="tours-cms__rating">
          <div className="tours-cms__stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fa-solid fa-star ${i < Math.floor(parseFloat(value)) ? 'active' : ''}`}
              ></i>
            ))}
          </div>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: TourData) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: TourData) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      if (activeTab === 'tours') {
        setTours(tours.filter(tour => tour.id !== item.id));
      } else {
        setShortTours(shortTours.filter(tour => tour.id !== item.id));
      }
    }
  };

  const handleSave = () => {
    const currentData = getCurrentData();
    const currentSetter = getCurrentSetter();
    const itemType = activeTab === 'tours' ? 'Tour' : 'Short Tour';
    
    if (editingItem) {
      // Update existing item
      currentSetter(currentData.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, type: itemType }
          : item
      ));
    } else {
      // Add new item
      const newItem: TourData = {
        id: (currentData.length + 1).toString(),
        title: formData.title || '',
        location: formData.location || '',
        duration: formData.duration || '',
        category: formData.category || '',
        price: formData.price || '',
        rating: formData.rating || '',
        type: itemType,
        featured: formData.featured || false
      };
      currentSetter([...currentData, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleRefresh = () => {
    console.log('Refreshing tour data...');
  };

  const handleManageFeatured = () => {
    console.log('Managing featured tours...');
  };

  const getFeaturedCount = () => {
    const toursFeatured = tours.filter(tour => tour.featured).length;
    const shortToursFeatured = shortTours.filter(tour => tour.featured).length;
    return toursFeatured + shortToursFeatured;
  };

  return (
    <div className="tours-cms">
      <div className="cms-section">
        <div className="cms-section__header">
          <h3>Tours & Short Tours Management</h3>
          <p>Manage tours and short tours, mark them as featured on the homepage</p>
        </div>
        
        <div className="cms-section__content">
          <div className="cms-section__tabs">
            <button 
              className={`tab-btn tab-btn--tours ${activeTab === 'tours' ? 'active' : ''}`}
              onClick={() => setActiveTab('tours')}
            >
              <div className="tab-btn__icon">
                <i className="fa-solid fa-mountain"></i>
              </div>
              <div className="tab-btn__content">
                <span className="tab-btn__title">Tours</span>
                <span className="tab-btn__subtitle">Multi-day adventures</span>
              </div>
              <div className="tab-btn__count">{tours.length}</div>
            </button>
            <button 
              className={`tab-btn tab-btn--short-tours ${activeTab === 'short-tours' ? 'active' : ''}`}
              onClick={() => setActiveTab('short-tours')}
            >
              <div className="tab-btn__icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div className="tab-btn__content">
                <span className="tab-btn__title">Short Tours</span>
                <span className="tab-btn__subtitle">Quick experiences</span>
              </div>
              <div className="tab-btn__count">{shortTours.length}</div>
            </button>
          </div>
          
          <div className="cms-section__data">
            <DataTable
              data={getCurrentData()}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
              searchable
              emptyMessage={`No ${activeTab === 'tours' ? 'tours' : 'short tours'} available`}
            />
          </div>
          
          <div className="cms-section__featured-info">
            <div className="info-card">
              <h4><i className="fa-solid fa-info-circle"></i> Featured Tours</h4>
              <p>Mark tours as "Featured" to display them on the homepage. Currently showing top 4 featured tours (2 tours + 2 short tours).</p>
              <div className="featured-count">
                <span className="count">{getFeaturedCount()}</span> out of <span className="total">4</span> featured slots used
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Tour' : `Add New ${activeTab === 'tours' ? 'Tour' : 'Short Tour'}`}
        size="lg"
      >
        <div className="tour-modal">
          <FormField
            label="Title"
            value={formData.title || ''}
            onChange={(value) => setFormData({...formData, title: value})}
            placeholder="Enter tour title"
            required
          />
          
          <FormField
            label="Location"
            value={formData.location || ''}
            onChange={(value) => setFormData({...formData, location: value})}
            placeholder="Enter location"
            required
          />
          
          <FormField
            label="Duration"
            value={formData.duration || ''}
            onChange={(value) => setFormData({...formData, duration: value})}
            placeholder={activeTab === 'tours' ? 'e.g., 3 days' : 'e.g., 4 hours'}
            required
          />
          
          <FormField
            label="Category"
            value={formData.category || ''}
            onChange={(value) => setFormData({...formData, category: value})}
            placeholder="Select category"
            type="select"
            options={categoryOptions}
            required
          />
          
          <FormField
            label="Price"
            value={formData.price || ''}
            onChange={(value) => setFormData({...formData, price: value})}
            placeholder="e.g., $25"
            required
          />
          
          <FormField
            label="Rating"
            value={formData.rating || ''}
            onChange={(value) => setFormData({...formData, rating: value})}
            placeholder="e.g., 4.5"
            type="number"
            min="1"
            max="5"
            step="0.1"
            required
          />
          
          <div className="form-field">
            <label className="form-field__label">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="form-field__checkbox"
              />
              <span className="form-field__checkbox-label">Featured Tour</span>
            </label>
            <p className="form-field__help">Mark this tour as featured to display it on the homepage</p>
          </div>
          
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editingItem ? 'Update Tour' : `Add ${activeTab === 'tours' ? 'Tour' : 'Short Tour'}`}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TopToursAndShortToursCMS;

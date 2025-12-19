// @ts-nocheck
import React, { useState } from 'react';
import 'src/components/CMS/TopTreksCMS/TopTreksCMS.scss';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import Modal from 'src/components/CMS/Common/Modal/Modal';

interface TrekData {
  id: string;
  title: string;
  location: string;
  duration: string;
  difficulty: string;
  price: string;
  rating: string;
  featured: boolean;
}

const TopTreksCMS: React.FC = () => {
  const [treks, setTreks] = useState<TrekData[]>([
    {
      id: '1',
      title: 'Everest Base Camp Trek',
      location: 'Sagarmatha National Park',
      duration: '14 Days',
      difficulty: 'Challenging',
      price: '$1,299',
      rating: '4.8',
      featured: true
    },
    {
      id: '2',
      title: 'Annapurna Circuit Trek',
      location: 'Annapurna Region',
      duration: '12 Days',
      difficulty: 'Moderate',
      price: '$899',
      rating: '4.7',
      featured: true
    },
    {
      id: '3',
      title: 'Langtang Valley Trek',
      location: 'Langtang Region',
      duration: '8 Days',
      difficulty: 'Easy',
      price: '$599',
      rating: '4.6',
      featured: false
    },
    {
      id: '4',
      title: 'Manaslu Circuit Trek',
      location: 'Manaslu Region',
      duration: '15 Days',
      difficulty: 'Challenging',
      price: '$1,199',
      rating: '4.9',
      featured: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrek, setEditingTrek] = useState<TrekData | null>(null);
  const [formData, setFormData] = useState<Partial<TrekData>>({});

  const difficultyOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Challenging', label: 'Challenging' },
    { value: 'Expert', label: 'Expert' }
  ];

  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: () => (
        <div className="treks-cms__image-cell">
          <div className="treks-cms__image-placeholder">
            <i className="fa-solid fa-mountain"></i>
          </div>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="treks-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      width: '120px',
      render: (value: string) => (
        <div className="treks-cms__difficulty-cell">
          <span className={`treks-cms__difficulty treks-cms__difficulty--${value.toLowerCase()}`}>
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
      render: (_: boolean, item: TrekData) => (
        <div className="treks-cms__featured-cell">
          <span className={`treks-cms__featured-badge ${item.featured ? 'featured' : 'regular'}`}>
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
        <div className="treks-cms__rating">
          <div className="treks-cms__stars">
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
    setEditingTrek(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (trek: TrekData) => {
    setEditingTrek(trek);
    setFormData(trek);
    setIsModalOpen(true);
  };

  const handleDelete = (trek: TrekData) => {
    if (window.confirm(`Are you sure you want to delete "${trek.title}"?`)) {
      setTreks(treks.filter(t => t.id !== trek.id));
    }
  };

  const handleSave = () => {
    if (editingTrek) {
      // Update existing trek
      setTreks(treks.map(trek => 
        trek.id === editingTrek.id 
          ? { ...trek, ...formData }
          : trek
      ));
    } else {
      // Add new trek
      const newTrek: TrekData = {
        id: (treks.length + 1).toString(),
        title: formData.title || '',
        location: formData.location || '',
        duration: formData.duration || '',
        difficulty: formData.difficulty || '',
        price: formData.price || '',
        rating: formData.rating || '',
        featured: formData.featured || false
      };
      setTreks([...treks, newTrek]);
    }
    setIsModalOpen(false);
  };

  const handleRefresh = () => {
    console.log('Refreshing trek data...');
  };

  const handleManageFeatured = () => {
    console.log('Managing featured treks...');
  };

  const featuredCount = treks.filter(trek => trek.featured).length;

  return (
    <div className="treks-cms">
      <div className="cms-section">
        <div className="cms-section__header">
          <h3>Trekking Destinations Management</h3>
          <p>Manage trekking destinations and mark them as featured on the homepage</p>
        </div>
        
        <div className="cms-section__content">
          <div className="cms-section__data">
            <DataTable
              data={treks}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
              searchable
              emptyMessage="No treks available"
            />
          </div>
          
          <div className="cms-section__featured-info">
            <div className="info-card">
              <h4><i className="fa-solid fa-info-circle"></i> Featured Treks</h4>
              <p>Mark treks as "Featured" to display them on the homepage. Currently showing top 4 featured treks.</p>
              <div className="featured-count">
                <span className="count">{featuredCount}</span> out of <span className="total">4</span> featured slots used
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingTrek ? 'Edit Trek' : 'Add New Trek'}
        size="lg"
      >
        <div className="trek-modal">
          <FormField
            label="Title"
            value={formData.title || ''}
            onChange={(value) => setFormData({...formData, title: value})}
            placeholder="Enter trek title"
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
            placeholder="e.g., 14 Days"
            required
          />
          
          <FormField
            label="Difficulty"
            value={formData.difficulty || ''}
            onChange={(value) => setFormData({...formData, difficulty: value})}
            placeholder="Select difficulty"
            type="select"
            options={difficultyOptions}
            required
          />
          
          <FormField
            label="Price"
            value={formData.price || ''}
            onChange={(value) => setFormData({...formData, price: value})}
            placeholder="e.g., $1,299"
            required
          />
          
          <FormField
            label="Rating"
            value={formData.rating || ''}
            onChange={(value) => setFormData({...formData, rating: value})}
            placeholder="e.g., 4.8"
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
              <span className="form-field__checkbox-label">Featured Trek</span>
            </label>
            <p className="form-field__help">Mark this trek as featured to display it on the homepage</p>
          </div>
          
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editingTrek ? 'Update Trek' : 'Add Trek'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TopTreksCMS;

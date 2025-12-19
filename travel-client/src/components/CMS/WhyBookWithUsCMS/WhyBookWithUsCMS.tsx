import React, { useState } from 'react';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import 'src/components/CMS/WhyBookWithUsCMS/WhyBookWithUsCMS.scss';

interface FeatureData {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

const WhyBookWithUsCMS: React.FC = () => {
  const [featuresData, setFeaturesData] = useState<FeatureData[]>([
    {
      id: '1',
      title: 'Expert Guides',
      description: 'Our experienced guides ensure safe and memorable adventures',
      icon: 'fa-users',
      isActive: true
    },
    {
      id: '2',
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden fees',
      icon: 'fa-dollar-sign',
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeatureData | null>(null);
  const [formData, setFormData] = useState<Partial<FeatureData>>({});

  const iconOptions = [
    { value: 'fa-users', label: 'Users' },
    { value: 'fa-dollar-sign', label: 'Dollar Sign' },
    { value: 'fa-shield-alt', label: 'Shield' },
    { value: 'fa-heart', label: 'Heart' },
    { value: 'fa-star', label: 'Star' },
    { value: 'fa-clock', label: 'Clock' }
  ];

  const columns = [
    {
      key: 'title',
      label: 'Feature',
      render: (value: string, item: FeatureData) => (
        <div className="why-book-cms__feature-cell">
          <div className="why-book-cms__feature-icon">
            <i className={`fa-solid ${item.icon}`}></i>
          </div>
          <div className="why-book-cms__feature-info">
            <strong>{value}</strong>
            <span className={`why-book-cms__badge ${item.isActive ? 'active' : 'inactive'}`}>
              {item.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <div className="why-book-cms__description">
          {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: FeatureData) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: FeatureData) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      setFeaturesData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setFeaturesData(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: FeatureData = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        icon: formData.icon || '',
        isActive: formData.isActive || false
      };
      setFeaturesData(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="why-book-cms">
      <div className="why-book-cms__header">
        <h3>Why Book With Us Management</h3>
        <p>Manage the features and benefits section of your homepage.</p>
      </div>

      <DataTable
        data={featuresData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No features configured"
        searchable
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Feature' : 'Add Feature'}
        size="md"
      >
        <div className="why-book-cms__form">
          <div className="why-book-cms__form-row">
            <FormField
              label="Feature Title"
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              placeholder="Enter feature title"
              required
            />
          </div>

          <div className="why-book-cms__form-row">
            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="Enter feature description"
              rows={3}
              required
            />
          </div>

          <div className="why-book-cms__form-row">
            <FormField
              label="Icon"
              name="icon"
              type="select"
              value={formData.icon || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
              options={iconOptions}
              required
            />
          </div>

          <div className="why-book-cms__form-row">
            <FormField
              label="Active"
              name="isActive"
              type="checkbox"
              value={formData.isActive || false}
              onChange={(value) => setFormData(prev => ({ ...prev, isActive: value }))}
            />
          </div>

          <div className="why-book-cms__form-actions">
            <button
              className="why-book-cms__btn why-book-cms__btn--secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="why-book-cms__btn why-book-cms__btn--primary"
              onClick={handleSave}
            >
              {editingItem ? 'Update' : 'Save'} Feature
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WhyBookWithUsCMS;

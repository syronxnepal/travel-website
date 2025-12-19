import React, { useState } from 'react';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import 'src/components/CMS/DestinationExpertsCMS/DestinationExpertsCMS.scss';

interface ExpertData {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  image: string;
  bio: string;
  isActive: boolean;
}

const DestinationExpertsCMS: React.FC = () => {
  const [expertsData, setExpertsData] = useState<ExpertData[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Travel Guide',
      specialization: 'Himalayan Treks',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
      bio: 'Passionate about mountain adventures and cultural experiences.',
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExpertData | null>(null);
  const [formData, setFormData] = useState<Partial<ExpertData>>({});

  const specializations = [
    { value: 'Himalayan Treks', label: 'Himalayan Treks' },
    { value: 'Cultural Tours', label: 'Cultural Tours' },
    { value: 'Adventure Sports', label: 'Adventure Sports' },
    { value: 'Wildlife Safaris', label: 'Wildlife Safaris' },
    { value: 'Photography Tours', label: 'Photography Tours' },
    { value: 'Spiritual Journeys', label: 'Spiritual Journeys' }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Expert',
      render: (value: string, item: ExpertData) => (
        <div className="destination-experts-cms__expert-cell">
          <div className="destination-experts-cms__expert-image">
            <img src={item.image} alt={value} />
          </div>
          <div className="destination-experts-cms__expert-info">
            <strong>{value}</strong>
            <span className="destination-experts-cms__expert-title">{item.title}</span>
            <span className="destination-experts-cms__expert-specialization">
              <i className="fa-solid fa-star"></i>
              {item.specialization}
            </span>
            <span className={`destination-experts-cms__badge ${item.isActive ? 'active' : 'inactive'}`}>
              {item.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'experience',
      label: 'Experience',
      render: (value: string) => (
        <span className="destination-experts-cms__experience">
          <i className="fa-solid fa-clock"></i>
          {value}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: ExpertData) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: ExpertData) => {
    if (window.confirm('Are you sure you want to delete this expert?')) {
      setExpertsData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setExpertsData(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: ExpertData = {
        id: Date.now().toString(),
        name: formData.name || '',
        title: formData.title || '',
        specialization: formData.specialization || '',
        experience: formData.experience || '',
        image: formData.image || '',
        bio: formData.bio || '',
        isActive: formData.isActive || false
      };
      setExpertsData(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="destination-experts-cms">
      <div className="destination-experts-cms__header">
        <h3>Destination Experts Management</h3>
        <p>Manage expert profiles and team information for your homepage.</p>
      </div>

      <DataTable
        data={expertsData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No experts configured"
        searchable
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Expert' : 'Add Expert'}
        size="md"
      >
        <div className="destination-experts-cms__form">
          <div className="destination-experts-cms__form-row">
            <FormField
              label="Expert Name"
              name="name"
              type="text"
              value={formData.name || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
              placeholder="Enter expert name"
              required
            />
          </div>

          <div className="destination-experts-cms__form-row">
            <FormField
              label="Job Title"
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="destination-experts-cms__form-row">
            <FormField
              label="Specialization"
              name="specialization"
              type="select"
              value={formData.specialization || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, specialization: value }))}
              options={specializations}
              required
            />
          </div>

          <div className="destination-experts-cms__form-row">
            <FormField
              label="Experience"
              name="experience"
              type="text"
              value={formData.experience || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
              placeholder="e.g., 8 years"
              required
            />
          </div>

          <div className="destination-experts-cms__form-row">
            <FormField
              label="Bio"
              name="bio"
              type="textarea"
              value={formData.bio || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, bio: value }))}
              placeholder="Enter expert bio"
              rows={3}
              required
            />
          </div>

          <div className="destination-experts-cms__form-row">
            <label className="destination-experts-cms__image-label">Expert Photo</label>
            <ImageUpload
              value={formData.image || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, image: value as string }))}
              placeholder="Upload expert photo"
              aspectRatio="1/1"
            />
          </div>

          <div className="destination-experts-cms__form-row">
            <FormField
              label="Active"
              name="isActive"
              type="checkbox"
              value={formData.isActive || false}
              onChange={(value) => setFormData(prev => ({ ...prev, isActive: value }))}
            />
          </div>

          <div className="destination-experts-cms__form-actions">
            <button
              className="destination-experts-cms__btn destination-experts-cms__btn--secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="destination-experts-cms__btn destination-experts-cms__btn--primary"
              onClick={handleSave}
            >
              {editingItem ? 'Update' : 'Save'} Expert
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DestinationExpertsCMS;

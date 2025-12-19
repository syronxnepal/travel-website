import React, { useState } from 'react';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import 'src/components/CMS/TestimonialsCMS/TestimonialsCMS.scss';

interface TestimonialData {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

const TestimonialsCMS: React.FC = () => {
  const [testimonialsData, setTestimonialsData] = useState<TestimonialData[]>([
    {
      id: '1',
      name: 'John Smith',
      location: 'New York, USA',
      rating: 5,
      comment: 'Amazing experience! The guides were professional and the views were breathtaking.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialData | null>(null);
  const [formData, setFormData] = useState<Partial<TestimonialData>>({});

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (value: string, item: TestimonialData) => (
        <div className="testimonials-cms__customer-cell">
          <div className="testimonials-cms__customer-image">
            <img src={item.image} alt={value} />
          </div>
          <div className="testimonials-cms__customer-info">
            <strong>{value}</strong>
            <span className="testimonials-cms__customer-location">
              <i className="fa-solid fa-map-marker-alt"></i>
              {item.location}
            </span>
            <span className={`testimonials-cms__badge ${item.isActive ? 'active' : 'inactive'}`}>
              {item.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value: number) => (
        <div className="testimonials-cms__rating">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fa-solid fa-star ${i < value ? 'active' : ''}`}
            ></i>
          ))}
        </div>
      )
    },
    {
      key: 'comment',
      label: 'Comment',
      render: (value: string) => (
        <div className="testimonials-cms__comment">
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

  const handleEdit = (item: TestimonialData) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: TestimonialData) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonialsData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setTestimonialsData(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: TestimonialData = {
        id: Date.now().toString(),
        name: formData.name || '',
        location: formData.location || '',
        rating: formData.rating || 0,
        comment: formData.comment || '',
        image: formData.image || '',
        isActive: formData.isActive || false
      };
      setTestimonialsData(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="testimonials-cms">
      <div className="testimonials-cms__header">
        <h3>Testimonials Management</h3>
        <p>Manage customer testimonials and reviews for your homepage.</p>
      </div>

      <DataTable
        data={testimonialsData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No testimonials configured"
        searchable
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
        size="md"
      >
        <div className="testimonials-cms__form">
          <div className="testimonials-cms__form-row">
            <FormField
              label="Customer Name"
              name="name"
              type="text"
              value={formData.name || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="testimonials-cms__form-row">
            <FormField
              label="Location"
              name="location"
              type="text"
              value={formData.location || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
              placeholder="Enter customer location"
              required
            />
          </div>

          <div className="testimonials-cms__form-row">
            <FormField
              label="Rating"
              name="rating"
              type="number"
              value={formData.rating || 0}
              onChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
              min={1}
              max={5}
              required
            />
          </div>

          <div className="testimonials-cms__form-row">
            <FormField
              label="Comment"
              name="comment"
              type="textarea"
              value={formData.comment || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, comment: value }))}
              placeholder="Enter customer comment"
              rows={4}
              required
            />
          </div>

          <div className="testimonials-cms__form-row">
            <label className="testimonials-cms__image-label">Customer Photo</label>
            <ImageUpload
              value={formData.image || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, image: value as string }))}
              placeholder="Upload customer photo"
              aspectRatio="1/1"
            />
          </div>

          <div className="testimonials-cms__form-row">
            <FormField
              label="Active"
              name="isActive"
              type="checkbox"
              value={formData.isActive || false}
              onChange={(value) => setFormData(prev => ({ ...prev, isActive: value }))}
            />
          </div>

          <div className="testimonials-cms__form-actions">
            <button
              className="testimonials-cms__btn testimonials-cms__btn--secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="testimonials-cms__btn testimonials-cms__btn--primary"
              onClick={handleSave}
            >
              {editingItem ? 'Update' : 'Save'} Testimonial
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TestimonialsCMS;

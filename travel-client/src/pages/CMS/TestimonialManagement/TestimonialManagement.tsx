// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface Testimonial {
  id: string;
  image: string;
  name: string;
  location: string;
  rating: string;
  text: string;
  status: 'active' | 'inactive';
}

const TestimonialManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      image: 'https://i.pravatar.cc/150?img=1',
      name: 'John Doe',
      location: 'USA',
      rating: '5',
      text: 'Amazing experience! The trek was well organized and the guides were knowledgeable.',
      status: 'active'
    },
    {
      id: '2',
      image: 'https://i.pravatar.cc/150?img=5',
      name: 'Sarah Johnson',
      location: 'UK',
      rating: '5',
      text: 'Best vacation ever! Highly recommend this travel agency.',
      status: 'active'
    },
    {
      id: '3',
      image: 'https://i.pravatar.cc/150?img=9',
      name: 'Michael Chen',
      location: 'Australia',
      rating: '4',
      text: 'Great service and excellent customer support throughout the journey.',
      status: 'active'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});

  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: (_: string, item: Testimonial) => (
        <div className="testimonial-cms__image-cell">
          <img src={item.image} alt={item.name} className="testimonial-cms__avatar" />
        </div>
      )
    },
    {
      key: 'name',
      label: 'Name',
      render: (value: string) => (
        <div className="testimonial-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'rating',
      label: 'Rating',
      width: '100px',
      render: (value: string) => (
        <div className="testimonial-cms__rating">
          <div className="testimonial-cms__stars">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star ${i < Math.floor(parseFloat(value)) ? 'active' : ''}`}
              ></i>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'text',
      label: 'Testimonial',
      render: (value: string) => (
        <div className="testimonial-cms__text">
          {value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (_: string, item: Testimonial) => (
        <div className="testimonial-cms__status-cell">
          <span className={`status-badge ${item.status === 'active' ? 'active' : 'inactive'}`}>
            {item.status}
          </span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingTestimonial(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({ ...testimonial });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (testimonial: Testimonial) => {
    showDeleteConfirmation(testimonial, () => {
      performAction(
        () => setTestimonials(testimonials.filter(t => t.id !== testimonial.id)),
        'Testimonial deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (editingTestimonial) {
      performAction(
        () => {
          setTestimonials(testimonials.map(testimonial => 
            testimonial.id === editingTestimonial.id 
              ? { ...formData as Testimonial }
              : testimonial
          ));
          setIsModalOpen(false);
          setEditingTestimonial(null);
          setFormData({});
        },
        'Testimonial updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newTestimonial: Testimonial = {
            id: Date.now().toString(),
            image: formData.image || '',
            name: formData.name || '',
            location: formData.location || '',
            rating: formData.rating || '5',
            text: formData.text || '',
            status: (formData.status as 'active' | 'inactive') || 'active'
          };
          setTestimonials([...testimonials, newTestimonial]);
          setIsModalOpen(false);
          setEditingTestimonial(null);
          setFormData({});
        },
        'Testimonial added successfully',
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
              <h3>Testimonial Management</h3>
              <p>Manage customer testimonials and reviews to showcase social proof</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={testimonials}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No testimonials found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            size="lg"
          >
            <div className="cms-section__form">
              <ImageUpload
                label="Profile Image"
                name="image"
                value={formData.image || ''}
                onChange={(value) => setFormData({ ...formData, image: value })}
                placeholder="Upload or enter image URL"
              />
              
              <FormField
                label="Name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="Enter customer name"
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
                label="Rating"
                name="rating"
                type="select"
                value={formData.rating || '5'}
                onChange={(value) => setFormData({ ...formData, rating: value })}
                options={['1', '2', '3', '4', '5']}
                required
              />
              
              <FormField
                label="Testimonial"
                name="text"
                type="textarea"
                value={formData.text || ''}
                onChange={(value) => setFormData({ ...formData, text: value })}
                placeholder="Enter testimonial text"
                rows={4}
                required
              />
              
              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status || 'active'}
                onChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' })}
                options={['active', 'inactive']}
                required
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingTestimonial ? 'Update' : 'Add'} Testimonial
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const TestimonialManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Testimonial',
        message: 'Are you sure you want to delete this testimonial?',
        type: 'testimonial'
      }}
    >
      <TestimonialManagementContent />
    </CRUDProvider>
  );
};

export default TestimonialManagement;


// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

const GalleryCategoryManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [categories, setCategories] = useState<GalleryCategory[]>([
    { id: '1', name: 'Trekking', slug: 'trekking', description: 'Trekking and hiking adventures', isActive: true },
    { id: '2', name: 'Tours', slug: 'tours', description: 'Tour destinations and experiences', isActive: true },
    { id: '3', name: 'Culture', slug: 'culture', description: 'Cultural sites and traditions', isActive: true },
    { id: '4', name: 'Wildlife', slug: 'wildlife', description: 'Wildlife and nature photography', isActive: true },
    { id: '5', name: 'Landscapes', slug: 'landscapes', description: 'Beautiful landscapes and scenery', isActive: true },
    { id: '6', name: 'Beaches', slug: 'beaches', description: 'Beach destinations', isActive: true },
    { id: '7', name: 'Mountains', slug: 'mountains', description: 'Mountain ranges and peaks', isActive: true },
    { id: '8', name: 'Cities', slug: 'cities', description: 'Urban destinations', isActive: true },
    { id: '9', name: 'Nature', slug: 'nature', description: 'Natural wonders', isActive: true },
    { id: '10', name: 'Adventure', slug: 'adventure', description: 'Adventure activities', isActive: true }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<GalleryCategory | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryCategory>>({});

  const columns = [
    {
      key: 'name',
      label: 'Category Name',
      render: (value: string, item: GalleryCategory) => (
        <div>
          <strong>{value}</strong>
          {item.description && (
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {item.description}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'slug',
      label: 'Slug',
      render: (value: string) => (
        <code style={{ background: 'var(--background-light)', padding: '2px 6px', borderRadius: '4px' }}>
          {value}
        </code>
      )
    },
    {
      key: 'isActive',
      label: 'Status',
      width: '100px',
      render: (_: boolean, item: GalleryCategory) => (
        <span className={`badge ${item.isActive ? 'badge--success' : 'badge--secondary'}`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', isActive: true });
    setIsModalOpen(true);
  };

  const handleEdit = (category: GalleryCategory) => {
    setEditingCategory(category);
    setFormData({ ...category });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (category: GalleryCategory) => {
    showDeleteConfirmation(category, () => {
      performAction(
        () => setCategories(categories.filter(c => c.id !== category.id)),
        'Category deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.slug) {
      return;
    }

    if (editingCategory) {
      performAction(
        () => {
          setCategories(categories.map(cat => 
            cat.id === editingCategory.id 
              ? { ...formData as GalleryCategory }
              : cat
          ));
          setIsModalOpen(false);
          setEditingCategory(null);
          setFormData({});
        },
        'Category updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newCategory: GalleryCategory = {
            id: Date.now().toString(),
            name: formData.name || '',
            slug: formData.slug || '',
            description: formData.description,
            isActive: formData.isActive ?? true
          };
          setCategories([...categories, newCategory]);
          setIsModalOpen(false);
          setEditingCategory(null);
          setFormData({});
        },
        'Category added successfully',
        'success'
      );
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>Gallery Category Management</h3>
              <p>Manage gallery categories for organizing images</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={categories}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No categories found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingCategory ? 'Edit Category' : 'Add New Category'}
            size="md"
          >
            <div className="cms-section__form">
              <FormField
                label="Category Name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={(value) => {
                  setFormData({ 
                    ...formData, 
                    name: value,
                    slug: formData.slug || generateSlug(value)
                  });
                }}
                placeholder="e.g., Trekking, Tours"
                required
              />
              
              <FormField
                label="Slug"
                name="slug"
                type="text"
                value={formData.slug || ''}
                onChange={(value) => setFormData({ ...formData, slug: value })}
                placeholder="e.g., trekking, tours"
                required
                helpText="URL-friendly identifier (auto-generated from name)"
              />
              
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description || ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Optional description for this category"
                rows={3}
              />
              
              <FormField
                label="Active"
                name="isActive"
                type="checkbox"
                value={formData.isActive ? 'true' : 'false'}
                onChange={(value) => setFormData({ ...formData, isActive: value === 'true' })}
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const GalleryCategoryManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Category',
        message: 'Are you sure you want to delete this category?',
        type: 'category'
      }}
    >
      <GalleryCategoryManagementContent />
    </CRUDProvider>
  );
};

export default GalleryCategoryManagement;


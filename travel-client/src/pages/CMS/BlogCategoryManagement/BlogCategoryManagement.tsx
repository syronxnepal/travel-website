// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

const BlogCategoryManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [categories, setCategories] = useState<BlogCategory[]>([
    { id: '1', name: 'Destinations', slug: 'destinations', description: 'Travel destination guides', isActive: true },
    { id: '2', name: 'Tips', slug: 'tips', description: 'Travel tips and advice', isActive: true },
    { id: '3', name: 'Photography', slug: 'photography', description: 'Travel photography tips', isActive: true },
    { id: '4', name: 'Culture', slug: 'culture', description: 'Cultural insights and stories', isActive: true },
    { id: '5', name: 'Adventure', slug: 'adventure', description: 'Adventure travel stories', isActive: true },
    { id: '6', name: 'General', slug: 'general', description: 'General travel topics', isActive: true }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [formData, setFormData] = useState<Partial<BlogCategory>>({});

  const columns = [
    {
      key: 'name',
      label: 'Category Name',
      render: (value: string, item: BlogCategory) => (
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
      render: (_: boolean, item: BlogCategory) => (
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

  const handleEdit = (category: BlogCategory) => {
    setEditingCategory(category);
    setFormData({ ...category });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (category: BlogCategory) => {
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
              ? { ...formData as BlogCategory }
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
          const newCategory: BlogCategory = {
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
              <h3>Blog Category Management</h3>
              <p>Manage blog categories for organizing posts</p>
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
                placeholder="e.g., Destinations, Tips"
                required
              />
              
              <FormField
                label="Slug"
                name="slug"
                type="text"
                value={formData.slug || ''}
                onChange={(value) => setFormData({ ...formData, slug: value })}
                placeholder="e.g., destinations, tips"
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

const BlogCategoryManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Category',
        message: 'Are you sure you want to delete this category?',
        type: 'category'
      }}
    >
      <BlogCategoryManagementContent />
    </CRUDProvider>
  );
};

export default BlogCategoryManagement;


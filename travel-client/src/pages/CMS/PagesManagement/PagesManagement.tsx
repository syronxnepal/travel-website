// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface PageData {
  id: string;
  image: string;
  topTitle: string;
  heading: string;
  createdAt: string;
  status: 'published' | 'draft';
}

const PagesManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  
  const [pages, setPages] = useState<PageData[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      topTitle: 'Adventure',
      heading: 'Explore the World',
      createdAt: '2024-01-15',
      status: 'published'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      topTitle: 'Culture',
      heading: 'Discover Ancient Wonders',
      createdAt: '2024-01-20',
      status: 'published'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageData | null>(null);
  const [formData, setFormData] = useState<Partial<PageData>>({});

  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '120px',
      render: (_: string, item: PageData) => (
        <div className="pages-management__image-cell">
          <img src={item.image} alt={item.heading} />
        </div>
      )
    },
    {
      key: 'topTitle',
      label: 'Top Title',
      render: (value: string) => (
        <div className="pages-management__cell">
          <span className="pages-management__badge">{value}</span>
        </div>
      )
    },
    {
      key: 'heading',
      label: 'Heading',
      render: (value: string) => (
        <div className="pages-management__cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (_: string, item: PageData) => (
        <div className="pages-management__status-cell">
          <span className={`status-badge ${item.status}`}>
            {item.status}
          </span>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      width: '110px'
    }
  ];

  const handleAdd = () => {
    setEditingPage(null);
    setFormData({ status: 'draft' });
    setIsModalOpen(true);
  };

  const handleEdit = (page: PageData) => {
    setEditingPage(page);
    setFormData(page);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (page: PageData) => {
    showDeleteConfirmation(page, () => {
      performAction(
        () => setPages(pages.filter(p => p.id !== page.id)),
        'Page deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (editingPage) {
      performAction(
        () => {
          setPages(pages.map(page =>
            page.id === editingPage.id
              ? { ...formData as PageData }
              : page
          ));
          setIsModalOpen(false);
          setEditingPage(null);
          setFormData({});
        },
        'Page updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newPage: PageData = {
            id: Date.now().toString(),
            image: formData.image || '',
            topTitle: formData.topTitle || '',
            heading: formData.heading || '',
            createdAt: new Date().toISOString().split('T')[0],
            status: (formData.status as 'published' | 'draft') || 'draft'
          };
          setPages([...pages, newPage]);
          setIsModalOpen(false);
          setEditingPage(null);
          setFormData({});
        },
        'Page created successfully',
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
              <h3>Pages Management</h3>
              <p>Create and manage custom pages with images, titles, and headings</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={pages}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No pages found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingPage ? 'Edit Page' : 'Create New Page'}
            size="lg"
          >
            <div className="cms-section__form">
              <div className="cms-section__form-row">
                <label className="cms-section__image-label">Page Image</label>
                <ImageUpload
                  value={formData.image || ''}
                  onChange={(value) => setFormData({ ...formData, image: value as string })}
                  placeholder="Upload page image"
                  aspectRatio="16/9"
                />
              </div>

              <FormField
                label="Top Title"
                name="topTitle"
                type="text"
                value={formData.topTitle || ''}
                onChange={(value) => setFormData({ ...formData, topTitle: value })}
                placeholder="Enter top title"
                required
              />

              <FormField
                label="Heading"
                name="heading"
                type="text"
                value={formData.heading || ''}
                onChange={(value) => setFormData({ ...formData, heading: value })}
                placeholder="Enter page heading"
                required
              />

              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status || 'draft'}
                onChange={(value) => setFormData({ ...formData, status: value as PageData['status'] })}
                options={['published', 'draft']}
                required
              />

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingPage ? 'Update' : 'Create'} Page
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>

      <style>{`
        .pages-management__image-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          
          img {
            width: 80px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
          }
        }

        .pages-management__cell {
          color: var(--text-primary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .pages-management__badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .pages-management__status-cell {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </CMSLayout>
  );
};

const PagesManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Page',
        message: 'Are you sure you want to delete this page?',
        type: 'page'
      }}
    >
      <PagesManagementContent />
    </CRUDProvider>
  );
};

export default PagesManagement;


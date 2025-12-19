import React, { useState } from 'react';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import 'src/components/CMS/BlogSectionCMS/BlogSectionCMS.scss';

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
}

const BlogSectionCMS: React.FC = () => {
  const [blogPostsData, setBlogPostsData] = useState<BlogPostData[]>([
    {
      id: '1',
      title: 'The Ultimate Guide to Trekking in the Himalayas',
      excerpt: 'Discover breathtaking trails, essential gear, and tips for an unforgettable Himalayan adventure.',
      author: 'Jane Doe',
      date: '2023-10-26',
      category: 'Trekking',
      image: 'https://images.unsplash.com/photo-1502657873112-803269d1506a?w=800',
      isFeatured: true,
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPostData | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPostData>>({});

  const categories = [
    { value: 'Trekking', label: 'Trekking' },
    { value: 'Travel Tips', label: 'Travel Tips' },
    { value: 'Destinations', label: 'Destinations' },
    { value: 'Food Travel', label: 'Food Travel' },
    { value: 'Eco Travel', label: 'Eco Travel' },
    { value: 'Photography', label: 'Photography' }
  ];

  const columns = [
    {
      key: 'title',
      label: 'Blog Post',
      render: (value: string, item: BlogPostData) => (
        <div className="blog-section-cms__post-cell">
          <div className="blog-section-cms__post-image">
            <img src={item.image} alt={value} />
          </div>
          <div className="blog-section-cms__post-info">
            <strong>{value}</strong>
            <span className="blog-section-cms__post-author">
              <i className="fa-solid fa-user"></i>
              {item.author}
            </span>
            <div className="blog-section-cms__post-badges">
              {item.isFeatured && (
                <span className="blog-section-cms__badge blog-section-cms__badge--featured">
                  Featured
                </span>
              )}
              <span className={`blog-section-cms__badge ${item.isActive ? 'active' : 'inactive'}`}>
                {item.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="blog-section-cms__category-tag">{value}</span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (value: string) => (
        <span className="blog-section-cms__date">
          <i className="fa-solid fa-calendar-days"></i>
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: BlogPostData) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: BlogPostData) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPostsData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setBlogPostsData(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: BlogPostData = {
        id: Date.now().toString(),
        title: formData.title || '',
        excerpt: formData.excerpt || '',
        author: formData.author || '',
        date: formData.date || new Date().toISOString().split('T')[0],
        category: formData.category || '',
        image: formData.image || '',
        isFeatured: formData.isFeatured || false,
        isActive: formData.isActive || false
      };
      setBlogPostsData(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="blog-section-cms">
      <div className="blog-section-cms__header">
        <h3>Blog Section Management</h3>
        <p>Manage blog posts and featured articles for your homepage.</p>
      </div>

      <DataTable
        data={blogPostsData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No blog posts configured"
        searchable
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Blog Post' : 'Add Blog Post'}
        size="lg"
      >
        <div className="blog-section-cms__form">
          <div className="blog-section-cms__form-row">
            <FormField
              label="Blog Title"
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="blog-section-cms__form-row">
            <FormField
              label="Excerpt"
              name="excerpt"
              type="textarea"
              value={formData.excerpt || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, excerpt: value }))}
              placeholder="Enter blog excerpt"
              rows={3}
              required
            />
          </div>

          <div className="blog-section-cms__form-row blog-section-cms__form-row--two-col">
            <FormField
              label="Author"
              name="author"
              type="text"
              value={formData.author || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, author: value }))}
              placeholder="Enter author name"
              required
            />
            <FormField
              label="Category"
              name="category"
              type="select"
              value={formData.category || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              options={categories}
              required
            />
          </div>

          <div className="blog-section-cms__form-row">
            <FormField
              label="Publish Date"
              name="date"
              type="text"
              value={formData.date || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, date: value }))}
              placeholder="YYYY-MM-DD"
              required
            />
          </div>

          <div className="blog-section-cms__form-row">
            <label className="blog-section-cms__image-label">Featured Image</label>
            <ImageUpload
              value={formData.image || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, image: value as string }))}
              placeholder="Upload blog featured image"
              aspectRatio="16/9"
            />
          </div>

          <div className="blog-section-cms__form-row blog-section-cms__form-row--checkboxes">
            <FormField
              label="Featured Post"
              name="isFeatured"
              type="checkbox"
              value={formData.isFeatured || false}
              onChange={(value) => setFormData(prev => ({ ...prev, isFeatured: value }))}
            />
            <FormField
              label="Active"
              name="isActive"
              type="checkbox"
              value={formData.isActive || false}
              onChange={(value) => setFormData(prev => ({ ...prev, isActive: value }))}
            />
          </div>

          <div className="blog-section-cms__form-actions">
            <button
              className="blog-section-cms__btn blog-section-cms__btn--secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="blog-section-cms__btn blog-section-cms__btn--primary"
              onClick={handleSave}
            >
              {editingItem ? 'Update' : 'Save'} Blog Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogSectionCMS;

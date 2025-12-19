// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import RichTextEditor from 'src/components/CMS/Common/RichTextEditor/RichTextEditor';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import './BlogFormPage.scss';

interface Blog {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
  featured: boolean;
}

const BlogFormPageContent: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { performAction } = useCRUD();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Blog>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    category: 'General',
    readTime: '5 min read',
    views: 0,
    featured: false
  });

  useEffect(() => {
    if (isEditing && id) {
      // In a real app, fetch blog by id
    }
  }, [id, isEditing]);

  const handleSave = () => {
    performAction(
      () => {
        // In a real app, save to API
        navigate('/cms/blogs/manage');
      },
      isEditing ? 'Blog updated successfully' : 'Blog added successfully',
      'success'
    );
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>{isEditing ? 'Edit Blog' : 'Add New Blog'}</h3>
              <p>{isEditing ? 'Update blog post' : 'Create a new blog post with rich content'}</p>
            </div>
          </div>

          <div className="cms-section__content">
            <div className="cms-section__form blog-form-page">
              <ImageUpload
                label="Blog Image"
                name="image"
                value={formData.image || ''}
                onChange={(value) => setFormData({ ...formData, image: value })}
                placeholder="Upload or enter image URL"
              />
              
              <FormField
                label="Title"
                name="title"
                type="text"
                value={formData.title || ''}
                onChange={(value) => setFormData({ ...formData, title: value })}
                placeholder="Enter blog title"
                required
              />
              
              <FormField
                label="Excerpt"
                name="excerpt"
                type="textarea"
                value={formData.excerpt || ''}
                onChange={(value) => setFormData({ ...formData, excerpt: value })}
                placeholder="Enter blog excerpt/summary"
                rows={3}
                required
                helpText="A short summary of the blog post (used in blog cards)"
              />
              
              <RichTextEditor
                label="Content"
                value={formData.content || ''}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Write your blog content here..."
                required
              />
              
              <FormField
                label="Author"
                name="author"
                type="text"
                value={formData.author || ''}
                onChange={(value) => setFormData({ ...formData, author: value })}
                placeholder="Enter author name"
                required
              />
              
              <FormField
                label="Date"
                name="date"
                type="date"
                value={formData.date || ''}
                onChange={(value) => setFormData({ ...formData, date: value })}
                required
              />
              
              <FormField
                label="Category"
                name="category"
                type="select"
                value={formData.category || 'General'}
                onChange={(value) => setFormData({ ...formData, category: value })}
                options={[
                  { value: 'Destinations', label: 'Destinations' },
                  { value: 'Tips', label: 'Tips' },
                  { value: 'Photography', label: 'Photography' },
                  { value: 'Culture', label: 'Culture' },
                  { value: 'Adventure', label: 'Adventure' },
                  { value: 'General', label: 'General' }
                ]}
                required
              />
              
              <FormField
                label="Read Time"
                name="readTime"
                type="text"
                value={formData.readTime || ''}
                onChange={(value) => setFormData({ ...formData, readTime: value })}
                placeholder="e.g., 5 min read"
                required
                helpText="Estimated reading time for the blog post"
              />
              
              <FormField
                label="Views"
                name="views"
                type="number"
                value={formData.views?.toString() || '0'}
                onChange={(value) => setFormData({ ...formData, views: parseInt(value) })}
                placeholder="Enter views count"
                min="0"
              />
              
              <FormField
                label="Featured"
                name="featured"
                type="checkbox"
                value={formData.featured ? 'true' : 'false'}
                onChange={(value) => setFormData({ ...formData, featured: value === 'true' })}
              />
              
              <div className="form-actions">
                <button className="btn btn-secondary" onClick={() => navigate('/cms/blogs/manage')}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {isEditing ? 'Update' : 'Add'} Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

const BlogFormPage: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Blog',
        message: 'Are you sure you want to delete this blog?',
        type: 'blog'
      }}
    >
      <BlogFormPageContent />
    </CRUDProvider>
  );
};

export default BlogFormPage;


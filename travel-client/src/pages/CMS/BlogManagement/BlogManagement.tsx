// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

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

const BlogManagementContent: React.FC = () => {
  const navigate = useNavigate();
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
      title: 'Top 10 Travel Destinations for 2024',
      excerpt: 'Discover the most amazing travel destinations to visit in 2024, from hidden gems to popular hotspots.',
      content: '<h2>Introduction</h2><p>As we step into 2024, the world of travel continues to evolve with new destinations emerging and classic favorites reinventing themselves. This comprehensive guide will take you through the top 10 must-visit destinations for the year ahead.</p><h2>1. Hidden Gems</h2><p>Explore off-the-beaten-path locations that offer unique experiences...</p>',
      author: 'John Smith',
      date: '2024-01-15',
      category: 'Destinations',
      readTime: '5 min read',
      views: 1234,
      featured: true
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      title: 'Budget Travel Tips for Backpackers',
      excerpt: 'Learn how to travel on a budget with these essential tips for backpackers and budget-conscious travelers.',
      content: '<h2>Budget Travel Essentials</h2><p>Traveling on a budget doesn\'t mean sacrificing experiences. Here are proven strategies to make your travel dreams a reality...</p>',
      author: 'Sarah Johnson',
      date: '2024-01-10',
      category: 'Tips',
      readTime: '7 min read',
      views: 856,
      featured: false
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
      title: 'Travel Photography Guide',
      excerpt: 'Master the art of travel photography with our comprehensive guide to capturing stunning travel moments.',
      content: '<h2>Photography Basics</h2><p>Capture the essence of your travels with these professional photography tips and techniques...</p>',
      author: 'Mike Davis',
      date: '2024-01-05',
      category: 'Photography',
      readTime: '10 min read',
      views: 567,
      featured: true
    }
  ]);


  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: () => (
        <div className="blog-cms__image-cell">
          <div className="blog-cms__image-placeholder">
            <i className="fa-solid fa-image"></i>
          </div>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="blog-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'author',
      label: 'Author'
    },
    {
      key: 'date',
      label: 'Date',
      width: '100px'
    },
    {
      key: 'category',
      label: 'Category',
      width: '120px',
      render: (value: string) => (
        <div className="blog-cms__category-cell">
          <span className={`blog-cms__category blog-cms__category--${value.toLowerCase()}`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'views',
      label: 'Views',
      width: '80px',
      render: (value: number) => <span>{value.toLocaleString()}</span>
    },
    {
      key: 'featured',
      label: 'Featured',
      width: '100px',
      render: (_: boolean, item: Blog) => (
        <div className="blog-cms__featured-cell">
          <span className={`blog-cms__featured-badge ${item.featured ? 'featured' : 'regular'}`}>
            {item.featured ? 'Featured' : 'Regular'}
          </span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    navigate('/cms/blogs/form');
  };

  const handleEdit = (blog: Blog) => {
    navigate(`/cms/blogs/form/${blog.id}`);
  };

  const handleDeleteClick = (blog: Blog) => {
    showDeleteConfirmation(blog, () => {
      performAction(
        () => setBlogs(blogs.filter(b => b.id !== blog.id)),
        'Blog deleted successfully',
        'success'
      );
    });
  };


  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>Blog Management</h3>
              <p>Manage all blog posts with full control over content, categories, and featured status</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={blogs}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No blogs found"
            />
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

const BlogManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Blog',
        message: 'Are you sure you want to delete this blog?',
        type: 'blog'
      }}
    >
      <BlogManagementContent />
    </CRUDProvider>
  );
};

export default BlogManagement;


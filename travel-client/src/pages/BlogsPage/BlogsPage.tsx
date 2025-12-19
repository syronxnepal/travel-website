import React, { useState } from 'react';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import BlogCard from '../../components/BlogCard/BlogCard';
import './BlogsPage.scss';

const BlogsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Blogs', path: '/blogs' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Tips for Your First Trek to Everest Base Camp',
      excerpt: 'Everything you need to know before embarking on the journey of a lifetime to the base of the world\'s highest mountain.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Trekking',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'The Cultural Heritage of Kathmandu Valley',
      excerpt: 'Discover the rich history and cultural treasures that make Kathmandu Valley a UNESCO World Heritage Site.',
      author: 'Raj Thapa',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: 'Best Time to Visit Nepal: A Complete Seasonal Guide',
      excerpt: 'Plan your perfect Nepal adventure with our comprehensive guide to weather, festivals, and seasonal activities.',
      author: 'Priya Sharma',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 4,
      title: 'Wildlife Safari in Chitwan National Park',
      excerpt: 'Experience the incredible biodiversity of Nepal\'s premier wildlife destination and spot the elusive Bengal tiger.',
      author: 'James Wilson',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'Wildlife',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'Trekking Gear Checklist: What to Pack for Your Adventure',
      excerpt: 'A comprehensive guide to essential gear and equipment for your trekking adventure in the Himalayas.',
      author: 'Mike Chen',
      date: '2023-12-20',
      readTime: '12 min read',
      category: 'Trekking',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'Nepalese Cuisine: A Culinary Journey Through the Himalayas',
      excerpt: 'Explore the diverse flavors and traditional dishes that make Nepalese cuisine a hidden gem of South Asia.',
      author: 'Anita Gurung',
      date: '2023-12-15',
      readTime: '9 min read',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
      featured: false
    }
  ];

  const categories = ['All', 'Trekking', 'Culture', 'Travel Tips', 'Wildlife', 'Food'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <div className="blogs-page">
        <PageHero
          title="Travel Blog"
          subtitle="Stories, tips, and insights from our adventures in Nepal"
          breadcrumbs={breadcrumbs}
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
        />
        
        <div className="blogs-page__main">
          <div className="container">
            <div className="blogs-page__content">
          
              {/* Categories Filter */}
              <div className="blogs-page__filters">
                <div className="blogs-page__category-filters">
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`blogs-page__category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blog Grid */}
              <div className="blogs-page__grid">
                {regularPosts.map(post => (
                  <BlogCard
                    key={post.id}
                    {...post}
                  />
                ))}
              </div>

              {/* Load More Button */}
              <div className="blogs-page__load-more">
                <button className="main-button main-button--outline">
                  Load More Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogsPage;

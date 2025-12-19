import React from 'react';
import BlogCard from '../BlogCard/BlogCard';
import './BlogSection.scss';
import SectionHeading from '../SectionHeading/Index';
import Button from '../Button/Index';

const BlogSection: React.FC = () => {
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
      featured: false
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
    },
    // {
    //   id: 7,
    //   title: 'Mountain Photography: Capturing Nepal\'s Stunning Landscapes',
    //   excerpt: 'Learn the best techniques and locations for photographing the majestic Himalayan peaks and valleys.',
    //   author: 'David Kim',
    //   date: '2023-12-10',
    //   readTime: '11 min read',
    //   category: 'Photography',
    //   image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
    //   featured: false
    // },
    // {
    //   id: 8,
    //   title: 'Festivals of Nepal: A Cultural Calendar',
    //   excerpt: 'Discover the vibrant festivals and celebrations that make Nepal a year-round cultural destination.',
    //   author: 'Sita Maharjan',
    //   date: '2023-12-05',
    //   readTime: '8 min read',
    //   category: 'Culture',
    //   image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
    //   featured: false
    // }
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-section__content">
        <div className="section-header-outer">
        <SectionHeading topTitle='Our Blogs' title='Keep Updated With Our Stories' iconclassName="fa-solid fa-book" />
        <div className="section-right-button">
          <Button text='View More' type='main-button' isLink link='#' />
        </div>
        </div>


          <div className="blog-section__grid">
            {blogPosts.map(post => (
              <BlogCard
                key={post.id}
                {...post}
                className="blog-section__card"
              />
            ))}
          </div>

          {/* <div className="blog-section__view-more">
            <Link to="/blogs" className="main-button main-button--outline">
              View More Posts
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

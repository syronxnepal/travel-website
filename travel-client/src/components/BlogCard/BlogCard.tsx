import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.scss';

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  author,
  date,
  category,
  image,
  featured = false,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <article className={`blog-card ${featured ? 'blog-card--featured' : ''} ${className}`}>
      <div className="blog-card__image">
        <img src={image} alt={title} />
        {!featured && (
          <div className="blog-card__category">
            {category}
          </div>
        )}
      </div>
      
      <div className="blog-card__content">
        <div className="blog-card__meta">
          <span className="blog-card__date">
            <i className="fa-solid fa-calendar-days"></i>
            {formatDate(date)}
          </span>
          <span className="blog-card__separator">•</span>
          <span className="blog-card__author">
            <i className="fa-solid fa-user"></i>
            By {author}
          </span>
        </div>
        
        <h3 className="blog-card__title">{title}</h3>
        
        {featured && (
          <p className="blog-card__excerpt">{excerpt}</p>
        )}
        
        <Link to={`/blog/${id}`} className="blog-card__read-more">
          Read More
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;

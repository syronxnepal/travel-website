import React from 'react';
import { Link } from 'react-router-dom';
import './PageHero.scss';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Array<{
    label: string;
    path?: string;
    isActive?: boolean;
  }>;
  backgroundImage?: string;
  overlayOpacity?: number;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop',
  overlayOpacity = 0.6
}) => {
  return (
    <div className="page-hero">
      <div 
        className="page-hero__background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          '--overlay-opacity': overlayOpacity
        } as React.CSSProperties}
      >
        <div className="page-hero__overlay"></div>
      </div>
      
      <div className="page-hero__content">
        <div className="container">
          <div className="page-hero__breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.path ? (
                  <Link 
                    to={crumb.path} 
                    className={`page-hero__breadcrumb-link ${crumb.isActive ? 'active' : ''}`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={`page-hero__breadcrumb-text ${crumb.isActive ? 'active' : ''}`}>
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="page-hero__breadcrumb-separator">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="page-hero__text">
            <h1 className="page-hero__title">{title}</h1>
            {subtitle && (
              <p className="page-hero__subtitle">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHero;

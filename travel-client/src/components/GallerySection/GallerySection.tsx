import React from 'react';
import './GallerySection.scss';
import SectionHeading from '../SectionHeading/Index';
import Button from '../Button/Index';

const GallerySection: React.FC = () => {
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Everest Base Camp Trek',
      title: 'Everest Base Camp Trek',
      size: 'large' // Spans 2 rows
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
      alt: 'Kathmandu Valley Temples',
      title: 'Kathmandu Valley Temples',
      size: 'medium'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      alt: 'Annapurna Mountain Range',
      title: 'Annapurna Mountain Range',
      size: 'medium'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      alt: 'Chitwan National Park Safari',
      title: 'Chitwan National Park Safari',
      size: 'medium'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      alt: 'Himalayan Trekking Gear',
      title: 'Himalayan Trekking Gear',
      size: 'medium'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      alt: 'Nepalese Cuisine',
      title: 'Nepalese Cuisine',
      size: 'medium'
    }
  ];

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-section__content">

        <div className="section-header-outer">
        <SectionHeading topTitle='Our Gallery' title='Discover the Beauty of Our Trips' iconclassName="fa-solid fa-photo-film" />
        <div className="section-right-button">
          <Button text='View More' type='main-button' isLink link='#' />
        </div>

        </div>
          <div className="gallery-section__grid">
            {galleryImages.map(image => (
              <div
                key={image.id}
                className={`gallery-section__item gallery-section__item--${image.size}`}
              >
                <div className="gallery-section__image">
                  <img src={image.src} alt={image.alt} />
                  {/* <div className="gallery-section__overlay">
                    <h3 className="gallery-section__image-title">{image.title}</h3>
                    <div className="gallery-section__view-icon">
                      <i className="fa-solid fa-eye"></i>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* <div className="gallery-section__view-more">
            <Link to="/gallery" className="main-button main-button--outline">
              View More Photos
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

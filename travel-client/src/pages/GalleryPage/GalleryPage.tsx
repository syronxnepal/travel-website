import React, { useState, useEffect } from 'react';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import './GalleryPage.scss';

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' }
  ];

  const categories = ['All', 'Trekking', 'Tours', 'Culture', 'Wildlife', 'Landscapes'];

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      alt: 'Everest Base Camp Trek',
      category: 'Trekking',
      title: 'Everest Base Camp Trek',
      location: 'Sagarmatha National Park',
      size: 'large'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
      alt: 'Kathmandu Durbar Square',
      category: 'Culture',
      title: 'Kathmandu Durbar Square',
      location: 'Kathmandu',
      size: 'medium'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      alt: 'Annapurna Range',
      category: 'Landscapes',
      title: 'Annapurna Range',
      location: 'Pokhara',
      size: 'tall'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      alt: 'Chitwan National Park',
      category: 'Wildlife',
      title: 'Chitwan National Park',
      location: 'Chitwan',
      size: 'medium'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop',
      alt: 'Langtang Valley Trek',
      category: 'Trekking',
      title: 'Langtang Valley Trek',
      location: 'Langtang National Park',
      size: 'tall'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
      alt: 'Traditional Nepalese Food',
      category: 'Culture',
      title: 'Traditional Nepalese Food',
      location: 'Kathmandu',
      size: 'medium'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop',
      alt: 'Pokhara Lake',
      category: 'Tours',
      title: 'Pokhara Lake',
      location: 'Pokhara',
      size: 'large'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      alt: 'Manaslu Circuit Trek',
      category: 'Trekking',
      title: 'Manaslu Circuit Trek',
      location: 'Manaslu Conservation Area',
      size: 'tall'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
      alt: 'Boudhanath Stupa',
      category: 'Culture',
      title: 'Boudhanath Stupa',
      location: 'Kathmandu',
      size: 'medium'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      alt: 'Himalayan Sunrise',
      category: 'Landscapes',
      title: 'Himalayan Sunrise',
      location: 'Annapurna Region',
      size: 'medium'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=600&fit=crop',
      alt: 'Rhinoceros in Chitwan',
      category: 'Wildlife',
      title: 'Rhinoceros in Chitwan',
      location: 'Chitwan National Park',
      size: 'tall'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
      alt: 'Cultural Tour',
      category: 'Tours',
      title: 'Cultural Tour',
      location: 'Kathmandu Valley',
      size: 'medium'
    },
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      alt: 'Mountain Village',
      category: 'Trekking',
      title: 'Mountain Village',
      location: 'Annapurna Region',
      size: 'medium'
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=600&fit=crop',
      alt: 'Traditional Architecture',
      category: 'Culture',
      title: 'Traditional Architecture',
      location: 'Bhaktapur',
      size: 'tall'
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop',
      alt: 'Himalayan Peaks',
      category: 'Landscapes',
      title: 'Himalayan Peaks',
      location: 'Everest Region',
      size: 'large'
    }
  ];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openSlideshow = (imageIndex: number) => {
    setCurrentSlideIndex(imageIndex);
    setIsSlideshowOpen(true);
  };

  const closeSlideshow = () => {
    setIsSlideshowOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isSlideshowOpen) return;
      
      if (e.key === 'Escape') {
        closeSlideshow();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isSlideshowOpen]);

  return (
    <>
      <div className="gallery-page">
        <PageHero
          title="Photo Gallery"
          subtitle="Capturing the beauty and adventure of Nepal"
          breadcrumbs={breadcrumbs}
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
        />
        
        <div className="gallery-page__main">
          <div className="container">
            <div className="gallery-page__content">
              {/* Category Filters */}
              <div className="gallery-page__filters">
                {/* <h3>Filter by Category</h3> */}
                <div className="gallery-page__category-filters">
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`gallery-page__category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Masonry Grid */}
              <div className="gallery-page__masonry">
                {filteredImages.map((image, index) => (
                  <div 
                    key={image.id} 
                    className={`gallery-page__item gallery-page__item--${image.size}`}
                    onClick={() => openSlideshow(index)}
                  >
                    <div className="gallery-page__image">
                      <img src={image.src} alt={image.alt} />
                      <div className="gallery-page__overlay">
                        <div className="gallery-page__overlay-content">
                          <div className="gallery-page__overlay-header">
                            <h4>{image.title}</h4>
                            {/* <span className="gallery-page__category-badge">{image.category}</span> */}
                          </div>
                          <p><span><i className="fa-solid fa-location-dot"></i></span>{image.location}</p>
                          <div className="gallery-page__overlay-actions">
                            <button className="gallery-page__view-btn">
                              <i className="fa-solid fa-expand"></i>
                              View Full Size
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="gallery-page__load-more">
                <button className="main-button main-button--outline">
                  Load More Photos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow Modal */}
        {isSlideshowOpen && (
          <div className="gallery-page__slideshow" onClick={closeSlideshow}>
            <div className="gallery-page__slideshow-content" onClick={(e) => e.stopPropagation()}>
              <button className="gallery-page__close-btn" onClick={closeSlideshow}>
                <i className="fa-solid fa-times"></i>
              </button>
              
              <button className="gallery-page__nav-btn gallery-page__nav-btn--prev" onClick={prevSlide}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              <button className="gallery-page__nav-btn gallery-page__nav-btn--next" onClick={nextSlide}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>

              <div className="gallery-page__slide">
                <img 
                  src={filteredImages[currentSlideIndex]?.src} 
                  alt={filteredImages[currentSlideIndex]?.alt} 
                />
                <div className="gallery-page__slide-info">
                  <h3>{filteredImages[currentSlideIndex]?.title}</h3>
                  <p>{filteredImages[currentSlideIndex]?.location}</p>
                  <span className="gallery-page__slide-category">
                    {filteredImages[currentSlideIndex]?.category}
                  </span>
                </div>
              </div>

              <div className="gallery-page__slide-counter">
                {currentSlideIndex + 1} / {filteredImages.length}
              </div>

              <div className="gallery-page__thumbnails">
                {filteredImages.map((image, index) => (
                  <button
                    key={image.id}
                    className={`gallery-page__thumbnail ${index === currentSlideIndex ? 'active' : ''}`}
                    onClick={() => setCurrentSlideIndex(index)}
                  >
                    <img src={image.src} alt={image.alt} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;

import React, { useState } from 'react';
import './TrekDetailGallery.scss';

interface TrekDetailGalleryProps {
  images: string[];
  title: string;
}

const TrekDetailGallery: React.FC<TrekDetailGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleMainImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseFullscreen();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    } else if (e.key === 'ArrowLeft') {
      handlePrevImage();
    }
  };

  return (
    <div className="trek-detail-gallery">
      <div className="trek-detail-gallery__container">
        <div className="trek-detail-gallery__main">
          <div 
            className="trek-detail-gallery__main-image"
            onClick={handleMainImageClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View ${title} image ${selectedImage + 1} in fullscreen`}
          >
            <img 
              src={images[selectedImage]} 
              alt={`${title} - Image ${selectedImage + 1}`}
              className="trek-detail-gallery__image"
            />
            <div className="trek-detail-gallery__overlay">
              <svg className="trek-detail-gallery__zoom-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="trek-detail-gallery__thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`trek-detail-gallery__thumbnail ${
                selectedImage === index ? 'trek-detail-gallery__thumbnail--active' : ''
              }`}
              onClick={() => handleImageClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleImageClick(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select image ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`${title} thumbnail ${index + 1}`}
                className="trek-detail-gallery__thumbnail-image"
              />
            </div>
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div className="trek-detail-gallery__fullscreen" onClick={handleCloseFullscreen}>
          <div className="trek-detail-gallery__fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="trek-detail-gallery__close-btn"
              onClick={handleCloseFullscreen}
              aria-label="Close fullscreen view"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            
            <button 
              className="trek-detail-gallery__nav-btn trek-detail-gallery__nav-btn--prev"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            
            <button 
              className="trek-detail-gallery__nav-btn trek-detail-gallery__nav-btn--next"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            <img 
              src={images[selectedImage]} 
              alt={`${title} - Image ${selectedImage + 1}`}
              className="trek-detail-gallery__fullscreen-image"
            />
            
            <div className="trek-detail-gallery__image-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrekDetailGallery;

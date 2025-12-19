import React, { useState } from 'react';
import './TourDetailGallery.scss';

interface Tour {
  id: number;
  image: string;
  location: string;
  duration: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
  category: string;
  description: string;
  highlights: string[];
}

interface Props {
  tour: Tour;
}

const TourDetailGallery: React.FC<Props> = ({ tour }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Generate additional images for the gallery
  const galleryImages = [
    tour.image,
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ];

  return (
    <div className="tour-detail-gallery">
      <div className="tour-detail-gallery__header">
        <h2 className="tour-detail-gallery__title">Photo Gallery</h2>
        <span className="tour-detail-gallery__count">
          {galleryImages.length} photos
        </span>
      </div>

      <div className="tour-detail-gallery__content">
        <div className="tour-detail-gallery__main">
          <img 
            src={galleryImages[selectedImage]} 
            alt={`${tour.title} - Image ${selectedImage + 1}`}
            className="tour-detail-gallery__main-image"
          />
          <div className="tour-detail-gallery__controls">
            <button 
              className="tour-detail-gallery__control"
              onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              className="tour-detail-gallery__control"
              onClick={() => setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="tour-detail-gallery__thumbnails">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`tour-detail-gallery__thumbnail ${
                selectedImage === index ? 'active' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourDetailGallery;
